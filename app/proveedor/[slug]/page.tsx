import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FichaView } from "@/components/ficha-view";
import { JsonLd } from "@/components/json-ld";
import { detalleCompleto } from "@/lib/google";
import { salonPorSlug, listarSalones } from "@/lib/salones";
import { breadcrumbLd, localBusinessLd } from "@/lib/schema";
import { barrioPath, CITY_PATH, fichaPath } from "@/lib/site";
import type { Salon } from "@/lib/types";

export const revalidate = 691200;
export const dynamicParams = true;

export function generateStaticParams() {
  return [];
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
  const salon = await salonPorSlug(slug);
  if (!salon) return { title: "Salón" };
  return {
    title: `${salon.nombre} en ${salon.barrio}, Córdoba`,
    description: salon.direccion
      ? `${salon.nombre}, salón infantil en ${salon.barrio}, Córdoba. ${salon.direccion}`
      : `${salon.nombre}, salón infantil en ${salon.barrio}, Córdoba Capital.`,
    alternates: { canonical: fichaPath(salon.slug) },
    robots: { index: true, follow: true },
  };
}

export default async function Ficha({ params }: Props) {
  const { slug } = await params;
  const salones = await listarSalones();
  const base = salones.find((item) => item.slug === slug);
  if (!base) notFound();
  const salon = await conDetalleCompleto(base);
  const cantidadBarrio = salones.filter((item) => item.barrioSlug === salon.barrioSlug).length;
  const migas = [
    { nombre: "Inicio", href: "/" },
    { nombre: "Córdoba" },
    { nombre: "Córdoba Capital", href: CITY_PATH },
    { nombre: salon.barrio, href: cantidadBarrio >= 3 ? barrioPath(salon.barrioSlug) : `${CITY_PATH}?barrio=${salon.barrioSlug}` },
    { nombre: salon.nombre },
  ];
  return (
    <>
      <JsonLd data={breadcrumbLd(migas)} />
      <JsonLd data={localBusinessLd(salon)} />
      <FichaView salon={salon} todos={salones} />
    </>
  );
}
