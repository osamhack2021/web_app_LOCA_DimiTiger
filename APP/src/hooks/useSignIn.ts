import { AxiosResponse } from 'axios';
import { useSetRecoilState } from 'recoil';

import useAxios from './useAxios';

import { accessTokenState, refreshTokenState } from '@/atoms';
import AuthResponse from '@/types/AuthResponse';

const useSignIn = () => {
  const axios = useAxios();
  const setAccessToken = useSetRecoilState(accessTokenState);
  const setRefreshToken = useSetRecoilState(refreshTokenState);

  return async (serial: string, password: string) => {
    const {
      data: { access_token, refresh_token },
    } = await axios.post<{}, AxiosResponse<AuthResponse>>('/auth/token', {
      serial,
      password,
    });
    setAccessToken(access_token);
    setRefreshToken(refresh_token);
  };
};

export default useSignIn;
