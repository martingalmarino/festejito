import { contarBarrios, nombreCorto } from "@/lib/barrios";
import { entero, pad2 } from "@/lib/formato";
import { CITY_PATH, barrioPath, fichaPath } from "@/lib/site";
import type { Salon } from "@/lib/types";
import { FotoSalon } from "./foto-salon";
import { Icon } from "./icons";
import { MapaResultados } from "./mapa";
import { Nota } from "./nota";
import { BadgePrecio } from "./precio-linea";

function Tarjeta({ salon, numero, className, titulo }: { salon: Salon; numero: number; className: string; titulo: string }) {
  return (
    <article className={`group relative flex flex-col border border-ink-200 bg-white hover:border-brand-700 ${className}`}>
      <FotoSalon salon={salon} className="min-h-0 flex-1" priority={numero === 1} />
      <div className="border-t border-ink-200 p-3 md:p-5">
        <div className="flex items-baseline justify-between gap-2">
          <p className="kicker truncate text-ink-500">
            <span className="num text-brand-700">{pad2(numero)}</span> · {nombreCorto(salon.barrio)}
          </p>
          <BadgePrecio placeId={salon.placeId} />
        </div>
        <h3 className={`truncate font-display font-medium leading-tight ${titulo}`}>
          <a href={fichaPath(salon.slug)} className="after:absolute after:inset-0 group-hover:text-brand-800">
            {salon.nombre}
          </a>
        </h3>
        <div className="mt-0.5">
          <Nota rating={salon.rating} cantidad={numero === 1 ? salon.cantidadResenas : null} />
        </div>
      </div>
    </article>
  );
}

