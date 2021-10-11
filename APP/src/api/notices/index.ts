<<<<<<< HEAD
import { useQuery } from 'react-query';

import client from '../client';

import Notice from '@/types/Notice';

async function getNotices(): Promise<Notice[]> {
  const { data } = await client.get('/notices');
  return data;
}

export function useNotices() {
  const { data, isLoading } = useQuery(['notices'], () => getNotices());

  return {
    notices: data,
    isLoading,
  };
=======
import usePaginationQuery from '@/hooks/usePaginationQuery';
import Notice from '@/types/Notice';
import PaginationQuery from '@/types/PaginationQuery';

export function useNotices() {
  const query: PaginationQuery = {
    limit: 0,
  };
  return usePaginationQuery<Notice>('/notices', query);
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
}
