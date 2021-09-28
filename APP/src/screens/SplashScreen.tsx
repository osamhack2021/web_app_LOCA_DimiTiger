import React, { useEffect } from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/core';
import { useRecoilValue } from 'recoil';

import Logo from '@images/loca_logo.svg';

import { RootNavigationProp } from './Navigators';

import { authState } from '@/atoms';
import { colorSplashBg } from '@/constants/colors';
import { getLocationFromUrl } from '@/utils/UrlUtil';

const SplashScreen = () => {
  const { loading } = useRecoilValue(authState);
  const navigation = useNavigation<RootNavigationProp<'SplashScreen'>>();
  const scale = useSharedValue(1);
  const animatedLogo = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }, { translateY: 40 }],
    };
  });

  useEffect(() => {
    async function hide() {
      await RNBootSplash.hide();
      const url = await Linking.getInitialURL();
      const location = getLocationFromUrl(url);
      scale.value = withTiming(17, undefined, () =>
        runOnJS(navigation.replace)(
          location ? 'LocationScreen' : 'MainScreen',
          location ? { location } : undefined,
        ),
      );
    }
    if (!loading) {
      hide();
    }
  }, [loading, navigation, scale]);
  return (
    <View style={styles.container}>
      <Animated.View style={animatedLogo}>
        <Logo />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colorSplashBg,
    flex: 1,
    justifyContent: 'center',
  },
});

export default SplashScreen;
