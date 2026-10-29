import { contarBarrios } from "./barrios";
import type { Salon } from "./types";

export const ANIO = 2026;
export const CIUDAD = "Córdoba";
export const CIUDAD_HUB = "Córdoba Capital";
export const PROVINCIA = "Córdoba";
export const FUENTE_BARRIOS = "https://es.wikipedia.org/wiki/Anexo:Barrios_de_la_ciudad_de_Córdoba";

export type Faq = { q: string; a: string };

/** intro_fallback_sin_precios de contenido/plantillas.json, con las variables completas. */
export function introCiudad(n: number) {
  return `En ${CIUDAD} relevamos ${n} salones de fiestas infantiles y peloteros, con datos de su web o sus redes oficiales. Todavía estamos juntando precios: si consultaste uno, contanos cuánto te pasaron.`;
}

export const CONTEXTO_LOCAL =
  "Córdoba Capital es la segunda ciudad más poblada del país (fuente: INDEC / Wikipedia) y se organiza en cientos de barrios. Para buscar salón, las zonas que más se consultan suelen ser el norte y el noroeste de la ciudad, más el centro y los barrios pericentrales. Ojo: este directorio cubre la ciudad, no el Gran Córdoba (Villa Allende, Mendiolaza, Malagueño y otras localidades tienen su propio municipio).";

export function faqsCiudad(salones: Salon[]): Faq[] {
  const conteos = contarBarrios(salones.map((salon) => salon.barrio));
  const destacado = conteos.find((barrio) => barrio.indexable);
  const faqs: Faq[] = [
    {
      q: "¿Festejito cubre Villa Allende o Carlos Paz?",
      a: "Todavía no: por ahora solo la ciudad de Córdoba.",
    },
    {
      q: "¿Qué incluye normalmente un pelotero?",
      a: "Varía por lugar. Revisá en cada ficha si incluye animación, comida, torta e invitaciones.",
    },
  ];
  if (destacado) {
    faqs.push({
      q: `¿Hay salones infantiles en ${destacado.barrio}?`,
      a: `Sí, tenemos ${destacado.cantidad} en ${destacado.barrio}.`,
    });
  }
  return faqs;
}

export function introBarrio(barrio: string, n: number, vecinos: string[]) {
  if (vecinos.length === 0) {
    return `En ${barrio} hay ${n} salones y peloteros relevados.`;
  }
  return `En ${barrio} hay ${n} salones y peloteros relevados, y ${vecinos.length} más en barrios vecinos como ${listaNatural(vecinos)}.`;
}

export function faqsBarrio(barrio: string, propios: string[], cercanos: string[]): Faq[] {
  if (propios.length === 0 || cercanos.length === 0) return [];
  return [
    {
      q: `¿Qué salones infantiles hay cerca de ${barrio}?`,
      a: `${listaNatural(propios)} y, en barrios vecinos, ${listaNatural(cercanos)}.`,
    },
  ];
}

export function bloqueBarrio(barrio: string, n: number) {
  return `${barrio} es un barrio de ${CIUDAD} (${FUENTE_BARRIOS}). Salones relevados: ${n}.`;
}

function listaNatural(items: string[]) {
  if (items.length <= 1) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} y ${items[items.length - 1]}`;
}

export function topBarriosTexto(salones: Salon[]) {
  return contarBarrios(salones.map((salon) => salon.barrio))
    .filter((barrio) => barrio.indexable)
    .map((barrio) => barrio.barrio)
    .join(", ")
    .replace(/, ([^,]*)$/, " y $1");
}
