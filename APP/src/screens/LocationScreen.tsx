import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/core';

import { useLogLocation } from '@/api/location-logs';
import { useLocation } from '@/api/locations';
import Button from '@/components/Button';
import LocationIcon from '@/components/LocationIcon';
import Text from '@/components/Text';
import * as colors from '@/constants/colors';
import { RootNavigationProp, RootRouteProp } from '@/Navigators';

const LocationScreen = () => {
  const { params } = useRoute<RootRouteProp<'Location'>>();
  const navigation = useNavigation<RootNavigationProp<'Location'>>();
  const { data: location } = useLocation(params.location);
  const logMutation = useLogLocation();
  const [loading, setLoading] = useState(false);
  return (
    <View style={styles.container}>
      {location && (
        <LinearGradient
          colors={[
            colors[`color${location.ui.color}Start`],
            colors[`color${location.ui.color}End`],
          ]}
          style={styles.container}>
          <SafeAreaView style={styles.container}>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => navigation.goBack()}>
              <Icon
                name="close"
                size={30}
                color={colors[`color${location.ui.color}Text`]}
              />
            </TouchableOpacity>
          </SafeAreaView>
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
              loading={loading}
              onPress={async () => {
                setLoading(true);
                await logMutation.mutateAsync(location._id);
                navigation.goBack();
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
  closeIcon: {
    alignSelf: 'flex-end',
    margin: 20,
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
