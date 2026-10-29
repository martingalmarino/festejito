export type Punto = { lat: number; lng: number };

export type PeriodoHorario = {
  open: { day: number; hour: number; minute: number };
  close?: { day: number; hour: number; minute: number };
};

export type Horarios = {
  periodos: PeriodoHorario[];
  descripciones: string[];
};

export type AtribucionFoto = { nombre: string };

export type PrecioDueno = {
  placeId: string;
  precioMin: number;
  precioMax: number;
  /** Fecha ISO YYYY-MM-DD en la que el dueño verificó el precio. */
  verificadoEl: string;
};

export type FuenteDatos = "google" | "ejemplo" | "basico";

export type Salon = {
  placeId: string;
  barrio: string;
  barrioSlug: string;
  slug: string;
  nombre: string;
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
  fuente: FuenteDatos;
};

export type EstadoHorario =
  | { tipo: "abierto"; hasta: string }
  | { tipo: "cerrado"; abre: string }
  | { tipo: "sin-dato" };
