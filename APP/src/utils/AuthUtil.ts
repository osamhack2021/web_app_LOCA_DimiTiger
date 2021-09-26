import AsyncStorage from '@react-native-async-storage/async-storage';
import { addSeconds, differenceInSeconds } from 'date-fns';

import { authWithIdPassword, authWithRefreshToken } from '@/api/auth';
import client from '@/api/client';
import AuthResponse from '@/types/AuthResponse';

async function applyToken({
  access_token,
  refresh_token,
  expires_in,
}: AuthResponse) {
  client.defaults.headers.Authorization = `Bearer ${access_token}`;
  await AsyncStorage.multiSet([
    ['access_token', access_token],
    ['refresh_token', refresh_token],
    ['expire', addSeconds(new Date(), expires_in).toISOString()],
  ]);
}

export async function signIn(id: string, password: string) {
  const response = await authWithIdPassword(id, password);
  await applyToken(response);
}

export async function refresh(refresh_token: string) {
  const response = await authWithRefreshToken(refresh_token);
  await applyToken(response);
}

export async function signOut() {
  delete client.defaults.headers.Authorization;
  await AsyncStorage.multiRemove(['access_token', 'refresh_token', 'expire']);
}

export async function getTokens(): Promise<boolean> {
  const [access_token, refresh_token, expire] = (
    await AsyncStorage.multiGet(['access_token', 'refresh_token', 'expire'])
  ).map(pair => pair[1]);
  if (access_token && refresh_token && expire) {
    const expires_in = differenceInSeconds(new Date(expire), new Date());
    //7 Days
    if (expires_in < 7 * 24 * 60 * 60) {
      await refresh(refresh_token);
    } else {
      await applyToken({ access_token, refresh_token, expires_in });
    }
    return true;
  } else {
    return false;
  }
}
