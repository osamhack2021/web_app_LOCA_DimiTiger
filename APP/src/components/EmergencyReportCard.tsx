import React, { useCallback, useState } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOutDown,
  FadeOutUp,
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
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
import { styleDivider, styleTextInput } from '@/constants/styles';
import useAnimatedHeight from '@/hooks/useAnimatedHeight';
import useEmergencyReport from '@/hooks/useEmergencyReport';

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
  const { report, hasAdditionalReport, createReport, addReport } =
    useEmergencyReport();
  const [additionalText, setAdditionalText] = useState('');
  const { style, layoutHandler } = useAnimatedHeight(194, 0, [
    report,
    hasAdditionalReport,
  ]);
  const color = useSharedValue(0);
  const rotation = useSharedValue(0);
  const gradientProps = useAnimatedProps(() => ({
    colors: [
      interpolateColor(color.value, [0, 1], [colorReportStart, colorReport]),
      interpolateColor(color.value, [0, 1], [colorReportEnd, colorReport]),
    ],
  }));
  const nullAniamtedProps = useAnimatedProps(() => ({}));
  const vibrationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg` }],
    };
  });

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

  const StateText = useCallback(
    () => (
      <Animated.Text
        entering={FadeInUp}
        exiting={FadeOutDown}
        style={styles.stateText}>
        {report
          ? hasAdditionalReport
            ? '추가 보고되었습니다. 계속해서 추가 보고할 수 있습니다.'
            : '신고가 완료되었습니다. 세부 내용을 알려주실 수 있으신가요?'
          : '버튼을 길게 누르면 자동으로 보고됩니다.'}
      </Animated.Text>
    ),
    [hasAdditionalReport, report],
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
              colors={
                Platform.OS === 'android'
                  ? [colorReportStart, colorReportEnd]
                  : []
              }
              animatedProps={
                Platform.OS === 'android' ? nullAniamtedProps : gradientProps
              }
              style={styles.reportButton}>
              {/* Intended nasty code for animation */}
              {report && (
                <Animated.View
                  entering={ZoomIn}
                  exiting={ZoomOut}
                  style={vibrationStyle}>
                  <Icon
                    name={'checkbox-marked-circle'}
                    size={50}
                    color={colorWhite}
                  />
                </Animated.View>
              )}
              {!report && (
                <Animated.View
                  entering={ZoomIn}
                  exiting={ZoomOut}
                  style={vibrationStyle}>
                  <Icon name={'alert'} size={50} color={colorWhite} />
                </Animated.View>
              )}
            </AnimatedGradient>
          </Pressable>
          {/* Intended nasty code for animation */}
          {report && (
            <>
              {hasAdditionalReport && <StateText />}
              {!hasAdditionalReport && <StateText />}
            </>
          )}
          {!report && <StateText />}
          {report && (
            <>
              {hasAdditionalReport && (
                <Animated.View
                  entering={FadeInDown}
                  style={styles.additionalInputContainer}>
                  <TextInput
                    value={additionalText}
                    onChangeText={text => setAdditionalText(text)}
                    placeholder="추가 보고사항 입력"
                    style={[styleTextInput, styles.additionalInput]}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      addReport(additionalText);
                      setAdditionalText('');
                    }}>
                    <Icon
                      name="arrow-up-circle"
                      color={colorReportEnd}
                      size={32}
                    />
                  </TouchableOpacity>
                </Animated.View>
              )}
              {!hasAdditionalReport && (
                <Animated.View exiting={FadeOutUp} style={styles.chipContainer}>
                  {incidents.map((incident, index) => (
                    <Animated.View
                      entering={FadeInUp.delay(300 + index * 50)}
                      key={incident}>
                      <TouchableOpacity
                        style={styles.chip}
                        onPress={() => {
                          addReport(incident);
                        }}>
                        <Text style={styles.chipText}>{incident}</Text>
                      </TouchableOpacity>
                    </Animated.View>
                  ))}
                </Animated.View>
              )}
            </>
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
  additionalInputContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  additionalInput: {
    borderWidth: 0,
    flex: 1,
    fontSize: 12,
    marginEnd: 10,
    marginStart: 0,
  },
});

export default EmergencyReportCard;
