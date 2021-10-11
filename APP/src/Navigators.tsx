import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { useRecoilValue } from 'recoil';

import RegisterDoneScreen from './screens/RegisterDoneScreen';

<<<<<<< HEAD
import { authState } from '@/atoms';
=======
import { accessTokenState } from '@/atoms';
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
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
<<<<<<< HEAD
  const { authenticated } = useRecoilValue(authState);

  return (
    <Stack.Navigator
      initialRouteName={authenticated ? 'MainScreen' : 'Welcome'}
      screenOptions={{ headerShown: false, animation: 'fade' }}>
      {authenticated ? (
=======
  const accessToken = useRecoilValue(accessTokenState);

  return (
    <Stack.Navigator
      initialRouteName={accessToken ? 'MainScreen' : 'Welcome'}
      screenOptions={{ headerShown: false, animation: 'fade' }}>
      {accessToken ? (
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
        <>
          <Stack.Screen name="MainScreen" component={MainScreen} />
          <Stack.Screen name="LocationScreen" component={LocationScreen} />
          <Stack.Screen name="NoticeScreen" component={NoticeScreen} />
          <Stack.Screen name="UserScreen" component={UserScreen} />
<<<<<<< HEAD
=======
          <Stack.Screen name="RegisterDone" component={RegisterDoneScreen} />
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
        </>
      ) : (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
<<<<<<< HEAD
          <Stack.Screen name="RegisterDone" component={RegisterDoneScreen} />
=======
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
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
