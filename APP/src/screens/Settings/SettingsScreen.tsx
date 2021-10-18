import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import PreferenceCard from './components/PreferenceCard';
import UserCard from './components/UserCard';

import { colorSplashBg } from '@/constants/colors';

const UserScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <PreferenceCard />
      <UserCard />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorSplashBg,
    flex: 1,
  },
});

export default UserScreen;
