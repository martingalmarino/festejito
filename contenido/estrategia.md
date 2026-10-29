# Festejito · Estrategia de contenido SEO / AEO / GEO
Alcance: salones de fiestas infantiles y rubros afines (peloteros, animación, tortas, globos) en Argentina **excepto CABA y provincia de Buenos Aires**. Sitio: https://cumpleplan.vercel.app/ (dominio de marca: festejito.com.ar).

## 0. Punto de partida (revisado el 28/10/2026)
- Home: planificador (comida y bebida, presupuesto, checklist, compras), guías "Cómo organizar un cumpleaños infantil" y "Cómo calcular la comida para un cumpleaños", 14 fichas de Córdoba Capital (ej.: Candy Jump, Candy VR, Cocoliche, Diverworld, Oxinor, Tentación S&S).
- Fortalezas que hay que cuidar: tono honesto ("no inventamos precios", "no es un ranking"), fichas con datos que publica cada negocio. Es una base E-E-A-T muy buena.
- Faltan: hubs geográficos, páginas por rubro, datos de precios, schema, enlazado entre herramientas y directorio. Además el sitio tiene noindex (lo resuelve Dev).

## 1. Arquitectura de URLs y keywords
```
/salones-infantiles/                                   pilar nacional
/salones-infantiles/{provincia}/                       hub provincia
/salones-infantiles/{provincia}/{ciudad}/              hub ciudad (página que tiene que posicionar)
/salones-infantiles/{provincia}/{ciudad}/{barrio}/     solo si se cumple la regla de umbral (ver §5)
/{rubro}/{provincia}/{ciudad}/                         rubro: peloteros | animacion | tortas | globos
/proveedor/{slug}/                                     ficha (URL plana, se enlaza desde todos sus contextos)
/precios/{rubro}/{ciudad}/                             precios orientativos (es el diferencial)
/guias/… y /herramientas/…                             blog y herramientas
```
Nota: "peloteros" se trata como subtipo de salón (filtro dentro del hub ciudad) y además como página propia, porque la intención "peloteros en X precios" tiene volumen propio. Antes de publicar, chequeá en Search Console o con alguna herramienta de keywords que la página propia no canibalice al hub.

| Nivel | Keyword principal | Secundarias / long tail | Intención |
|---|---|---|---|
| Ciudad | salón de fiestas infantiles {ciudad} | salones infantiles {ciudad}, salón de cumpleaños infantiles {ciudad}, cumpleaños infantiles {ciudad} | local / transaccional |
| Ciudad·precio | peloteros en {ciudad} precios | cuánto sale un pelotero en {ciudad}, precio salón infantil {ciudad} {año} | comercial |
| Barrio | salón de cumpleaños {barrio} | salón infantil {barrio} {ciudad}, pelotero zona {zona} | hiperlocal |
| Rubro | animación de cumpleaños {ciudad} | animadores infantiles, magos, inflables a domicilio {ciudad} | transaccional |
| Rubro | tortas de cumpleaños infantiles {ciudad} | tortas temáticas, mesa dulce {ciudad} | transaccional |
| Rubro | globos y decoración cumpleaños {ciudad} | arco de globos, globos con helio {ciudad} | transaccional |
| Provincia | salones infantiles en {provincia} | cumpleaños infantiles {provincia} | navegacional |
| Info | cómo organizar un cumpleaños infantil | cuánto cuesta un cumple infantil, a qué edad pelotero, cuántos invitados | informacional (blog) |

## 2. Páginas pilar
1. **Pilar transaccional**: /salones-infantiles/ con mapa de provincias y ciudades, criterios de elección y método de precios.
2. **Pilar de costos**: "Cuánto cuesta un cumpleaños infantil en Argentina {año}". Agrega los /precios/ de todas las ciudades. Es el activo más citable para IA, siempre que haya datos reales (si no, queda con {{placeholders}}).
3. **Pilar de organización**: la guía actual "Cómo organizar un cumpleaños infantil", ampliada y conectada con las 5 herramientas.

## 3. Interlinking
- Hacia arriba: ficha → ciudad → provincia → pilar (breadcrumbs con schema BreadcrumbList).
- Lateral: ciudad ↔ los 4 rubros de esa ciudad ↔ /precios/ de esa ciudad; un bloque de "ciudades cercanas" (Neuquén ↔ Cipolletti, aunque está en otra provincia).
- Herramientas ↔ directorio: el presupuesto de la herramienta enlaza a "/precios/{rubro}/{ciudad}"; cada hub ciudad tiene el CTA "Armá tu presupuesto".
- Blog → hubs con anchors variados ("salones en Rosario", "peloteros de Mendoza"), nunca exact match repetido.
- Máximo unas 100 links por página; los barrios se enlazan solo si están indexables.

