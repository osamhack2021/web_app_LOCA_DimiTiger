import { useHistory } from 'react-router-dom';
import { atom, useResetRecoilState } from 'recoil';

import localStorageEffect from './effects/localStorageEffect';

function getFormatDate(date: Date) {
  var year = date.getFullYear();
  var month: number | string = 1 + date.getMonth();
  month = month >= 10 ? month : '0' + month;
  var day: number | string = date.getDate();
  day = day >= 10 ? day : '0' + day;
  return year + '-' + month + '-' + day;
}

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

export const settingsState = atom({
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
    militaryDiscipline: getFormatDate(new Date()),
    chartDesign: true,
  },
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
