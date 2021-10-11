import React, { useCallback, useState } from 'react';
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  FadeInUp,
  FadeOutDown,
  interpolateColor,
  useAnimatedProps,
  useSharedValue,
  withTiming,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Card from '@/components/Card';
import Text from '@/components/Text';
import {
  colorChipBorder,
  colorReport,
  colorReportEnd,
  colorReportStart,
  colorReportState,
  colorWhite,
} from '@/constants/colors';
import { styleDivider } from '@/constants/styles';
import useAnimatedHeight from '@/hooks/useAnimatedHeight';

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

const incidents = [
  '추락/충격',
  '화재',
  '정전',
  '총기/폭발',
  '차량/항공',
  '폭행',
  '익사',
  '자살',
];

const EmergencyReportCard = () => {
  const [reportDone, setReportDone] = useState(false);
  const { style, layoutHandler } = useAnimatedHeight(194);
  const color = useSharedValue(0);
  const gradientProps = useAnimatedProps(() => ({
    colors: [
      interpolateColor(color.value, [0, 1], [colorReportStart, colorReport]),
      interpolateColor(color.value, [0, 1], [colorReportEnd, colorReport]),
    ],
  }));

  const pressInHandler = useCallback(() => {
    if (reportDone) {
      return;
    }
    color.value = withTiming(1, { duration: 1000 });
  }, [color, reportDone]);

  const pressOutHandler = useCallback(() => {
    if (reportDone) {
      return;
    }
    color.value = withTiming(0);
  }, [color, reportDone]);

  const longPressHandler = useCallback(() => {
    setReportDone(true);
    color.value = withTiming(0);
  }, [color]);

  const pressHandler = useCallback(() => {
    if (!reportDone) {
      return;
    }
    setReportDone(false);
  }, [reportDone]);

  const ReportIcon = () => (
    <Animated.View entering={ZoomIn} exiting={ZoomOut}>
      <Icon
        name={reportDone ? 'checkbox-marked-circle' : 'alert'}
        size={50}
        color={colorWhite}
      />
    </Animated.View>
  );

  const StateText = () => (
    <Animated.Text
      entering={FadeInUp}
      exiting={FadeOutDown}
      style={styles.stateText}>
      {reportDone
        ? '신고가 완료되었습니다. 사고 내용을 알려주실 수 있으신가요?'
        : '버튼을 길게 누르면 자동으로 보고됩니다.'}
    </Animated.Text>
  );

  return (
    <Card style={styles.container}>
      <View style={styles.cardHeaderContainer}>
        <Text style={styles.titleText}>긴급 신고</Text>
      </View>
      <View style={styleDivider} />
      <Animated.View style={[style]}>
        <View style={styles.contentContainer} onLayout={layoutHandler}>
          <Pressable
            delayLongPress={1000}
            onLongPress={longPressHandler}
            onPress={pressHandler}
            onPressIn={pressInHandler}
            onPressOut={pressOutHandler}>
            <AnimatedGradient
              colors={[]}
              animatedProps={gradientProps}
              style={styles.reportButton}>
              {/* Intended nasty code for animation */}
              {reportDone && <ReportIcon />}
              {!reportDone && <ReportIcon />}
            </AnimatedGradient>
          </Pressable>
          {/* Intended nasty code for animation */}
          {reportDone && <StateText />}
          {!reportDone && <StateText />}
          {reportDone && (
            <View style={styles.chipContainer}>
              {incidents.map((incident, index) => (
                <Animated.View
                  entering={FadeInUp.delay(300 + index * 50)}
                  key={incident}>
                  <TouchableOpacity style={styles.chip} onPress={() => {}}>
                    <Text style={styles.chipText}>{incident}</Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          )}
        </View>
      </Animated.View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
  cardHeaderContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 21,
    fontWeight: 'bold',
    margin: 20,
  },
  contentContainer: {
    alignItems: 'center',
    padding: 20,
  },
  chipContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
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
  reportButton: {
    alignItems: 'center',
    borderRadius: 50,
    height: 100,
    justifyContent: 'center',
    width: 100,
  },
  stateText: {
    color: colorReportState,
    fontSize: 12,
    marginVertical: 20,
  },
});

export default EmergencyReportCard;
