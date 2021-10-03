import { useMutation, useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import client from '../client';

import { authState } from '@/atoms';
import User from '@/types/User';

async function getMe(): Promise<User> {
  const { data } = await client.get('/users/me');
  return data;
}

async function patchUser(userId: string, user: User): Promise<void> {
  await client.patch(`/users/${userId}`, user);
}

export function useUser() {
  const { authenticated } = useRecoilValue(authState);
  const { data, isLoading } = useQuery(
    ['users', 'me', authenticated],
    () => getMe(),
    {
      enabled: authenticated,
    },
  );

  return { user: data, isLoading };
}

export function useEditUser() {
  const { user: me } = useUser();
  return useMutation((user: User) => patchUser(me!._id, user));
}
