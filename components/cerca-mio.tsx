"use client";

import { useRouter } from "next/navigation";
import { CITY_PATH } from "@/lib/site";
import { Icon } from "./icons";

export function CercaMio() {
  const router = useRouter();
  return (
    <button
      type="button"
      aria-pressed="false"
      className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-[4px] border border-ink-300 bg-white px-3 text-sm font-bold hover:border-brand-700"
      onClick={() => {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition((pos) => {
          const params = new URLSearchParams({
            lat: String(pos.coords.latitude),
            lng: String(pos.coords.longitude),
          });
          router.push(`${CITY_PATH}?${params}`);
        });
      }}
    >
      <Icon name="locate" />
      Cerca mío
    </button>
  );
}
