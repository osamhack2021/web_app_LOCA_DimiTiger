import { useMutation, useQueryClient } from 'react-query';

import useAxios from '../../hooks/useAxios';
import usePaginationQuery from '../../hooks/usePaginationQuery';
import Notice from '../../types/Notice';

export function useAddNotice() {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const path = '/notices';
  return useMutation(
    (notice: Omit<Notice, '_id'>) => axios.post(path, notice),
    {
      onSettled: () => {
        queryClient.invalidateQueries(path);
      },
    },
  );
}

export function useNotices() {
  return usePaginationQuery<Notice>('/notices');
}
