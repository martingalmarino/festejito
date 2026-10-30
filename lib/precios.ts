import preciosJson from "@/data/precios-dueno.json";
import type { PrecioDueno } from "./types";

function esPrecio(valor: unknown): valor is PrecioDueno {
  if (!valor || typeof valor !== "object") return false;
  const fila = valor as PrecioDueno;
  return (
    typeof fila.placeId === "string" &&
    typeof fila.precioMin === "number" &&
    typeof fila.precioMax === "number" &&
    typeof fila.verificadoEl === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(fila.verificadoEl) &&
    fila.precioMax >= fila.precioMin
  );
}

export function leerPrecios(): PrecioDueno[] {
  if (!Array.isArray(preciosJson)) return [];
  return preciosJson.filter(esPrecio);
}

export function precioDe(placeId: string) {
  return leerPrecios().find((precio) => precio.placeId === placeId) ?? null;
}

/** El badge se oculta cuando pasaron más de 6 meses. */
export function precioVigente(verificadoEl: string, ahora = new Date()) {
  const [y, m, d] = verificadoEl.split("-").map(Number);
  const fecha = new Date(Date.UTC(y, m - 1, d, 15));
  const limite = new Date(fecha);
  limite.setUTCMonth(limite.getUTCMonth() + 6);
  return ahora.getTime() <= limite.getTime();
}
