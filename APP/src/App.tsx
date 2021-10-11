import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from 'react-query';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { RecoilRoot, useRecoilValue } from 'recoil';

import { splashState } from '@/atoms';
import Navigators, { RootStackParamList } from '@/Navigators';
import SplashScreen from '@/screens/SplashScreen';
import BeaconProvider from '@/utils/BeaconProvider';
import queryClient from '@/utils/queryClient';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['https://api.loca.kimjisub.me/link'],
  config: {
    initialRouteName: 'Main',
    screens: {
      Location: 'location-log/:location',
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
      <SafeAreaProvider>
        <BeaconProvider>
          <App />
        </BeaconProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  </RecoilRoot>
);
