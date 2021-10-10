import usePaginationQuery from '@/hooks/usePaginationQuery';
import useQuery from '@/hooks/useQuery';
import Location from '@/types/Location';
import PaginationQuery from '@/types/PaginationQuery';

export function useLocations() {
  const query: PaginationQuery = {
    limit: 0,
  };
  return usePaginationQuery<Location>('/locations', query);
}

export function useLocation(location: string) {
  return useQuery<Location>('/locations', location);
}
