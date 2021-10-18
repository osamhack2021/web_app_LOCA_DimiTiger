import { useQuery } from 'react-query';

import useAxios from '@/hooks/useAxios';

export function useWeathers(location: object) {
  const axios = useAxios();
  const path: string = '/weathers';
  return useQuery(
    [path, location],
    async () => (await axios.get(`${path}`, { params: location })).data,
  );
}
