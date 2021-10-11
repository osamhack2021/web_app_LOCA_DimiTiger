import PaginationQuery from '@/types/PaginationQuery';

interface LocationLogQuery extends PaginationQuery {
  location?: string;
  user?: string;
  rangeStart?: Date;
  rangeEnd?: Date;
  active?: boolean;
}

export default LocationLogQuery;
