export type Miga = { nombre: string; href?: string };

export function Migas({ items }: { items: Miga[] }) {
  return (
    <nav aria-label="Migas de pan" className="text-sm text-ink-500">
      <ol className="flex flex-wrap">
        {items.map((item, indice) => {
          const ultima = indice === items.length - 1;
          return (
            <li key={`${item.nombre}-${indice}`} aria-current={ultima ? "page" : undefined} className={ultima ? "font-bold text-ink-900" : undefined}>
              {item.href && !ultima ? (
                <a className="ulink" href={item.href}>
                  {item.nombre}
                </a>
              ) : (
                item.nombre
              )}
              {ultima ? null : (
                <span aria-hidden="true" className="mx-2 text-ink-300">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
