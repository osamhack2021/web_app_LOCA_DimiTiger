import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { SvgUri } from 'react-native-svg';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

import { useActiveLocationLog } from '@/api/location-logs';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { styleDivider } from '@/constants/styles';

const LocationCard = () => {
  const { locationLog } = useActiveLocationLog();
  return (
    <Card>
      <View style={styles.cardHeaderContainer}>
        <Text style={styles.titleText}>나의 위치</Text>
        <Button style={styles.locationButton}>위치 변경</Button>
      </View>
      <View style={styleDivider} />
      {locationLog ? (
        <View style={styles.locationContainer}>
          <SvgUri
            width="100"
            height="100"
            uri={`https://api.loca.kimjisub.me/static/icons/ic_${locationLog.location.ui.icon}.svg`}
          />
          <Text style={styles.locationText}>{locationLog.location.name}</Text>
          <Text>{`최근위치변경: ${formatDistanceToNow(
            new Date(locationLog.createdAt),
            { addSuffix: true, locale: ko },
          )}`}</Text>
        </View>
      ) : (
        <SkeletonPlaceholder>
          <View style={styles.locationContainer}>
            <View />
          </View>
        </SkeletonPlaceholder>
      )}
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
});

export default LocationCard;
