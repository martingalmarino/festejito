import { bloqueBarrio } from "@/lib/contenido";
import { cercanosDe } from "@/lib/cercanos";
import { diaActual } from "@/lib/horarios";
import { enlaceComoLlegar, enlaceGoogle } from "@/lib/enlaces";
import { distancia, entero, nota, pesos } from "@/lib/formato";
import { precioDe, precioVigente } from "@/lib/precios";
import { barrioPath, CITY_PATH, fichaPath } from "@/lib/site";
import type { Salon } from "@/lib/types";
import { AdSlot } from "./ad-slot";
import { Confetti } from "./confetti";
import { FotoSalon } from "./foto-salon";
import { Icon } from "./icons";
import { LineaHorario } from "./estado-horario";
import { MapaResultados } from "./mapa";
import { Migas, type Miga } from "./migas";
import { Nota } from "./nota";
import { BadgePrecio } from "./precio-linea";

function Accion({
  href,
  etiqueta,
  icono,
}: {
  href: string | null;
  etiqueta: string;
  icono: "phone" | "chat" | "send" | "globe";
}) {
  const clase =
    "flex h-[72px] flex-col items-center justify-center gap-1.5 border-r border-ink-200 text-sm font-bold last:border-r-0";
  if (!href) {
    return (
      <span aria-disabled="true" className={`${clase} pointer-events-none text-ink-300`}>
        <Icon name={icono} className="h-5 w-5 shrink-0" />
        {etiqueta}
        <span className="sr-only"> (no disponible)</span>
      </span>
    );
  }
  return (
    <a href={href} className={`${clase} text-ink-900 hover:bg-brand-50`}>
      <Icon name={icono} className="h-5 w-5 shrink-0" />
      {etiqueta}
    </a>
  );
}

function Dato({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div className="border-b border-ink-200 py-4 pr-3">
      <dt className="kicker text-ink-500">{etiqueta}</dt>
      <dd className="mt-1 font-bold">{valor}</dd>
    </div>
  );
}

