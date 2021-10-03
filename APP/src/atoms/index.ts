import { atom } from 'recoil';

import AuthState from '@/types/AuthState';
import Beacon from '@/types/Beacon';
import PermissionState from '@/types/PermissionState';

export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    authenticated: false,
    loading: true,
  },
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
