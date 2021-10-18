interface LocationLogQuery {
  location?: string;
  user?: string;
  rangeStart?: Date;
  rangeEnd?: Date;
  page?: number;
  limit?: number;
  active?: boolean;
}

export default LocationLogQuery;
