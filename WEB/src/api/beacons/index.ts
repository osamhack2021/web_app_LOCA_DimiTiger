import { useMutation, useQueryClient } from 'react-query';

import useAxios from '@/hooks/useAxios';
import usePaginationQuery from '@/hooks/usePaginationQuery';
import Beacon from '@/types/Beacon';
import BeaconQuery from '@/types/BeaconQuery';

export function useBeacons(query?: BeaconQuery) {
  return usePaginationQuery<Beacon>('/beacons', query);
}

export function useAddBeacon() {
  const axios = useAxios();
  const queryClient = useQueryClient();
  return useMutation(
    (beacon: Partial<Beacon>) => axios.post(`/beacons`, beacon),
    {
      onSettled: () => {
        queryClient.invalidateQueries('/beacons');
      },
    },
  );
}

export function useDeleteBeacon() {
  const axios = useAxios();
  const queryClient = useQueryClient();
  return useMutation(
    ({ _id }: Pick<Beacon, '_id'>) => axios.delete(`/beacons/${_id}`),
    {
      onSettled: () => {
        queryClient.invalidateQueries('/beacons');
      },
    },
  );
}
