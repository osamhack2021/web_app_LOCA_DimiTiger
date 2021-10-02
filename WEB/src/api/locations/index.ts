import { useQuery } from "react-query";

import client from "../client";

import Location from "../../types/Location";

export async function getLocations(): Promise<Location[]> {
  const { data } = await client.get("/locations");
  return data;
}

export function useLocations() {
  const { data, isLoading } = useQuery(["locations"], () => getLocations());

  return {
    locations: data,
    isLoading,
  };
}
