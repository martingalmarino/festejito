# Prompt para Cursor: Festejito base Next.js + Córdoba
Repo: https://github.com/martingalmarino/festejito

Construir desde cero, en este repo nuevo, Festejito: directorio de salones de fiestas infantiles en Argentina (fuera de CABA/PBA). Alcance de esta etapa: SOLO Córdoba capital.

Stack: Next.js (App Router, TypeScript, Tailwind) para deploy en Vercel.

Insumos (copiar al repo desde ~/Festejito):
- diseno/: usar la versión más reciente (v5: CHANGELOG.md, spec.md, tokens.json, tailwind.config.fragment.js, mockups HTML y png; v4 y anteriores solo como contexto). Implementar fiel al diseño.
- contenido/: textos y estructura SEO (estrategia.md, plantillas.json, ciudades/cordoba.md). Integrarlos tal cual, sin reescribir.
- places/place_ids_cordoba.csv: place_id, clasificacion, barrio. Usar solo clasificacion=infantil (79). Es lo único de Google que se guarda en el repo.
- NO subir al repo: places/piloto_cordoba_interno.csv ni det_cache_*.json (datos de Google, solo uso interno).

Reglas de datos (términos de Google Places API New): nombre, dirección, teléfono, web, rating y horarios se piden en el servidor con Place Details (field mask mínimo), cache corto (revalidate ~24h o menos, nunca persistir), con atribución "Datos de Google". Key en env GOOGLE_PLACES_API_KEY: nunca al cliente ni a logs. Minimizar llamadas (tope gratis ~300 detalles/día). Sin key, la ficha muestra estado básico sin romper; usar mocks en dev.

Páginas: home, /salones-infantiles/cordoba/cordoba/ (hub ciudad), hubs por barrio indexables solo con 3+ fichas (si no, noindex), ficha por lugar. JSON-LD LocalBusiness, BreadcrumbList, FAQPage donde haya FAQ. sitemap.xml y robots.txt indexables. Espacios AdSense reservados sin CLS. Buen Core Web Vitals. Campo de precio preparado para carga del dueño ("precio verificado el [fecha]"), vacío por ahora. Unificar nombres de barrio contra la lista de Contenidos; documentar los que no matchean.

No agregar otras provincias. No deploy a producción.

Terminado cuando: build OK, páginas cargan en local, schema JSON-LD válido, sitemap correcto, PR con capturas desktop/mobile de home, hub y ficha, y resumen de decisiones y pendientes.
