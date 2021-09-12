import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {RecoilRoot} from 'recoil';
import Navigators from './screens/Navigators';

const queryClient = new QueryClient();

const App = () => {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Navigators />
      </QueryClientProvider>
    </NavigationContainer>
  );
};

export default (
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
