# Festejito v5 (base v4) — spec (home A bento, dirección editorial)
Base: estructura y paleta de v3 (brand-700 #237A32 sobre surface #FFFDF7). Tokens en tokens.json / tailwind.config.fragment.js.

## Reglas firmes
- 0 emojis (copy, íconos, placeholders). Verificado por grep en todos los HTML: 0.
- Íconos: Lucide (licencia ISC), SVG inline, stroke-width 1.75, currentColor, 16/20px. Nunca dentro de círculos de color.
- Sin pills (rounded-full = 0). Sin gradientes violeta, sin sombras de card genéricas.

## Lenguaje visual
- Jerarquía: Fredoka para H1 grandes y números enormes (53, 4,6), Nunito Sans para el texto.
- Kicker: Nunito con all-small-caps y tracking alto, ink-500, arriba de cada título de sección.
- Numeración: filas 01–06 y secciones de ficha 01–06 en Fredoka brand-700.
- Separadores: reglas finas de 1px ink-200 entre filas y secciones; tags y CTA de sección enmarcados con reglas.
- Tag: radio 2px, borde 1px, 11px semibold (`.tag`). Para verificado usar `.tag-v` (accent-100/800). Precio vencido: el tag se oculta pasados 6 meses.
- Botones: radio 4px. Primario brand-700 / texto blanco. Secundario con borde ink-300. Links secundarios subrayados (`.ulink`).
- Filtros: toggles rectangulares (aria-pressed). Los de fase 2 van con borde dashed y el kicker "fase 2".
- Foto: una sola foto de Google, overlay multiply #F3E6CC al 35% más un filete inset de 1px, crédito arriba a la izquierda. Sin foto: textura de confeti más el kicker "Sin foto todavía".
- Textura de marca: confeti geométrico (líneas, triángulo, cuadrado, círculo) y una línea serpentina. Máximo uno por bloque, solo decorativo (aria-hidden).
- Pines del mapa: cuadrados y numerados, iguales a la numeración del listado.
- Grid: el bento tiene auto-rows fijas y grid-flow-row-dense (sin CLS). Las imágenes tienen aspect-ratio reservado.

## Accesibilidad
- Contraste AA (los ratios están en v3/tokens.json). Foco: outline 2px #244FA8.
- role=search; combobox/tablist; aria-current en las migas de pan y la paginación.

## AdSense (solo anotado, no dibujado)
- Home: entre bento y ciudades.
- Listado: después de la fila 03 y antes de FAQ.
- Ficha: después de Reseñas.
- Nunca arriba del fold ni dentro de la barra de acciones.
