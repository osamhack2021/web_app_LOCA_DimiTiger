import React, { useEffect } from 'react';
import { DeviceEventEmitter, Platform } from 'react-native';
import Beacons from 'react-native-beacons-manager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilState } from 'recoil';

import { useBeacons } from '@/api/beacons';
import { beaconState } from '@/atoms';
import usePermissions from '@/hooks/usePermissions';

type BeaconProviderProps = {
  children: React.ReactNode;
};

const BeaconProvider = ({ children }: BeaconProviderProps) => {
  const { beacons } = useBeacons();
  const { fullyGranted } = usePermissions();
  const [visibleBeacons, setVisibleBeacons] = useRecoilState(beaconState);

  useEffect(() => {
    if (!beacons || !fullyGranted) {
      return;
    }
    if (Platform.OS === 'android') {
      Beacons.detectIBeacons();
    }
    Promise.all(
      beacons.map(async beacon => {
        await Beacons.startMonitoringForRegion(beacon.region);
        await Beacons.startRangingBeaconsInRegion(beacon.region);
      }),
    );
    if (Platform.OS === 'ios') {
      Beacons.allowsBackgroundLocationUpdates(true);
      Beacons.startUpdatingLocation();
    }
    const subscriptions = [
      DeviceEventEmitter.addListener('regionDidExit', ({ identifier }) => {
        const beacon = beacons.find(
          value => value.region.identifier === identifier,
        );
        if (beacon) {
          setVisibleBeacons(prevBeacons => {
            const newBeacons = [...prevBeacons];
            const i = newBeacons.findIndex(
              b => b.region.identifier === identifier,
            );
            if (i !== -1) {
              newBeacons.splice(i, 1);
            }
            return newBeacons;
          });
        }
      }),
      DeviceEventEmitter.addListener(
        'beaconsDidRange',
        ({ identifier, beacons: regions }) => {
          const beacon = beacons.find(
            value => value.region.identifier === identifier,
          );
          if (beacon) {
            regions.forEach(({ distance }: typeof beacon.region) => {
              setVisibleBeacons(prevBeacons => {
                const newBeacons = [...prevBeacons];
                const newBeacon = { ...beacon };
                newBeacon.region.distance = distance;
                const i = newBeacons.findIndex(
                  b => b.region.identifier === identifier,
                );
                if (i !== -1) {
                  newBeacons[i] = newBeacon;
                } else {
                  newBeacons.push(newBeacon);
                }
                return newBeacons;
              });
            });
          }
        },
      ),
    ];
    return () => {
      Promise.all(
        beacons.map(async beacon => {
          await Beacons.stopMonitoringForRegion(beacon.region);
          await Beacons.stopRangingBeaconsInRegion(beacon.region);
        }),
      );
      if (Platform.OS === 'ios') {
        Beacons.stopUpdatingLocation();
      }
      subscriptions.forEach(subscription => subscription.remove());
    };
  }, [beacons, fullyGranted, setVisibleBeacons]);

  useEffect(() => {
    if (visibleBeacons.length === 0) {
      return;
    }
    //setModalVisible(true);
  }, [visibleBeacons.length]);

  useEffect(() => {
    if (!beacons) {
      return;
    }
    AsyncStorage.setItem('beacons', JSON.stringify(beacons));
  }, [beacons]);

  return <>{children}</>;
};

export default BeaconProvider;
