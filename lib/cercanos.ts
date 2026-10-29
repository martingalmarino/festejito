import { metrosEntre } from "./geo";
import type { Salon } from "./types";

export function cercanosDe(salon: Salon, todos: Salon[], limite = 3) {
  if (!salon.ubicacion) return [];
  const origen = salon.ubicacion;
  return todos
    .filter((otro) => otro.placeId !== salon.placeId && otro.ubicacion)
    .map((otro) => ({ salon: otro, metros: metrosEntre(origen, otro.ubicacion as NonNullable<Salon["ubicacion"]>) }))
    .sort((a, b) => a.metros - b.metros)
    .slice(0, limite);
}

export function vecinosEnDosKm(barrioSlug: string, todos: Salon[]) {
  const propios = todos.filter((salon) => salon.barrioSlug === barrioSlug && salon.ubicacion);
  if (propios.length === 0) return [];
  return todos
    .filter((salon) => salon.barrioSlug !== barrioSlug && salon.ubicacion)
    .map((salon) => ({
      salon,
      metros: Math.min(
        ...propios.map((propio) => metrosEntre(propio.ubicacion as NonNullable<Salon["ubicacion"]>, salon.ubicacion as NonNullable<Salon["ubicacion"]>)),
      ),
    }))
    .filter((fila) => fila.metros <= 2000)
    .sort((a, b) => a.metros - b.metros);
}
