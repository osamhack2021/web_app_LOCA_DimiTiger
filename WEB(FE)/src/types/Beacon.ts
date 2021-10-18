import Location from './Location';

interface Beacon {
  _id: string;
  location: Location;
  region: {
    uuid: string;
    major: number;
    minor: number;
  };
}

export default Beacon;
