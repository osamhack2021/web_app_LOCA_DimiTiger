import { useQuery } from 'react-query';

import client from '../client';

async function getLocationLogs(): Promise<void> {
  const { data } = await client.get('/location-logs');
  return data;
}

export async function logLocation(): Promise<void> {
  const { data } = await client.post('/location-logs');
  return data;
}

export function useLocationLogs() {
  const { data, isLoading } = useQuery(['location-logs'], () =>
    getLocationLogs(),
  );

  return { logs: data, isLoading };
}
