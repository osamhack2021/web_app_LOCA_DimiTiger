import React from 'react';
import { Linking, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from 'react-query';
import notifee from '@notifee/react-native';
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
  async getInitialURL() {
    const url = await Linking.getInitialURL();

    if (url != null) {
      return url;
    }

    const noti = await notifee.getInitialNotification();
    const location: string | undefined = noti?.notification.data?.location;
    if (location) {
      return `${this.prefixes[0]}/location-log/${location}`;
    }
  },
};

const App = () => {
  const splashDone = useRecoilValue(splashState);

  return (
    <NavigationContainer linking={linking}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
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
