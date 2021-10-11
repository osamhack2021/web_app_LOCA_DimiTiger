import React from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/core';

import { useMe } from '@/api/users';
import Text from '@/components/Text';
import { colorWhite } from '@/constants/colors';
import { styleShadow } from '@/constants/styles';
import { RootNavigationProp } from '@/Navigators';

const Header = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const route = useRoute();
  const { data: user, isLoading } = useMe();
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.innerContainer}
        onPress={() => {
          if (route.name !== 'Settings') {
            navigation.push('Settings');
          }
        }}>
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
              <Text
                style={styles.nameText}>{`${user?.rank} ${user?.name}`}</Text>
            </View>
            {route.name !== 'Settings' && (
              <>
                <View style={{ flex: 1 }} />
                <Icon name="cog" size={25} />
              </>
            )}
          </>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...styleShadow,
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
