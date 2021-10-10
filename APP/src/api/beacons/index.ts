import { useRecoilValueLoadable } from 'recoil';

import { accessTokenState } from '@/atoms';
import usePaginationQuery from '@/hooks/usePaginationQuery';
import Beacon from '@/types/Beacon';
import PaginationQuery from '@/types/PaginationQuery';

export function useBeacons() {
  const { state, contents } = useRecoilValueLoadable(accessTokenState);
  const query: PaginationQuery = {
    limit: 0,
  };
  return usePaginationQuery<Beacon>('/beacons', query, {
    enabled: state === 'hasValue' && !!contents,
  });
}
