import React from 'react';
import { Linking, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from 'react-query';
import notifee, { EventType } from '@notifee/react-native';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { RecoilRoot, useRecoilValue } from 'recoil';

import { splashState } from '@/atoms';
import Navigators, { RootStackParamList } from '@/Navigators';
import SplashScreen from '@/screens/SplashScreen';
import BeaconProvider from '@/utils/BeaconProvider';
import queryClient from '@/utils/queryClient';

const prefix = 'https://api.loca.kimjisub.me/link';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [prefix],
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
    if (noti != null) {
      const { id, data } = noti.notification;
      if (id === 'enter' && data) {
        return `${prefix}/location-log/${data.location}`;
      }
    }

    return null;
  },
  subscribe(listener) {
    const onReceiveURL = ({ url }: { url: string }) => listener(url);

    const subscription = Linking.addEventListener('url', onReceiveURL);
    const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
      const { notification } = detail;
      if (type === EventType.PRESS && notification) {
        console.log('hi');
        if (notification.id === 'enter' && notification.data) {
          const url = `${prefix}/location-log/${notification.data.location}`;
          onReceiveURL({ url });
        }
      }
    });

    return () => {
      subscription.remove();
      unsubscribe();
    };
  },
};

const App = () => {
  const splashDone = useRecoilValue(splashState);

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      {!splashDone ? (
        <SplashScreen />
      ) : (
        <NavigationContainer linking={linking}>
          <Navigators />
        </NavigationContainer>
      )}
    </>
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
