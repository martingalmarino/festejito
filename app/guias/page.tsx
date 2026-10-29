import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guías",
  robots: { index: false, follow: false },
};

export default function Guias() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <p className="kicker text-brand-800">Próximamente</p>
      <h1 className="font-display text-5xl font-medium">Guías</h1>
      <p className="mt-4 text-ink-700">Las guías de organización quedan para otra etapa. Esta base es el directorio de Córdoba Capital.</p>
    </article>
  );
}
