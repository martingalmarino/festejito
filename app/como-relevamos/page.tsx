import type { Metadata } from "next";
import { Migas } from "@/components/migas";

export const metadata: Metadata = {
  title: "Cómo relevamos los datos",
  description: "De dónde salen las fichas de Festejito y qué no guardamos.",
  alternates: { canonical: "/como-relevamos" },
};

export default function ComoRelevamos() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <Migas items={[{ nombre: "Inicio", href: "/" }, { nombre: "Cómo relevamos" }]} />
      <p className="kicker mt-6 text-brand-800">Metodología</p>
      <h1 className="font-display text-5xl font-medium">Cómo relevamos los datos</h1>
      <div className="mt-6 grid gap-4 text-ink-700">
        <p>Esta etapa cubre solo Córdoba Capital y solo salones clasificados como infantiles. El repo guarda el place_id, la clasificación y el barrio. Nada más de Google.</p>
        <p>Nombre, dirección, teléfono, sitio, nota y horarios se piden en el servidor a Place Details, con la máscara de campos mínima, y se cachean menos de 24 horas. No se escriben en el repositorio ni se mandan al navegador junto con la clave.</p>
        <p>Sin la clave, la ficha sigue en pie con el estado básico: barrio y enlace a Google, sin inventar teléfono, horario, nota ni precio.</p>
        <p>El precio lo carga el dueño, con la fecha de verificación. Si pasan más de seis meses, se oculta el badge. Hoy el archivo de precios está vacío.</p>
        <p>No es un ranking. El orden «Directorio» sigue los barrios con más fichas y después el nombre, no la nota de Google.</p>
      </div>
    </article>
  );
}
