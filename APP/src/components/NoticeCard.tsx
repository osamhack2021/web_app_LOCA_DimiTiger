import React from 'react';
import { StyleSheet, Text } from 'react-native';
import {
  colorBlack,
  colorEmergencyEnd,
  colorEmergencyShadow,
  colorEmergencyStart,
  colorNoticeBackground,
  colorWhite,
} from '../constants/colors';
import Notice from '../models/Notice';
import Card, { CardProps } from './Card';

export type NoticeCardProps = CardProps & {
  notice: Notice;
};

const NoticeCard: React.FC<NoticeCardProps> = ({
  notice,
  style,
  contentContainerStyle,
}) => {
  return (
    <Card
      style={[
        notice.emergency && [
          styles.shadow,
          { shadowColor: colorEmergencyShadow },
        ],
        style,
      ]}
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
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
  shadow: {
    shadowOpacity: 0.4,
  },
  contentContainer: {
    padding: 20,
  },
  emergencyText: {
    fontWeight: 'bold',
  },
});

export default NoticeCard;
