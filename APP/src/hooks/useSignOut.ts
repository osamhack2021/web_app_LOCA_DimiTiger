import { useResetRecoilState } from 'recoil';

import { accessTokenState, refreshTokenState } from '@/atoms';

const useSignOut = () => {
  const resetAccessToken = useResetRecoilState(accessTokenState);
  const resetRefreshToken = useResetRecoilState(refreshTokenState);

  return () => {
    resetAccessToken();
    resetRefreshToken();
  };
};

export default useSignOut;
