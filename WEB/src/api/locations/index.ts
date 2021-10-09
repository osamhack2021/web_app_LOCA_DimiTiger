import usePaginationQuery from '../../hooks/usePaginationQuery';
import Location from '../../types/Location';

export function useLocations() {
  return usePaginationQuery<Location>('/locations');
}
