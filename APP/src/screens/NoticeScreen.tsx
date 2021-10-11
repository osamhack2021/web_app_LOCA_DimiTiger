import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { useNotices } from '@/api/notices';
import NoticeItem from '@/components/NoticeItem';
import { colorWhite } from '@/constants/colors';

const NoticeScreen = () => {
  const { data: notices } = useNotices();
  return (
    <View style={styles.container}>
      <FlatList
        data={notices}
        renderItem={({ item, index }) => (
          <NoticeItem
            notice={item}
            style={{
              marginTop: index > 0 ? 0 : 20,
            }}
          />
        )}
        style={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorWhite,
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    flex: 1,
    fontSize: 21,
    fontWeight: 'bold',
  },
  backButton: {
    margin: 20,
  },
});

export default NoticeScreen;
