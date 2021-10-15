import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  FadeInLeft,
  FadeOutRight,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useLinkTo } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';

import { useActiveLocationLog } from '@/api/location-logs';
import { beaconState } from '@/atoms';
import Card from '@/components/Card';
import LocationIcon from '@/components/LocationIcon';
import Text from '@/components/Text';
import * as colors from '@/constants/colors';
import { styleCardHeaderContainer, styleDivider } from '@/constants/styles';
import useAnimatedHeight from '@/hooks/useAnimatedHeight';

const { colorWhite } = colors;

const NearLocationCard = () => {
  const linkTo = useLinkTo();
  const { data: locationLog } = useActiveLocationLog();
  const visibleBeacons = useRecoilValue(beaconState);
  const { style, height } = useAnimatedHeight(0, 300, [visibleBeacons]);

  useEffect(() => {
    height.value = withTiming((visibleBeacons.length + 1) * 40);
  }, [visibleBeacons.length, height]);

  return (
    <>
      {visibleBeacons.length > 0 && (
        <Card style={styles.container}>
          <View style={styleCardHeaderContainer}>
            <Text style={styles.titleText}>근처 위치</Text>
          </View>
          <View style={styleDivider} />
          <Animated.View style={[styles.locationContainer, style]}>
            {visibleBeacons.map((beacon, index) => (
              <Animated.View
                entering={FadeInLeft.delay(index * 50)}
                exiting={FadeOutRight}
                key={beacon.region.identifier}>
                <TouchableOpacity
                  onPress={() => linkTo(`/location-log/${beacon.location._id}`)}
                  style={styles.locationItem}>
                  <LocationIcon
                    icon={beacon.location.ui.icon}
                    width="30"
                    height="30"
                    style={styles.locationIcon}
                  />
                  <Text style={styles.locationText}>
                    {beacon.location.name}
                  </Text>
                  <Text
                    style={[
                      styles.distanceText,
                      {
                        color: colors[`color${beacon.location.ui.color}Text`],
                      },
                    ]}>
                    {`${Math.round(beacon.region?.distance || Infinity)}m`}
                  </Text>
                  <Icon
                    name="checkbox-marked-circle"
                    color={
                      locationLog?.location._id === beacon.location._id
                        ? colors[`color${beacon.location.ui.color}Text`]
                        : colorWhite
                    }
                  />
                </TouchableOpacity>
              </Animated.View>
            ))}
          </Animated.View>
        </Card>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
  titleText: {
    fontSize: 21,
    fontWeight: 'bold',
    margin: 20,
  },
  locationContainer: {
    padding: 20,
  },
  locationItem: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  locationIcon: {
    margin: 5,
  },
  locationText: {
    flex: 1,
    fontWeight: 'bold',
  },
  distanceText: {
    fontWeight: 'bold',
    marginEnd: 5,
  },
});

export default NearLocationCard;
