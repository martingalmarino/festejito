import { CITY_PATH } from "@/lib/site";
import type { Filtros } from "@/lib/filtros";
import { querySin } from "@/lib/filtros";
import { CercaMio } from "./cerca-mio";
import { Icon } from "./icons";

function clase(activo: boolean) {
  return activo
    ? "inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-[4px] border border-ink-900 bg-ink-900 px-3 text-sm font-bold text-white"
    : "inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-[4px] border border-ink-300 bg-white px-3 text-sm font-bold hover:border-brand-700";
}

export function BarraFiltros({ filtros, barrioNombre }: { filtros: Filtros; barrioNombre?: string }) {
  const base = CITY_PATH;
  const infantilHref = `${base}${querySin({ ...filtros, rubro: "infantil", page: 1 }, ["page"])}`;
  const peloteroHref = `${base}${querySin({ ...filtros, rubro: filtros.rubro === "pelotero" ? "infantil" : "pelotero", page: 1 }, ["page"])}`;
  const eventosHref = `${base}${querySin({ ...filtros, rubro: filtros.rubro === "eventos" ? "infantil" : "eventos", page: 1 }, ["page"])}`;
  const notaHref = `${base}${querySin({ ...filtros, rating4: !filtros.rating4, page: 1 }, ["page"])}`;
  const abiertoHref = `${base}${querySin({ ...filtros, abierto: !filtros.abierto, page: 1 }, ["page"])}`;
  const telefonoHref = `${base}${querySin({ ...filtros, telefono: !filtros.telefono, page: 1 }, ["page"])}`;
  return (
    <div className="sticky top-16 z-10 mt-4 border-y border-ink-200 bg-surface py-3">
      <ul className="flex gap-2 overflow-x-auto pb-1" aria-label="Filtros">
        <li>
          <a href={base} className={clase(false)}>
            <Icon name="sliders" />
            Filtros
          </a>
        </li>
        <li>
          <span className={clase(Boolean(barrioNombre || filtros.barrio))}>
            {barrioNombre ? `Barrio: ${barrioNombre}` : "Barrio"}
          </span>
        </li>
        <li>
          <a href={infantilHref} aria-current={filtros.rubro === "infantil" ? "page" : undefined} className={clase(filtros.rubro === "infantil")}>
            {filtros.rubro === "infantil" ? <Icon name="check" /> : null}
            Salón infantil
          </a>
        </li>
        <li>
          <a href={peloteroHref} aria-current={filtros.rubro === "pelotero" ? "page" : undefined} className={clase(filtros.rubro === "pelotero")}>
            {filtros.rubro === "pelotero" ? <Icon name="check" /> : null}
            Pelotero e inflables
          </a>
        </li>
        <li>
          <a href={eventosHref} aria-current={filtros.rubro === "eventos" ? "page" : undefined} className={clase(filtros.rubro === "eventos")}>
            {filtros.rubro === "eventos" ? <Icon name="check" /> : null}
            Salón de eventos
          </a>
        </li>
        <li>
          <a href={notaHref} aria-current={filtros.rating4 ? "page" : undefined} className={clase(filtros.rating4)}>
            {filtros.rating4 ? <Icon name="check" /> : null}4 o más
          </a>
        </li>
        <li>
          <a href={abiertoHref} aria-current={filtros.abierto ? "page" : undefined} className={clase(filtros.abierto)}>
            {filtros.abierto ? <Icon name="check" /> : null}
            Abierto ahora
          </a>
        </li>
        <li>
          <a href={telefonoHref} aria-current={filtros.telefono ? "page" : undefined} className={clase(filtros.telefono)}>
            {filtros.telefono ? <Icon name="check" /> : null}
            Con teléfono
          </a>
        </li>
        <li>
          <CercaMio />
        </li>
      </ul>
    </div>
  );
}
