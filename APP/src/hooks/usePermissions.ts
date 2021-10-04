import { useEffect } from 'react';
import { Platform } from 'react-native';
import {
  checkMultiple,
  PERMISSIONS,
  PermissionStatus,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';
import { useRecoilState } from 'recoil';

import { permissionState } from '@/atoms';

const permissions = Platform.select({
  android: [PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION],
  ios: [PERMISSIONS.IOS.LOCATION_ALWAYS],
  default: [],
});

export type PermissionStatuses = Record<
  typeof permissions[number],
  PermissionStatus
>;

const usePermissions = () => {
  const [permissionValue, setPermissionState] = useRecoilState(permissionState);
  const { checked } = permissionValue;

  useEffect(() => {
    if (checked) {
      return;
    }
    async function checkAndRequest() {
      const output: Partial<PermissionStatuses> = {};
      let granted = true;
      const checkedStatuses = await checkMultiple(permissions);
      const requestPermissions = permissions.flatMap(permission => {
        if (checkedStatuses[permission] === RESULTS.DENIED) {
          return permission;
        } else {
          output[permission] = checkedStatuses[permission];
          granted = granted && output[permission] === RESULTS.GRANTED;
          return [];
        }
      });
      const requestedStatuses = await requestMultiple(requestPermissions);
      requestPermissions.forEach(permission => {
        output[permission] = requestedStatuses[permission];
        granted = granted && output[permission] === RESULTS.GRANTED;
      });
      setPermissionState({
        checked: true,
        statuses: output as PermissionStatuses,
        fullyGranted: granted,
      });
    }
    checkAndRequest();
  }, [checked, setPermissionState]);

  return permissionValue;
};

export default usePermissions;
