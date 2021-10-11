import React from 'react';
import { StyleSheet, View } from 'react-native';
<<<<<<< HEAD
import { useSetRecoilState } from 'recoil';

import { authState } from '@/atoms';
=======

>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
import Button from '@/components/Button';
import Header from '@/components/Header';
import UserCard from '@/components/UserCard';
import { colorSplashBg } from '@/constants/colors';
<<<<<<< HEAD
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
=======
import useSignOut from '@/hooks/useSignOut';

const UserScreen = () => {
  const signOut = useSignOut();
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
  return (
    <View style={styles.container}>
      <Header />
      <UserCard />
      <View style={styles.contentContainer}>
<<<<<<< HEAD
        <Button onPress={() => logOut()}>로그아웃</Button>
=======
        <Button onPress={() => signOut()}>로그아웃</Button>
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
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
