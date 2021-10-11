interface Beacon {
  _id: string;
  region?: {
    uuid: string;
    major: number;
    minor: number;
  };
}

export default Beacon;
