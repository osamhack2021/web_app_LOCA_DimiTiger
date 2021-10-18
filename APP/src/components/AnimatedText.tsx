import React, { useEffect, useState } from 'react';
import { TextProps, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface AnimatedTextProps extends TextProps {
  texts: string[];
  textIndex: number;
}

const AnimatedText = ({
  texts,
  textIndex,
  style,
  ...props
}: AnimatedTextProps) => {
  const sharedValue = useSharedValue(0);
  const exitingOpacity = useDerivedValue(() => {
    return 1 - sharedValue.value;
  });
  const enteringY = useDerivedValue(() => {
    return (1 - sharedValue.value) * -25;
  });
  const exitingY = useDerivedValue(() => {
    return sharedValue.value * 25;
  });
  const enteringAnim = useAnimatedStyle(() => {
    return {
      opacity: sharedValue.value,
      transform: [{ translateY: enteringY.value }],
    };
  });
  const exitingAnim = useAnimatedStyle(() => {
    return {
      opacity: exitingOpacity.value,
      transform: [{ translateY: exitingY.value }],
    };
  });
  const [enteringText, setEnteringText] = useState('');
  const [exitingText, setExitingText] = useState('');
  useEffect(() => {
    if (texts.length < 1 || textIndex >= texts.length) {
      return;
    }
    setExitingText(enteringText);
    sharedValue.value = 0;
    setEnteringText(texts[textIndex]);
  }, [enteringText, sharedValue, textIndex, texts]);

  useEffect(() => {
    sharedValue.value = withTiming(1);
  }, [enteringText, sharedValue]);

  return (
    <View style={{ width: '100%', alignItems: 'center' }}>
      <Animated.Text {...props} numberOfLines={1} style={[style, enteringAnim]}>
        {enteringText}
      </Animated.Text>
      <Animated.Text
        {...props}
        numberOfLines={1}
        style={[style, exitingAnim, { position: 'absolute' }]}>
        {exitingText}
      </Animated.Text>
    </View>
  );
};

export default AnimatedText;
