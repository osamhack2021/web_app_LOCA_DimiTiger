import { useMutation, useQueryClient } from 'react-query';

import useAxios from '@/hooks/useAxios';
import usePaginationQuery from '@/hooks/usePaginationQuery';
import useQuery from '@/hooks/useQuery';
import Location from '@/types/Location';
import UserQuery from '@/types/UserQuery';

export function useLocations(query?: UserQuery) {
  return usePaginationQuery<Location>('/locations', query);
}

export function useLocation(id: string) {
  return useQuery<Location>('/locations', id);
}

export function useAddLocation() {
  const axios = useAxios();
  const queryClient = useQueryClient();
  return useMutation(
    (location: Partial<Location>) => axios.post(`/locations`, location),
    {
      onSettled: () => {
        queryClient.invalidateQueries('/locations');
      },
    },
  );
}

export function useDeleteLocation() {
  const axios = useAxios();
  const queryClient = useQueryClient();
  return useMutation(
    ({ _id }: Pick<Location, '_id'>) => axios.delete(`/locations/${_id}`),
    {
      onSettled: () => {
        queryClient.invalidateQueries('/locations');
      },
    },
  );
}
