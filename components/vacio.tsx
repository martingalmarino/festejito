import { CITY_PATH } from "@/lib/site";
import type { Filtros } from "@/lib/filtros";
import { querySin } from "@/lib/filtros";

export function SinResultados({ filtros }: { filtros: Filtros }) {
  const quitarAbierto = `${CITY_PATH}${querySin({ ...filtros, abierto: false, page: 1 }, ["page"])}`;
  return (
    <div className="border-t border-ink-200 py-8">
      <p className="num text-5xl text-brand-700">0</p>
      <p className="mt-2 font-display text-2xl">No hay salones con estos filtros</p>
      <p className="mt-2 text-ink-700">Probá sacar un filtro o volver al listado completo.</p>
      <div className="mt-4 flex flex-wrap gap-4 text-sm font-bold">
        {filtros.abierto ? (
          <a className="ulink" href={quitarAbierto}>
            Quitar &quot;Abierto ahora&quot;
          </a>
        ) : null}
        <a className="ulink" href={CITY_PATH}>
          Limpiar filtros
        </a>
      </div>
    </div>
  );
}
