import type { Salon } from "./types";

export function enlaceGoogle(salon: Salon) {
  if (salon.mapsUrl) return salon.mapsUrl;
  const consulta = encodeURIComponent(`${salon.nombre} ${salon.barrio} Córdoba`);
  return `https://www.google.com/maps/search/?api=1&query=${consulta}&query_place_id=${encodeURIComponent(salon.placeId)}`;
}

export function enlaceComoLlegar(salon: Salon) {
  const destino = encodeURIComponent(salon.direccion ?? `${salon.nombre}, ${salon.barrio}, Córdoba`);
  return `https://www.google.com/maps/dir/?api=1&destination=${destino}&destination_place_id=${encodeURIComponent(salon.placeId)}`;
}
