import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useRoute } from '@react-navigation/core';

import { RootRouteProp } from './Navigators';

import { useLocation } from '@/api/location';
import Button from '@/components/Button';
import LocationIcon from '@/components/LocationIcon';
import { colorYellowEnd, colorYellowStart } from '@/constants/colors';

const LocationScreen = () => {
  const { params } = useRoute<RootRouteProp<'LocationScreen'>>();
  const { location } = useLocation(params.location);
  return (
    <View style={styles.container}>
      {location && (
        <LinearGradient
          colors={[colorYellowStart, colorYellowEnd]}
          style={styles.container}>
          <View style={styles.container} />

          <View style={styles.centerContainer}>
            <LocationIcon
              width="200"
              height="200"
              icon={location.ui.icon}
              style={styles.locationIcon}
            />
            <Text style={styles.locationText}>{location.name}</Text>
            <Text style={styles.promptText}>위치를 변경하시겠습니까?</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={() => {}}>위치 변경</Button>
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
