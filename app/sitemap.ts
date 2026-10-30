import type { MetadataRoute } from "next";
import { contarBarrios } from "@/lib/barrios";
import { leerSemillas } from "@/lib/catalogo";
import { POR_PAGINA } from "@/lib/filtros";
import { absoluteUrl, barrioPath, CITY_PATH, fichaPath } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const semillas = leerSemillas();
  const ahora = new Date();
  const paginas = Math.ceil(semillas.length / POR_PAGINA);
  const hubs = contarBarrios(semillas.map((semilla) => semilla.barrio)).filter((barrio) => barrio.indexable);
  const entradas: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: ahora },
    { url: absoluteUrl(CITY_PATH), lastModified: ahora },
    { url: absoluteUrl("/como-relevamos"), lastModified: ahora },
    ...Array.from({ length: paginas - 1 }, (_, indice) => ({
      url: absoluteUrl(`${CITY_PATH}?page=${indice + 2}`),
      lastModified: ahora,
    })),
    ...hubs.map((barrio) => ({ url: absoluteUrl(barrioPath(barrio.slug)), lastModified: ahora })),
    ...semillas.map((semilla) => ({ url: absoluteUrl(fichaPath(semilla.slug)), lastModified: ahora })),
  ];
  return entradas;
}
