import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useRoute } from '@react-navigation/core';

import { RootRouteProp } from './Navigators';

import { useLocation } from '@/api/location';
import LocationIcon from '@/components/LocationIcon';
import { colorWhite } from '@/constants/colors';

const LocationScreen = () => {
  const { params } = useRoute<RootRouteProp<'LocationScreen'>>();
  const { location } = useLocation(params.location);
  return (
    <View>
      {!!location && (
        <LinearGradient colors={[colorWhite, colorWhite]}>
          <LocationIcon width="100" height="100" icon={location.ui.icon} />
          <Text style={styles.locationText}>{location.name}</Text>
        </LinearGradient>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  locationText: {
    fontSize: 21,
    fontWeight: 'bold',
    margin: 5,
  },
});

export default LocationScreen;
