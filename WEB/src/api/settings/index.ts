import { useMutation, useQueryClient } from 'react-query';

import useAxios from '../../hooks/useAxios';
import usePaginationQuery from '../../hooks/usePaginationQuery';
import Setting from '../../types/Setting';

export function useSettings() {
  return usePaginationQuery<Setting>('/settings');
}

export function useAddSetting() {
  const axios = useAxios();
  const queryClient = useQueryClient();
  return useMutation((setting: Setting) => axios.post(`/settings`, setting), {
    onSettled: () => {
      queryClient.invalidateQueries('/settings');
    },
  });
}
