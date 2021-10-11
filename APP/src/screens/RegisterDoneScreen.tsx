import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  FadeInUp,
  FadeOutDown,
  runOnJS,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useNavigation, useRoute } from '@react-navigation/core';
import LottieView from 'lottie-react-native';

import Button from '@/components/Button';
import { RootNavigationProp, RootRouteProp } from '@/Navigators';

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const RegisterDoneScreen = () => {
  const navigation = useNavigation<RootNavigationProp<'RegisterDone'>>();
  const progress = useSharedValue(0);
  const animatedProps = useAnimatedProps(() => ({
    progress: progress.value,
  }));
  const [confettiAnimDone, setConfettiAnimDone] = useState(false);
  const {
    params: {
      user: { rank, name },
    },
  } = useRoute<RootRouteProp<'RegisterDone'>>();
  useEffect(() => {
    progress.value = withTiming(
      1,
      {
        duration: 4000,
      },
      () => {
        runOnJS(setConfettiAnimDone)(true);
      },
    );
  }, [progress]);

  const AnimatedText = () => (
    <Animated.Text
      entering={FadeInUp}
      exiting={FadeOutDown}
      style={styles.doneText}>
      {confettiAnimDone
        ? `${name} ${rank}님, 안녕하세요.`
        : '가입이 완료되었어요!'}
    </Animated.Text>
  );

  return (
    <View style={styles.container}>
      <AnimatedLottieView
        source={require('@assets/jsons/confetti.json')}
        animatedProps={animatedProps}
        style={styles.confetti}
      />
      <View style={styles.container} />
      <View style={styles.container}>
        {/* Intended nasty code for animation */}
        {confettiAnimDone && <AnimatedText />}
        {!confettiAnimDone && <AnimatedText />}
      </View>
      <View style={styles.container}>
        <Button onPress={() => navigation.popToTop()}>시작하기</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  confetti: {
    position: 'absolute',
    zIndex: -1,
  },
  doneText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default RegisterDoneScreen;
