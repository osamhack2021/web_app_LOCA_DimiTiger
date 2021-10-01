import { useEffect } from 'react';
import { DeviceEventEmitter, Platform } from 'react-native';
import Beacons, { BeaconRegion } from 'react-native-beacons-manager';
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
      Beacons.startUpdatingLocation();
    }
    const subscriptions = [
      DeviceEventEmitter.addListener('regionDidEnter', (data: BeaconRegion) => {
        const beacon = beacons.find(
          value =>
            value.region.uuid === data.uuid &&
            value.region.major === data.major &&
            value.region.minor === data.minor,
        );
        setCurrentBeaconState({
          initialized: true,
          currentBeacon: beacon || null,
        });
      }),
      DeviceEventEmitter.addListener('regionDidExit', () => {
        setCurrentBeaconState({
          initialized: true,
          currentBeacon: null,
        });
      }),
    ];
    return () => {
      Promise.all(
        beacons.map(beacon => {
          Beacons.stopMonitoringForRegion(beacon.region);
        }),
      );
      if (Platform.OS === 'ios') {
        Beacons.stopUpdatingLocation();
      }
      subscriptions.forEach(subscription => subscription.remove());
    };
  }, [beacons, fullyGranted, initialized, setCurrentBeaconState]);

  return currentBeacon;
};

export default useCurrentBeacon;
