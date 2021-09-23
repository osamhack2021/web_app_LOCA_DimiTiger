import { atom } from 'recoil';

export const authState = atom<boolean>({
  key: 'unit',
  default: false,
});
