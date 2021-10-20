import { useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useRecoilState } from 'recoil';

import { accessTokenState, refreshTokenState } from '@/atoms';
import useSignOut from '@/hooks/useSignOut';
import AuthResponse from '@/types/AuthResponse';

const BASE_URL = 'https://api.loca.kimjisub.me';

const customAxios = axios.create({
  baseURL: BASE_URL,
});

const useAxios = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [refreshToken] = useRecoilState(refreshTokenState);
  const signOut = useSignOut();

  useEffect(() => {
    const interceptor = customAxios.interceptors.request.use(config => {
      return {
        ...config,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
          ...config.headers,
        },
      };
    });
    return () => {
      customAxios.interceptors.request.eject(interceptor);
    };
  }, [accessToken]);

  useEffect(() => {
    const interceptor = customAxios.interceptors.response.use(
      res => res,
      async err => {
        if (!accessToken || err?.response?.status !== 401) {
          return Promise.reject(err);
        }

        try {
          if (typeof refreshToken !== 'string' || !refreshToken) {
            signOut();
            return Promise.reject();
          }
          const res = await axios.post<{}, AxiosResponse<AuthResponse>>(
            BASE_URL + '/auth/refresh',
            {
              refresh_token: refreshToken,
            },
          );
          setAccessToken(res.data.access_token);
          err.config.headers.Authorization = `Bearer ${res.data.access_token}`;
          return await axios(err.config);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
              signOut();
            }
          }
          return Promise.reject(err);
        }
      },
    );
    return () => {
      customAxios.interceptors.response.eject(interceptor);
    };
  }, [refreshToken, signOut, setAccessToken, accessToken]);

  return customAxios;
};

export default useAxios;
