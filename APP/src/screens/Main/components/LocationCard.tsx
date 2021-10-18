import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
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
import AnimatedChip from '@/components/AnimatedChip';
import Button from '@/components/Button';
import Card from '@/components/Card';
import LocationIcon from '@/components/LocationIcon';
import Text from '@/components/Text';
import { styleCardHeaderContainer, styleDivider } from '@/constants/styles';
import useAnimatedHeight from '@/hooks/useAnimatedHeight';

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const LocationCard = () => {
  const linkTo = useLinkTo();
  const [changeMode, setChangeMode] = useState(false);
  const { data: locations } = useLocations();
  const { data: locationLog, isLoading } = useActiveLocationLog();
  const { style, layoutHandler } = useAnimatedHeight(190, 0, [changeMode]);
  const sharedOpacity = useSharedValue(1);
  const fadeInAnim = useAnimatedStyle(() => {
    return {
      opacity: sharedOpacity.value,
    };
  });

  useEffect(() => {
    if (changeMode) {
      sharedOpacity.value = 0;
    } else {
      sharedOpacity.value = withDelay(300, withTiming(1));
    }
  }, [changeMode, sharedOpacity]);

  return (
    <Card>
      <View style={styleCardHeaderContainer}>
        <Text style={styles.titleText}>나의 위치</Text>
        <Button
          style={styles.locationButton}
          onPress={() => setChangeMode(!changeMode)}>
          {changeMode ? '취소' : '위치 변경'}
        </Button>
      </View>
      <View style={styleDivider} />
      <Animated.View style={style}>
        {changeMode ? (
          <View onLayout={layoutHandler}>
            <View style={styles.locationChipContainer}>
              {locations?.map((location, index) => (
                <AnimatedChip
                  key={location._id}
                  text={location.name}
                  index={index}
                  onPress={() => {
                    linkTo(`/location-log/${location._id}`);
                    setChangeMode(false);
                  }}
                />
              ))}
            </View>
          </View>
        ) : locationLog ? (
          <Animated.View
            style={[styles.locationContainer, fadeInAnim]}
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
          <Animated.View style={fadeInAnim} onLayout={layoutHandler}>
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
            onLayout={layoutHandler}
            style={[styles.locationContainer, fadeInAnim]}>
            <EmptyAnimView />
            <Text style={styles.locationText}>정보 없음</Text>
            <Text>아직 체크인한 위치가 없습니다.</Text>
          </Animated.View>
        )}
      </Animated.View>
    </Card>
  );
};

const EmptyAnimView = () => {
  const emptyAnim = useSharedValue(0);
  const emptyAnimProps = useAnimatedProps(() => ({
    progress: emptyAnim.value,
  }));
  useEffect(() => {
    emptyAnim.value = withRepeat(withTiming(1, { duration: 6000 }), -1);
  }, [emptyAnim]);
  return (
    <AnimatedLottieView
      style={{ height: 100 }}
      source={require('@assets/jsons/404.json')}
      animatedProps={emptyAnimProps}
    />
  );
};

const styles = StyleSheet.create({
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
});

export default LocationCard;
