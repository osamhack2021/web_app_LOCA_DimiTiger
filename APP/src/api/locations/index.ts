<<<<<<< HEAD
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
  const { data, isLoading } = useQuery(['locations', location], () =>
    getLocation(location),
  );

  return {
    location: data,
    isLoading,
  };
=======
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
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
}
