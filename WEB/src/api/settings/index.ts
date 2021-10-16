import { useMutation, useQueryClient } from 'react-query';

import useAxios from '../../hooks/useAxios';
import usePaginationQuery from '../../hooks/usePaginationQuery';
import Settings from '../../types/Settings';

export function useSettings() {
  return usePaginationQuery<Settings>('/settings');
}

export function useAddSetting() {
  const axios = useAxios();
  const queryClient = useQueryClient();
  return useMutation((setting: Settings) => axios.post(`/settings`, setting), {
    onSettled: () => {
      queryClient.invalidateQueries('/settings');
    },
  });
}
