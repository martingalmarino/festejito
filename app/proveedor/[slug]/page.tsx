import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FichaView } from "@/components/ficha-view";
import { JsonLd } from "@/components/json-ld";
import { leerSemillas, type Semilla } from "@/lib/catalogo";
import { detalleCompleto, hayClavePlaces } from "@/lib/google";
import { breadcrumbLd, localBusinessLd } from "@/lib/schema";
import { barrioPath, CITY_PATH, fichaPath } from "@/lib/site";
import type { Salon } from "@/lib/types";

export const revalidate = 691200;
export const dynamicParams = true;

export function generateStaticParams() {
  return [];
}

function salonLocal(semilla: Semilla, indice: number): Salon {
  const ejemplo = !hayClavePlaces() && process.env.NODE_ENV !== "production";
  return {
    placeId: semilla.placeId,
    barrio: semilla.barrio,
    barrioSlug: semilla.barrioSlug,
    slug: semilla.slug,
    nombre: ejemplo ? `Salón de ejemplo ${String(indice + 1).padStart(2, "0")}` : `Salón infantil en ${semilla.barrio}`,
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
    fuente: ejemplo ? "ejemplo" : "basico",
  };
}

async function conDetalleCompleto(salon: Salon): Promise<Salon> {
  const extra = await detalleCompleto(salon.placeId);
  if (!extra) return salon;
  const hayExtra =
    extra.telefono || extra.web || extra.rating !== null || extra.cantidadResenas !== null || extra.horarios || extra.fotoNombre;
  if (!hayExtra) return salon;
  return {
    ...salon,
    telefono: extra.telefono,
    web: extra.web,
    rating: extra.rating,
    cantidadResenas: extra.cantidadResenas,
    horarios: extra.horarios,
    fotoNombre: extra.fotoNombre,
    fotoAutores: extra.fotoAutores,
    fuente: salon.fuente === "ejemplo" ? "ejemplo" : "google",
  };
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const semillas = leerSemillas();
  const indice = semillas.findIndex((semilla) => semilla.slug === slug);
  if (indice < 0) return { title: "Salón" };
  const salon = salonLocal(semillas[indice], indice);
  return {
    title: `${salon.nombre} en ${salon.barrio}, Córdoba`,
    description: `${salon.nombre}, salón infantil en ${salon.barrio}, Córdoba Capital.`,
    alternates: { canonical: fichaPath(salon.slug) },
    robots: { index: true, follow: true },
  };
}

export default async function Ficha({ params }: Props) {
  const { slug } = await params;
  const semillas = leerSemillas();
  const indice = semillas.findIndex((semilla) => semilla.slug === slug);
  if (indice < 0) notFound();
  const semilla = semillas[indice];
  const salon = await conDetalleCompleto(salonLocal(semilla, indice));
  const delBarrio = semillas.filter((item) => item.barrioSlug === semilla.barrioSlug);
  const cercanos = delBarrio
    .filter((item) => item.slug !== semilla.slug)
    .slice(0, 3)
    .map((item) => ({ slug: item.slug, barrio: item.barrio }));
  const migas = [
    { nombre: "Inicio", href: "/" },
    { nombre: "Córdoba" },
    { nombre: "Córdoba Capital", href: CITY_PATH },
    { nombre: salon.barrio, href: delBarrio.length >= 3 ? barrioPath(salon.barrioSlug) : `${CITY_PATH}?barrio=${salon.barrioSlug}` },
    { nombre: salon.nombre },
  ];
  return (
    <>
      <JsonLd data={breadcrumbLd(migas)} />
      <JsonLd data={localBusinessLd(salon)} />
      <FichaView salon={salon} cercanos={cercanos} cantidadBarrio={delBarrio.length} />
    </>
  );
}
