import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import {
  check,
  checkMultiple,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import { useRecoilValue } from 'recoil';

import { splashState } from '@/atoms';

const usePermissions = () => {
  const splashDone = useRecoilValue(splashState);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    if (!splashDone) {
      return;
    }
    if (Platform.OS === 'android') {
      const permissions = [
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
      ];
      checkMultiple(permissions)
        .then(statuses => {
          return Promise.all(
            permissions.map(permission => {
              if (statuses[permission] === RESULTS.DENIED) {
                return request(permission);
              } else {
                return Promise.resolve(statuses[permission]);
              }
            }),
          );
        })
        .then(statuses => {
          let granted = false;
          statuses.forEach(status => {
            granted = status === RESULTS.GRANTED;
          });
          setPermissionGranted(granted);
        });
    } else if (Platform.OS === 'ios') {
      check(PERMISSIONS.IOS.LOCATION_ALWAYS)
        .then(status => {
          if (status === RESULTS.DENIED) {
            return request(PERMISSIONS.IOS.LOCATION_ALWAYS);
          } else {
            return Promise.resolve(status);
          }
        })
        .then(status => {
          setPermissionGranted(status === RESULTS.GRANTED);
        });
    }
  }, [splashDone]);

  return { permissionGranted };
};

export default usePermissions;
