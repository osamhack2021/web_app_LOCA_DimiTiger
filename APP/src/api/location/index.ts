import { useQuery } from 'react-query';

import client from '../client';

import Location from '@/types/Location';

async function getLocations(): Promise<Location[]> {
  const { data } = await client.get('/locations');
  return data;
}

async function getLocation(location: string): Promise<Location> {
  const { data } = await client.get(`/locations/${location}`);
  return data;
}

export function useLocations() {
  const { data, isLoading } = useQuery(['locations'], () => getLocations());

  return {
    locations: data,
    isLoading,
  };
}

export function useLocation(location: string) {
  const { data, isLoading } = useQuery(['location', location], () =>
    getLocation(location),
  );

  return {
    location: data,
    isLoading,
  };
}
