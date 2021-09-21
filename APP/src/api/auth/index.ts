import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import client from '../client';

type AuthResponse = {
  access_token: string;
  refresh_token: string;
};

async function authWithIdPassword(
  id: string,
  password: string,
): Promise<AuthResponse> {
  const { data } = await client.post('/auth/token', { id, password });
  return data;
}

async function authWithRefreshToken(
  refresh_token: string,
): Promise<AuthResponse> {
  const { data } = await client.post('/auth/refresh', { refresh_token });
  return data;
}

type AuthParams = {
  id?: string;
  password?: string;
};

export function useAuth({ id, password }: AuthParams) {
  const [refreshToken, setRefreshToken] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  async function applyToken({ access_token, refresh_token }: AuthResponse) {
    client.defaults.headers.Authorization = `Bearer ${access_token}`;
    await AsyncStorage.setItem('refresh_token', refresh_token);
    setAuthorized(true);
    setRefreshToken(refresh_token);
  }

  useEffect(() => {
    async function auth() {
      if (!id || !password) {
        return;
      }
      try {
        setLoading(true);
        const response = await authWithIdPassword(id, password);
        applyToken(response);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
    auth();
  }, [id, password]);

  const refresh = useCallback(() => {
    async function auth() {
      if (!refreshToken) {
        return;
      }
      try {
        setLoading(true);
        const response = await authWithRefreshToken(refreshToken);
        applyToken(response);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
    auth();
  }, [refreshToken]);

  useEffect(() => {
    async function getRefreshToken() {
      const token = await AsyncStorage.getItem('refresh_token');
      if (token) {
        setRefreshToken(token);
      }
    }
    getRefreshToken();
  }, []);

  useEffect(() => {
    if (!authorized) {
      refresh();
    }
  }, [refresh, authorized]);

  return { authorized, loading, refresh };
}
