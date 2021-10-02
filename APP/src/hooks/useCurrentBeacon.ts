import { useEffect } from 'react';
import { DeviceEventEmitter, Platform } from 'react-native';
import Beacons from 'react-native-beacons-manager';
import { useRecoilState } from 'recoil';

import { useBeacons } from '@/api/beacons';
import { currentBeaconState } from '@/atoms';
import usePermissions from '@/hooks/usePermissions';

const useCurrentBeacon = () => {
  const { beacons } = useBeacons();
  const { fullyGranted } = usePermissions();
  const [currentBeaconValue, setCurrentBeaconState] =
    useRecoilState(currentBeaconState);
  const { currentBeacon, initialized } = currentBeaconValue;

  useEffect(() => {
    if (initialized || !beacons || !fullyGranted) {
      return;
    }
    if (Platform.OS === 'android') {
      Beacons.detectIBeacons();
    }
    Promise.all(
      beacons.map(beacon => {
        Beacons.startMonitoringForRegion(beacon.region);
      }),
    );
    if (Platform.OS === 'ios') {
      Beacons.allowsBackgroundLocationUpdates(true);
      Beacons.startUpdatingLocation();
    }
    const subscription = DeviceEventEmitter.addListener(
      'didDetermineState',
      ({ identifier, state }) => {
        const beacon =
          beacons.find(value => value.region.identifier === identifier) || null;
        setCurrentBeaconState(prev => {
          const exit =
            state !== 'inside' &&
            prev.currentBeacon?.region.identifier === identifier;
          return {
            initialized: true,
            currentBeacon: exit ? beacon : null,
          };
        });
      },
    );
    return () => {
      Promise.all(
        beacons.map(beacon => {
          Beacons.stopMonitoringForRegion(beacon.region);
        }),
      );
      if (Platform.OS === 'ios') {
        Beacons.stopUpdatingLocation();
      }
      subscription.remove();
    };
  }, [beacons, fullyGranted, initialized, setCurrentBeaconState]);

  return currentBeacon;
};

export default useCurrentBeacon;
