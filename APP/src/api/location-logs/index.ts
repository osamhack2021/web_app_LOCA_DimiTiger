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
  const { data } = await client.post('/location-logs', { user, location });
  return data;
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
      },
    },
  );

  return mutation;
}
