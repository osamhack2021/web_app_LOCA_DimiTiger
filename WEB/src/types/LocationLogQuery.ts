interface LocationLogQuery {
  location?: string;
  user?: object;
  rangeStart?: Date;
  rangeEnd?: Date;
  page?: number;
  limit?: number;
  active?: boolean;
}

export default LocationLogQuery;
