<<<<<<< HEAD
import { useMutation, useQuery, useQueryClient } from 'react-query';

import client from '../client';
import { useUser } from '../users';

import LocationLog from '@/types/LocationLog';

async function getLocationLogs(
  user: string,
  active = false,
): Promise<LocationLog[]> {
  const { data } = await client.get('/location-logs', {
    params: { user, active },
  });
  return data;
}

export async function logLocation(
  user: string,
  location: string,
): Promise<void> {
  await client.post('/location-logs', { user, location });
}

export function useActiveLocationLog() {
  const { user } = useUser();
  const { data, isLoading } = useQuery(
    ['location-logs', 'active', user],
    () => getLocationLogs(user!._id, true),
    { enabled: !!user },
  );

  return {
    locationLog: data && data.length === 1 ? data[0] : undefined,
    isLoading,
  };
}

export function useLocationLogs() {
  const { user } = useUser();
  const { data, isLoading } = useQuery(
    ['location-logs', user],
    () => getLocationLogs(user!._id),
    { enabled: !!user },
  );

  return { locationLogs: data, isLoading };
}

export function useLogLocation() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (location: string) => logLocation(user!._id, location),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('active-location');
        queryClient.invalidateQueries('location-logs');
=======
import { useMutation, useQueryClient } from 'react-query';

import { useMe } from '../users';

import useAxios from '@/hooks/useAxios';
import usePaginationQuery from '@/hooks/usePaginationQuery';
import LocationLog from '@/types/LocationLog';
import LocationLogQuery from '@/types/LocationLogQuery';

export function useActiveLocationLog() {
  const { data: user } = useMe();
  const query: LocationLogQuery = {
    user: user?._id,
    active: true,
  };

  const { data, ...rest } = usePaginationQuery<LocationLog>(
    '/location-logs',
    query,
    { enabled: !!user },
  );

  return {
    data: data && data.length > 0 ? data[0] : undefined,
    ...rest,
  };
}

export function useLogLocation() {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { data: user } = useMe();
  const mutation = useMutation(
    (location: string) =>
      axios.post('/location-logs', { user: user?._id, location }),
    {
      onSettled: () => {
        queryClient.invalidateQueries('/location-logs');
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
      },
    },
  );

  return mutation;
}
