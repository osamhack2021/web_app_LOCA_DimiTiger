import { useQuery } from "react-query";

import User from "../../types/User";
import client from "../client";

async function getMe(): Promise<User> {
  const { data } = await client.get("/users/me");
  return data;
}

async function patchUser(userId: string, user: Partial<User>): Promise<void> {
  await client.patch(`/users/${userId}`, user);
}

export function useMe() {
  const result = useQuery(["users", "me"], () => getMe());

  return result;
}
