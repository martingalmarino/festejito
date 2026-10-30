import { CITY_PATH } from "@/lib/site";
import type { Filtros } from "@/lib/filtros";
import { querySin } from "@/lib/filtros";

export function Paginacion({ filtros, paginas }: { filtros: Filtros; paginas: number }) {
  if (paginas <= 1) return null;
  return (
    <nav aria-label="Paginación" className="mt-6 flex flex-wrap gap-3 text-sm">
      {Array.from({ length: paginas }, (_, indice) => {
        const numero = indice + 1;
        const href = `${CITY_PATH}${querySin({ ...filtros, page: numero }, [])}`;
        const actual = numero === filtros.page;
        return (
          <a key={numero} href={href} aria-current={actual ? "page" : undefined} className={actual ? "font-bold text-ink-900" : "ulink"}>
            {numero}
          </a>
        );
      })}
    </nav>
  );
}
