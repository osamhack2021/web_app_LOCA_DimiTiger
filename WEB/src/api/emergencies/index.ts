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
  return useQuery<EmergencyReport>('/emergencies', id);
}
