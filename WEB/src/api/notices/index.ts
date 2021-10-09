import usePaginationQuery from '../../hooks/usePaginationQuery';
import Notice from '../../types/Notice';
import PaginationData from '../../types/PaginationData';
import client from '../client';

export async function getNotices(): Promise<PaginationData<Notice>> {
  const { data } = await client.get('/notices');
  return data;
}

export async function addNotice(body: object): Promise<Notice> {
  const { data } = await client.post('/notices', body);
  return data;
}

export function useNotices() {
  return usePaginationQuery(['notices'], () => getNotices());
}
