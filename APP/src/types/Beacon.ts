import { BeaconRegion } from 'react-native-beacons-manager';

import Location from '@/types/Location';

interface Beacon {
  location: Location;
  region: BeaconRegion & {
    distance?: number;
  };
}

export default Beacon;
