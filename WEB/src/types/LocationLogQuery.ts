interface LocationLogQuery {
  location?: string;
  user?: string;
  rangeStart?: Date;
  rangeEnd?: Date;
  offset?: number;
  limit?: number;
  active?: boolean;
}

export default LocationLogQuery;
