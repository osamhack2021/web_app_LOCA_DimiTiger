import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/core';

import { RootNavigationProp, RootRouteProp } from './Navigators';

import { useLocation } from '@/api/location';
import { useLogLocation } from '@/api/location-logs';
import Button from '@/components/Button';
import LocationIcon from '@/components/LocationIcon';
import * as colors from '@/constants/colors';

const LocationScreen = () => {
  const { params } = useRoute<RootRouteProp<'LocationScreen'>>();
  const navigation = useNavigation<RootNavigationProp<'LocationScreen'>>();
  const { location } = useLocation(params.location);
  const logMutation = useLogLocation();
  return (
    <View style={styles.container}>
      {location && (
        <LinearGradient
          colors={[
            colors[`color${location.ui.color}Start`],
            colors[`color${location.ui.color}End`],
          ]}
          style={styles.container}>
          <View style={styles.container} />

          <View style={styles.centerContainer}>
            <LocationIcon
              width="200"
              height="200"
              icon={location.ui.icon}
              style={styles.locationIcon}
            />
            <Text
              style={[
                styles.locationText,
                { color: colors[`color${location.ui.color}Text`] },
              ]}>
              {location.name}
            </Text>
            <Text style={styles.promptText}>위치를 변경하시겠습니까?</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPress={async () => {
                await logMutation.mutateAsync(location._id);
                navigation.navigate('MainScreen');
              }}>
              위치 변경
            </Button>
          </View>
        </LinearGradient>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  maskContainer: {
    height: 41,
    width: '100%',
  },
  locationIcon: {
    alignSelf: 'center',
  },
  locationText: {
    fontSize: 41,
    fontWeight: 'bold',
    margin: 10,
  },
  promptText: {
    fontSize: 21,
  },
});

export default LocationScreen;
