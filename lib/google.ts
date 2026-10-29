import type { Horarios, PeriodoHorario, Punto } from "./types";

const CAMPO =
  "displayName,formattedAddress,nationalPhoneNumber,websiteUri,rating,userRatingCount,regularOpeningHours,location,googleMapsUri,photos";

const REVALIDAR = 60 * 60 * 20;

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

export async function detallePlace(placeId: string): Promise<DetalleGoogle | null> {
  const clave = process.env.GOOGLE_PLACES_API_KEY;
  if (!clave) return null;
  try {
    const respuesta = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
      headers: {
        "X-Goog-Api-Key": clave,
        "X-Goog-FieldMask": CAMPO,
        "Accept-Language": "es",
      },
      next: { revalidate: REVALIDAR },
    });
    if (!respuesta.ok) {
      console.error("Place Details respondió", respuesta.status);
      return null;
    }
    return limpiar((await respuesta.json()) as DetalleApi);
  } catch {
    console.error("Place Details no disponible");
    return null;
  }
}

export async function bytesFoto(fotoNombre: string) {
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

