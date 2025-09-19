// src/services/api.ts

// Use Vite env for base URL
const BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

export async function apiFetch(path: string, opts: RequestInit = {}) {
  // Try sessionStorage first (set after officer logs in)
  let token = sessionStorage.getItem("API_KEY");

  // Fallback to env key if no token in session
  if (!token && import.meta.env.VITE_API_KEY) {
    token = import.meta.env.VITE_API_KEY;
  }

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...((opts.headers as Record<string, string>) || {}),
  };

  // Only set Content-Type for non-FormData requests
  if (!headers["Content-Type"] && !(opts.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  // Attach Authorization header if token available
  if (token) headers["Authorization"] = `ApiKey ${token}`;

  const res = await fetch(`${BASE}${path}`, { ...opts, headers });

  if (res.status === 401) {
    // Redirect to login page if unauthorized
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  const text = await res.text();
  try {
    return JSON.parse(text || "{}");
  } catch {
    return text;
  }
}
