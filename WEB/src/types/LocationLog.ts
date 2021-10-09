import Location from "./Location";
import User from "./User";

interface LocationLog {
  active: boolean;
  location: Location;
  createdAt: Date;
  user: User;
}

export default LocationLog;
