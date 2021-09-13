import dynamicLinks, {
  FirebaseDynamicLinksTypes,
} from '@react-native-firebase/dynamic-links';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {RecoilRoot} from 'recoil';
import Navigators from './screens/Navigators';

const queryClient = new QueryClient();

const App = () => {
  const handleDynamicLink = (
    link: FirebaseDynamicLinksTypes.DynamicLink | null,
  ) => {
    if (link !== null) {
    }
  };

  useEffect(() => {
    dynamicLinks().getInitialLink().then(handleDynamicLink);
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    return () => unsubscribe();
  }, []);
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
