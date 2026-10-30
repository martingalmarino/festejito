import type { Metadata } from "next";
import { Migas } from "@/components/migas";

export const metadata: Metadata = {
  title: "Para salones",
  description: "Cómo va a cargar el precio el dueño de un salón en Festejito.",
  alternates: { canonical: "/para-salones" },
};

export default function ParaSalones() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <Migas items={[{ nombre: "Inicio", href: "/" }, { nombre: "Para salones" }]} />
      <p className="kicker mt-6 text-brand-800">Para salones</p>
      <h1 className="font-display text-5xl font-medium">Reclamá tu ficha</h1>
      <div className="mt-6 grid gap-4 text-ink-700">
        <p>El precio no sale de Google. Lo vas a cargar vos, con un mínimo, un máximo y la fecha en que lo verificaste. El texto de la ficha va a decir «Precio verificado el [fecha]».</p>
        <p>Si esa fecha tiene más de seis meses, el badge se oculta y queda una línea en gris: el precio puede haber cambiado.</p>
        <p>Hoy no hay un formulario de alta. El archivo data/precios-dueno.json está vacío a propósito. Cuando haya carga del dueño, cada ítem va a tener placeId, precioMin, precioMax y verificadoEl en formato AAAA-MM-DD.</p>
      </div>
    </article>
  );
}
