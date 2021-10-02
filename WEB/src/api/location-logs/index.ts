import { useQuery } from "react-query";

import client from "../client";

import LocationLog from "../../types/LocationLog";

export async function getLocationLogs(): Promise<LocationLog[]> {
  const { data } = await client.get("/location-logs?active=true");
  return data;
}

export function useLocationLogs() {
  const { data, isLoading } = useQuery(["locationLogs"], () => getLocationLogs());

  return {
    locationLogs: data,
    isLoading,
  };
}
