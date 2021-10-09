import { useQuery } from "react-query";

import Location from "../../types/Location";
import client from "../client";

export async function getLocations(): Promise<Location[]> {
  const { data } = await client.get("/locations");
  return data;
}

export function useLocations() {
  return useQuery(["locations"], () => getLocations());
}
