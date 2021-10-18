import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import EmergencyReportCard from './components/EmergencyReportCard';
import LocationCard from './components/LocationCard';
import NearLocationCard from './components/NearLocationCard';
import NoticeCard from './components/NoticeCard';

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <LocationCard />
        <EmergencyReportCard />
        <NearLocationCard />
        <NoticeCard />
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
