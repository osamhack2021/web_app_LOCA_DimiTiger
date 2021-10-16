import usePaginationQuery from '../../hooks/usePaginationQuery';
import useQuery from '../../hooks/useQuery';
import LocationLog from '../../types/LocationLog';
import LocationLogQuery from '../../types/LocationLogQuery';

export function useLocationLogs(query?: LocationLogQuery) {
  return usePaginationQuery<LocationLog>('/location-logs', query, {
    refetchInterval: 1000,
  });
}

export function useLocationLog(id: string) {
  return useQuery<LocationLog>('/location-logs', id);
}
