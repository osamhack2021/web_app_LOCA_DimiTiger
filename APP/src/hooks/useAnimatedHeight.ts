import { useCallback, useRef } from 'react';
import { LayoutChangeEvent } from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const useAnimatedHeight = (initialHeight: number) => {
  const height = useSharedValue(initialHeight);
  const prevHeight = useRef(initialHeight);
  const style = useAnimatedStyle(() => ({
    height: height.value,
  }));

  const layoutHandler = useCallback(
    ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
      if (Math.floor(layout.height) !== prevHeight.current) {
        prevHeight.current = layout.height;
        height.value = withTiming(layout.height);
      }
    },
    [height],
  );

  return {
    height,
    style,
    layoutHandler,
  };
};

export default useAnimatedHeight;