export function FichaView({ salon, todos }: { salon: Salon; todos: Salon[] }) {
  const precio = precioDe(salon.placeId);
  const vigente = precio ? precioVigente(precio.verificadoEl) : false;
  const minima = !salon.horarios && !salon.web && !salon.fotoNombre;
  const cercanos = cercanosDe(salon, todos, 3);
  const barrioHref = todos.filter((item) => item.barrioSlug === salon.barrioSlug).length >= 3 ? barrioPath(salon.barrioSlug) : `${CITY_PATH}?barrio=${salon.barrioSlug}`;
  const migas: Miga[] = [
    { nombre: "Inicio", href: "/" },
    { nombre: "Córdoba" },
    { nombre: "Córdoba Capital", href: CITY_PATH },
    { nombre: salon.barrio, href: barrioHref },
    { nombre: salon.nombre },
  ];
  const hoy = diaActual();
  const atribucion = salon.fuente === "google" ? "Datos de Google" : salon.fuente === "ejemplo" ? "Dato de ejemplo" : "Dato no disponible";

  return (
    <div className="mx-auto max-w-7xl px-4 pb-28 pt-6 lg:pb-0">
      <Migas items={migas} />
      <div className="mt-5 grid items-end gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="order-2 lg:order-1 lg:col-span-7">
          <div className="mb-3 flex flex-wrap gap-2">
            <BadgePrecio placeId={salon.placeId} />
          </div>
          <p className="kicker text-brand-800">Salón infantil · {salon.barrio}</p>
          <h1 className="mt-1 font-display text-5xl font-medium leading-[0.98] tracking-tight md:text-7xl">{salon.nombre}</h1>
          <div className="mt-5 flex flex-wrap items-end gap-x-8 gap-y-3 border-t border-ink-200 pt-4">
            <Nota rating={salon.rating} cantidad={salon.cantidadResenas} grande />
            <LineaHorario horarios={salon.horarios} />
            <a href={enlaceGoogle(salon)} className="ulink inline-flex items-center gap-1 text-sm font-bold">
              Ver en Google
              <Icon name="external" />
            </a>
            <span className="kicker text-ink-500">{atribucion}</span>
          </div>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-5">
          <FotoSalon salon={salon} className="aspect-[4/3] w-full md:aspect-[16/10]" priority />
        </div>
      </div>

      <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-10">
        <div className="grid gap-14 lg:col-span-8">
          <section aria-label="Acciones">
            <div className="grid grid-cols-4 border-y border-ink-900/80">
              <Accion href={salon.telefono ? `tel:${salon.telefono.replace(/\s/g, "")}` : null} etiqueta="Llamar" icono="phone" />
              <Accion href={null} etiqueta="WhatsApp" icono="chat" />
              <Accion href={enlaceComoLlegar(salon)} etiqueta="Cómo llegar" icono="send" />
              <Accion href={salon.web} etiqueta="Sitio web" icono="globe" />
            </div>
          </section>

          <section aria-labelledby="sv">
            <p className="kicker text-brand-800">01</p>
            <h2 id="sv" className="mb-4 font-display text-3xl font-medium">
              Servicios y precios
            </h2>
            {precio ? (
              <dl className="grid grid-cols-2 border-t border-ink-200 md:grid-cols-4">
                <div className="border-b border-ink-200 py-4 pr-3">
                  <dt className="kicker text-ink-500">Precio por niño</dt>
                  <dd className="num mt-1 text-2xl">
                    {pesos(precio.precioMin)}–{pesos(precio.precioMax)}
                  </dd>
                </div>
                <Dato etiqueta="Invitados" valor="sin dato" />
                <Dato etiqueta="Duración" valor="sin dato" />
                <Dato etiqueta="Edades" valor="sin dato" />
                <Dato etiqueta="Capacidad" valor="sin dato" />
                <Dato etiqueta="Estacionamiento" valor="sin dato" />
              </dl>
            ) : (
              <div className="relative overflow-hidden border border-brand-700 bg-brand-50 p-6 md:p-8">
                <Confetti className="absolute -right-6 -top-4 w-56 opacity-80" />
                <p className="kicker text-brand-800">Para dueños</p>
                <p className="mt-1 max-w-md font-display text-2xl font-medium md:text-3xl">¿Es tu salón? Cargá tus precios</p>
                <p className="mt-2 max-w-md text-ink-700">El precio queda en la ficha con la fecha en que lo verificaste. Hoy este campo está vacío.</p>
                <a href="/para-salones" className="mt-4 inline-flex h-12 items-center justify-center rounded-[4px] bg-brand-700 px-5 font-bold text-white hover:bg-brand-800">
                  Reclamar ficha gratis
                </a>
              </div>
            )}
            {!precio ? (
              <dl className="mt-4 grid grid-cols-2 md:grid-cols-3">
                <Dato etiqueta="Precio por niño" valor="sin dato" />
                <Dato etiqueta="Invitados" valor="sin dato" />
                <Dato etiqueta="Duración" valor="sin dato" />
                <Dato etiqueta="Edades" valor="sin dato" />
                <Dato etiqueta="Capacidad" valor="sin dato" />
                <Dato etiqueta="Estacionamiento" valor="sin dato" />
              </dl>
            ) : vigente ? null : (
              <p className="mt-3 text-sm text-ink-500">Precio informado en {precio.verificadoEl.slice(0, 7).split("-").reverse().join("/")}. Puede haber cambiado.</p>
            )}
          </section>

          {minima ? null : (
            <section aria-labelledby="ds">
              <p className="kicker text-brand-800">02</p>
              <h2 id="ds" className="mb-3 font-display text-3xl font-medium">
                Sobre el salón
              </h2>
              <p className="italic text-ink-500">Sin descripción del dueño</p>
            </section>
          )}

          <section className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="kicker text-brand-800">{minima ? "02" : "03"}</p>
              <h2 className="mb-3 font-display text-3xl font-medium">Ubicación</h2>
              <MapaResultados salones={[salon]} className="aspect-[4/3]" />
              <p className="mt-3 text-ink-700">{salon.direccion ?? `Dirección no informada, ${salon.barrio}`}</p>
              {minima ? (
                <ul className="mt-4 grid gap-2 text-sm">
                  <li>
                    <span className="font-bold">Teléfono. </span>
                    {salon.telefono ?? "No informado"}
                  </li>
                  <li>
                    <span className="font-bold">Horarios. </span>
                    No informado
                  </li>
                  <li>
                    <span className="font-bold">Sitio web. </span>
                    No informado
                  </li>
                  <li className="text-ink-500">{atribucion}</li>
                </ul>
              ) : null}
            </div>
            {minima ? null : (
              <div>
                <p className="kicker text-brand-800">04</p>
                <h2 className="mb-3 font-display text-3xl font-medium">Horarios</h2>
                {salon.horarios?.descripciones.length ? (
                  <ul>
                    {salon.horarios.descripciones.map((linea) => {
                      const esHoy = linea.toLowerCase().startsWith(hoy);
                      return (
                        <li key={linea} className="flex justify-between gap-4 border-t border-ink-200 py-2 text-sm">
                          <span>
                            {linea.split(":")[0]}
                            {esHoy ? " (hoy)" : ""}
                          </span>
                          <span>{linea.split(":").slice(1).join(":").trim()}</span>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-ink-500">No informado</p>
                )}
                <p className="mt-3 text-xs text-ink-500">{atribucion}</p>
              </div>
            )}
          </section>

          <section aria-labelledby="rv">
            <p className="kicker text-brand-800">{minima ? "03" : "05"}</p>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 id="rv" className="font-display text-3xl font-medium">
                Reseñas
              </h2>
              <span className="kicker text-ink-500">{atribucion}</span>
            </div>
            {salon.rating !== null ? (
              <div className="mt-3 flex items-baseline gap-3">
                <span className="num text-6xl leading-none text-ink-900">{nota(salon.rating)}</span>
                <span className="text-sm text-ink-500">
                  promedio de {salon.cantidadResenas !== null ? entero(salon.cantidadResenas) : "las"} reseñas en Google
                </span>
              </div>
            ) : (
              <p className="mt-3 text-ink-500">No informado</p>
            )}
            <a href={enlaceGoogle(salon)} className="mt-4 inline-flex h-12 items-center gap-2 rounded-[4px] border border-ink-900 px-5 font-bold hover:bg-ink-900 hover:text-white">
              Ver las reseñas en Google
              <Icon name="external" />
            </a>
          </section>
          <AdSlot id="ficha-despues-resenas" />

          {cercanos.length > 0 ? (
            <section>
              <p className="kicker text-brand-800">{minima ? "04" : "06"}</p>
              <h2 className="mb-3 font-display text-3xl font-medium">Salones cercanos</h2>
              <ul>
                {cercanos.map(({ salon: otro, metros }) => (
                  <li key={otro.placeId} className="border-t border-ink-200 py-3">
                    <a className="ulink font-bold" href={fichaPath(otro.slug)}>
                      {otro.nombre}
                    </a>
                    <p className="text-sm text-ink-500">
                      {distancia(metros)} · {otro.barrio}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <aside className="mt-10 hidden lg:col-span-4 lg:mt-0 lg:block">
          <div className="sticky top-24 border border-ink-200 p-5">
            <p className="kicker text-ink-500">Contacto</p>
            <p className="mt-3 text-sm">
              <span className="font-bold">Teléfono. </span>
              {salon.telefono ?? "No informado"}
            </p>
            <p className="mt-2 text-sm">
              <span className="font-bold">Dirección. </span>
              {salon.direccion ?? "No informada"}
            </p>
            <p className="mt-3 text-xs text-ink-500">{atribucion}</p>
            <p className="mt-4 text-xs text-ink-500">{bloqueBarrio(salon.barrio, todos.filter((item) => item.barrio === salon.barrio).length)}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
