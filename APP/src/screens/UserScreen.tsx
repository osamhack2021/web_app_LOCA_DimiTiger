import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/core';
import { useSetRecoilState } from 'recoil';

import { RootNavigationProp } from './Navigators';

import { authState } from '@/atoms';
import Button from '@/components/Button';
import { colorBlack, colorSplashBg } from '@/constants/colors';
import { signOut } from '@/utils/AuthUtil';

const UserScreen = () => {
  const setAuth = useSetRecoilState(authState);
  const navigation = useNavigation<RootNavigationProp<'UserScreen'>>();
  async function logOut() {
    await signOut();
    setAuth({
      authenticated: false,
      loading: false,
    });
  }
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TouchableOpacity
          style={styles.closeIcon}
          onPress={() => navigation.goBack()}>
          <Icon name="close" size={30} color={colorBlack} />
        </TouchableOpacity>
      </SafeAreaView>
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
  closeIcon: {
    alignSelf: 'flex-end',
    margin: 20,
  },
  contentContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default UserScreen;
