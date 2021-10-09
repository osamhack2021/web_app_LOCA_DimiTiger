import { useQuery } from 'react-query';

import usePaginationQuery from '../../hooks/usePaginationQuery';
import LocationLog from '../../types/LocationLog';
import LocationLogQuery from '../../types/LocationLogQuery';
import PaginationData from '../../types/PaginationData';
import client from '../client';

export async function getLocationLogs(
  query?: LocationLogQuery,
): Promise<PaginationData<LocationLog>> {
  const { data } = await client.get('/location-logs', {
    params: query,
  });
  return data;
}

export async function getLocationLog(id: string): Promise<LocationLog> {
  const { data } = await client.get(`/location-logs/${id}`);
  return data;
}

export function useLocationLogs(query?: LocationLogQuery) {
  return usePaginationQuery(['locationLogs', query], () =>
    getLocationLogs(query),
  );
}

export function useLocationLog(id: string) {
  return useQuery(['locationLog', id], () => getLocationLog(id));
}
