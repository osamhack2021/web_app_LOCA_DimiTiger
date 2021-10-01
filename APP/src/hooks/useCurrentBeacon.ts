import { useEffect, useState } from 'react';
import { DeviceEventEmitter, Platform } from 'react-native';
import Beacons, { BeaconRegion } from 'react-native-beacons-manager';

import { useBeacons } from '@/api/beacons';
import usePermissions from '@/hooks/usePermissions';
import Beacon from '@/types/Beacon';

const useCurrentBeacon = () => {
  const { beacons } = useBeacons();
  const { fullyGranted } = usePermissions();
  const [currentBeacon, setCurrentBeacon] = useState<Beacon | null>(null);

  useEffect(() => {
    if (!beacons || !fullyGranted) {
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
        setCurrentBeacon(beacon || null);
      }),
      DeviceEventEmitter.addListener('regionDidExit', () => {
        setCurrentBeacon(null);
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
  }, [beacons, fullyGranted]);

  return currentBeacon;
};

export default useCurrentBeacon;
