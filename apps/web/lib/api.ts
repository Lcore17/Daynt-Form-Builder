// Prefer rewrite in production so the browser stays same-origin with the frontend.
const defaultBase = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:4000/api';
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || defaultBase;

export async function api(path: string, init: RequestInit = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(init.headers || {}) },
    ...init,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
