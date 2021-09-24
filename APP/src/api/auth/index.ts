import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilState } from 'recoil';

import client from '../client';

import { authState } from '@/atoms';

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

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [auth, setAuth] = useRecoilState(authState);
  const { refreshToken, authenticated } = auth;

  const applyToken = useCallback(
    async ({ access_token, refresh_token }: AuthResponse) => {
      client.defaults.headers.Authorization = `Bearer ${access_token}`;
      await AsyncStorage.setItem('refresh_token', refresh_token);
      setAuth({
        authenticated: true,
        refreshToken: refresh_token,
      });
    },
    [setAuth],
  );

  const signIn = useCallback(
    (id: string, password: string) => {
      async function authenticate() {
        try {
          setLoading(true);
          const response = await authWithIdPassword(id, password);
          applyToken(response);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      }
      authenticate();
    },
    [applyToken],
  );

  const refresh = useCallback(() => {
    async function authenticate() {
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
    authenticate();
  }, [applyToken, refreshToken]);

  useEffect(() => {
    async function getRefreshToken() {
      const token = await AsyncStorage.getItem('refresh_token');
      if (token) {
        setAuth(prev => ({
          ...prev,
          refreshToken: token,
        }));
      }
    }
    getRefreshToken();
  }, [setAuth]);

  useEffect(() => {
    if (!authenticated) {
      refresh();
    }
  }, [refresh, authenticated]);

  return { authenticated, loading, error, refresh, signIn };
}
