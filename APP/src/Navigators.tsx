import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { useRecoilValue } from 'recoil';

import RegisterDoneScreen from './screens/RegisterDoneScreen';

import { accessTokenState } from '@/atoms';
import Header from '@/components/Header';
import LocationScreen from '@/screens/LocationScreen';
import MainScreen from '@/screens/MainScreen';
import NoticeScreen from '@/screens/NoticeScreen';
import SettingsScreen from '@/screens/SettingsScreen';
import SignInScreen from '@/screens/SignInScreen';
import SignUpScreen from '@/screens/SignUpScreen';
import WelcomeScreen from '@/screens/WelcomeScreen';
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
        header: Header,
        headerTransparent: true,
        contentStyle: {
          paddingTop: 90 + top,
        },
      }}>
      {accessToken ? (
        <>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Location" component={LocationScreen} />
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
