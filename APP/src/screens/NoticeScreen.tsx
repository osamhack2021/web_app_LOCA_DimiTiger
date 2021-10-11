import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import { useNotices } from '@/api/notices';
import NoticeItem from '@/components/NoticeItem';
import Text from '@/components/Text';
import { colorBlack } from '@/constants/colors';
import { RootNavigationProp } from '@/Navigators';

const NoticeScreen = () => {
  const navigation = useNavigation<RootNavigationProp<'NoticeScreen'>>();
  const { data: notices } = useNotices();
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.headerContainer}>
        <Text style={styles.titleText}>공지사항</Text>
        <TouchableOpacity
          style={styles.closeIcon}
          onPress={() => navigation.goBack()}>
          <Icon name="close" size={30} color={colorBlack} />
        </TouchableOpacity>
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 20,
  },
  closeIcon: {
    margin: 20,
  },
});

export default NoticeScreen;
