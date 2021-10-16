import React, { useEffect } from 'react';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  FadeIn,
  interpolateColor,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/core';

import Logo from '@assets/images/loca_logo_white.svg';

import Text from '@/components/Text';
import { colorLocaEnd, colorLocaStart, colorWhite } from '@/constants/colors';
import { RootNavigationProp } from '@/Navigators';

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

const WelcomeScreen = () => {
  const navigation = useNavigation<RootNavigationProp<'Welcome'>>();
  const color = useSharedValue(0);
  const gradientProps = useAnimatedProps(() => ({
    colors: [
      interpolateColor(color.value, [0, 1], [colorLocaStart, colorLocaEnd]),
      interpolateColor(color.value, [0, 1], [colorLocaEnd, colorLocaStart]),
    ],
  }));

  useEffect(() => {
    if (Platform.OS !== 'android') {
      color.value = withRepeat(withTiming(1, { duration: 5000 }), -1, true);
    }
  }, [color]);

  return (
    <AnimatedGradient
      colors={[]}
      animatedProps={gradientProps}
      style={styles.container}>
      <Animated.View style={styles.centerContainer} entering={FadeIn}>
        <Logo style={styles.logo} />
      </Animated.View>
      <Animated.View style={styles.buttonContainer} entering={FadeIn}>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
          style={styles.registerButton}>
          <Text style={styles.registerButtonText}>사용자 등록</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignIn')}
          style={styles.signInButton}>
          <Text style={styles.signInButtonText}>로그인</Text>
        </TouchableOpacity>
      </Animated.View>
    </AnimatedGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    alignSelf: 'center',
    maxHeight: 150,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  registerButton: {
    alignItems: 'center',
    backgroundColor: colorWhite,
    borderRadius: 20,
    padding: 20,
    width: '100%',
  },
  registerButtonText: {
    color: colorLocaEnd,
  },
  signInButton: {
    alignSelf: 'center',
    padding: 20,
  },
  signInButtonText: {
    color: colorWhite,
  },
});

export default WelcomeScreen;
