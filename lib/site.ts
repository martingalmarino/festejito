export const CITY_PATH = "/salones-infantiles/cordoba/cordoba";

export function siteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return raw.replace(/\/$/, "");
}

export function absoluteUrl(path: string) {
  return `${siteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

export function barrioPath(slug: string) {
  return `${CITY_PATH}/${slug}`;
}

export function fichaPath(slug: string) {
  return `/proveedor/${slug}`;
}
