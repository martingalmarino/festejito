import { CITY_PATH } from "@/lib/site";
import type { ConteoBarrio } from "@/lib/barrios";
import { entero } from "@/lib/formato";

export function IndiceBarrios({ barrios }: { barrios: ConteoBarrio[] }) {
  const otros = barrios.filter((barrio) => !barrio.indexable);
  const grupos = new Map<string, ConteoBarrio[]>();
  for (const barrio of [...otros].sort((a, b) => a.barrio.localeCompare(b.barrio, "es"))) {
    const letra = /^\d/.test(barrio.barrio) ? "1" : barrio.barrio.charAt(0).toLocaleUpperCase("es");
    const lista = grupos.get(letra) ?? [];
    lista.push(barrio);
    grupos.set(letra, lista);
  }
  const letras = [...grupos.keys()];
  return (
    <section className="mt-16" aria-labelledby="otros">
      <p className="kicker text-brand-800">Índice de barrios</p>
      <h2 id="otros" className="font-display text-3xl font-medium md:text-5xl">
        Otros barrios <span className="num text-brand-700">{entero(otros.length)}</span>
      </h2>
      <p className="mt-2 max-w-2xl text-ink-700">Barrios con 1 o 2 salones. Sin página propia: cada uno filtra este listado.</p>
      <nav aria-label="Saltar a letra" className="mt-4 flex flex-wrap gap-1">
        {letras.map((letra) => (
          <a key={letra} href={`#letra-${letra}`} className="grid h-8 w-8 place-items-center rounded-[2px] border border-ink-300 text-sm font-bold hover:border-brand-700">
            {letra}
          </a>
        ))}
      </nav>
      <div className="mt-6 columns-2 gap-8 md:columns-3">
        {letras.map((letra) => (
          <div key={letra} id={`letra-${letra}`} className="mb-6 break-inside-avoid">
            <p className="num text-brand-700">{letra}</p>
            <ul className="mt-1">
              {(grupos.get(letra) ?? []).map((barrio) => (
                <li key={barrio.slug}>
                  <a className="ulink" href={`${CITY_PATH}?barrio=${barrio.slug}`}>
                    {barrio.barrio} <span className="text-ink-500">{barrio.cantidad}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
