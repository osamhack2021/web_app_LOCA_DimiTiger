import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import Text from '@/components/Text';
import { colorChipBorder } from '@/constants/colors';

const AnimatedChip = ({
  text,
  index,
  onPress,
}: {
  text: string;
  index: number;
  onPress: () => void;
}) => {
  const sharedValue = useSharedValue(0);
  const enteringY = useDerivedValue(() => {
    return (1 - sharedValue.value) * -25;
  });
  const enteringAnim = useAnimatedStyle(() => {
    return {
      opacity: sharedValue.value,
      transform: [{ translateY: enteringY.value }],
    };
  });
  useEffect(() => {
    sharedValue.value = withDelay(index * 50, withTiming(1));
  }, [index, sharedValue]);
  return (
    <Animated.View style={enteringAnim}>
      <TouchableOpacity style={styles.chip} onPress={onPress}>
        <Text style={styles.chipText}>{text}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  chip: {
    borderColor: colorChipBorder,
    borderRadius: 10,
    borderWidth: 1,
    margin: 5,
    padding: 10,
  },
  chipText: {
    fontWeight: 'bold',
  },
});

export default AnimatedChip;
