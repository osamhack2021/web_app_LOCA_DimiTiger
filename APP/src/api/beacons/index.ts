import { useQuery } from 'react-query';

import client from '../client';

import Beacon from '@/types/Beacon';

async function getBeacons(): Promise<Beacon[]> {
  const { data } = await client.get('/beacons');
  return data;
}

async function getBeacon(beacon: string): Promise<Beacon> {
  const { data } = await client.get(`/beacons/${beacon}`);
  return data;
}

export function useBeacons() {
  const { data, isLoading } = useQuery(['beacons'], () => getBeacons());

  return {
    beacons: data,
    isLoading,
  };
}

export function useBeacon(beacon: string) {
  const { data, isLoading } = useQuery(['beacons', beacon], () =>
    getBeacon(beacon),
  );

  return {
    beacon: data,
    isLoading,
  };
}
