import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { StyleSheet, Text, View } from 'react-native';
=======
import { StyleSheet, View } from 'react-native';
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
import Animated, {
  FadeInUp,
  FadeOutDown,
  runOnJS,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
<<<<<<< HEAD
import { useRoute } from '@react-navigation/core';
import LottieView from 'lottie-react-native';

import { RootRouteProp } from '@/Navigators';
=======
import { useNavigation, useRoute } from '@react-navigation/core';
import LottieView from 'lottie-react-native';

import Button from '@/components/Button';
import { RootNavigationProp, RootRouteProp } from '@/Navigators';
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const RegisterDoneScreen = () => {
<<<<<<< HEAD
=======
  const navigation = useNavigation<RootNavigationProp<'RegisterDone'>>();
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
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
<<<<<<< HEAD
=======

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

>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
  return (
    <View style={styles.container}>
      <AnimatedLottieView
        source={require('@assets/jsons/confetti.json')}
        animatedProps={animatedProps}
        style={styles.confetti}
      />
<<<<<<< HEAD
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
=======
      <View style={styles.container} />
      <View style={styles.container}>
        {/* Intended nasty code for animation */}
        {confettiAnimDone && <AnimatedText />}
        {!confettiAnimDone && <AnimatedText />}
      </View>
      <View style={styles.container}>
        <Button onPress={() => navigation.popToTop()}>시작하기</Button>
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
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
