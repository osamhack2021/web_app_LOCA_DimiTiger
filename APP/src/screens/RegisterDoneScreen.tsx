import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  FadeInUp,
  FadeOutDown,
  runOnJS,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useRoute } from '@react-navigation/core';
import LottieView from 'lottie-react-native';

import { RootRouteProp } from '@/Navigators';

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const RegisterDoneScreen = () => {
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
  return (
    <View style={styles.container}>
      <AnimatedLottieView
        source={require('@assets/jsons/confetti.json')}
        animatedProps={animatedProps}
        style={styles.confetti}
      />
      <View>
        {!confettiAnimDone ? (
          <Animated.View exiting={FadeOutDown.delay(500)}>
            <Text style={styles.doneText}>가입이 완료되었어요!</Text>
          </Animated.View>
        ) : (
          <Animated.View entering={FadeInUp.delay(1000)}>
            <Text
              style={styles.doneText}>{`${name} ${rank}님, 안녕하세요.`}</Text>
          </Animated.View>
        )}
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
