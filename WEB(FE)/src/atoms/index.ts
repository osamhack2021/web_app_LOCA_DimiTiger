import { useHistory } from 'react-router-dom';
import { atom, useResetRecoilState } from 'recoil';

import localStorageEffect from './effects/localStorageEffect';

import Settings from '@/types/Settings';

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

export const settingsState = atom<Settings>({
  key: 'settingsState',
  default: {
    information: {
      name: '',
      icon: '1634306266203_loca_icon.svg',
      branch: '',
    },
    weather: {
      location: '',
    },
    militaryDiscipline: new Date().toDateString(),
    chartDesign: 'circlepacking',
  },
});

export const chartExpandedState = atom({
  key: 'chartExpandedState',
  default: false,
});

export const useLogout = () => {
  const history = useHistory();
  const resetAccessToken = useResetRecoilState(accessTokenState);
  const resetRefreshToken = useResetRecoilState(refreshTokenState);

  return () => {
    resetAccessToken();
    resetRefreshToken();

    if (!history) return;
    history.push('/login');
  };
};
