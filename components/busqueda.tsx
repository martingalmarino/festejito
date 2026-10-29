"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { CITY_PATH } from "@/lib/site";
import { slugify } from "@/lib/slug";
import { Icon } from "./icons";

type BarrioOpcion = { barrio: string; slug: string; indexable: boolean };

const rubros = [
  { id: "infantil", label: "Salón infantil" },
  { id: "pelotero", label: "Pelotero e inflables" },
  { id: "eventos", label: "Salón de eventos" },
] as const;

function esCordoba(texto: string) {
  const limpio = slugify(texto);
  return limpio === "" || limpio === "cordoba" || limpio === "cordoba-capital" || limpio === "capital";
}

function destino(rubro: string, donde: string, barrios: BarrioOpcion[]) {
  if (!esCordoba(donde)) {
    const match = barrios.find((barrio) => slugify(barrio.barrio) === slugify(donde) || barrio.barrio.toLowerCase() === donde.toLowerCase());
    if (!match) return `/fuera-de-cobertura?q=${encodeURIComponent(donde)}`;
    if (match.indexable && rubro === "infantil") return `${CITY_PATH}/${match.slug}`;
    const params = new URLSearchParams();
    params.set("barrio", match.slug);
    if (rubro !== "infantil") params.set("rubro", rubro);
    return `${CITY_PATH}?${params}`;
  }
  if (rubro === "infantil") return CITY_PATH;
  return `${CITY_PATH}?rubro=${rubro}`;
}

export function BusquedaHero({ barrios }: { barrios: BarrioOpcion[] }) {
  const router = useRouter();
  const [rubro, setRubro] = useState<(typeof rubros)[number]["id"]>("infantil");
  const [donde, setDonde] = useState("");

  function enviar(event: FormEvent) {
    event.preventDefault();
    router.push(destino(rubro, donde.trim(), barrios));
  }

  function ubicacion() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      const params = new URLSearchParams({
        lat: String(pos.coords.latitude),
        lng: String(pos.coords.longitude),
      });
      router.push(`${CITY_PATH}?${params}`);
    });
  }

  return (
    <form role="search" onSubmit={enviar} className="mt-10 grid border-y border-ink-900/80 md:grid-cols-[1fr_1fr_auto]">
      <div className="border-b border-ink-200 py-3 md:border-b-0 md:border-r md:pr-6">
        <label htmlFor="r" className="kicker text-ink-500">
          Rubro
        </label>
        <select
          id="r"
          value={rubro}
          onChange={(event) => setRubro(event.target.value as (typeof rubros)[number]["id"])}
          className="h-10 w-full bg-transparent font-display text-xl"
        >
          {rubros.map((opcion) => (
            <option key={opcion.id} value={opcion.id}>
              {opcion.label}
            </option>
          ))}
        </select>
      </div>
      <div className="py-3 md:px-6">
        <label htmlFor="d" className="kicker text-ink-500">
          Barrio o ciudad
        </label>
        <div className="flex items-center gap-2">
          <input
            id="d"
            role="combobox"
            aria-expanded="false"
            aria-controls="barrios-cordoba"
            aria-autocomplete="list"
            list="barrios-cordoba"
            value={donde}
            onChange={(event) => setDonde(event.target.value)}
            className="h-10 w-full bg-transparent font-display text-xl placeholder:text-ink-300"
            placeholder="Ej.: Alberdi"
          />
          <datalist id="barrios-cordoba">
            <option value="Córdoba Capital" />
            {barrios.map((barrio) => (
              <option key={barrio.slug} value={barrio.barrio} />
            ))}
          </datalist>
          <button type="button" onClick={ubicacion} className="ulink inline-flex shrink-0 items-center gap-1 text-sm font-bold text-brand-800">
            <Icon name="locate" />
            Mi ubicación
          </button>
        </div>
      </div>
      <button className="my-3 inline-flex h-12 items-center justify-center gap-2 rounded-[4px] bg-brand-700 px-6 font-bold text-white hover:bg-brand-800">
        <Icon name="search" />
        Buscar
      </button>
    </form>
  );
}

export function BusquedaCompacta({ barrios }: { barrios: BarrioOpcion[] }) {
  const router = useRouter();
  const [que, setQue] = useState("");
  const [donde, setDonde] = useState("");

  function enviar(event: FormEvent) {
    event.preventDefault();
    const base = destino("infantil", donde.trim(), barrios);
    if (base.startsWith("/fuera-de-cobertura")) {
      router.push(base);
      return;
    }
    const url = new URL(base, "http://localhost");
    if (que.trim()) url.searchParams.set("q", que.trim());
    router.push(`${url.pathname}${url.search}`);
  }

  return (
    <form role="search" onSubmit={enviar} className="hidden max-w-xl flex-1 items-center border-b border-ink-300 focus-within:border-brand-700 md:flex">
      <Icon name="search" className="h-4 w-4 shrink-0 text-ink-500" />
      <label className="sr-only" htmlFor="hq">
        Qué
      </label>
      <input id="hq" value={que} onChange={(event) => setQue(event.target.value)} className="h-10 flex-1 bg-transparent px-2" placeholder="Salón infantil, pelotero" />
      <span className="text-ink-300">|</span>
      <label className="sr-only" htmlFor="hd">
        Dónde
      </label>
      <input id="hd" value={donde} onChange={(event) => setDonde(event.target.value)} className="h-10 flex-1 bg-transparent px-2" placeholder="Barrio o ciudad" />
    </form>
  );
}
