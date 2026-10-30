import type { Faq } from "./contenido";
import { absoluteUrl } from "./site";
import type { Salon } from "./types";

type Miga = { nombre: string; href?: string };

export function breadcrumbLd(migas: Miga[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: migas.map((miga, indice) => ({
      "@type": "ListItem",
      position: indice + 1,
      name: miga.nombre,
      ...(miga.href ? { item: absoluteUrl(miga.href) } : {}),
    })),
  };
}

export function itemListLd(nombre: string, salones: Array<Pick<Salon, "nombre" | "slug">>) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: nombre,
    numberOfItems: salones.length,
    itemListElement: salones.map((salon, indice) => ({
      "@type": "ListItem",
      position: indice + 1,
      name: salon.nombre,
      url: absoluteUrl(`/proveedor/${salon.slug}`),
    })),
  };
}

export function faqLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

export function localBusinessLd(salon: {
  nombre: string;
  slug: string;
  direccion: string | null;
  telefono: string | null;
  web: string | null;
  barrio: string;
  ubicacion: { lat: number; lng: number } | null;
}) {
  if (!salon.direccion) return null;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: salon.nombre,
    url: salon.web ?? absoluteUrl(`/proveedor/${salon.slug}`),
    address: {
      "@type": "PostalAddress",
      streetAddress: salon.direccion,
      addressLocality: "Córdoba",
      addressRegion: "Córdoba",
      addressCountry: "AR",
    },
    ...(salon.telefono ? { telephone: salon.telefono } : {}),
    ...(salon.ubicacion
      ? { geo: { "@type": "GeoCoordinates", latitude: salon.ubicacion.lat, longitude: salon.ubicacion.lng } }
      : {}),
    areaServed: salon.barrio,
  };
}

export type { Miga };
