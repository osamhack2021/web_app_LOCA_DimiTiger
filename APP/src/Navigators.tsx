import React from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { useRecoilValue } from 'recoil';

import RegisterDoneScreen from './screens/Auth/RegisterDoneScreen';

import { accessTokenState } from '@/atoms';
import Header from '@/components/Header';
import SignInScreen from '@/screens/Auth/SignInScreen';
import SignUpScreen from '@/screens/Auth/SignUpScreen';
import WelcomeScreen from '@/screens/Auth/WelcomeScreen';
import LocationScreen from '@/screens/LocationScreen';
import MainScreen from '@/screens/Main/MainScreen';
import NoticeScreen from '@/screens/NoticeScreen';
import SettingsScreen from '@/screens/Settings/SettingsScreen';
import User from '@/types/User';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  const accessToken = useRecoilValue(accessTokenState);
  const { top } = useSafeAreaInsets();

  return (
    <Stack.Navigator
      initialRouteName={accessToken ? 'Main' : 'Welcome'}
      screenOptions={{
        animation: 'fade',
        headerShown: false,
      }}>
      {accessToken ? (
        <>
          <Stack.Group
            screenOptions={{
              header: Header,
              headerShown: true,
              contentStyle: {
                paddingTop: Platform.OS === 'ios' ? 90 + top : 0,
              },
            }}>
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen
              name="Notice"
              component={NoticeScreen}
              options={{ title: '공지사항' }}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{ title: '앱 설정' }}
            />
          </Stack.Group>
          <Stack.Screen name="Location" component={LocationScreen} />
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
  Main: undefined;
  Notice: undefined;
  Location: {
    location: string;
  };
  Settings: undefined;
};

export type RootNavigationProp<T extends keyof RootStackParamList = 'Main'> =
  StackNavigationProp<RootStackParamList, T>;

export type RootRouteProp<T extends keyof RootStackParamList = 'Main'> =
  RouteProp<RootStackParamList, T>;

export type RootScreenProps<T extends keyof RootStackParamList = 'Main'> =
  StackScreenProps<RootStackParamList, T>;

export default RootStack;
