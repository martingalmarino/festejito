import { Confetti } from "./confetti";
import { Icon } from "./icons";
import type { Salon } from "@/lib/types";

export function FotoSalon({
  salon,
  className,
  priority = false,
}: {
  salon: Salon;
  className: string;
  priority?: boolean;
}) {
  if (salon.fuente === "google" && salon.fotoNombre) {
    const credito = salon.fotoAutores[0] ? `Foto: ${salon.fotoAutores[0]} / Google` : "Foto / Google";
    return (
      <div className={`foto ${className}`} role="img" aria-label={`Foto de ${salon.nombre}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/foto/${encodeURIComponent(salon.placeId)}`}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading={priority ? "eager" : "lazy"}
        />
        <span className="absolute bottom-2 left-2 z-10 bg-surface/95 px-1 text-[10px] leading-4 text-ink-900">{credito}</span>
      </div>
    );
  }
  return (
    <div className={`relative grid place-items-center overflow-hidden border border-brand-100 bg-brand-50 ${className}`} role="img" aria-label="Sin foto todavía">
      <Confetti className="absolute inset-0 h-full w-full opacity-70" />
      <span className="relative flex flex-col items-center gap-1 bg-brand-50 px-3 py-2 text-brand-800">
        <Icon name="camera" className="h-5 w-5 shrink-0" />
        <span className="kicker">Sin foto todavía</span>
      </span>
    </div>
  );
}
