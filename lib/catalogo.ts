import { readFileSync } from "fs";
import path from "path";
import { compararDirectorio } from "./barrios";
import { slugify, venueSlug } from "./slug";

export type Semilla = {
  placeId: string;
  barrio: string;
  barrioSlug: string;
  slug: string;
};

let cache: Semilla[] | null = null;

export function leerSemillas(): Semilla[] {
  if (cache) return cache;
  const archivo = path.join(process.cwd(), "data/place_ids_cordoba.csv");
  const texto = readFileSync(archivo, "utf8");
  const filas = texto
    .trim()
    .split(/\r?\n/)
    .slice(1)
    .map((linea) => {
      const [placeId, clasificacion, ...resto] = linea.split(",");
      const barrio = resto.join(",").trim();
      if (clasificacion !== "infantil" || !placeId || !barrio) return null;
      return {
        placeId,
        barrio,
        barrioSlug: slugify(barrio),
        slug: venueSlug(barrio, placeId),
      };
    })
    .filter((fila): fila is Semilla => fila !== null);
  filas.sort(compararDirectorio);
  cache = filas;
  return filas;
}
