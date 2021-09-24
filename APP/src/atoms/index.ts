import { atom } from 'recoil';

import AuthState from '@/types/AuthState';

export const authState = atom<AuthState>({
  key: 'auth',
  default: {
    authenticated: false,
  },
});
