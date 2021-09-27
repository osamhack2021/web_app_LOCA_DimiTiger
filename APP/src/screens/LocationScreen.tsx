import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SvgUri } from 'react-native-svg';

import { colorWhite } from '@/constants/colors';

const LocationScreen = () => {
  return (
    <View>
      <LinearGradient colors={[colorWhite, colorWhite]}>
        <SvgUri
          width="100"
          height="100"
          uri="https://api.loca.kimjisub.me/static/icons/ic_livingspace.svg"
        />
        <Text style={styles.locationText}>본부7생활관</Text>
      </LinearGradient>
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
