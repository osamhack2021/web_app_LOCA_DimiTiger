import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';

import { colorWhite } from '@/constants/colors';
import { styleShadow } from '@/constants/styles';
import { RootNavigationProp } from '@/screens/Navigators';

const Header: React.FC = () => {
  const navigation = useNavigation<RootNavigationProp<'MainScreen'>>();
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Pressable
        style={styles.innerContainer}
        onPress={() => navigation.push('UserScreen')}>
        <Image style={styles.logoImage} source={require('@images/kctc.png')} />
        <View style={styles.textContainer}>
          <Text>육군과학화전투훈련단 근무지원대대</Text>
          <Text style={styles.nameText}>상병 김우재</Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...styleShadow,
    backgroundColor: colorWhite,
  },
  innerContainer: {
    flexDirection: 'row',
    padding: 20,
  },
  logoImage: {
    height: 50,
    width: 50,
  },
  textContainer: {
    justifyContent: 'center',
    marginStart: 10,
  },
  nameText: {
    fontSize: 21,
    fontWeight: 'bold',
  },
});

export default Header;
