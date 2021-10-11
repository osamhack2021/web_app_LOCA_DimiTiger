interface LocationQuery {
  name?: string;
  ui?: string;
  beacon?: string;
  page?: number;
  limit?: number;
  active?: boolean;
}

export default LocationQuery;
