import React, { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
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
import { getLocationFromUrl } from '@/utils/UrlUtil';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const splashDone = useRecoilValue(splashState);
  const navigation = useNavigation<RootNavigationProp<'MainScreen'>>();
  const [linkLocation, setLinkLocation] = useState<string | null>(null);
  useEffect(() => {
    async function init() {
      const url = await Linking.getInitialURL();
      const location = getLocationFromUrl(url);
      setLinkLocation(location || null);
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
    init();
  }, [setAuth]);

  useEffect(() => {
    const subscription = Linking.addEventListener('url', ({ url }) => {
      const location = getLocationFromUrl(url);
      setLinkLocation(location || null);
    });

    return () => {
      subscription.remove();
    };
  }, [navigation]);

  useEffect(() => {
    if (linkLocation && splashDone) {
      navigation.navigate('LocationScreen', { location: linkLocation });
      setLinkLocation(null);
    }
  }, [linkLocation, navigation, splashDone]);

  if (!splashDone) {
    return <SplashScreen />;
  }

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
