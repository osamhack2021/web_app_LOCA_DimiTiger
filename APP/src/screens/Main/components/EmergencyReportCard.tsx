import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ReportButton from './ReportButton';

import AnimatedChip from '@/components/AnimatedChip';
import AnimatedText from '@/components/AnimatedText';
import Card from '@/components/Card';
import Text from '@/components/Text';
import { colorReportEnd, colorReportState } from '@/constants/colors';
import { styleDivider, styleTextInput } from '@/constants/styles';
import useAnimatedHeight from '@/hooks/useAnimatedHeight';
import useEmergencyReport from '@/hooks/useEmergencyReport';

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
  const reportContext = useEmergencyReport();
  const { report, hasAdditionalReport, addReport } = reportContext;
  const [additionalText, setAdditionalText] = useState('');
  const { style, layoutHandler } = useAnimatedHeight(194, 0, [
    report,
    hasAdditionalReport,
  ]);

  return (
    <Card style={styles.container}>
      <View style={styles.cardHeaderContainer}>
        <Text style={styles.titleText}>긴급 신고</Text>
      </View>
      <View style={styleDivider} />
      <Animated.View style={[style]}>
        <View style={styles.contentContainer} onLayout={layoutHandler}>
          <ReportButton reportContext={reportContext} />
          <AnimatedText
            texts={[
              '버튼을 길게 누르면 자동으로 보고됩니다.',
              '신고가 완료되었습니다. 세부 내용을 알려주세요.',
              '추가 보고되었습니다. 계속해서 추가 보고할 수 있습니다.',
            ]}
            textIndex={report ? (hasAdditionalReport ? 2 : 1) : 0}
            style={styles.stateText}
          />
          {report && (
            <>
              {hasAdditionalReport && (
                <Animated.View style={styles.additionalInputContainer}>
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
                <Animated.View style={styles.chipContainer}>
                  {incidents.map((incident, index) => (
                    <AnimatedChip
                      key={incident}
                      text={incident}
                      index={index}
                      onPress={() => addReport(incident)}
                    />
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
