import { BusquedaHero } from "@/components/busqueda";
import { AdSlot } from "@/components/ad-slot";
import { Confetti, Serpentina } from "@/components/confetti";
import { HomeBento } from "@/components/home-bento";
import { Icon } from "@/components/icons";
import { contarBarrios } from "@/lib/barrios";
import { entero } from "@/lib/formato";
import { listarSalones } from "@/lib/salones";
import { CITY_PATH } from "@/lib/site";
import type { Metadata } from "next";

export const revalidate = 691200;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Salones de fiestas infantiles en Córdoba Capital",
  description:
    "Directorio de salones infantiles en Córdoba Capital. No es un ranking: las fichas muestran datos del lugar y el precio lo carga el salón.",
  alternates: { canonical: "/" },
};

export default async function Home() {
  const salones = await listarSalones();
  const barrios = contarBarrios(salones.map((salon) => salon.barrio));
  const conGoogle = salones.some((salon) => salon.fuente === "google");
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-10 md:pt-16">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="kicker text-brand-800">Directorio de salones · Córdoba Capital</p>
            <h1 className="mt-2 font-display text-5xl font-medium leading-[0.95] tracking-tight md:text-8xl">
              Salones infantiles
              <br className="hidden md:block" /> en Córdoba Capital
            </h1>
            <p className="mt-4 max-w-xl text-lg text-ink-700">
              Un directorio para encontrar salón en la ciudad. No es un ranking y no inventamos precios.
            </p>
          </div>
          <div className="relative md:col-span-4">
            <Confetti className="ml-auto w-full max-w-[260px]" />
            <p className="mt-2 flex items-baseline gap-3 md:justify-end">
              <span className="num text-8xl leading-[0.8] text-brand-700 md:text-9xl">{entero(salones.length)}</span>
              <span className="max-w-[9rem] text-sm text-ink-700">
                {conGoogle ? "salones infantiles con datos de Google en Córdoba Capital" : "salones infantiles en Córdoba Capital"}
              </span>
            </p>
          </div>
        </div>
        <BusquedaHero barrios={barrios} />
      </section>
      <HomeBento salones={salones} />
      <AdSlot id="home-despues-bento" />
      <section className="mx-auto mt-12 max-w-7xl px-4">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 border-y border-ink-200 py-3 text-sm text-ink-700">
          <Icon name="pin" className="h-4 w-4 shrink-0 text-ink-500" />
          <span>
            <b>Cobertura:</b> por ahora solo Córdoba Capital.
          </span>
          <span className="text-ink-500">Otras ciudades van a sumarse cuando haya fichas verificadas.</span>
        </p>
      </section>
      <section className="mx-auto mt-20 max-w-7xl px-4">
        <div className="relative grid items-center gap-6 overflow-hidden border-y-2 border-brand-700 py-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="kicker text-brand-800">Para salones</p>
            <h2 className="font-display text-4xl font-medium leading-tight md:text-5xl">¿Tenés un salón?</h2>
            <p className="mt-2 max-w-md text-ink-700">Cargá el precio y la fecha en que lo verificaste. El campo está listo y hoy está vacío.</p>
          </div>
          <div className="flex flex-col items-start gap-4 md:col-span-5 md:items-end md:justify-self-end">
            <Confetti className="hidden w-48 md:block" />
            <a href="/para-salones" className="inline-flex h-12 items-center justify-center gap-2 rounded-[4px] bg-brand-700 px-5 font-bold text-white hover:bg-brand-800">
              Reclamar mi ficha
              <Icon name="arrow" />
            </a>
          </div>
        </div>
        <div className="mt-3">
          <Serpentina />
        </div>
      </section>
      <p className="sr-only">
        <a href={CITY_PATH}>Ver el listado de Córdoba Capital</a>
      </p>
    </>
  );
}
