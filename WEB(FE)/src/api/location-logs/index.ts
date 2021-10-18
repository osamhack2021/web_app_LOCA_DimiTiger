import { QueryKey, UseQueryOptions } from 'react-query';

import usePaginationQuery from '@/hooks/usePaginationQuery';
import useQuery from '@/hooks/useQuery';
import LocationLog from '@/types/LocationLog';
import LocationLogQuery from '@/types/LocationLogQuery';
import PaginationData from '@/types/PaginationData';

export function useLocationLogs(
  query?: LocationLogQuery,
  options?: UseQueryOptions<
    PaginationData<LocationLog>,
    unknown,
    PaginationData<LocationLog>,
    QueryKey
  >,
) {
  return usePaginationQuery<LocationLog>('/location-logs', query, {
    refetchInterval: 1000,
    ...options,
  });
}

export function useLocationLog(id: string) {
  return useQuery<LocationLog>('/location-logs', id);
}
