import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { useRecoilValue } from 'recoil';

import RegisterDoneScreen from './screens/RegisterDoneScreen';

import { accessTokenState } from '@/atoms';
import LocationScreen from '@/screens/LocationScreen';
import MainScreen from '@/screens/MainScreen';
import NoticeScreen from '@/screens/NoticeScreen';
import SignInScreen from '@/screens/SignInScreen';
import SignUpScreen from '@/screens/SignUpScreen';
import UserScreen from '@/screens/UserScreen';
import WelcomeScreen from '@/screens/WelcomeScreen';
import User from '@/types/User';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  const accessToken = useRecoilValue(accessTokenState);

  return (
    <Stack.Navigator
      initialRouteName={accessToken ? 'MainScreen' : 'Welcome'}
      screenOptions={{ headerShown: false, animation: 'fade' }}>
      {accessToken ? (
        <>
          <Stack.Screen name="MainScreen" component={MainScreen} />
          <Stack.Screen name="LocationScreen" component={LocationScreen} />
          <Stack.Screen name="NoticeScreen" component={NoticeScreen} />
          <Stack.Screen name="UserScreen" component={UserScreen} />
          <Stack.Screen name="RegisterDone" component={RegisterDoneScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export type RootStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
  RegisterDone: {
    user: User;
  };
  MainScreen: undefined;
  NoticeScreen: undefined;
  LocationScreen: {
    location: string;
  };
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
