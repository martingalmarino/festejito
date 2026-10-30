import type { Punto } from "./types";

export function metrosEntre(a: Punto, b: Punto) {
  const radio = 6_371_000;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * radio * Math.asin(Math.min(1, Math.sqrt(h)));
}

export function proyectar(puntos: Array<Punto | null>) {
  const validos = puntos.filter((p): p is Punto => p !== null);
  if (validos.length === 0) return puntos.map(() => null);
  const lats = validos.map((p) => p.lat);
  const lngs = validos.map((p) => p.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const margen = 0.12;
  return puntos.map((punto) => {
    if (!punto) return null;
    const x = margen + (1 - 2 * margen) * ((punto.lng - minLng) / (maxLng - minLng || 1));
    const y = margen + (1 - 2 * margen) * ((maxLat - punto.lat) / (maxLat - minLat || 1));
    return { left: `${(x * 100).toFixed(2)}%`, top: `${(y * 100).toFixed(2)}%` };
  });
}
