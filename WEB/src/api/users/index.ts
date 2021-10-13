import { useMutation, useQueryClient } from 'react-query';

import useAxios from '../../hooks/useAxios';
import usePaginationQuery from '../../hooks/usePaginationQuery';
import useQuery from '../../hooks/useQuery';
import User from '../../types/User';
import UserQuery from '../../types/UserQuery';

export function useUsers(query?: UserQuery) {
  return usePaginationQuery<User>('/users', query);
}

export function useUser(id: string) {
  return useQuery<User>('/users', id);
}

export function usePatchUser() {
  const axios = useAxios();
  return useMutation(
    ({ _id, ...rest }: Partial<User>) => axios.patch(`/users/${_id}`, rest),
    {},
  );
}

export function useDeleteUser() {
  const axios = useAxios();
  const queryClient = useQueryClient();
  return useMutation(
    ({ _id }: Partial<User>) => axios.delete(`/users/${_id}`),
    {
      onSettled: () => {
        queryClient.invalidateQueries('/users');
      },
    },
  );
}

export function useMe() {
  return useQuery<User>('/users/me');
}
