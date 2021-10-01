import { PermissionStatuses } from '@/hooks/usePermissions';

interface PermissionState {
  checked: boolean;
  fullyGranted: boolean;
  statuses?: PermissionStatuses;
}

export default PermissionState;
