import { useHistory } from 'react-router-dom';
import { atom, useResetRecoilState } from 'recoil';

import AuthState from '../types/AuthState';

import localStorageEffect from './effects/localStorageEffect';

export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    authenticated: false,
    loading: true,
  },
});

export const accessTokenState = atom({
  key: 'accessTokenState',
  default: '',
  effects_UNSTABLE: [localStorageEffect('accessTokenState')],
});

export const refreshTokenState = atom({
  key: 'refreshTokenState',
  default: '',
  effects_UNSTABLE: [localStorageEffect('refreshTokenState')],
});

export const useLogout = () => {
  const history = useHistory();
  const resetAccessToken = useResetRecoilState(accessTokenState);
  const resetRefreshToken = useResetRecoilState(refreshTokenState);

  return () => {
    if (!history) return;
    resetAccessToken();
    resetRefreshToken();
    history.push('/login');
  };
};
