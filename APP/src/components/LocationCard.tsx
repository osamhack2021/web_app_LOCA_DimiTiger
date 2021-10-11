import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  cancelAnimation,
  FadeIn,
  FadeInUp,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useLinkTo } from '@react-navigation/native';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import LottieView from 'lottie-react-native';

import { useActiveLocationLog } from '@/api/location-logs';
import { useLocations } from '@/api/locations';
import Button from '@/components/Button';
import Card from '@/components/Card';
import LocationIcon from '@/components/LocationIcon';
import Text from '@/components/Text';
import { colorChipBorder } from '@/constants/colors';
import { styleDivider } from '@/constants/styles';
import useAnimatedHeight from '@/hooks/useAnimatedHeight';

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const LocationCard = () => {
  const linkTo = useLinkTo();
  const [changeMode, setChangeMode] = useState(false);
  const { data: locations } = useLocations();
  const { data: locationLog, isLoading } = useActiveLocationLog();
  const emptyAnim = useSharedValue(0);
  const emptyAnimProps = useAnimatedProps(() => ({
    progress: emptyAnim.value,
  }));
  const { style, layoutHandler } = useAnimatedHeight(190);
  useEffect(() => {
    if (!changeMode && !locationLog && !isLoading) {
      emptyAnim.value = withRepeat(withTiming(1, { duration: 6000 }), -1);
    } else {
      cancelAnimation(emptyAnim);
    }
  }, [locationLog, isLoading, emptyAnim, changeMode]);
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
      <Animated.View style={[style]}>
        {changeMode ? (
          <View onLayout={layoutHandler}>
            <View />
            <View style={styles.locationChipContainer}>
              {locations &&
                locations.map((location, index) => (
                  <Animated.View
                    entering={FadeInUp.delay(300 + index * 50)}
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
            entering={FadeIn.delay(300)}
            onLayout={layoutHandler}>
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
        ) : isLoading ? (
          <Animated.View entering={FadeIn} onLayout={layoutHandler}>
            <SkeletonPlaceholder>
              <View style={styles.locationContainer}>
                <SkeletonPlaceholder.Item
                  width={100}
                  height={100}
                  borderRadius={50}
                />
                <SkeletonPlaceholder.Item width={150} height={21} margin={5} />
                <SkeletonPlaceholder.Item width={140} height={14} />
              </View>
            </SkeletonPlaceholder>
          </Animated.View>
        ) : (
          <Animated.View
            entering={FadeIn}
            onLayout={layoutHandler}
            style={styles.locationContainer}>
            <AnimatedLottieView
              style={{ height: 100 }}
              source={require('@assets/jsons/404.json')}
              animatedProps={emptyAnimProps}
            />
            <Text style={styles.nullLocationText}>
              아직 체크인한 위치가 없습니다.
            </Text>
          </Animated.View>
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
  nullLocationText: {
    fontSize: 18,
    marginTop: 20,
  },
});

export default LocationCard;
