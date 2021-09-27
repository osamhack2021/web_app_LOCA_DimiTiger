import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import NoticeItem from '@/components/NoticeItem';
import Notice from '@/types/Notice';

type NoticeListProps = {
  data: Notice[];
};

const NoticeList = ({ data }: NoticeListProps) => {
  return (
    <View>
      <Text style={styles.titleText}>공지사항</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => <NoticeItem notice={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 21,
    fontWeight: 'bold',
  },
});

export default NoticeList;
