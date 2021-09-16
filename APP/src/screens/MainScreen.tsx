import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Card from '../components/Card';
import Header from '../components/Header';

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card title="공지사항">
          <View />
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
});

export default MainScreen;
