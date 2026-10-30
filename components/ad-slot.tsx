/** Espacio reservado. Sin script de AdSense hasta tener un publisher id. */
export function AdSlot({ id }: { id: string }) {
  return (
    <aside
      aria-label="Espacio publicitario"
      data-ad-slot={id}
      className="my-8 h-[90px] border border-ink-200 bg-surface-muted"
    />
  );
}
