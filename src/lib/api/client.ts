export class ApiError extends Error {
  constructor(public readonly status: number, public readonly details: unknown) {
    super(`API request failed (${status})`);
    this.name = "ApiError";
  }
}

// Public JSON endpoints only. Configure authentication when Laravel is ready.
export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) throw new Error("Set NEXT_PUBLIC_API_URL in .env.local before calling the API.");

  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");
  if (typeof options.body === "string" && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/${path.replace(/^\/+/, "")}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const details: unknown = await response.json().catch(() => null);
    throw new ApiError(response.status, details);
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}
