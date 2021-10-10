import {
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from 'react-query';

import PaginationData from '../types/PaginationData';

import useAxios from './useAxios';

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
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >,
): Omit<UseQueryResult<PaginationData<TData>, TError>, 'data'> & {
  data?: TData[];
  pagination?: Omit<PaginationData<TData>, 'docs'>;
} {
  const axios = useAxios();
  const isPathParam = typeof params === 'string';
  const { data, ...rest } = useQuery(
    [path, params],
    async () =>
      (
        await axios.get(
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
