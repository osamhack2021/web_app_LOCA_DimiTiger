import React, { useEffect } from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { useRecoilState, useRecoilValue } from 'recoil';

import { authState, splashState } from '@/atoms';
import AuthScreen from '@/screens/AuthScreen';
import LocationScreen from '@/screens/LocationScreen';
import MainScreen from '@/screens/MainScreen';
import NoticeScreen from '@/screens/NoticeScreen';
import SplashScreen from '@/screens/SplashScreen';
import UserScreen from '@/screens/UserScreen';
import { getTokens } from '@/utils/AuthUtil';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  const splashDone = useRecoilValue(splashState);
  const [auth, setAuth] = useRecoilState(authState);
  useEffect(() => {
    async function authenticate() {
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
    authenticate();
  }, [setAuth]);

  return (
    <Stack.Navigator
      initialRouteName="MainScreen"
      screenOptions={{ headerShown: false, animation: 'fade' }}>
      {!splashDone ? (
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
      ) : auth.authenticated ? (
        <>
          <Stack.Screen name="MainScreen" component={MainScreen} />
          <Stack.Screen name="NoticeScreen" component={NoticeScreen} />
          <Stack.Screen name="LocationScreen" component={LocationScreen} />
          <Stack.Screen
            name="UserScreen"
            component={UserScreen}
            options={{ presentation: 'transparentModal' }}
          />
        </>
      ) : (
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
      )}
    </Stack.Navigator>
  );
};

export type RootStackParamList = {
  SplashScreen: undefined;
  AuthScreen: undefined;
  MainScreen: undefined;
  NoticeScreen: undefined;
  LocationScreen: undefined;
  UserScreen: undefined;
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
