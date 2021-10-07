import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import Logo from '@assets/images/loca_logo.svg';

import { authState, splashState } from '@/atoms';
import { colorSplashBg } from '@/constants/colors';

const SplashScreen = () => {
  const { loading } = useRecoilValue(authState);
  const setSplashDone = useSetRecoilState(splashState);
  const scale = useSharedValue(1);
  const animatedLogo = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: 40 }],
  }));

  useEffect(() => {
    async function hide() {
      await RNBootSplash.hide();
      scale.value = withTiming(17, undefined, () =>
        runOnJS(setSplashDone)(true),
      );
    }
    if (!loading) {
      hide();
    }
  }, [loading, scale, setSplashDone]);
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
