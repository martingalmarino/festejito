import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FichaView } from "@/components/ficha-view";
import { JsonLd } from "@/components/json-ld";
import { leerSemillas } from "@/lib/catalogo";
import { salonPorSlug, listarSalones } from "@/lib/salones";
import { breadcrumbLd, localBusinessLd } from "@/lib/schema";
import { barrioPath, CITY_PATH, fichaPath } from "@/lib/site";

export const revalidate = 72000;
export const dynamicParams = false;

export function generateStaticParams() {
  return leerSemillas().map((semilla) => ({ slug: semilla.slug }));
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
  const salon = salones.find((item) => item.slug === slug);
  if (!salon) notFound();
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
