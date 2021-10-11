import usePaginationQuery from '../../hooks/usePaginationQuery';
import Location from '../../types/Location';
import UserQuery from '../../types/UserQuery';

export function useLocations(query?: UserQuery) {
  return usePaginationQuery<Location>('/locations', query);
}
