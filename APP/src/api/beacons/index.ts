import usePaginationQuery from '@/hooks/usePaginationQuery';
import Beacon from '@/types/Beacon';
import PaginationQuery from '@/types/PaginationQuery';

export function useBeacons() {
  const query: PaginationQuery = {
    limit: 0,
  };
  return usePaginationQuery<Beacon>('/beacons', query);
}
