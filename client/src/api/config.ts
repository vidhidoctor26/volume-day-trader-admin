/** Base URL for API requests. Empty string = same origin (use Vite proxy in dev). */
export const API_BASE_URL = (import.meta.env.VITE_API_URL ?? "").replace(
  /\/$/,
  "",
);

export const AUTH_API_PREFIX = `${API_BASE_URL}/api/auth`;
