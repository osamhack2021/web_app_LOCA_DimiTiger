import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';

import Logo from '@assets/images/loca_logo.svg';

import { accessTokenState, splashState } from '@/atoms';
import { colorSplashBg } from '@/constants/colors';

const SplashScreen = () => {
  const [time, setTime] = useState(0);
  const { state } = useRecoilValueLoadable(accessTokenState);
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
    if (state !== 'loading' && time > 1) {
      hide();
    }
  }, [scale, setSplashDone, state, time]);

  useEffect(() => {
    // Wait for 2 seconds
    if (time > 1) {
      return;
    }
    const timeout = setTimeout(() => setTime(time + 1), 1000);
    return () => clearTimeout(timeout);
  }, [time]);

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
