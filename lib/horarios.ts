import type { EstadoHorario, Horarios, PeriodoHorario } from "./types";

const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"] as const;
const DIA_CORTO: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

export function partesCordoba(ahora = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Argentina/Cordoba",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(ahora);
  const leer = (tipo: string) => parts.find((p) => p.type === tipo)?.value ?? "";
  let hour = Number(leer("hour"));
  if (hour === 24) hour = 0;
  return { day: DIA_CORTO[leer("weekday")] ?? 0, hour, minute: Number(leer("minute")) || 0 };
}

function minutosSemana(day: number, hour: number, minute: number) {
  return day * 1440 + hour * 60 + minute;
}

function horaTexto(hour: number, minute: number) {
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function rangoPeriodo(periodo: PeriodoHorario, desde: number) {
  const abre = minutosSemana(periodo.open.day, periodo.open.hour, periodo.open.minute);
  let cierra = periodo.close
    ? minutosSemana(periodo.close.day, periodo.close.hour, periodo.close.minute)
    : abre + 1440;
  while (cierra <= abre) cierra += 7 * 1440;
  let cursor = abre;
  while (cursor + (cierra - abre) <= desde) cursor += 7 * 1440;
  if (cursor > desde + 7 * 1440) cursor -= 7 * 1440;
  return { abre: cursor, cierra: cursor + (cierra - abre), periodo };
}

export function estadoHorario(horarios: Horarios | null, ahora = new Date()): EstadoHorario {
  if (!horarios?.periodos.length) return { tipo: "sin-dato" };
  const ahoraPartes = partesCordoba(ahora);
  const desde = minutosSemana(ahoraPartes.day, ahoraPartes.hour, ahoraPartes.minute);
  const rangos = horarios.periodos.map((periodo) => rangoPeriodo(periodo, desde - 7 * 1440));
  const abierto = rangos.find((rango) => desde >= rango.abre && desde < rango.cierra);
  if (abierto?.periodo.close) {
    return { tipo: "abierto", hasta: horaTexto(abierto.periodo.close.hour, abierto.periodo.close.minute) };
  }
  if (abierto) return { tipo: "abierto", hasta: "tarde" };

  const siguiente = rangos
    .map((rango) => rangoPeriodo(rango.periodo, desde))
    .filter((rango) => rango.abre > desde)
    .sort((a, b) => a.abre - b.abre)[0];
  if (!siguiente) return { tipo: "sin-dato" };
  const hora = horaTexto(siguiente.periodo.open.hour, siguiente.periodo.open.minute);
  const dia = ((siguiente.abre % (7 * 1440)) + 7 * 1440) % (7 * 1440);
  const diaIdx = Math.floor(dia / 1440);
  const manana = (ahoraPartes.day + 1) % 7;
  if (diaIdx === ahoraPartes.day) return { tipo: "cerrado", abre: `a las ${hora}` };
  if (diaIdx === manana) return { tipo: "cerrado", abre: `mañana ${hora}` };
  return { tipo: "cerrado", abre: `el ${DIAS[diaIdx]} ${hora}` };
}

export function diaActual(ahora = new Date()) {
  return DIAS[partesCordoba(ahora).day];
}
