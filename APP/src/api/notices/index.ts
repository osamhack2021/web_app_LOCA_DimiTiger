import usePaginationQuery from '@/hooks/usePaginationQuery';
import Notice from '@/types/Notice';
import PaginationQuery from '@/types/PaginationQuery';

export function useNotices() {
  const query: PaginationQuery = {
    limit: 0,
  };
  return usePaginationQuery<Notice>('/notices', query);
}
