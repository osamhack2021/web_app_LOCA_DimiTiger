import { atom } from 'recoil';

import AuthState from '@/types/AuthState';

export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    authenticated: false,
    loading: true,
  },
});
