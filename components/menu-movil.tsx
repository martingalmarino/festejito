"use client";

import { useState } from "react";
import { Icon } from "./icons";

const enlaces = [
  { href: "/guias", label: "Guías" },
  { href: "/herramientas", label: "Herramientas" },
  { href: "/para-salones", label: "Para salones" },
  { href: "/salones-infantiles/cordoba/cordoba", label: "Córdoba Capital" },
];

export function MenuMovil() {
  const [abierto, setAbierto] = useState(false);
  return (
    <div className="md:hidden">
      <button
        type="button"
        className="flex h-11 items-center gap-2 px-2 text-sm font-bold"
        aria-expanded={abierto}
        aria-controls="menu-movil"
        onClick={() => setAbierto((valor) => !valor)}
      >
        <Icon name="menu" className="h-5 w-5 shrink-0" />
        Menú
      </button>
      {abierto ? (
        <nav id="menu-movil" aria-label="Principal" className="absolute inset-x-0 top-16 border-b border-ink-200 bg-surface px-4 py-3">
          <ul className="grid gap-2 text-sm font-bold">
            {enlaces.map((enlace) => (
              <li key={enlace.href}>
                <a className="ulink" href={enlace.href} onClick={() => setAbierto(false)}>
                  {enlace.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
