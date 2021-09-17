import React from 'react';
import { StyleSheet, Text, ViewStyle } from 'react-native';
import {
  colorBlack,
  colorEmergencyEnd,
  colorEmergencyStart,
  colorNoticeBackground,
  colorWhite,
} from '../constants/colors';
import Notice from '../models/Notice';
import Card from './Card';

type NoticeCardProps = {
  notice: Notice;
  style?: ViewStyle;
};

const NoticeCard: React.FC<NoticeCardProps> = ({ notice, style }) => {
  return (
    <Card
      style={style}
      contentContainerStyle={styles.contentContainer}
      gradient={{
        colors: notice.emergency
          ? [colorEmergencyStart, colorEmergencyEnd]
          : [colorNoticeBackground, colorNoticeBackground],
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0 },
      }}>
      <Text style={{ color: notice.emergency ? colorWhite : colorBlack }}>
        {notice.emergency && <Text style={styles.emergencyText}>[긴급] </Text>}
        {notice.body}
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    margin: 20,
  },
  emergencyText: {
    fontWeight: 'bold',
  },
});

export default NoticeCard;
