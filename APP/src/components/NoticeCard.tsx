import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/core';

import Card from './Card';
import NoticeItem from './NoticeItem';

import { colorEllipsis } from '@/constants/colors';
import { styleDivider } from '@/constants/styles';
import { RootNavigationProp } from '@/screens/Navigators';
import Notice from '@/types/Notice';

const dummyNotices: Notice[] = [
  {
    emergency: true,
    body: '체계병 1명 지금 즉시 지휘통제실로 와주시기 바랍니다.',
  },
  {
    emergency: false,
    body: '금일 TV연등은 02:00까지 진행합니다.',
  },
];

const NoticeCard = () => {
  const navigation = useNavigation<RootNavigationProp<'MainScreen'>>();
  return (
    <Card onPress={() => navigation.navigate('NoticeScreen')}>
      <Text style={styles.titleText}>공지사항</Text>
      <View style={styleDivider} />
      <NoticeItem notice={dummyNotices[0]} />
      <NoticeItem notice={dummyNotices[1]} style={styles.secondNotice} />
      <View style={styleDivider} />
      <View style={styles.moreNoticeContainer}>
        <Icon name="dots-horizontal" size={30} color={colorEllipsis} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
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
  secondNotice: {
    marginTop: -5,
  },
  moreNoticeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});

export default NoticeCard;
