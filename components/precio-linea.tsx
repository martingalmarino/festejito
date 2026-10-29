import { fechaCorta, mesAnio, pesos } from "@/lib/formato";
import { precioDe, precioVigente } from "@/lib/precios";
import { Icon } from "./icons";

export function PrecioLinea({ placeId }: { placeId: string }) {
  const precio = precioDe(placeId);
  if (!precio) return <p className="text-sm text-ink-500">Precio sin cargar</p>;
  const vigente = precioVigente(precio.verificadoEl);
  return (
    <p className="text-sm">
      <span className="num text-lg font-semibold">
        {pesos(precio.precioMin)}–{pesos(precio.precioMax)}
      </span>{" "}
      por niño{" "}
      {vigente ? (
        <span className="text-ink-500">· verificado {fechaCorta(precio.verificadoEl)}</span>
      ) : (
        <span className="text-ink-500">· informado en {mesAnio(precio.verificadoEl)}. Puede haber cambiado.</span>
      )}
    </p>
  );
}

export function BadgePrecio({ placeId }: { placeId: string }) {
  const precio = precioDe(placeId);
  if (!precio || !precioVigente(precio.verificadoEl)) return null;
  return (
    <span className="tag tag-v">
      <Icon name="badge" className="h-3.5 w-3.5 shrink-0" />
      Precio verificado el {fechaCorta(precio.verificadoEl)}
    </span>
  );
}
