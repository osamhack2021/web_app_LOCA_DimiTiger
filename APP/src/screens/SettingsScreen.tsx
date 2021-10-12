import React from 'react';
import { StyleSheet, View } from 'react-native';

import Button from '@/components/Button';
import UserCard from '@/components/UserCard';
import { colorSplashBg } from '@/constants/colors';
import useSignOut from '@/hooks/useSignOut';

const UserScreen = () => {
  const signOut = useSignOut();
  return (
    <View style={styles.container}>
      <UserCard />
      <View style={styles.contentContainer}>
        <Button onPress={() => signOut()}>로그아웃</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorSplashBg,
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default UserScreen;
