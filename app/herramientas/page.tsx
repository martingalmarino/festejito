import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Herramientas",
  robots: { index: false, follow: false },
};

export default function Herramientas() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <p className="kicker text-brand-800">Próximamente</p>
      <h1 className="font-display text-5xl font-medium">Herramientas</h1>
      <p className="mt-4 text-ink-700">El presupuesto, la comida y el checklist no entran en esta etapa.</p>
    </article>
  );
}
