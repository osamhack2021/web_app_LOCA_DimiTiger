import Location from './Location';
import User from './User';

interface LocationLogByPlace {
  active: boolean;
  location: Location;
  createdAt: Date;
  user: User;
}

export default LocationLogByPlace;
