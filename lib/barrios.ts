import { slugify } from "./slug";

/** Nombres de contenido/ciudades/cordoba.md, sección de barrios. */
export const BARRIOS_CONTENIDO = [
  "Nueva Córdoba",
  "Güemes",
  "General Paz",
  "Alta Córdoba",
  "Cerro de las Rosas",
  "Villa Belgrano",
  "Argüello",
  "Jardín",
  "Alberdi",
  "San Vicente",
] as const;

/** Orden del diseño v5 para los hubs que hoy superan el umbral. */
export const ORDEN_HUBS = [
  "Alta Córdoba",
  "Alberdi",
  "General Pueyrredón",
  "Argüello",
  "Villa Belgrano",
] as const;

export const UMBRAL_HUB = 3;

const NOMBRE_CORTO: Record<string, string> = {
  "General Pueyrredón": "Gral. Pueyrredón",
};

export function enListaContenido(barrio: string) {
  return (BARRIOS_CONTENIDO as readonly string[]).includes(barrio);
}

export function nombreCorto(barrio: string) {
  return NOMBRE_CORTO[barrio] ?? barrio;
}

export function esHub(cantidad: number) {
  return cantidad >= UMBRAL_HUB;
}

export type ConteoBarrio = {
  barrio: string;
  slug: string;
  cantidad: number;
  indexable: boolean;
  enContenido: boolean;
};

export function contarBarrios(barrios: string[]): ConteoBarrio[] {
  const map = new Map<string, number>();
  for (const barrio of barrios) map.set(barrio, (map.get(barrio) ?? 0) + 1);
  const lista = [...map.entries()].map(([barrio, cantidad]) => ({
    barrio,
    slug: slugify(barrio),
    cantidad,
    indexable: esHub(cantidad),
    enContenido: enListaContenido(barrio),
  }));
  lista.sort((a, b) => {
    const ia = ORDEN_HUBS.indexOf(a.barrio as (typeof ORDEN_HUBS)[number]);
    const ib = ORDEN_HUBS.indexOf(b.barrio as (typeof ORDEN_HUBS)[number]);
    if (a.indexable && b.indexable && ia !== -1 && ib !== -1) return ia - ib;
    if (a.indexable !== b.indexable) return a.indexable ? -1 : 1;
    return a.barrio.localeCompare(b.barrio, "es");
  });
  return lista;
}

export function compararDirectorio(a: { barrio: string; placeId: string }, b: { barrio: string; placeId: string }) {
  const ia = ORDEN_HUBS.indexOf(a.barrio as (typeof ORDEN_HUBS)[number]);
  const ib = ORDEN_HUBS.indexOf(b.barrio as (typeof ORDEN_HUBS)[number]);
  const ha = ia === -1 ? 100 : ia;
  const hb = ib === -1 ? 100 : ib;
  if (ha !== hb) return ha - hb;
  const porNombre = a.barrio.localeCompare(b.barrio, "es");
  if (porNombre !== 0) return porNombre;
  return a.placeId.localeCompare(b.placeId);
}
