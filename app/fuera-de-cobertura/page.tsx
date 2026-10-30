import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Búsqueda fuera de cobertura",
  description: "Festejito, por ahora, solo releva salones infantiles en Córdoba Capital.",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function Fuera({ searchParams }: Props) {
  const sp = await searchParams;
  const q = Array.isArray(sp.q) ? sp.q[0] : sp.q;
  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <p className="kicker text-brand-800">Próximamente</p>
      <h1 className="font-display text-5xl font-medium">Búsqueda fuera de cobertura</h1>
      <p className="mt-4 text-lg text-ink-700">{q ? `Todavía no relevamos salones en ${q}.` : "Todavía no relevamos esa zona."}</p>
      <p className="mt-2 text-ink-700">Por ahora el directorio es solo la ciudad de Córdoba.</p>
      <a href="/salones-infantiles/cordoba/cordoba" className="ulink mt-6 inline-block font-bold">
        Ver Córdoba Capital
      </a>
    </article>
  );
}
