import React from 'react';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colorWhite} from '../constants/colors';

const Header: React.FC = () => {
  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <Image style={styles.logoImage} source={require('@images/kctc.png')} />
        <View style={styles.textContainer}>
          <Text>육군과학화전투훈련단 근무지원대대</Text>
          <Text style={styles.nameText}>상병 김우재</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colorWhite,
  },
  container: {
    ...Platform.select({
      android: {
        elevation: 10,
      },
      default: {
        shadowColor: '#4d4d4d',
        shadowOffset: {width: 0, height: 8},
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
    }),
    backgroundColor: colorWhite,
    flexDirection: 'row',
    padding: 20,
  },
  logoImage: {
    width: 50,
    height: 50,
  },
  textContainer: {
    justifyContent: 'center',
    marginStart: 10,
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 21,
  },
});

export default Header;
