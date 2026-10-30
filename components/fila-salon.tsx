import { fichaPath } from "@/lib/site";
import type { Salon } from "@/lib/types";
import { BadgePrecio, PrecioLinea } from "./precio-linea";
import { pad2 } from "@/lib/formato";

export function FilaSalon({ salon, numero }: { salon: Salon; numero: number }) {
  return (
    <article className="group relative grid grid-cols-[2.25rem_1fr] gap-3 border-t border-ink-200 py-5 md:grid-cols-[3rem_1fr] md:gap-5">
      <span className="num pt-1 text-2xl leading-none text-brand-700 md:text-3xl">{pad2(numero)}</span>
      <div className="grid min-w-0 content-start gap-1">
        <p className="kicker text-ink-500">Salón infantil · {salon.barrio}</p>
        <h3 className="font-display text-xl font-medium leading-tight md:text-2xl">
          <a href={fichaPath(salon.slug)} className="after:absolute after:inset-0 group-hover:text-brand-800">
            {salon.nombre}
          </a>
        </h3>
        <BadgePrecio placeId={salon.placeId} />
        <PrecioLinea placeId={salon.placeId} />
      </div>
    </article>
  );
}