## 4. Plan de blog (ganchos PAS / AIDA)
| # | Título | Gancho | Enlaza a |
|---|---|---|---|
| 1 | Cuánto cuesta un cumple infantil en {año}: precios reales por ciudad | PAS: "Pediste tres presupuestos y ninguno se parece. Los listados viejos muestran precios de hace años. Acá tenés precios orientativos con fecha." | /precios/ |
| 2 | Salón o cumple en casa: la cuenta completa | AIDA: atención (dato de costo {{dato}}), interés (comparativa), deseo (menos estrés), acción (calculadora) | herramientas |
| 3 | Qué preguntar antes de señar un salón infantil (checklist) | PAS: seña perdida / letra chica | hubs ciudad |
| 4 | Peloteros: desde qué edad y cuánto dura un turno | AIDA | peloteros |
| 5 | Cumple de verano en Mendoza, Tucumán o Salta: salones con pileta o al aire libre | PAS: el calor | ciudades |
| 6 | Animación de cumpleaños: qué incluye y qué no | PAS | animación |
| 7 | Tortas temáticas: cuánto encargar según los invitados | AIDA + calculadora | tortas |
| 8 | Globos y decoración: hacelo vos o contratalo | AIDA | globos |
| 9 | Cumple infantil en Neuquén con viento y frío: planificá el salón | PAS (contexto patagónico) | Neuquén |
| 10 | Cómo calcular la comida (la guía actual, actualizada) | ya existe | herramienta comida |
Frecuencia: 2 notas por mes. Cada nota tiene un bloque "Respuesta corta" de 40-60 palabras arriba de todo y fecha de actualización visible.

## 5. Reglas anti contenido fino o duplicado
1. **Umbral de indexación**: un hub de ciudad se indexa con 5 fichas verificadas o más y al menos 1 dato propio (precio relevado o FAQ local). Un barrio, con 3 fichas o más dentro del barrio. Si no llega: noindex,follow y no aparece en el sitemap.
2. Cada página tiene que tener al menos un 40 % de contenido único: contexto local con fuente, fichas, precios, FAQ local. Nada de cambiar solo {ciudad}.
3. Variantes de plantilla: al menos 3 intros alternativas por tipo, rotadas por hash del slug.
4. Canonical: los filtros (?tipo=pelotero, ?orden=) apuntan al canonical limpio. Paginación con self-canonical.
5. **Nunca inventar** precios, cifras, horarios ni negocios. Un {{placeholder}} vacío oculta el bloque, no lo muestra con "N/D".
6. Precio = rango + fecha de relevamiento + fuente (web o redes del negocio, consulta directa). Si tiene más de 6 meses, se muestra como "desactualizado" y se pide revisión.
7. Las fichas de un mismo proveedor en varias zonas tienen una sola URL.

## 6. E-E-A-T
- Página "Cómo relevamos los datos" (metodología, fuentes: Google Places, OSM, redes oficiales, alta voluntaria; frecuencia).
- Autor y revisor con nombre en guías y precios; fecha "Actualizado el".
- Transparencia: "No es un ranking", divulgación de fichas destacadas pagas (con etiqueta "Destacado") y de AdSense.
- Experiencia: fotos propias o cedidas con permiso, testimonios reales de familias (con consentimiento).
- Botón "Reportar dato incorrecto" en cada ficha y en cada precio.

## 7. AEO / GEO (respuestas para buscadores con IA)
- Respuesta directa en el primer párrafo (pregunta → respuesta en 1 o 2 frases → matiz).
- Bloques citables: definiciones cortas, tablas de precios con fecha, listas numeradas, "Dato clave".
- Schema: ItemList (fichas), LocalBusiness / EntertainmentBusiness por ficha (solo con datos verificados), FAQPage, BreadcrumbList, Article con dateModified.
- Entidades: nombrar provincia, ciudad y barrio oficial con enlace a la fuente municipal; mantener la consistencia NAP en las fichas.
- llms.txt con el mapa de hubs y la página de metodología.

## 8. Monetización sin romper la UX
AdSense: máximo 1 bloque antes del primer listado, nunca entre la respuesta directa y la tabla. Las categorías afines (catering, eventos, animación) van en el sidebar o después de la FAQ. Fichas destacadas: más adelante, etiquetadas y sin alterar el orden "orgánico" por defecto sin avisarlo.
