import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Card, { CardProps } from '@/components/Card';
import Text from '@/components/Text';
import {
  colorBlack,
  colorEmergencyEnd,
  colorEmergencyShadow,
  colorEmergencyStart,
  colorNoticeBackground,
  colorWhite,
} from '@/constants/colors';
import Notice from '@/types/Notice';

export type NoticeItemProps = CardProps & {
  notice: Notice;
};

const NoticeItem = ({ notice, style }: NoticeItemProps) => {
  return (
    <Card
      style={[
        notice.emergency && [
          styles.shadow,
          { shadowColor: colorEmergencyShadow },
        ],
        style,
      ]}>
      <LinearGradient
        colors={
          notice.emergency
            ? [colorEmergencyStart, colorEmergencyEnd]
            : [colorNoticeBackground, colorNoticeBackground]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.container}>
        <Text style={{ color: notice.emergency ? colorWhite : colorBlack }}>
          {notice.emergency && (
            <Text style={styles.emergencyText}>[긴급] </Text>
          )}
          {notice.content}
        </Text>
      </LinearGradient>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 20,
  },
  shadow: {
    shadowOpacity: 0.4,
  },
  emergencyText: {
    color: colorWhite,
    fontWeight: 'bold',
  },
});

export default NoticeItem;
