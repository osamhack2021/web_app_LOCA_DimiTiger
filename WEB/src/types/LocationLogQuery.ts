interface LocationLogQuery {
  location?: string;
  user?: string;
  timeStart?: Date;
  timeEnd?: Date;
  active?: boolean;
}

export default LocationLogQuery;
