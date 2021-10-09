import usePaginationQuery from "../../hooks/usePaginationQuery";
import Location from "../../types/Location";
import PaginationData from "../../types/PaginationData";
import client from "../client";

export async function getLocations(): Promise<PaginationData<Location>> {
  const { data } = await client.get("/locations");
  return data;
}

export function useLocations() {
  return usePaginationQuery(["locations"], () => getLocations());
}
