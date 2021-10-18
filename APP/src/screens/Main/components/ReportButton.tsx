import React, { useCallback, useEffect } from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  colorReport,
  colorReportEnd,
  colorReportStart,
  colorWhite,
} from '@/constants/colors';
import useEmergencyReport from '@/hooks/useEmergencyReport';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const ReportButton = ({
  reportContext,
}: {
  reportContext: ReturnType<typeof useEmergencyReport>;
}) => {
  const { report, createReport } = reportContext;
  const color = useSharedValue(0);
  const rotation = useSharedValue(0);
  const zoom = useSharedValue(1);
  const buttonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg` }, { scale: zoom.value }],
    };
  });

  useEffect(() => {
    zoom.value = 0;
    zoom.value = withTiming(1);
  }, [report, zoom]);

  const pressInHandler = useCallback(() => {
    if (report) {
      return;
    }
    color.value = withTiming(1, { duration: 1000 });
    rotation.value = withSequence(
      withTiming(-5, { duration: 50 }),
      withRepeat(withTiming(10, { duration: 100 }), -1, true),
    );
  }, [color, report, rotation]);

  const pressOutHandler = useCallback(() => {
    if (report) {
      return;
    }
    color.value = withTiming(0);
    rotation.value = withTiming(0, { duration: 50 });
  }, [color, report, rotation]);

  const longPressHandler = useCallback(() => {
    createReport();
    color.value = withTiming(0);
    rotation.value = withTiming(0, { duration: 50 });
  }, [color, createReport, rotation]);

  const pressHandler = useCallback(() => {
    if (!report) {
      return;
    }
  }, [report]);

  return (
    <Pressable
      delayLongPress={1000}
      onLongPress={longPressHandler}
      onPress={pressHandler}
      onPressIn={pressInHandler}
      onPressOut={pressOutHandler}>
      <GradientCopmat color={color}>
        <Animated.View style={buttonStyle}>
          <Icon
            name={report ? 'checkbox-marked-circle' : 'alert'}
            size={50}
            color={colorWhite}
          />
        </Animated.View>
      </GradientCopmat>
    </Pressable>
  );
};

const AnimatedGradient = ({
  color,
  children,
}: {
  color: Animated.SharedValue<number>;
  children: React.ReactNode;
}) => {
  const gradientProps = useAnimatedProps(() => ({
    colors: [
      interpolateColor(color.value, [0, 1], [colorReportStart, colorReport]),
      interpolateColor(color.value, [0, 1], [colorReportEnd, colorReport]),
    ],
  }));
  return (
    <AnimatedLinearGradient
      colors={[]}
      animatedProps={gradientProps}
      style={styles.reportButton}>
      {children}
    </AnimatedLinearGradient>
  );
};

const StaticGradient = ({ children }: { children: React.ReactNode }) => (
  <LinearGradient
    colors={[colorReportStart, colorReportEnd]}
    style={styles.reportButton}>
    {children}
  </LinearGradient>
);

const GradientCopmat = Platform.select({
  android: StaticGradient,
  default: AnimatedGradient,
});

const styles = StyleSheet.create({
  reportButton: {
    alignItems: 'center',
    borderRadius: 50,
    height: 100,
    justifyContent: 'center',
    width: 100,
  },
});

export default ReportButton;
