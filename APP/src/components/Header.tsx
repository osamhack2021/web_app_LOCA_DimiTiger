import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

import { useSettings } from '@/api/settings';
import { useMe } from '@/api/users';
import Text from '@/components/Text';
import { colorWhite } from '@/constants/colors';

const Header = ({ navigation, route, options }: NativeStackHeaderProps) => {
  const { data: user, isLoading: isUserLoading } = useMe();
  const { data: settingsData, isLoading: isSettingLoading } = useSettings();
  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.innerContainer}>
          {isUserLoading || isSettingLoading ? (
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
              <FastImage
                style={styles.logoImage}
                source={{
                  uri: `https://api.loca.kimjisub.me/static/uploads/${settingsData?.data.information.icon}`,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
              <View style={styles.textContainer}>
                <Text>{settingsData?.data.information.name}</Text>
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
      {Platform.OS === 'ios' && (
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.15)', 'rgba(0, 0, 0, 0)']}
          style={{ backgroundColor: 'transparent', height: 20 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: Platform.select({
    ios: {
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 100,
    },
    default: {
      backgroundColor: colorWhite,
      elevation: 10,
    },
  }),
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
