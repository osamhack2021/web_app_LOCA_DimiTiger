import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';

import useAxios from '@/hooks/useAxios';
import PaginationData from '@/types/PaginationData';

type PagintionDataWrapper<TData> = {
  data?: TData[];
  pagination?: Omit<PaginationData<TData>, 'docs'>;
};

function usePaginationQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
>(
  path: string,
  params?: string | unknown,
  options?: Omit<
    UseQueryOptions<
      PaginationData<TQueryFnData>,
      TError,
      PaginationData<TData>,
      unknown[]
    >,
    'queryKey' | 'queryFn'
  >,
): Omit<UseQueryResult<PaginationData<TData>, TError>, 'data'> &
  PagintionDataWrapper<TData> {
  const axios = useAxios();
  const isPathParam = typeof params === 'string';
  const { data, ...rest } = useQuery(
    [path, params],
    async () =>
      (
        await axios.get<PaginationData<TQueryFnData>>(
          `${path}${isPathParam ? '/' + params : ''}`,
          isPathParam || !params ? {} : { params },
        )
      ).data,
    options,
  );

  if (data) {
    const { docs, ...pagination } = data;
    return { data: docs, pagination, ...rest };
  }
  return { ...rest };
}

export default usePaginationQuery;
