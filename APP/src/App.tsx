import React, { useEffect } from 'react';
import { QueryClientProvider } from 'react-query';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';

import { authState, splashState } from '@/atoms';
import Navigators, { RootStackParamList } from '@/Navigators';
import SplashScreen from '@/screens/SplashScreen';
import { getTokens } from '@/utils/AuthUtil';
import queryClient from '@/utils/queryClient';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['https://api.loca.kimjisub.me/link'],
  config: {
    initialRouteName: 'MainScreen',
    screens: {
      LocationScreen: 'location-log/:location',
    },
  },
};

const App = () => {
  const setAuth = useSetRecoilState(authState);
  const splashDone = useRecoilValue(splashState);

  useEffect(() => {
    async function init() {
      try {
        const result = await getTokens();
        setAuth({
          authenticated: result,
          loading: false,
        });
      } catch (err) {
        setAuth({
          authenticated: false,
          loading: false,
        });
      }
    }
    init();
  }, [setAuth]);

  return (
    <NavigationContainer linking={linking}>
      {!splashDone ? <SplashScreen /> : <Navigators />}
    </NavigationContainer>
  );
};

export default () => (
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </RecoilRoot>
);
