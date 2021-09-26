import React, { useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { useRecoilState } from 'recoil';

import { authState } from '@/atoms';
import AuthScreen from '@/screens/AuthScreen';
import LocationScreen from '@/screens/LocationScreen';
import MainScreen from '@/screens/MainScreen';
import NoticeScreen from '@/screens/NoticeScreen';
import SplashScreen from '@/screens/SplashScreen';
import { getTokens } from '@/utils/AuthUtil';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useRecoilState(authState);
  useEffect(() => {
    async function authenticate() {
      try {
        const result = await getTokens();
        setAuthenticated(result);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
    authenticate();
  }, [setAuthenticated]);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator
      initialRouteName="MainScreen"
      screenOptions={{ headerShown: false }}>
      {authenticated ? (
        <>
          <Stack.Screen name="MainScreen" component={MainScreen} />
          <Stack.Screen name="NoticeScreen" component={NoticeScreen} />
          <Stack.Screen name="LocationScreen" component={LocationScreen} />
        </>
      ) : (
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
      )}
    </Stack.Navigator>
  );
};

export type RootStackParamList = {
  AuthScreen: undefined;
  MainScreen: undefined;
  NoticeScreen: undefined;
  LocationScreen: undefined;
};

export type RootNavigationProp<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;

export type RootRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

export type RootScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export default RootStack;
