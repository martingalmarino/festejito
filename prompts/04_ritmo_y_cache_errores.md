# Prompt para Cursor: ritmo de consultas a Google y no cachear errores (rama base-cordoba)
En lib/google.ts:
1. Limitar la concurrencia de las llamadas a Place Details: como máximo 2 a la vez y una pausa de 200 ms entre llamadas (cola simple, sin librerías nuevas). Configurable con la env PLACES_MAX_POR_MINUTO (default 60) que nunca se supere.
2. Si Google responde algo distinto de 200 (429, 400, 5xx), NO guardar ese resultado en la caché de Next: usar cache: 'no-store' para ese caso o lanzar error para que la página no se revalide con datos vacíos; devolver null y loguear solo el código de estado (nunca la key).
3. Sin reintentos automáticos ante 429.
4. Solo las respuestas 200 se cachean con revalidate 691200 (8 días), como ahora.
No tocar nada más. Verificar que el build pasa sin key y con una key simulada.

5. IMPORTANTE (cupo de Google: 300 Place Details por día): el build NO debe llamar a Google en ningún caso. Si hay generateStaticParams o fetch en build que piden detalles (hub, listados, sitemap), quitarlos: las páginas se generan bajo demanda (dynamicParams true) y piden a Google recién en la primera visita, cacheando 8 días solo las respuestas 200. Detectar build con process.env.NEXT_PHASE === 'phase-production-build' y devolver null sin llamar. Verificar en el log del build que haya 0 llamadas a Places.
