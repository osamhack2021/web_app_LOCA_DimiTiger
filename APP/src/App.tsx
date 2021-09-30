import React, { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { focusManager, QueryClient, QueryClientProvider } from 'react-query';
import { createAsyncStoragePersistor } from 'react-query/createAsyncStoragePersistor-experimental';
import { persistQueryClient } from 'react-query/persistQueryClient-experimental';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';

import { authState, splashState } from './atoms';

import Navigators, { RootStackParamList } from '@/Navigators';
import SplashScreen from '@/screens/SplashScreen';
import { getTokens } from '@/utils/AuthUtil';

const queryClient = new QueryClient();

const asyncStoragePersistor = createAsyncStoragePersistor({
  storage: AsyncStorage,
});

persistQueryClient({
  queryClient,
  persistor: asyncStoragePersistor,
  maxAge: Infinity,
});

focusManager.setEventListener(handleFocus => {
  const subscription = AppState.addEventListener(
    'change',
    (state: AppStateStatus) => handleFocus(state === 'active'),
  );

  return () => {
    subscription.remove();
  };
});

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
