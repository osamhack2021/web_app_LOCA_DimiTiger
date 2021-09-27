import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSetRecoilState } from 'recoil';

import { authState } from '@/atoms';
import Button from '@/components/Button';
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
      <Button onPress={() => logOut()}>로그아웃</Button>
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

export default UserScreen;
