import React from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import NoticeCard from '../components/NoticeCard';
import Notice from '../models/Notice';

type NoticeListProps = {
  data: Notice[];
};

const NoticeList: React.FC<NoticeListProps> = ({ data }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <NoticeCard notice={item} />}
    />
  );
};

export default NoticeList;
