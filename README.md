# Festejito

Directorio de salones de fiestas infantiles. Esta etapa cubre solo Córdoba Capital.

```bash
npm install
npm run dev
```

Copiá `.env.example` a `.env.local` y, si vas a pedir datos reales, completá `GOOGLE_PLACES_API_KEY`. Sin esa clave el sitio igual abre: en desarrollo muestra salones de ejemplo y en producción el estado básico, sin inventar teléfono, nota ni precio.

## Qué hay en el repo

- `data/place_ids_cordoba.csv`: 79 `place_id` con `clasificacion=infantil` y barrio. Es lo único de Google que se guarda.
- `data/precios-dueno.json`: vacío. Ahí va el precio que cargue el dueño (`placeId`, `precioMin`, `precioMax`, `verificadoEl`).
- `data/barrios-sin-match.md`: barrios del CSV que no están en la lista de contenidos.
- `contenido/` y `diseno/v5/`: textos y diseño de referencia.

No se versionan `places/piloto_cordoba_interno.csv`, `places/det_cache_*.json` ni el resto de los crudos de Google.

## Decisiones

- Place Details se pide en el servidor, con caché de 20 horas y esta máscara: nombre, dirección, teléfono, web, nota, cantidad de reseñas, horarios, ubicación, enlace de Maps y referencia de una foto. La clave no va al cliente ni a los logs. La foto se pide recién cuando se ve, por `/foto/[placeId]`.
- Sin clave no se inventan notas, horarios, teléfonos ni direcciones. El nombre de ejemplo existe solo en `next dev`.
- El orden por defecto no usa la nota de Google. No es un ranking.
- JSON-LD: `BreadcrumbList` en ciudad, barrio y ficha; `ItemList` en los listados; `FAQPage` solo con las preguntas cuyas variables están completas; `LocalBusiness` solo si hay dirección real. No se copia la nota de Google como `aggregateRating`.
- Un barrio se indexa con 3 fichas o más. Con menos, la URL responde `noindex` y no entra al sitemap. En el índice «Otros barrios» el enlace filtra el listado de la ciudad.
- Los filtros (`?rubro`, `?barrio`, `?abierto`, etc.) son `noindex` y su canonical es el listado limpio. La paginación (`?page=`) se canonicaliza a sí misma y entra al sitemap.
- Los textos de precio de `plantillas.json` y de `cordoba.md` no se muestran: las variables `{{precio_*}}` y `{{fecha_relevamiento}}` están vacías. La intro de la ciudad usa `intro_fallback_sin_precios`. La frase fija «hoy hay 14 fichas» no se publicó porque contradice las 79 fichas infantiles.
- «Gral. Pueyrredón» es solo la forma corta de la navegación. El nombre de la ficha es General Pueyrredón, que no está en la lista de contenidos.
- Los filtros de fase 2 (precio, capacidad, edades, servicios, verificado) no se renderizan: no hay cobertura.
- AdSense: cajas de 90px de alto, vacías, entre el bento y la cobertura, después de la fila 03 y después de reseñas.
- No hay deploy a producción.

## Pendientes

- Cargar `GOOGLE_PLACES_API_KEY` para reemplazar los ejemplos por Place Details.
- Formulario para que el dueño reclame la ficha y escriba `precios-dueno.json`.
- Confirmar con la fuente municipal los barrios listados en `data/barrios-sin-match.md` (tilde de René, «1A» / «1ª»).
- Subtipos pelotero y salón de eventos: hoy el filtro existe y da cero resultados, porque el CSV solo dice `infantil`.
- Salones a menos de 2 km: el bloque aparece cuando Place Details devuelve coordenadas.
- Texto de reseñas: no se pide en la máscara, para no sumar campos. La ficha muestra la nota y el enlace a Google.
- Publisher de AdSense, guías, herramientas y otras ciudades.
