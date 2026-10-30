import { contarBarrios } from "@/lib/barrios";
import { leerSemillas } from "@/lib/catalogo";
import { BusquedaCompacta } from "./busqueda";
import { MenuMovil } from "./menu-movil";

export function SiteHeader() {
  const barrios = contarBarrios(leerSemillas().map((semilla) => semilla.barrio)).map((barrio) => ({
    barrio: barrio.barrio,
    slug: barrio.slug,
    indexable: barrio.indexable,
  }));
  return (
    <header className="sticky top-0 z-20 border-b border-ink-900/80 bg-surface">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4">
        <a href="/" className="font-display text-2xl font-semibold tracking-tight text-brand-800">
          festejito<span className="text-sun-400">.</span>
        </a>
        <BusquedaCompacta barrios={barrios} />
        <nav aria-label="Principal" className="hidden gap-6 text-sm font-bold text-ink-700 md:flex">
          <a className="ulink decoration-transparent" href="/guias">
            Guías
          </a>
          <a className="ulink decoration-transparent" href="/herramientas">
            Herramientas
          </a>
          <a className="ulink text-brand-800" href="/para-salones">
            Para salones
          </a>
        </nav>
        <MenuMovil />
      </div>
    </header>
  );
}
