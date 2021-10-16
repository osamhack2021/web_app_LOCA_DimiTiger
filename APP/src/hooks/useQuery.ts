import {
  useQuery as useQueryOriginal,
  UseQueryOptions,
  UseQueryResult,
} from 'react-query';

import useAxios from '@/hooks/useAxios';

function useQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
>(
  path: string,
  params?: string | unknown,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, unknown[]>,
    'queryKey' | 'queryFn'
  >,
): UseQueryResult<TData, TError> {
  const axios = useAxios();
  const isPathParam = typeof params === 'string';
  return useQueryOriginal(
    [path, params],
    async () =>
      (
        await axios.get<TQueryFnData>(
          `${path}${isPathParam ? '/' + params : ''}`,
          isPathParam || !params ? {} : { params },
        )
      ).data,
    options,
  );
}

export default useQuery;
