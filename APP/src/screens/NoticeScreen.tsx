import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { useNotices } from '@/api/notices';
import NoticeItem from '@/components/NoticeItem';

const NoticeScreen = () => {
  const { notices } = useNotices();
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.titleText}>공지사항</Text>
      </SafeAreaView>
      <FlatList
        data={notices}
        renderItem={({ item, index }) => (
          <NoticeItem notice={item} style={{ marginTop: index > 0 ? 0 : 20 }} />
        )}
        style={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 20,
  },
});

export default NoticeScreen;
