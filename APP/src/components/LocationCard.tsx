import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useLinkTo } from '@react-navigation/native';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

import { useActiveLocationLog } from '@/api/location-logs';
import { useLocations } from '@/api/locations';
import Button from '@/components/Button';
import Card from '@/components/Card';
import LocationIcon from '@/components/LocationIcon';
import { colorChipBorder } from '@/constants/colors';
import { styleDivider } from '@/constants/styles';

const LocationCard = () => {
  const linkTo = useLinkTo();
  const [changeMode, setChangeMode] = useState(false);
  const { locations } = useLocations();
  const { locationLog } = useActiveLocationLog();
  const cardHeight = useSharedValue(192);
  const flexibleHeight = useAnimatedStyle(() => ({
    height: cardHeight.value,
  }));
  return (
    <Card>
      <View style={styles.cardHeaderContainer}>
        <Text style={styles.titleText}>나의 위치</Text>
        <Button
          style={styles.locationButton}
          onPress={() => setChangeMode(!changeMode)}>
          {changeMode ? '취소' : '위치 변경'}
        </Button>
      </View>
      <View style={styleDivider} />
      <Animated.View style={[flexibleHeight]}>
        {changeMode ? (
          <View
            onLayout={({ nativeEvent }) => {
              cardHeight.value = withTiming(nativeEvent.layout.height);
            }}>
            <View />
            <View style={styles.locationChipContainer}>
              {locations &&
                locations.map((location, index) => (
                  <Animated.View
                    entering={FadeInUp.delay(index * 50)}
                    key={location._id}>
                    <TouchableOpacity
                      style={styles.locationChip}
                      onPress={() => {
                        linkTo(`/location-log/${location._id}`);
                        setChangeMode(false);
                      }}>
                      <Text style={styles.locationChipText}>
                        {location.name}
                      </Text>
                    </TouchableOpacity>
                  </Animated.View>
                ))}
            </View>
          </View>
        ) : locationLog ? (
          <Animated.View
            style={styles.locationContainer}
            entering={FadeIn}
            onLayout={({ nativeEvent }) => {
              cardHeight.value = withTiming(nativeEvent.layout.height);
            }}>
            <LocationIcon
              width="100"
              height="100"
              icon={locationLog.location.ui.icon}
            />
            <Text style={styles.locationText}>{locationLog.location.name}</Text>
            <Text>{`최근위치변경: ${formatDistanceToNow(
              new Date(locationLog.createdAt),
              { addSuffix: true, locale: ko },
            )}`}</Text>
          </Animated.View>
        ) : (
          <SkeletonPlaceholder>
            <View style={styles.locationContainer}>
              <View />
            </View>
          </SkeletonPlaceholder>
        )}
      </Animated.View>
    </Card>
  );
};

const styles = StyleSheet.create({
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
    alignItems: 'center',
    padding: 20,
  },
  locationText: {
    fontSize: 21,
    fontWeight: 'bold',
    margin: 5,
  },
  locationChipContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
  },
  locationChip: {
    borderColor: colorChipBorder,
    borderRadius: 10,
    borderWidth: 1,
    margin: 5,
    padding: 10,
  },
  locationChipText: {
    fontWeight: 'bold',
  },
});

export default LocationCard;
