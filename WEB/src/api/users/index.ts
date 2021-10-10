import { useMutation } from 'react-query';

import useAxios from '../../hooks/useAxios';
import usePaginationQuery from '../../hooks/usePaginationQuery';
import useQuery from '../../hooks/useQuery';
import User from '../../types/User';
import UserQuery from '../../types/UserQuery';

export function useUsers(query?: UserQuery) {
  return usePaginationQuery<User>('/users', query);
}

export function usePatchUser() {
  const axios = useAxios();
  return useMutation(
    ({ _id, ...rest }: Partial<User>) => axios.patch(`/users/${_id}`, rest),
    {},
  );
}

export function useMe() {
  return useQuery<User>('/users/me');
}
