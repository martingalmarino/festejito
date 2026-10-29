export default function NoEncontrado() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      <p className="kicker text-brand-800">404</p>
      <h1 className="font-display text-5xl font-medium">No encontramos esa página</h1>
      <p className="mt-4 text-ink-700">El directorio de esta etapa cubre salones infantiles de Córdoba Capital.</p>
      <a href="/salones-infantiles/cordoba/cordoba" className="ulink mt-6 inline-block font-bold">
        Ver salones en Córdoba Capital
      </a>
    </div>
  );
}
