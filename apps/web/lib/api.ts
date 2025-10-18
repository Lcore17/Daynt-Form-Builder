// Always prefer same-origin requests in the browser so rewrites proxy to the API and cookies work.
// For local dev, Next.js rewrites route /api -> http://localhost:4000/api (see next.config.js)
const isServer = typeof window === 'undefined';
const defaultBase = isServer ? (process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api') : '/api';
export const API_BASE = defaultBase;

export async function api(path: string, init: RequestInit = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(init.headers || {}) },
    ...init,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
