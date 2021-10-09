import { useQuery } from "react-query";

import LocationLog from "../../types/LocationLog";
import LocationLogQuery from "../../types/LocationLogQuery";
import client from "../client";

export async function getLocationLogs(
  query?: LocationLogQuery
): Promise<LocationLog[]> {
  const { data } = await client.get("/location-logs", {
    params: query,
  });
  return data;
}

export async function getLocationLog(id: string): Promise<LocationLog> {
  const { data } = await client.get(`/location-logs/${id}`);
  return data;
}

export function useLocationLogs(query?: LocationLogQuery) {
  return useQuery(["locationLogs", query], () => getLocationLogs(query));
}

export function useLocationLog(id: string) {
  return useQuery(["locationLog", id], () => getLocationLog(id));
}
