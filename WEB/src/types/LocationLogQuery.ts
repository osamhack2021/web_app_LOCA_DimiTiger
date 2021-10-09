interface LocationLogQuery {
  location?: string;
  user?: string;
  rangeStart?: Date;
  rangeEnd?: Date;
  active?: boolean;
}

export default LocationLogQuery;
