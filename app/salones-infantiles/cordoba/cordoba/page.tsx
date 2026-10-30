import type { Metadata } from "next";
import { AdSlot } from "@/components/ad-slot";
import { ListaFaq } from "@/components/faq";
import { BarraFiltros } from "@/components/filtros";
import { FilaSalon } from "@/components/fila-salon";
import { IndiceBarrios } from "@/components/indice-barrios";
import { JsonLd } from "@/components/json-ld";
import { MapaResultados } from "@/components/mapa";
import { Migas } from "@/components/migas";
import { Paginacion } from "@/components/paginacion";
import { SinResultados } from "@/components/vacio";
import { VistaListaMapa } from "@/components/vista-lista-mapa";
import { nombreCorto, contarBarrios } from "@/lib/barrios";
import { CONTEXTO_LOCAL, faqsCiudad, introCiudad, topBarriosTexto, ANIO } from "@/lib/contenido";
import { entero } from "@/lib/formato";
import { aplicarFiltros, hayFiltroDeIndex, leerFiltros, POR_PAGINA, querySin, type Filtros } from "@/lib/filtros";
import { listarSalones } from "@/lib/salones";
import { breadcrumbLd, faqLd, itemListLd } from "@/lib/schema";
import { barrioPath, CITY_PATH } from "@/lib/site";
import { Icon } from "@/components/icons";

export const revalidate = 691200;

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

function canonico(filtros: Filtros) {
  if (hayFiltroDeIndex(filtros)) return CITY_PATH;
  if (filtros.page > 1) return `${CITY_PATH}?page=${filtros.page}`;
  return CITY_PATH;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const filtros = leerFiltros(await searchParams);
  const salones = await listarSalones();
  const title = `Salones de fiestas infantiles en Córdoba`;
  const description = `En Córdoba relevamos ${salones.length} salones de fiestas infantiles y peloteros. Todavía estamos juntando precios. Año ${ANIO}.`;
  return {
    title,
    description,
    alternates: { canonical: canonico(filtros) },
    robots: hayFiltroDeIndex(filtros) ? { index: false, follow: true } : { index: true, follow: true },
  };
}

export default async function HubCiudad({ searchParams }: Props) {
  const filtros = leerFiltros(await searchParams);
  const salones = await listarSalones();
  const filtrados = aplicarFiltros(salones, filtros);
  const paginas = Math.max(1, Math.ceil(filtrados.length / POR_PAGINA));
  const pagina = Math.min(filtros.page, paginas);
  const visibles = filtrados.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA);
  const hubs = contarBarrios(salones.map((salon) => salon.barrio)).filter((barrio) => barrio.indexable);
  const faqs = faqsCiudad(salones);
  const migas = [
    { nombre: "Inicio", href: "/" },
    { nombre: "Córdoba" },
    { nombre: "Córdoba Capital" },
  ];
  const top = topBarriosTexto(salones);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-28 pt-6">
      <JsonLd data={breadcrumbLd(migas)} />
      <JsonLd data={itemListLd("Salones de fiestas infantiles en Córdoba Capital", filtrados)} />
      <JsonLd data={faqLd(faqs)} />
      <Migas items={migas} />
      <div className="mt-4 grid items-end gap-4 md:grid-cols-12">
        <div className="md:col-span-8">
          <p className="kicker text-brand-800">Salones infantiles</p>
          <h1 className="font-display text-4xl font-medium leading-[1.02] tracking-tight md:text-6xl">Salones infantiles en Córdoba Capital</h1>
        </div>
        <p className="flex items-baseline gap-3 md:col-span-4 md:justify-end">
          <span className="num text-6xl leading-none text-brand-700 md:text-7xl">{entero(salones.length)}</span>
          <span className="max-w-[10rem] text-sm text-ink-700">
            {salones.some((salon) => salon.fuente === "google") ? "salones con datos de Google" : "salones en el directorio"}
          </span>
        </p>
      </div>
      <p className="mt-3 max-w-2xl text-ink-700">{introCiudad(salones.length)}</p>
      <p className="mt-3 max-w-2xl text-ink-700">{CONTEXTO_LOCAL}</p>
      {top ? <p className="mt-3 max-w-2xl text-ink-700">Barrios con más salones en Córdoba: {top}.</p> : null}
      <nav aria-label="Barrios" className="mt-4">
        <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
          {hubs.map((barrio) => (
            <li key={barrio.slug}>
              <a href={barrioPath(barrio.slug)} className="ulink decoration-ink-300">
                {nombreCorto(barrio.barrio)} <span className="text-ink-500">{entero(barrio.cantidad)}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <BarraFiltros filtros={{ ...filtros, page: pagina }} />
      <VistaListaMapa
        lista={
          <>
            <div className="flex items-center justify-between py-3 text-sm">
              <p aria-live="polite">
                <b className="num">{entero(filtrados.length)}</b> resultados
              </p>
              <div className="flex gap-3 font-bold">
                <a className={filtros.orden === "directorio" ? "text-ink-900" : "ulink"} href={`${CITY_PATH}${querySin({ ...filtros, orden: "directorio", page: 1 }, ["page"])}`}>
                  Directorio
                </a>
                <a className={filtros.orden === "nombre" ? "text-ink-900" : "ulink"} href={`${CITY_PATH}${querySin({ ...filtros, orden: "nombre", page: 1 }, ["page"])}`}>
                  Nombre
                  <Icon name="chevron" className="ml-1 inline h-4 w-4" />
                </a>
              </div>
            </div>
            {visibles.length === 0 ? <SinResultados filtros={filtros} /> : null}
            {visibles.map((salon, indice) => (
              <div key={salon.placeId}>
                <FilaSalon salon={salon} numero={(pagina - 1) * POR_PAGINA + indice + 1} />
                {indice === 2 ? <AdSlot id="listado-despues-de-03" /> : null}
              </div>
            ))}
            {visibles.length > 0 && visibles.length < 3 ? <AdSlot id="listado-antes-de-faq" /> : null}
            <Paginacion filtros={{ ...filtros, page: pagina }} paginas={paginas} />
          </>
        }
        mapa={<MapaResultados salones={visibles} numerosDesde={(pagina - 1) * POR_PAGINA + 1} className="h-full" />}
      />
      <IndiceBarrios barrios={contarBarrios(salones.map((salon) => salon.barrio))} />
      <ListaFaq faqs={faqs} />
    </div>
  );
}
