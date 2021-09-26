import client from '../client';

import User from '@/types/User';

export async function getCurrentUser(): Promise<User> {
  const { data } = await client.get('/users/me');
  return data;
}
