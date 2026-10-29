import { cache } from "react";
import { leerSemillas, type Semilla } from "./catalogo";
import { detalleBasico, hayClavePlaces, type DetalleGoogle } from "./google";
import type { Salon } from "./types";

async function enLotes<T, R>(items: T[], tamano: number, tarea: (item: T) => Promise<R>) {
  const salida: R[] = new Array(items.length);
  let cursor = 0;
  async function trabajador() {
    while (cursor < items.length) {
      const indice = cursor;
      cursor += 1;
      salida[indice] = await tarea(items[indice]);
    }
  }
  const trabajadores = Math.min(tamano, items.length);
  await Promise.all(Array.from({ length: trabajadores }, () => trabajador()));
  return salida;
}

function armar(semilla: Semilla, detalle: DetalleGoogle | null, indice: number): Salon {
  const base: Salon = {
    placeId: semilla.placeId,
    barrio: semilla.barrio,
    barrioSlug: semilla.barrioSlug,
    slug: semilla.slug,
    nombre: `Salón infantil en ${semilla.barrio}`,
    direccion: null,
    telefono: null,
    web: null,
    rating: null,
    cantidadResenas: null,
    horarios: null,
    ubicacion: null,
    mapsUrl: null,
    fotoNombre: null,
    fotoAutores: [],
    fuente: "basico",
  };
  if (detalle?.nombre) {
    return {
      ...base,
      nombre: detalle.nombre,
      direccion: detalle.direccion,
      ubicacion: detalle.ubicacion,
      mapsUrl: detalle.mapsUrl,
      fuente: "google",
    };
  }
  if (!hayClavePlaces() && process.env.NODE_ENV !== "production") {
    return {
      ...base,
      nombre: `Salón de ejemplo ${String(indice + 1).padStart(2, "0")}`,
      fuente: "ejemplo",
    };
  }
  return base;
}

export const listarSalones = cache(async (): Promise<Salon[]> => {
  const semillas = leerSemillas();
  if (!hayClavePlaces()) return semillas.map((semilla, indice) => armar(semilla, null, indice));
  const detalles = await enLotes(semillas, 6, (semilla) => detalleBasico(semilla.placeId));
  return semillas.map((semilla, indice) => armar(semilla, detalles[indice], indice));
});

export async function salonPorSlug(slug: string) {
  const salones = await listarSalones();
  return salones.find((salon) => salon.slug === slug) ?? null;
}
