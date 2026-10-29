import { estadoHorario } from "@/lib/horarios";
import type { Horarios } from "@/lib/types";
import { Icon } from "./icons";

export function LineaHorario({ horarios }: { horarios: Horarios | null }) {
  const estado = estadoHorario(horarios);
  if (estado.tipo === "sin-dato") {
    return (
      <p className="flex items-center gap-1.5 text-sm text-ink-500">
        <Icon name="clock" className="h-4 w-4 shrink-0 text-ink-500" />
        Horario no informado
      </p>
    );
  }
  if (estado.tipo === "abierto") {
    return (
      <p className="flex items-center gap-1.5 text-sm text-ink-700">
        <Icon name="clock" className="h-4 w-4 shrink-0 text-ink-500" />
        <span className="font-bold text-brand-800">Abierto</span> hasta {estado.hasta}
      </p>
    );
  }
  return (
    <p className="flex items-center gap-1.5 text-sm text-ink-700">
      <Icon name="clock" className="h-4 w-4 shrink-0 text-ink-500" />
      <span className="font-bold text-danger-700">Cerrado</span>, abre {estado.abre}
    </p>
  );
}