export function HomeBento({ salones }: { salones: Salon[] }) {
  const ocho = salones.slice(0, 8);
  const hubs = contarBarrios(salones.map((salon) => salon.barrio)).filter((barrio) => barrio.indexable);
  const n = salones.length;
  return (
    <section className="mx-auto mt-16 max-w-7xl px-4" aria-labelledby="dest">
      <div className="mb-4 flex items-end justify-between border-b border-ink-900/80 pb-3">
        <div>
          <p className="kicker text-brand-800">Selección</p>
          <h2 id="dest" className="font-display text-3xl font-medium md:text-5xl">
            Salones destacados
          </h2>
        </div>
        <a href={CITY_PATH} className="ulink hidden items-center gap-2 font-bold text-brand-800 md:inline-flex">
          Ver los {entero(n)}
          <Icon name="arrow" />
        </a>
      </div>
      <div className="grid auto-rows-[132px] grid-flow-row-dense grid-cols-2 gap-3 md:auto-rows-[104px] md:grid-cols-6 md:gap-4">
        {ocho[0] ? <Tarjeta salon={ocho[0]} numero={1} className="col-span-2 row-span-3 md:col-span-3 md:row-span-5" titulo="text-2xl md:text-4xl" /> : null}
        {ocho[1] ? <Tarjeta salon={ocho[1]} numero={2} className="col-span-1 row-span-2 md:col-span-1 md:row-span-3" titulo="text-lg" /> : null}
        <div className="col-span-2 row-span-2 flex flex-col border border-ink-200 bg-surface-muted p-4 md:col-span-2 md:row-span-3 md:p-5">
          <p className="kicker text-ink-500">Rubros</p>
          <ul className="mt-2 flex flex-1 flex-col justify-around">
            <li className="border-b border-ink-200 last:border-0">
              <a href={CITY_PATH} className="group flex items-baseline justify-between py-2">
                <span className="font-display text-xl group-hover:text-brand-800 md:text-2xl">Salón infantil</span>
                <span className="num text-ink-500">{entero(n)}</span>
              </a>
            </li>
            <li className="border-b border-ink-200 last:border-0">
              <a href={`${CITY_PATH}?rubro=pelotero`} className="group flex items-baseline justify-between py-2">
                <span className="font-display text-xl group-hover:text-brand-800 md:text-2xl">Pelotero e inflables</span>
                <span className="num text-ink-500">0</span>
              </a>
            </li>
            <li className="border-b border-ink-200 last:border-0">
              <a href={`${CITY_PATH}?rubro=eventos`} className="group flex items-baseline justify-between py-2">
                <span className="font-display text-xl group-hover:text-brand-800 md:text-2xl">Salón de eventos</span>
                <span className="num text-ink-500">0</span>
              </a>
            </li>
          </ul>
          <p className="text-xs text-ink-500">Animación, tortas y globos: próximamente</p>
        </div>
        {ocho[2] ? <Tarjeta salon={ocho[2]} numero={3} className="col-span-1 row-span-2 md:col-span-1 md:row-span-2" titulo="text-lg" /> : null}
        {ocho[3] ? <Tarjeta salon={ocho[3]} numero={4} className="col-span-1 row-span-2 md:col-span-2 md:row-span-3" titulo="text-lg" /> : null}
        <a href={CITY_PATH} className="group relative col-span-2 row-span-2 block md:col-span-3 md:row-span-3">
          <MapaResultados salones={ocho} className="absolute inset-0" enlazar={false} />
          <span className="absolute bottom-3 left-3 inline-flex h-10 items-center gap-2 rounded-[4px] border border-ink-900 bg-white px-3 text-sm font-bold group-hover:bg-brand-50">
            <Icon name="map" />
            Ver el mapa de salones
          </span>
        </a>
        {ocho[4] ? <Tarjeta salon={ocho[4]} numero={5} className="col-span-1 row-span-2 md:col-span-1 md:row-span-3" titulo="text-lg" /> : null}
        <div className="col-span-2 row-span-3 flex flex-col border border-ink-200 bg-white p-4 md:col-span-2 md:row-span-3 md:p-5">
          <p className="kicker text-ink-500">Barrios con más salones</p>
          <ol className="mt-2 flex flex-1 flex-col justify-around">
            {hubs.map((barrio, indice) => (
              <li key={barrio.slug} className="border-b border-ink-200 last:border-0">
                <a href={barrioPath(barrio.slug)} className="group grid grid-cols-[2rem_1fr_auto] items-baseline py-2">
                  <span className="num text-brand-700">{pad2(indice + 1)}</span>
                  <span className="font-display text-xl group-hover:text-brand-800">{nombreCorto(barrio.barrio)}</span>
                  <span className="num text-ink-500">{entero(barrio.cantidad)}</span>
                </a>
              </li>
            ))}
          </ol>
          <a href={`${CITY_PATH}#otros`} className="ulink text-sm font-bold">
            Todos los barrios
          </a>
        </div>
        {ocho[5] ? <Tarjeta salon={ocho[5]} numero={6} className="col-span-1 row-span-2 md:col-span-2 md:row-span-3" titulo="text-lg" /> : null}
        {ocho[6] ? <Tarjeta salon={ocho[6]} numero={7} className="col-span-1 row-span-2 md:col-span-2 md:row-span-3" titulo="text-lg" /> : null}
        {ocho[7] ? <Tarjeta salon={ocho[7]} numero={8} className="col-span-2 row-span-2 md:col-span-2 md:row-span-2" titulo="text-lg" /> : null}
        <a href={CITY_PATH} className="relative col-span-2 row-span-1 flex items-center justify-between overflow-hidden bg-brand-800 px-5 text-white hover:bg-brand-900 md:col-span-6">
          <span className="font-display text-2xl font-medium md:text-4xl">Ver los {entero(n)} salones de Córdoba</span>
          <Icon name="arrow" className="h-7 w-7 shrink-0" />
        </a>
      </div>
      <div className="mt-6 md:hidden">
        <a href={CITY_PATH} className="ulink inline-flex items-center gap-2 font-bold text-brand-800">
          Ver los {entero(n)} salones de Córdoba
          <Icon name="arrow" />
        </a>
      </div>
    </section>
  );
}
