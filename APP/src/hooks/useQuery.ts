import {
  useQuery as useQueryOriginal,
  UseQueryOptions,
  UseQueryResult,
} from 'react-query';
import { useRecoilValueLoadable } from 'recoil';

import { accessTokenState } from '@/atoms';
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
  const { state, contents } = useRecoilValueLoadable(accessTokenState);
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
    { enabled: state === 'hasValue' && !!contents, ...options },
  );
}

export default useQuery;
