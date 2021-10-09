import {
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";

import PaginationData from "../types/PaginationData";

function usePaginationQuery<
  TQueryFnData extends PaginationData = PaginationData,
  TError = unknown,
  TData extends PaginationData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    "queryKey" | "queryFn"
  >
): Omit<UseQueryResult<TData, TError>, "data"> & {
  data?: TData["docs"];
  pagination?: Omit<TData, "docs">;
} {
  const { data, ...rest } = useQuery(queryKey, queryFn, options);

  if (data) {
    const { docs, ...pagination } = data;
    return { data: docs, pagination, ...rest };
  }
  return { ...rest };
}

export default usePaginationQuery;
