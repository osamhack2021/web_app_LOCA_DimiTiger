import { useEffect } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';

import { accessTokenState, refreshTokenState, useLogout } from '../atoms';

const BASE_URL =
  process.env.REACT_APP_API_URL || 'https://api.loca.kimjisub.me';

const customAxios = axios.create({
  baseURL: BASE_URL,
});

const useAxios = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [refreshToken] = useRecoilState(refreshTokenState);
  const logout = useLogout();

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
        if (err?.response?.status !== 401) return Promise.reject(err);

        try {
          if (typeof refreshToken !== 'string' || !refreshToken) {
            logout();
            return Promise.reject();
          }
          const res = await axios.post(BASE_URL + '/auth/refresh', {
            refresh_token: refreshToken,
          });
          setAccessToken(res.data.access_token);
          err.config.headers[
            'Authorization'
          ] = `Bearer ${res.data.access_token}`;
          return await axios(err.config);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
              logout();
            }
          }
          return Promise.reject(err);
        }
      },
    );
    return () => {
      customAxios.interceptors.response.eject(interceptor);
    };
  }, [refreshToken, logout, setAccessToken]);

  return customAxios;
};

export default useAxios;
