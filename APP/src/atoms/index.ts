import { atom } from 'recoil';

import AuthState from '@/types/AuthState';

export const splashState = atom<boolean>({
  key: 'splashDone',
  default: false,
});

export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    authenticated: false,
    loading: true,
  },
});
