import React from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { focusManager, QueryClient, QueryClientProvider } from 'react-query';
import { createAsyncStoragePersistor } from 'react-query/createAsyncStoragePersistor-experimental';
import { persistQueryClient } from 'react-query/persistQueryClient-experimental';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { RecoilRoot } from 'recoil';

import Navigators from '@/screens/Navigators';

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
    // @ts-ignore
    subscription.remove();
  };
});

const App = () => {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Navigators />
      </QueryClientProvider>
    </NavigationContainer>
  );
};

export default () => (
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
