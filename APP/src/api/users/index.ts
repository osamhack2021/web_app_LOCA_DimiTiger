import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import client from '../client';

import { authState } from '@/atoms';
import User from '@/types/User';

async function getMe(): Promise<User> {
  const { data } = await client.get('/users/me');
  return data;
}

export function useUser() {
  const { authenticated } = useRecoilValue(authState);
  const { data, isLoading } = useQuery(['user', authenticated], () => getMe(), {
    enabled: authenticated,
  });

  return { user: data, isLoading };
}
