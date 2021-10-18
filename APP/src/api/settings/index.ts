import useQuery from '@/hooks/useQuery';
import Settings from '@/types/Settings';

export function useSettings() {
  return useQuery<{ data: Settings }>('/settings/current');
}
