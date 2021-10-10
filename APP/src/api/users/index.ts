import { useMutation, useQueryClient } from 'react-query';

import useAxios from '@/hooks/useAxios';
import useQuery from '@/hooks/useQuery';
import User from '@/types/User';

export function useMe() {
  return useQuery<User>('/users/me');
}

export function useEditUser() {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { data: me } = useMe();
  const mutation = useMutation(
    (user: Partial<User>) => axios.post(`/users/${me?._id}`, { user }),
    {
      onSettled: () => {
        queryClient.invalidateQueries('/users/me');
      },
    },
  );

  return mutation;
}
