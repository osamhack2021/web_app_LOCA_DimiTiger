import { useMutation } from 'react-query';

import useAxios from '../../hooks/useAxios';
import useQuery from '../../hooks/useQuery';
import User from '../../types/User';

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
