export function nota(valor: number) {
  return valor.toLocaleString("es-AR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

export function entero(valor: number) {
  return valor.toLocaleString("es-AR");
}

export function pesos(valor: number) {
  return valor.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });
}

export function fechaCorta(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
}

export function mesAnio(iso: string) {
  const [y, m] = iso.split("-").map(Number);
  if (!y || !m) return iso;
  return `${String(m).padStart(2, "0")}/${y}`;
}

export function distancia(metros: number) {
  if (metros < 1000) return `${Math.round(metros)} m`;
  const km = metros / 1000;
  return `${km.toLocaleString("es-AR", { maximumFractionDigits: 1 })} km`;
}

export function pad2(n: number) {
  return String(n).padStart(2, "0");
}
