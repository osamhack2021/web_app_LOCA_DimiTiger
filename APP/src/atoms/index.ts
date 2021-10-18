import { atom } from 'recoil';

import asyncStorageEffect from './effects/asyncStorageEffect';

import AppSettings from '@/types/AppSettings';
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

export const settingsState = atom<AppSettings>({
  key: 'settingsState',
  default: {
    backgroundScanEnabled: true,
  },
  effects_UNSTABLE: [asyncStorageEffect('settingsState')],
});

export const registerState = atom({
  key: 'registerState',
  default: {
    isRegistering: false,
    name: '',
    rank: '',
  },
});
