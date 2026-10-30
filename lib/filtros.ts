import { slugify } from "./slug";
import type { Salon } from "./types";
import { estadoHorario } from "./horarios";
import { metrosEntre } from "./geo";

export type Rubro = "infantil" | "pelotero" | "eventos";
export type Orden = "directorio" | "nombre";

export type Filtros = {
  rubro: Rubro;
  barrio: string | null;
  rating4: boolean;
  abierto: boolean;
  telefono: boolean;
  q: string;
  lat: number | null;
  lng: number | null;
  page: number;
  orden: Orden;
};

function uno(valor: string | string[] | undefined) {
  return Array.isArray(valor) ? valor[0] : valor;
}

export function leerFiltros(sp: Record<string, string | string[] | undefined>): Filtros {
  const rubroRaw = uno(sp.rubro);
  const rubro: Rubro = rubroRaw === "pelotero" || rubroRaw === "eventos" ? rubroRaw : "infantil";
  const lat = Number(uno(sp.lat));
  const lng = Number(uno(sp.lng));
  const page = Math.max(1, Number(uno(sp.page)) || 1);
  const orden = uno(sp.orden) === "nombre" ? "nombre" : "directorio";
  return {
    rubro,
    barrio: uno(sp.barrio)?.trim() || null,
    rating4: uno(sp.nota) === "4",
    abierto: uno(sp.abierto) === "1",
    telefono: uno(sp.telefono) === "1",
    q: uno(sp.q)?.trim() ?? "",
    lat: Number.isFinite(lat) ? lat : null,
    lng: Number.isFinite(lng) ? lng : null,
    page,
    orden,
  };
}

export function hayFiltroDeIndex(filtros: Filtros) {
  return Boolean(
    filtros.barrio ||
      filtros.rubro !== "infantil" ||
      filtros.rating4 ||
      filtros.abierto ||
      filtros.telefono ||
      filtros.q ||
      filtros.lat !== null,
  );
}

export function aplicarFiltros(salones: Salon[], filtros: Filtros) {
  let lista = salones.filter((salon) => {
    if (filtros.rubro !== "infantil") return false;
    if (filtros.barrio && salon.barrioSlug !== filtros.barrio && slugify(salon.barrio) !== filtros.barrio) return false;
    if (filtros.rating4 && (salon.rating === null || salon.rating < 4)) return false;
    if (filtros.telefono && !salon.telefono) return false;
    if (filtros.abierto && estadoHorario(salon.horarios).tipo !== "abierto") return false;
    if (filtros.q) {
      const q = slugify(filtros.q);
      const texto = slugify(`${salon.nombre} ${salon.barrio} ${salon.direccion ?? ""}`);
      if (!texto.includes(q)) return false;
    }
    return true;
  });
  if (filtros.orden === "nombre") {
    lista = [...lista].sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
  }
  if (filtros.lat !== null && filtros.lng !== null) {
    const origen = { lat: filtros.lat, lng: filtros.lng };
    lista = [...lista].sort((a, b) => {
      if (!a.ubicacion && !b.ubicacion) return 0;
      if (!a.ubicacion) return 1;
      if (!b.ubicacion) return -1;
      return metrosEntre(origen, a.ubicacion) - metrosEntre(origen, b.ubicacion);
    });
  }
  return lista;
}

export const POR_PAGINA = 6;

export function querySin(filtros: Filtros, quitar: Array<keyof Filtros>) {
  const params = new URLSearchParams();
  if (!quitar.includes("rubro") && filtros.rubro !== "infantil") params.set("rubro", filtros.rubro);
  if (!quitar.includes("barrio") && filtros.barrio) params.set("barrio", filtros.barrio);
  if (!quitar.includes("rating4") && filtros.rating4) params.set("nota", "4");
  if (!quitar.includes("abierto") && filtros.abierto) params.set("abierto", "1");
  if (!quitar.includes("telefono") && filtros.telefono) params.set("telefono", "1");
  if (!quitar.includes("q") && filtros.q) params.set("q", filtros.q);
  if (!quitar.includes("lat") && filtros.lat !== null && filtros.lng !== null) {
    params.set("lat", String(filtros.lat));
    params.set("lng", String(filtros.lng));
  }
  if (!quitar.includes("orden") && filtros.orden === "nombre") params.set("orden", "nombre");
  if (!quitar.includes("page") && filtros.page > 1) params.set("page", String(filtros.page));
  const texto = params.toString();
  return texto ? `?${texto}` : "";
}
