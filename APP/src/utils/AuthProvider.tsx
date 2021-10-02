import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { restoreTokens } from './AuthUtil';

import { authState, splashState } from '@/atoms';

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const setAuth = useSetRecoilState(authState);
  const splashDone = useRecoilValue(splashState);
  useEffect(() => {
    async function init() {
      const result = await restoreTokens();
      setAuth({
        authenticated: result,
        loading: false,
      });
    }
    if (!splashDone) {
      init();
    }
  }, [setAuth, splashDone]);
  return <>{children}</>;
};

export default AuthProvider;
