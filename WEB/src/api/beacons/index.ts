import usePaginationQuery from '../../hooks/usePaginationQuery';
import Beacon from '../../types/Beacon';
import UserQuery from '../../types/UserQuery';

export function useBeacons(query?: UserQuery) {
  return usePaginationQuery<Beacon>('/beacons', query);
}
