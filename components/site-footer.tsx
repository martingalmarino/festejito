export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-ink-900/80">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-3xl text-brand-800">
            festejito<span className="text-sun-400">.</span>
          </p>
          <p className="mt-2 max-w-xs text-sm text-ink-500">
            Directorio de salones de fiestas infantiles en Córdoba Capital. No es un ranking y no inventamos precios.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 text-sm md:col-span-7">
          <div>
            <p className="kicker text-ink-500">Directorio</p>
            <ul className="mt-2 grid gap-1">
              <li>
                <a className="ulink" href="/salones-infantiles/cordoba/cordoba">
                  Córdoba Capital
                </a>
              </li>
              <li>
                <a className="ulink" href="/como-relevamos">
                  Cómo relevamos
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="kicker text-ink-500">Festejito</p>
            <ul className="mt-2 grid gap-1">
              <li>
                <a className="ulink" href="/para-salones">
                  Para salones
                </a>
              </li>
              <li>
                <a className="ulink" href="/privacidad">
                  Privacidad
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
