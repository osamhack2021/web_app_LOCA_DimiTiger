import { useEffect } from 'react';
import { Platform } from 'react-native';
import {
  checkMultiple,
  PERMISSIONS,
  PermissionStatus,
  request,
  RESULTS,
} from 'react-native-permissions';
import { useRecoilState, useRecoilValue } from 'recoil';

import { permissionState, splashState } from '@/atoms';

const permissions = Platform.select({
  android: [
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
  ],
  ios: [PERMISSIONS.IOS.LOCATION_ALWAYS],
  default: [],
});

export type PermissionStatuses = Record<
  typeof permissions[number],
  PermissionStatus
>;

const usePermissions = () => {
  const splashDone = useRecoilValue(splashState);
  const [permissionValue, setPermissionState] = useRecoilState(permissionState);
  const { checked } = permissionValue;

  useEffect(() => {
    if (!splashDone || checked) {
      return;
    }
    async function checkAndRequest() {
      const output: Partial<PermissionStatuses> = {};
      let granted = true;
      const checkedStatuses = await checkMultiple(permissions);
      await Promise.all(
        permissions.map(async permission => {
          if (checkedStatuses[permission] === RESULTS.DENIED) {
            output[permission] = await request(permission);
          } else {
            output[permission] = checkedStatuses[permission];
          }
          granted = granted && output[permission] === RESULTS.GRANTED;
        }),
      );
      setPermissionState({
        checked: true,
        statuses: output as PermissionStatuses,
        fullyGranted: granted,
      });
    }
    checkAndRequest();
  }, [checked, setPermissionState, splashDone]);

  return permissionValue;
};

export default usePermissions;
