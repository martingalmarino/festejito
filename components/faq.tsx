import { Icon } from "./icons";
import type { Faq } from "@/lib/contenido";
import { pad2 } from "@/lib/formato";

export function ListaFaq({ faqs }: { faqs: Faq[] }) {
  if (faqs.length === 0) return null;
  return (
    <section className="mt-16" aria-labelledby="faq">
      <p className="kicker text-brand-800">Preguntas</p>
      <h2 id="faq" className="font-display text-3xl font-medium md:text-5xl">
        Preguntas frecuentes
      </h2>
      <div className="mt-4">
        {faqs.map((faq, indice) => (
          <details key={faq.q} className="border-t border-ink-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-bold">
              <span>
                <span className="num mr-3 text-brand-700">{pad2(indice + 1)}</span>
                {faq.q}
              </span>
              <Icon name="chevron" />
            </summary>
            <p className="mt-2 pl-9 text-ink-700">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
