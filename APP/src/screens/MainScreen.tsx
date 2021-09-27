import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/core';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Header from '@/components/Header';
import NoticeCard from '@/components/NoticeCard';
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

const MainScreen = () => {
  const navigation = useNavigation<RootNavigationProp<'MainScreen'>>();
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card>
          <View style={styles.cardHeaderContainer}>
            <Text style={styles.titleText}>나의 위치</Text>
            <Button style={styles.locationButton}>위치 변경</Button>
          </View>
          <View style={styleDivider} />
          <View style={styles.locationContainer}>
            <SvgUri
              width="100"
              height="100"
              uri="https://api.loca.kimjisub.me/static/icons/ic_livingspace.svg"
            />
            <Text style={styles.locationText}>본부7생활관</Text>
            <Text>최근위치변경: 1시간전</Text>
          </View>
        </Card>
        <Card onPress={() => navigation.navigate('NoticeScreen')}>
          <Text style={styles.titleText}>공지사항</Text>
          <View style={styleDivider} />
          <NoticeCard notice={dummyNotices[0]} />
          <NoticeCard notice={dummyNotices[1]} style={styles.secondNotice} />
          <View style={styleDivider} />
          <View style={styles.moreNoticeContainer}>
            <Icon name="dots-horizontal" size={30} color={colorEllipsis} />
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
  locationButton: {
    marginEnd: 20,
  },
  locationContainer: {
    alignItems: 'center',
    padding: 20,
  },
  locationText: {
    fontSize: 21,
    fontWeight: 'bold',
    margin: 5,
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
