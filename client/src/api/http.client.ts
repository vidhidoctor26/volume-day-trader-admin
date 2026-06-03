import type { ApiErrorResponse, FieldError } from "@/types/api.types";

export class ApiError extends Error {
  status: number;
  fieldErrors: FieldError[];

  constructor(
    message: string,
    status: number,
    fieldErrors: FieldError[] = [],
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

type RequestOptions = {
  method?: string;
  body?: unknown;
  token?: string | null;
  signal?: AbortSignal;
};

export async function apiRequest<T>(
  url: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = "GET", body, token, signal } = options;

  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    credentials: "include",
    signal,
  });

  const data = (await response.json().catch(() => ({}))) as T &
    ApiErrorResponse & { error?: string };

  if (!response.ok) {
    const message =
      data.error ??
      data.message ??
      response.statusText ??
      "Request failed";

    throw new ApiError(message, response.status, data.errors ?? []);
  }

  return data as T;
}
