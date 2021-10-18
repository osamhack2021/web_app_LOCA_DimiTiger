import {
  QueryKey,
  useQuery as useQueryOriginal,
  UseQueryOptions,
  UseQueryResult,
} from 'react-query';

import useAxios from './useAxios';

function useQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
>(
  path: string,
  params?: string | unknown,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, QueryKey>,
    'queryKey' | 'queryFn'
  >,
): UseQueryResult<TData, TError> {
  const axios = useAxios();
  const isPathParam = typeof params === 'string';
  return useQueryOriginal(
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
}

export default useQuery;
