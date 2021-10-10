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
      },
    },
  );

  return mutation;
}
