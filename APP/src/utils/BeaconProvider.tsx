import React, { useEffect } from 'react';
import { DeviceEventEmitter, Platform } from 'react-native';
import Beacons from 'react-native-beacons-manager';
import { useRecoilState } from 'recoil';

import { useBeacons } from '@/api/beacons';
import { useActiveLocationLog } from '@/api/location-logs';
import { beaconState } from '@/atoms';
import BeaconModal from '@/components/BeaconModal';
import usePermissions from '@/hooks/usePermissions';

type BeaconProviderProps = {
  children: React.ReactNode;
};

const BeaconProvider = ({ children }: BeaconProviderProps) => {
  const { beacons } = useBeacons();
  const { fullyGranted } = usePermissions();
  const { locationLog } = useActiveLocationLog();
  const [visibleBeacons, setVisibleBeacons] = useRecoilState(beaconState);

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
      Beacons.allowsBackgroundLocationUpdates(true);
      Beacons.startUpdatingLocation();
    }
    const subscription = DeviceEventEmitter.addListener(
      'didDetermineState',
      ({ identifier, state }) => {
        const beacon = beacons.find(
          value => value.region.identifier === identifier,
        );
        if (beacon) {
          setVisibleBeacons(prevBeacons => {
            const newBeacons = [...prevBeacons];
            if (state !== 'inside') {
              const i = newBeacons.findIndex(
                b => b.region.identifier === identifier,
              );
              if (i !== -1) {
                newBeacons.splice(i, 1);
              }
            } else {
              newBeacons.push(beacon);
            }
            return newBeacons;
          });
        }
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
  }, [beacons, fullyGranted, setVisibleBeacons]);

  useEffect(() => {
    if (!locationLog || visibleBeacons.length === 0) {
      return;
    }
    const i = visibleBeacons.findIndex(
      b => b.location._id === locationLog.location._id,
    );
    if (i === -1) {
    }
  }, [locationLog, visibleBeacons]);

  return (
    <>
      {children}
      <BeaconModal />
    </>
  );
};

export default BeaconProvider;
