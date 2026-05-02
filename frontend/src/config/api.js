const DEFAULT_API_URL = "/api";

const API_URL = process.env.EXPO_PUBLIC_API_URL || DEFAULT_API_URL;

export function apiUrl(path) {
  const baseUrl = API_URL.replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${baseUrl}${normalizedPath}`;
}
