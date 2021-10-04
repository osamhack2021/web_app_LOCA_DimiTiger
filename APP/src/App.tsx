import React from 'react';
import { QueryClientProvider } from 'react-query';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { RecoilRoot, useRecoilValue } from 'recoil';

import AuthProvider from './utils/AuthProvider';

import { splashState } from '@/atoms';
import Navigators, { RootStackParamList } from '@/Navigators';
import SplashScreen from '@/screens/SplashScreen';
import BeaconProvider from '@/utils/BeaconProvider';
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
  const splashDone = useRecoilValue(splashState);

  return (
    <NavigationContainer linking={linking}>
      {!splashDone ? <SplashScreen /> : <Navigators />}
    </NavigationContainer>
  );
};

export default () => (
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BeaconProvider>
          <App />
        </BeaconProvider>
      </AuthProvider>
    </QueryClientProvider>
  </RecoilRoot>
);
