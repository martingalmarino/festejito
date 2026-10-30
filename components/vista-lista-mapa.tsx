"use client";

import { ReactNode, useState } from "react";
import { Icon } from "./icons";

export function VistaListaMapa({ lista, mapa }: { lista: ReactNode; mapa: ReactNode }) {
  const [vista, setVista] = useState<"lista" | "mapa">("lista");
  return (
    <>
      <div className="lg:grid lg:grid-cols-12 lg:gap-10">
        <div className={`lg:col-span-7 ${vista === "mapa" ? "hidden lg:block" : ""}`}>{lista}</div>
        <div className={`lg:col-span-5 ${vista === "lista" ? "hidden lg:block" : "block"}`}>
          <div className="sticky top-36 h-[70vh] lg:h-[calc(100vh-10rem)]">{mapa}</div>
        </div>
      </div>
      <div
        className="fixed bottom-4 left-1/2 z-10 grid -translate-x-1/2 grid-cols-2 overflow-hidden rounded-[4px] bg-ink-900 text-white lg:hidden"
        role="group"
        aria-label="Vista"
      >
        <button
          type="button"
          aria-pressed={vista === "lista"}
          className={`flex h-12 items-center gap-2 px-5 font-bold ${vista === "lista" ? "bg-white text-ink-900" : ""}`}
          onClick={() => setVista("lista")}
        >
          <Icon name="list" />
          Lista
        </button>
        <button
          type="button"
          aria-pressed={vista === "mapa"}
          className={`flex h-12 items-center gap-2 px-5 font-bold ${vista === "mapa" ? "bg-white text-ink-900" : ""}`}
          onClick={() => setVista("mapa")}
        >
          <Icon name="map" />
          Mapa
        </button>
      </div>
    </>
  );
}
