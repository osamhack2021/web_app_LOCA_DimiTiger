import { useQuery } from "react-query";

import client from "../client";

import LocationLog from "../../types/LocationLog";
import LocationLogByPlace from "../../types/LocationLogByPlace";

export async function getLocationLogs(): Promise<LocationLog[]> {
  const { data } = await client.get("/location-logs?active=true");
  return data;
}

export async function getLocationLogsByPlace(locationId: string): Promise<LocationLogByPlace[]> {
  const { data } = await client.get("/location-logs?active=true&location="+locationId);
  return data;
}

export function useLocationLogs() {
  const { data, isLoading } = useQuery(["locationLogs"], () => getLocationLogs());

  return {
    locationLogs: data,
    isLoading,
  };
}

export function useLocationLogsByPlace(locationId: string) {
  const { data, isLoading } = useQuery(["locationLogsByPlace", locationId], () => getLocationLogsByPlace(locationId));
  
  return {
    locationLogsByPlace: data,
    isLoading,
  };
}