import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Card from '../components/Card';
import Header from '../components/Header';
import NoticeCard from '../components/NoticeCard';
import { colorEllipsis } from '../constants/colors';
import { styleDivider } from '../constants/styles';
import Notice from '../models/Notice';

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

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card title="나의위치">
          <View />
        </Card>
        <Card title="공지사항">
          <NoticeCard notice={dummyNotices[0]} />
          <NoticeCard notice={dummyNotices[1]} style={styles.secondNotice} />
          <View style={styleDivider} />
          <View style={styles.moreNoticeContainer}>
            <Icon name="dots-horizontal" size={25} color={colorEllipsis} />
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
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

export default MainScreen;
