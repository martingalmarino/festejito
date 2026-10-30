import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/ad-slot";
import { ListaFaq } from "@/components/faq";
import { BarraFiltros } from "@/components/filtros";
import { FilaSalon } from "@/components/fila-salon";
import { JsonLd } from "@/components/json-ld";
import { MapaResultados } from "@/components/mapa";
import { Migas } from "@/components/migas";
import { VistaListaMapa } from "@/components/vista-lista-mapa";
import { contarBarrios, nombreCorto } from "@/lib/barrios";
import { bloqueBarrio, faqsBarrio, introBarrio } from "@/lib/contenido";
import { vecinosEnDosKm } from "@/lib/cercanos";
import { entero } from "@/lib/formato";
import { leerFiltros } from "@/lib/filtros";
import { listarSalones } from "@/lib/salones";
import { breadcrumbLd, faqLd, itemListLd } from "@/lib/schema";
import { barrioPath, CITY_PATH } from "@/lib/site";

export const revalidate = 691200;
export const dynamicParams = true;

export function generateStaticParams() {
  return [];
}

type Props = { params: Promise<{ barrio: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { barrio: slug } = await params;
  const salones = await listarSalones();
  const propios = salones.filter((salon) => salon.barrioSlug === slug);
  if (propios.length === 0) return { title: "Barrio" };
  const nombre = propios[0].barrio;
  const indexable = propios.length >= 3;
  return {
    title: `Salón de cumpleaños en ${nombre}, Córdoba: ${propios.length} opciones`,
    description: `Salones infantiles y peloteros en ${nombre} (Córdoba) y alrededores. Lo que incluye cada uno, cómo contactarlos y precios orientativos.`,
    alternates: { canonical: indexable ? barrioPath(slug) : CITY_PATH },
    robots: indexable ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function HubBarrio({ params }: Props) {
  const { barrio: slug } = await params;
  const salones = await listarSalones();
  const propios = salones.filter((salon) => salon.barrioSlug === slug);
  if (propios.length === 0) notFound();
  const nombre = propios[0].barrio;
  const vecinos = vecinosEnDosKm(slug, salones);
  const nombresVecinos = [...new Set(vecinos.map((fila) => fila.salon.barrio))];
  const faqs = faqsBarrio(
    nombre,
    propios.map((salon) => salon.nombre),
    vecinos.map((fila) => fila.salon.nombre),
  );
  const hubs = contarBarrios(salones.map((salon) => salon.barrio)).filter((barrio) => barrio.indexable);
  const migas = [
    { nombre: "Inicio", href: "/" },
    { nombre: "Córdoba" },
    { nombre: "Córdoba Capital", href: CITY_PATH },
    { nombre },
  ];
  const filtros = leerFiltros({});
  const mapa = [...propios, ...vecinos.map((fila) => fila.salon)];

  return (
    <div className="mx-auto max-w-7xl px-4 pb-28 pt-6">
      <JsonLd data={breadcrumbLd(migas)} />
      <JsonLd data={itemListLd(`Salones de cumpleaños infantiles en ${nombre}`, propios)} />
      <JsonLd data={faqs.length ? faqLd(faqs) : null} />
      <Migas items={migas} />
      <div className="mt-4 grid items-end gap-4 md:grid-cols-12">
        <div className="md:col-span-8">
          <p className="kicker text-brand-800">Salones infantiles</p>
          <h1 className="font-display text-4xl font-medium leading-[1.02] tracking-tight md:text-6xl">Salones infantiles en {nombre}</h1>
        </div>
        <p className="flex items-baseline gap-3 md:col-span-4 md:justify-end">
          <span className="num text-6xl leading-none text-brand-700 md:text-7xl">{entero(propios.length)}</span>
          <span className="max-w-[10rem] text-sm text-ink-700">salones en {nombreCorto(nombre)}</span>
        </p>
      </div>
      <p className="mt-3 max-w-2xl text-ink-700">{introBarrio(nombre, propios.length, nombresVecinos)}</p>
      <p className="mt-3 max-w-2xl text-sm text-ink-500">{bloqueBarrio(nombre, propios.length)}</p>
      <nav aria-label="Barrios" className="mt-4">
        <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
          {hubs.map((barrio) => (
            <li key={barrio.slug}>
              <a href={barrioPath(barrio.slug)} className="ulink decoration-ink-300" aria-current={barrio.slug === slug ? "page" : undefined}>
                {nombreCorto(barrio.barrio)} <span className="text-ink-500">{entero(barrio.cantidad)}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <BarraFiltros filtros={filtros} barrioNombre={nombre} />
      <VistaListaMapa
        lista={
          <>
            <div className="flex items-center justify-between py-3 text-sm">
              <p>
                <b className="num">{entero(propios.length)}</b> resultados
              </p>
            </div>
            {propios.map((salon, indice) => (
              <div key={salon.placeId}>
                <FilaSalon salon={salon} numero={indice + 1} />
                {indice === 2 ? <AdSlot id="barrio-despues-de-03" /> : null}
              </div>
            ))}
            {propios.length < 3 ? <AdSlot id="barrio-antes-de-faq" /> : null}
            {vecinos.length > 0 ? (
              <section className="mt-10" aria-labelledby="cerca">
                <p className="kicker text-brand-800">A menos de 2 km</p>
                <h2 id="cerca" className="font-display text-3xl font-medium">
                  Salones en barrios cercanos
                </h2>
                <p className="mt-2 text-ink-700">Completa la búsqueda cuando el barrio tiene pocas fichas.</p>
                {vecinos.map((fila, indice) => (
                  <FilaSalon key={fila.salon.placeId} salon={fila.salon} numero={propios.length + indice + 1} />
                ))}
                <a href={CITY_PATH} className="ulink mt-4 inline-flex font-bold">
                  Ver los {entero(salones.length)} salones de Córdoba Capital
                </a>
              </section>
            ) : null}
          </>
        }
        mapa={<MapaResultados salones={mapa} className="h-full" />}
      />
      <ListaFaq faqs={faqs} />
    </div>
  );
}
