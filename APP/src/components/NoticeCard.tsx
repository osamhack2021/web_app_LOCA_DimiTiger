import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInLeft, FadeOutLeft } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/core';

import { useNotices } from '@/api/notices';
import Card from '@/components/Card';
import NoticeItem from '@/components/NoticeItem';
import Text from '@/components/Text';
import { colorEllipsis } from '@/constants/colors';
import { styleDivider } from '@/constants/styles';
import { RootNavigationProp } from '@/Navigators';

const NoticeCard = () => {
  const navigation = useNavigation<RootNavigationProp<'MainScreen'>>();
<<<<<<< HEAD
  const { notices } = useNotices();
=======
  const { data: notices } = useNotices();
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
  return (
    <Card style={styles.container}>
      <Text style={styles.titleText}>공지사항</Text>
      <View style={styleDivider} />
      {notices?.slice(0, 2).map((notice, index) => (
        <Animated.View
          entering={FadeInLeft}
          exiting={FadeOutLeft}
          key={`notice-thumb-${notice._id}`}>
          <NoticeItem
            notice={notice}
            style={{ marginTop: index > 0 ? 0 : 20 }}
          />
        </Animated.View>
      ))}
      <View style={styleDivider} />
      <TouchableOpacity
        style={styles.moreNoticeContainer}
        onPress={() => navigation.navigate('NoticeScreen')}>
        <Icon name="dots-horizontal" size={30} color={colorEllipsis} />
      </TouchableOpacity>
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
  moreNoticeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});

export default NoticeCard;
