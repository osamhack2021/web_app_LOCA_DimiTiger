import { atom } from 'recoil';

export const authState = atom<boolean>({
  key: 'authenticated',
  default: false,
});
