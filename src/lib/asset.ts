/** Prefix static paths for GitHub Pages (`/huaming-hub`). */
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
