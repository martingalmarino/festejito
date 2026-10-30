import type { Metadata } from "next";
import { Migas } from "@/components/migas";

export const metadata: Metadata = {
  title: "Privacidad",
  description: "Qué datos maneja Festejito en esta etapa.",
  alternates: { canonical: "/privacidad" },
};

export default function Privacidad() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <Migas items={[{ nombre: "Inicio", href: "/" }, { nombre: "Privacidad" }]} />
      <p className="kicker mt-6 text-brand-800">Festejito</p>
      <h1 className="font-display text-5xl font-medium">Privacidad</h1>
      <div className="mt-6 grid gap-4 text-ink-700">
        <p>La clave de Google Places vive solo en el servidor, en la variable GOOGLE_PLACES_API_KEY. No se publica al navegador ni se escribe en los logs.</p>
        <p>Los detalles de cada lugar (nombre, dirección, teléfono, web, nota y horarios) no se guardan en el repositorio. La caché dura menos de un día.</p>
        <p>«Cerca mío» usa la ubicación del navegador en ese momento para ordenar el listado. No la almacenamos.</p>
        <p>Los espacios de publicidad están reservados y vacíos. Todavía no hay un script de AdSense.</p>
      </div>
    </article>
  );
}
