import type { Metadata } from "next";
import { Fredoka, Nunito_Sans } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { hayClavePlaces } from "@/lib/google";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const fredoka = Fredoka({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-fredoka" });
const nunito = Nunito_Sans({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-nunito" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: "Festejito", template: "%s | Festejito" },
  description: "Directorio de salones de fiestas infantiles en Córdoba Capital.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ejemplo = !hayClavePlaces() && process.env.NODE_ENV !== "production";
  return (
    <html lang="es-AR">
      <body className={`${nunito.className} ${fredoka.variable} ${nunito.variable} bg-surface font-sans text-ink-900`}>
        <a href="#c" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-3 focus:py-2">
          Saltar al contenido
        </a>
        <SiteHeader />
        {ejemplo ? (
          <p className="bg-sun-200 px-4 py-2 text-center text-sm text-sun-800">
            Vista de ejemplo: falta GOOGLE_PLACES_API_KEY. Los nombres no son salones reales y no hay datos de Google.
          </p>
        ) : null}
        <main id="c">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
