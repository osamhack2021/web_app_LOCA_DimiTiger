import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { useRecoilValue } from 'recoil';

import { authState } from '@/atoms';
import AuthScreen from '@/screens/AuthScreen';
import LocationScreen from '@/screens/LocationScreen';
import MainScreen from '@/screens/MainScreen';
import NoticeScreen from '@/screens/NoticeScreen';
import UserScreen from '@/screens/UserScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  const auth = useRecoilValue(authState);

  return (
    <Stack.Navigator
      initialRouteName="MainScreen"
      screenOptions={{ headerShown: false, animation: 'fade' }}>
      {auth.authenticated ? (
        <>
          <Stack.Screen name="MainScreen" component={MainScreen} />
          <Stack.Screen name="LocationScreen" component={LocationScreen} />
          <Stack.Screen name="NoticeScreen" component={NoticeScreen} />
          <Stack.Screen
            name="UserScreen"
            component={UserScreen}
            options={{ presentation: 'transparentModal' }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="AuthScreen" component={AuthScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export type RootStackParamList = {
  AuthScreen: undefined;
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
