import { useHistory } from 'react-router-dom';
import { atom, useResetRecoilState } from 'recoil';

import localStorageEffect from './effects/localStorageEffect';

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

export const settingState = atom({
  key: 'settingState',
  default: {
    defaults: {
      name: '',
      icon: '1634306266203_loca_icon.svg',
      belong: '',
    },
    weather: {
      temperature: 0,
      temperatureIndex: 0,
    },
    militaryDiscipline: 0,
    chartDesign: true,
  },
  effects_UNSTABLE: [localStorageEffect('settingState')],
});

export const useLogout = () => {
  const history = useHistory();
  const resetAccessToken = useResetRecoilState(accessTokenState);
  const resetRefreshToken = useResetRecoilState(refreshTokenState);

  return () => {
    if (!history) return;
    resetAccessToken();
    resetRefreshToken();
    history.push('/login');
  };
};
