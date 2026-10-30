import { cache } from "react";
import { leerSemillas, type Semilla } from "./catalogo";
import type { Salon } from "./types";

function armar(semilla: Semilla): Salon {
  return {
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
}

export const listarSalones = cache(async (): Promise<Salon[]> => {
  return leerSemillas().map(armar);
});

export async function salonPorSlug(slug: string) {
  const salones = await listarSalones();
  return salones.find((salon) => salon.slug === slug) ?? null;
}
