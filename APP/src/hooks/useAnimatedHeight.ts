import { useCallback, useEffect, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const useAnimatedHeight = (
  initialHeight: number,
  delayMs = 0,
  deps?: Array<unknown>,
) => {
  const height = useSharedValue(initialHeight);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const style = useAnimatedStyle(() => ({
    height: withDelay(delayMs, withTiming(height.value)),
  }));

  const layoutHandler = useCallback(
    ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
      if (shouldAnimate) {
        setShouldAnimate(false);
        height.value = layout.height;
      }
    },
    [height, shouldAnimate],
  );

  useEffect(() => {
    setShouldAnimate(true);
  }, [deps]);

  return {
    height,
    style,
    layoutHandler,
  };
};

export default useAnimatedHeight;
