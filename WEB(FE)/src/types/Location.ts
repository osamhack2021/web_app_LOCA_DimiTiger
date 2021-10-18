interface Location {
  _id: string;
  name: string;
  ui?: {
    color: 'Red' | 'Yellow' | 'Green' | 'Blue';
    icon: string;
  };
}

export default Location;
