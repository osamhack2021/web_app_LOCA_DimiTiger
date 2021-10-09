import { useMutation, useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import { useRecoilValue } from 'recoil';

import client from '../client';

import { authState } from '@/atoms';
import RegisterData from '@/types/RegisterData';
import User from '@/types/User';
import queryClient from '@/utils/queryClient';

async function getMe(): Promise<User> {
  const { data } = await client.get('/users/me');
  return data;
}

async function patchUser(userId: string, user: Partial<User>): Promise<void> {
  await client.patch(`/users/${userId}`, user);
}

export async function registerUser(registerData: RegisterData): Promise<User> {
  const { data } = await client.post<RegisterData, AxiosResponse<User>>(
    '/users/register',
    registerData,
  );
  return data;
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
  return useMutation((user: Partial<User>) => patchUser(me!._id, user), {
    onSuccess: () => {
      queryClient.invalidateQueries(['users', 'me']);
    },
  });
}
