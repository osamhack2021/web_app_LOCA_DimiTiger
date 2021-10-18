import { useMutation, useQueryClient } from 'react-query';

import useAxios from '@/hooks/useAxios';
import usePaginationQuery from '@/hooks/usePaginationQuery';
import useQuery from '@/hooks/useQuery';
import EmergencyReport from '@/types/EmergencyReport';
import EmergencyReportQuery from '@/types/EmergencyReportQuery';

export function useEmergencyReports(query?: EmergencyReportQuery) {
  return usePaginationQuery<EmergencyReport>('/emergencies', query, {
    refetchInterval: 1000,
  });
}

export function useEmergencyReport(id: string) {
  return useQuery<EmergencyReport>('/emergencies', id, {
    refetchInterval: 1000,
  });
}

export function useCloseEmergencyReport() {
  const axios = useAxios();
  const queryClient = useQueryClient();
  return useMutation(
    (_id: string) => axios.patch(`/emergencies/${_id}`, { active: false }),
    {
      onSettled: () => {
        queryClient.invalidateQueries('/emergencies');
      },
    },
  );
}
