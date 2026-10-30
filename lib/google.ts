import { unstable_noStore } from "next/cache";
import { leerSemillas } from "./catalogo";
import type { Horarios, PeriodoHorario, Punto } from "./types";

const MASCARA_BASICA = "id,displayName,formattedAddress,location,googleMapsUri";
const MASCARA_COMPLETA =
  "nationalPhoneNumber,websiteUri,rating,userRatingCount,regularOpeningHours,photos";

const REVALIDAR = 60 * 60 * 24 * 8;
const MAX_A_LA_VEZ = 2;
const PAUSA_MS = 200;
const VENTANA_MS = 60_000;

let enCurso = 0;
let ultimoInicio = 0;
let cadena: Promise<void> = Promise.resolve();
let hueco: (() => void) | null = null;
const inicios: number[] = [];

function dormir(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

function maxPorMinuto() {
  const crudo = process.env.PLACES_MAX_POR_MINUTO;
  if (crudo == null || crudo.trim() === "") return 60;
  const n = Number(crudo);
  if (!Number.isFinite(n) || n < 1) return 60;
  return Math.floor(n);
}

function entrarCola() {
  const turno = cadena.then(prepararTurno);
  cadena = turno.then(
    () => undefined,
    () => undefined,
  );
  return turno;
}

async function prepararTurno() {
  while (enCurso >= MAX_A_LA_VEZ) {
    await new Promise<void>((resolve) => {
      if (enCurso < MAX_A_LA_VEZ) {
        resolve();
        return;
      }
      hueco = resolve;
    });
  }
  const limite = maxPorMinuto();
  for (;;) {
    const ahora = Date.now();
    while (inicios.length && ahora - inicios[0] >= VENTANA_MS) inicios.shift();
    if (inicios.length < limite) break;
    await dormir(VENTANA_MS - (ahora - inicios[0]));
  }
  const delta = ultimoInicio === 0 ? PAUSA_MS : Date.now() - ultimoInicio;
  if (delta < PAUSA_MS) await dormir(PAUSA_MS - delta);
  enCurso += 1;
  ultimoInicio = Date.now();
  inicios.push(ultimoInicio);
}

function salirCola() {
  enCurso -= 1;
  const despertar = hueco;
  hueco = null;
  if (despertar) despertar();
}

export type DetalleGoogle = {
  nombre: string | null;
  direccion: string | null;
  telefono: string | null;
  web: string | null;
  rating: number | null;
  cantidadResenas: number | null;
  horarios: Horarios | null;
  ubicacion: Punto | null;
  mapsUrl: string | null;
  fotoNombre: string | null;
  fotoAutores: string[];
};

type FotoApi = { name?: string; authorAttributions?: Array<{ displayName?: string }> };

type DetalleApi = {
  displayName?: { text?: string };
  formattedAddress?: string;
  nationalPhoneNumber?: string;
  websiteUri?: string;
  rating?: number;
  userRatingCount?: number;
  regularOpeningHours?: {
    periods?: PeriodoHorario[];
    weekdayDescriptions?: string[];
  };
  location?: { latitude?: number; longitude?: number };
  googleMapsUri?: string;
  photos?: FotoApi[];
};

function limpiar(detalle: DetalleApi): DetalleGoogle {
  const periodos = detalle.regularOpeningHours?.periods?.filter((periodo) => periodo.open) ?? [];
  const descripciones = detalle.regularOpeningHours?.weekdayDescriptions ?? [];
  const lat = detalle.location?.latitude;
  const lng = detalle.location?.longitude;
  const foto = detalle.photos?.[0];
  const autores = (foto?.authorAttributions ?? [])
    .map((autor) => autor.displayName?.trim())
    .filter((nombre): nombre is string => Boolean(nombre));
  return {
    nombre: detalle.displayName?.text?.trim() || null,
    direccion: detalle.formattedAddress?.trim() || null,
    telefono: detalle.nationalPhoneNumber?.trim() || null,
    web: detalle.websiteUri?.trim() || null,
    rating: typeof detalle.rating === "number" ? detalle.rating : null,
    cantidadResenas: typeof detalle.userRatingCount === "number" ? detalle.userRatingCount : null,
    horarios: periodos.length || descripciones.length ? { periodos, descripciones } : null,
    ubicacion: typeof lat === "number" && typeof lng === "number" ? { lat, lng } : null,
    mapsUrl: detalle.googleMapsUri ?? null,
    fotoNombre: foto?.name ?? null,
    fotoAutores: autores,
  };
}

export function hayClavePlaces() {
  return Boolean(process.env.GOOGLE_PLACES_API_KEY);
}

function enBuild() {
  return process.env.NEXT_PHASE === "phase-production-build";
}

const memoria = new Map<string, { vence: number; detalle: DetalleGoogle }>();

async function pedirDetalle(placeId: string, mascara: string): Promise<DetalleGoogle | null> {
  if (enBuild()) return null;
  const clave = process.env.GOOGLE_PLACES_API_KEY;
  if (!clave) return null;
  const claveMemoria = `${mascara}\n${placeId}`;
  const guardado = memoria.get(claveMemoria);
  if (guardado && guardado.vence > Date.now()) return guardado.detalle;
  await entrarCola();
  try {
    let respuesta: Response;
    try {
      respuesta = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
        headers: {
          "X-Goog-Api-Key": clave,
          "X-Goog-FieldMask": mascara,
          "Accept-Language": "es",
        },
        next: { revalidate: REVALIDAR },
      });
    } catch {
      console.error("Place Details no disponible");
      return null;
    }
    if (respuesta.status !== 200) {
      console.error("Place Details respondió", respuesta.status);
      unstable_noStore();
      return null;
    }
    try {
      const detalle = limpiar((await respuesta.json()) as DetalleApi);
      memoria.set(claveMemoria, { vence: Date.now() + REVALIDAR * 1000, detalle });
      return detalle;
    } catch {
      console.error("Place Details no disponible");
      return null;
    }
  } finally {
    salirCola();
  }
}

function enCatalogo(placeId: string) {
  return leerSemillas().some((semilla) => semilla.placeId === placeId);
}

export async function detalleBasico(placeId: string) {
  if (!enCatalogo(placeId)) return null;
  return pedirDetalle(placeId, MASCARA_BASICA);
}

export async function detalleCompleto(placeId: string) {
  if (!enCatalogo(placeId)) return null;
  return pedirDetalle(placeId, MASCARA_COMPLETA);
}

export async function bytesFoto(fotoNombre: string) {
  if (process.env.NEXT_PHASE === "phase-production-build") return null;
  const clave = process.env.GOOGLE_PLACES_API_KEY;
  if (!clave || !fotoNombre.startsWith("places/")) return null;
  const meta = await fetch(
    `https://places.googleapis.com/v1/${fotoNombre}/media?maxHeightPx=900&maxWidthPx=1200&skipHttpRedirect=true`,
    {
      headers: { "X-Goog-Api-Key": clave },
      next: { revalidate: REVALIDAR },
    },
  );
  if (!meta.ok) return null;
  const cuerpo = (await meta.json()) as { photoUri?: string };
  if (!cuerpo.photoUri) return null;
  const imagen = await fetch(cuerpo.photoUri, { next: { revalidate: REVALIDAR } });
  if (!imagen.ok) return null;
  const buffer = await imagen.arrayBuffer();
  return {
    buffer,
    tipo: imagen.headers.get("content-type") ?? "image/jpeg",
  };
}

