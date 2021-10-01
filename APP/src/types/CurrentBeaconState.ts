import Beacon from '@/types/Beacon';

interface CurrentBeaconState {
  initialized: boolean;
  currentBeacon: Beacon | null;
}

export default CurrentBeaconState;
