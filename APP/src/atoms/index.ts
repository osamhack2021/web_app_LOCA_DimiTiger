import { atom } from 'recoil';

<<<<<<< HEAD
import AuthState from '@/types/AuthState';
import Beacon from '@/types/Beacon';
import PermissionState from '@/types/PermissionState';

export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    authenticated: false,
    loading: true,
  },
=======
import asyncStorageEffect from './effects/asyncStorageEffect';

import Beacon from '@/types/Beacon';
import PermissionState from '@/types/PermissionState';

export const accessTokenState = atom({
  key: 'accessTokenState',
  default: '',
  effects_UNSTABLE: [asyncStorageEffect('accessTokenState')],
});

export const refreshTokenState = atom({
  key: 'refreshTokenState',
  default: '',
  effects_UNSTABLE: [asyncStorageEffect('refreshTokenState')],
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
});

export const permissionState = atom<PermissionState>({
  key: 'permissionState',
  default: {
    checked: false,
    fullyGranted: false,
  },
});

export const splashState = atom<boolean>({
  key: 'splashDone',
  default: false,
});

export const beaconState = atom<Beacon[]>({
  key: 'visibleBeacons',
  default: [],
});
