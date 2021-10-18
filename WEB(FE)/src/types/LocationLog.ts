import Location from './Location';
import User from './User';

interface LocationLog {
  _id: string;
  active: boolean;
  location: Location;
  createdAt: Date;
  user: User;
}

export default LocationLog;
