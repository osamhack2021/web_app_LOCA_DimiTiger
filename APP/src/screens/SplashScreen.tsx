import React from 'react';
import { StyleSheet, View } from 'react-native';

import Logo from '@images/loca_logo.svg';

import { colorSplashBg } from '@/constants/colors';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Logo />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colorSplashBg,
    flex: 1,
    justifyContent: 'center',
  },
});

export default SplashScreen;
