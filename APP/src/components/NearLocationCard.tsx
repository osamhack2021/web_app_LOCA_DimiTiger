import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInUp,
  FadeOutRight,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useLinkTo } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';

import { useActiveLocationLog } from '@/api/location-logs';
import { beaconState } from '@/atoms';
import Button from '@/components/Button';
import Card from '@/components/Card';
import LocationIcon from '@/components/LocationIcon';
import * as colors from '@/constants/colors';
import { styleDivider } from '@/constants/styles';

const { colorWhite } = colors;

const NearLocationCard = () => {
  const linkTo = useLinkTo();
  const { locationLog } = useActiveLocationLog();
  const activeBeacons = useRecoilValue(beaconState);
  const cardHeight = useSharedValue(192);
  const flexibleHeight = useAnimatedStyle(() => ({
    height: cardHeight.value,
  }));

  useEffect(() => {
    cardHeight.value = (activeBeacons.length + 1) * 40;
  }, [activeBeacons.length, cardHeight]);

  return (
    <>
      {activeBeacons.length > 0 && (
        <Card
          style={styles.container}
          entering={FadeInLeft}
          exiting={FadeOutRight}>
          <View style={styles.cardHeaderContainer}>
            <Text style={styles.titleText}>근처 위치</Text>
            <Button style={styles.locationButton} onPress={() => {}}>
              새로고침
            </Button>
          </View>
          <View style={styleDivider} />
          <Animated.View style={[styles.locationContainer, flexibleHeight]}>
            {activeBeacons.map((beacon, index) => (
              <Animated.View
                entering={FadeInUp.delay(index * 50)}
                exiting={FadeInDown}
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
  cardHeaderContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 21,
    fontWeight: 'bold',
    margin: 20,
  },
  locationButton: {
    marginEnd: 20,
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
