import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { useAuth } from '../api/auth';
import MainScreen from './MainScreen';
import NoticeScreen from './NoticeScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  const { authorized } = useAuth({});
  return (
    <Stack.Navigator
      initialRouteName="MainScreen"
      screenOptions={{ headerShown: false }}>
      {authorized ? (
        <>
          <Stack.Screen name="MainScreen" component={MainScreen} />
          <Stack.Screen name="NoticeScreen" component={NoticeScreen} />
        </>
      ) : (
        <Stack.Screen name="AuthScreen" component={MainScreen} />
      )}
    </Stack.Navigator>
  );
};

export type RootStackParamList = {
  AuthScreen: undefined;
  MainScreen: undefined;
  NoticeScreen: undefined;
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
