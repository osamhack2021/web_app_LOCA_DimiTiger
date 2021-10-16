import AsyncStorage from '@react-native-async-storage/async-storage';
import { useResetRecoilState } from 'recoil';

import { accessTokenState, refreshTokenState } from '@/atoms';

const useSignOut = () => {
  const resetAccessToken = useResetRecoilState(accessTokenState);
  const resetRefreshToken = useResetRecoilState(refreshTokenState);

  return () => {
    resetAccessToken();
    resetRefreshToken();
    AsyncStorage.multiRemove(['beacons', 'currentLocation']);
  };
};

export default useSignOut;
