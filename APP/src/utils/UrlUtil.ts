export function getLocationFromUrl(url?: string | null) {
  const prefix = 'https://api.loca.kimjisub.me/link/location-log/';
  const isValid = url?.startsWith(prefix);
  const location = isValid ? url?.replace(prefix, '') : undefined;

  return location;
}
