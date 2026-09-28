import axios, { AxiosError } from "axios";

/**
 * The one HTTP client for the SortBoxs backend (subscription plans and checkout). Feature code never
 * builds URLs or reads env vars: it calls a service (e.g. `subscriptionApi.ts`), which uses this client.
 *
 * Base URL: NEXT_PUBLIC_API_BASE_URL, set per environment in .env.development / .env.production (inlined
 * at build time — this site is a static export).
 *
 * Auth: none. The site is public and has no login; the subscription endpoints it calls were verified to
 * work without a token. If the backend starts requiring one, attach it in the request interceptor below.
 *
 * Errors: every failure is rethrown as an `ApiError` with a `kind` the caller can branch on and the
 * backend's own message when it sends one. No UI here — callers decide what to show.
 */

export type ApiErrorKind =
  | "config" // no base URL configured
  | "network" // offline, DNS, CORS
  | "timeout"
  | "validation" // 400 / 422
  | "unauthorized" // 401
  | "forbidden" // 403
  | "not_found" // 404
  | "server" // 5xx
  | "invalid_response" // 2xx, but not the shape we expect
  | "unknown";

export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  readonly status?: number;
  /** The backend's error body, for field-level details. */
  readonly details?: unknown;

  constructor(kind: ApiErrorKind, message: string, options: { status?: number; details?: unknown } = {}) {
    super(message);
    this.name = "ApiError";
    this.kind = kind;
    this.status = options.status;
    this.details = options.details;
  }
}

export const isApiError = (error: unknown): error is ApiError => error instanceof ApiError;

const baseURL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").trim().replace(/\/$/, "");

export const apiClient = axios.create({
  baseURL,
  timeout: 20_000,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  if (!baseURL) {
    throw new ApiError("config", "NEXT_PUBLIC_API_BASE_URL is not set for this environment.");
  }
  return config;
});

function kindForStatus(status: number): ApiErrorKind {
  if (status === 400 || status === 422) return "validation";
  if (status === 401) return "unauthorized";
  if (status === 403) return "forbidden";
  if (status === 404) return "not_found";
  if (status >= 500) return "server";
  return "unknown";
}

/** The backend replies `{ error, message }` (Spring); prefer `message`. */
function backendMessage(data: unknown): string | undefined {
  if (!data || typeof data !== "object") return undefined;
  const { message, error } = data as { message?: unknown; error?: unknown };
  if (typeof message === "string" && message) return message;
  if (typeof error === "string" && error) return error;
  return undefined;
}

apiClient.interceptors.response.use(undefined, (error: unknown) => {
  if (isApiError(error)) return Promise.reject(error);
  if (!(error instanceof AxiosError)) {
    return Promise.reject(new ApiError("unknown", error instanceof Error ? error.message : "Request failed."));
  }
  if (error.code === AxiosError.ECONNABORTED || error.code === AxiosError.ETIMEDOUT) {
    return Promise.reject(new ApiError("timeout", "The server took too long to respond."));
  }
  if (!error.response) {
    return Promise.reject(new ApiError("network", "Couldn't reach the server."));
  }
  const { status, data } = error.response;
  return Promise.reject(
    new ApiError(kindForStatus(status), backendMessage(data) ?? `Request failed (HTTP ${status}).`, { status, details: data })
  );
});
