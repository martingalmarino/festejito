import { proyectar } from "@/lib/geo";
import type { Salon } from "@/lib/types";

export function MapaResultados({
  salones,
  className = "h-full",
  numerosDesde = 1,
  enlazar = true,
}: {
  salones: Salon[];
  className?: string;
  numerosDesde?: number;
  enlazar?: boolean;
}) {
  const puntos = proyectar(salones.map((salon) => salon.ubicacion));
  const hayCoordenadas = puntos.some(Boolean);
  const decorativos = [
    ["22%", "30%"],
    ["45%", "22%"],
    ["62%", "50%"],
    ["30%", "64%"],
    ["74%", "34%"],
    ["54%", "78%"],
    ["84%", "62%"],
    ["14%", "80%"],
  ];
  return (
    <div className={`relative overflow-hidden border border-ink-200 bg-[#EEF1E6] ${className}`} role="region" aria-label="Mapa de resultados">
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        <path d="M0 40 L100 28 M0 70 L100 62 M30 0 L38 100 M68 0 L60 100 M0 12 L100 88" stroke="#fff" strokeWidth="1.2" />
        <path d="M-5 55 C20 45 40 60 60 48 S90 40 105 50" stroke="#C7D6E8" strokeWidth="3" fill="none" />
      </svg>
      {salones.map((salon, indice) => {
        const punto = puntos[indice];
        const left = punto?.left ?? decorativos[indice % decorativos.length][0];
        const top = punto?.top ?? decorativos[indice % decorativos.length][1];
        const numero = numerosDesde + indice;
        const cuerpo = (
          <>
            <span className="num grid h-7 w-7 place-items-center rounded-[3px] bg-brand-700 text-sm text-white">{numero}</span>
            <span className="h-2 w-px bg-brand-700" />
            <span className="sr-only">{salon.nombre}</span>
          </>
        );
        const clase = "absolute flex -translate-x-1/2 -translate-y-full flex-col items-center";
        return enlazar ? (
          <a key={salon.placeId} href={`/proveedor/${salon.slug}`} className={clase} style={{ left, top }}>
            {cuerpo}
          </a>
        ) : (
          <span key={salon.placeId} className={clase} style={{ left, top }}>
            {cuerpo}
          </span>
        );
      })}
      <span className="absolute bottom-1 right-2 text-[10px] text-ink-700">
        {hayCoordenadas ? "Ubicación con datos de Google" : "Esquema sin coordenadas"}
      </span>
    </div>
  );
}
