import AuthResponse from '../../types/AuthResponse';
import client from '../client';

export async function authWithIdPassword(
  serial: string,
  password: string,
): Promise<AuthResponse> {
  const { data } = await client.post('/auth/token', { serial, password });
  return data;
}

export async function authWithRefreshToken(
  refresh_token: string,
): Promise<AuthResponse> {
  const { data } = await client.post('/auth/refresh', { refresh_token });
  return data;
}
