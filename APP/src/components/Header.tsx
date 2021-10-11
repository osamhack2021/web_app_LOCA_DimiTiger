import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

import { useMe } from '@/api/users';
import Text from '@/components/Text';
import { colorWhite } from '@/constants/colors';

const Header = ({ navigation, route, options }: NativeStackHeaderProps) => {
  const { data: user, isLoading } = useMe();
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.innerContainer}>
          {isLoading ? (
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item flexDirection="row">
                <View style={styles.logoImage} />
                <View style={styles.textContainer}>
                  <View style={styles.unitPlaceHolder} />
                  <View style={styles.userPlaceHolder} />
                </View>
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          ) : (
            <>
              <Image
                style={styles.logoImage}
                source={require('@assets/images/kctc.png')}
              />
              <View style={styles.textContainer}>
                <Text>육군과학화전투훈련단 근무지원대대</Text>
                <Text style={styles.nameText}>
                  {options.title || `${user?.rank} ${user?.name}`}
                </Text>
              </View>
              <View style={{ flex: 1 }} />
              <TouchableOpacity
                onPress={() => {
                  if (route.name === 'Main') {
                    navigation.push('Settings');
                  } else {
                    navigation.goBack();
                  }
                }}>
                <Icon
                  name={route.name === 'Main' ? 'cog' : 'close'}
                  size={25}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
      </SafeAreaView>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.15)', 'rgba(0, 0, 0, 0)']}
        style={{ backgroundColor: 'transparent', height: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 100,
  },
  safeArea: {
    backgroundColor: colorWhite,
  },
  innerContainer: {
    alignItems: 'center',
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
  unitPlaceHolder: {
    height: 17,
    width: 200,
  },
  userPlaceHolder: {
    height: 21,
    marginTop: 5,
    width: 100,
  },
});

export default Header;
