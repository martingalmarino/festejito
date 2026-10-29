import { fichaPath } from "@/lib/site";
import type { Salon } from "@/lib/types";
import { FotoSalon } from "./foto-salon";
import { Icon } from "./icons";
import { LineaHorario } from "./estado-horario";
import { Nota } from "./nota";
import { BadgePrecio, PrecioLinea } from "./precio-linea";
import { pad2 } from "@/lib/formato";

export function FilaSalon({ salon, numero }: { salon: Salon; numero: number }) {
  const atribucion = salon.fuente === "google" ? "Datos de Google" : salon.fuente === "ejemplo" ? "Dato de ejemplo" : "Dato no disponible";
  return (
    <article className="group relative grid grid-cols-[2.25rem_6.5rem_1fr] gap-3 border-t border-ink-200 py-5 md:grid-cols-[3rem_10rem_1fr] md:gap-5">
      <span className="num pt-1 text-2xl leading-none text-brand-700 md:text-3xl">{pad2(numero)}</span>
      <FotoSalon salon={salon} className="aspect-[4/5] w-full md:aspect-[4/3]" />
      <div className="grid min-w-0 content-start gap-1">
        <p className="kicker text-ink-500">Salón infantil · {salon.barrio}</p>
        <h3 className="font-display text-xl font-medium leading-tight md:text-2xl">
          <a href={fichaPath(salon.slug)} className="after:absolute after:inset-0 group-hover:text-brand-800">
            {salon.nombre}
          </a>
        </h3>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <Nota rating={salon.rating} cantidad={salon.cantidadResenas} />
          <BadgePrecio placeId={salon.placeId} />
        </div>
        <LineaHorario horarios={salon.horarios} />
        <PrecioLinea placeId={salon.placeId} />
        <p className="flex items-center gap-1.5 text-xs text-ink-500">
          {salon.telefono ? <Icon name="phone" className="h-3.5 w-3.5 shrink-0" /> : null}
          {salon.telefono ? "Con teléfono · " : null}
          {atribucion}
        </p>
      </div>
    </article>
  );
}
