import { entero, nota } from "@/lib/formato";
import { Icon } from "./icons";

export function Nota({ rating, cantidad, grande = false }: { rating: number | null; cantidad: number | null; grande?: boolean }) {
  if (rating === null) return null;
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span className="self-center text-sun-400">
        <Icon name="star" fill className={grande ? "h-5 w-5 shrink-0" : "h-4 w-4 shrink-0"} />
      </span>
      <span className={grande ? "num text-3xl font-semibold" : "num text-base font-semibold"}>{nota(rating)}</span>
      <span className="sr-only">de 5 estrellas</span>
      {cantidad !== null ? <span className="text-sm text-ink-500">{entero(cantidad)} reseñas</span> : null}
    </span>
  );
}
