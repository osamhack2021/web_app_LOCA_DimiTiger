import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSetRecoilState } from 'recoil';

import { authState } from '@/atoms';
import Button from '@/components/Button';
import Header from '@/components/Header';
import UserCard from '@/components/UserCard';
import { colorSplashBg } from '@/constants/colors';
import { signOut } from '@/utils/AuthUtil';

const UserScreen = () => {
  const setAuth = useSetRecoilState(authState);
  async function logOut() {
    await signOut();
    setAuth({
      authenticated: false,
      loading: false,
    });
  }
  return (
    <View style={styles.container}>
      <Header />
      <UserCard />
      <View style={styles.contentContainer}>
        <Button onPress={() => logOut()}>로그아웃</Button>
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
