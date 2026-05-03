const DEFAULT_API_URL = "/api";

const RUNTIME_API_URL =
  typeof window !== "undefined" &&
  window.__APP_CONFIG__ &&
  window.__APP_CONFIG__.EXPO_PUBLIC_API_URL;

const API_URL = RUNTIME_API_URL || process.env.EXPO_PUBLIC_API_URL || DEFAULT_API_URL;

export function apiUrl(path) {
  const baseUrl = API_URL.replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${baseUrl}${normalizedPath}`;
}
