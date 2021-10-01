import { atom } from 'recoil';

import AuthState from '@/types/AuthState';
import CurrentBeaconState from '@/types/CurrentBeaconState';
import PermissionState from '@/types/PermissionState';

export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    authenticated: false,
    loading: true,
  },
});

export const splashState = atom<boolean>({
  key: 'splashDone',
  default: false,
});

export const permissionState = atom<PermissionState>({
  key: 'permissionState',
  default: {
    checked: false,
    fullyGranted: false,
  },
});

export const currentBeaconState = atom<CurrentBeaconState>({
  key: 'currentBeaconState',
  default: {
    initialized: false,
    currentBeacon: null,
  },
});
