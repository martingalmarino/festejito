# v5: ajustes de v4 con datos del piloto
La estética y la estructura no cambian respecto de v4. Siguen en pie las reglas de v4: cero emojis, íconos Lucide y nada de pills.

## Datos del piloto
- 79 salones infantiles, solo en Córdoba Capital.
- Completitud de datos: teléfono 90 %, web 43 %, rating 95 %, horarios 72 %.
- Hubs de barrio (3 o más fichas): Alta Córdoba 7, Alberdi 5, Gral. Pueyrredón 4, Argüello 3, Villa Belgrano 3.
- 8 barrios con 2 fichas y ~41 con 1.

## Cambios
1. **Contador:** todos los "53" pasan a ser un contador dinámico `[n]`. Afecta el hero de la home, el CTA y "Ver los [n]", el encabezado de los listados y "[n] resultados".
2. **Hubs:** son 5 en vez de 3. Están en el tile "Barrios con más salones" de la home y en la navegación de barrios del listado. El tile pasa a ocupar 3 filas en mobile para que entren los 5.
3. **Listado de barrio con pocas fichas:**
   - Muestra solo las fichas propias (con 3 se ve bien).
   - No tiene paginación.
   - Suma un bloque "Salones en barrios cercanos" (a menos de 2 km) con la numeración continua, más el link "Ver los [n] salones de Córdoba Capital".
   - El mapa muestra los pines propios y los cercanos, así que nunca queda vacío.
4. **"Otros barrios":** pasa a ser un índice alfabético que escala a ~49 barrios.
   - Una barra de letras para saltar (cuadros de 2px de radio, no pills).
   - Grupos por letra en columnas (2 en mobile, 3 en desktop), cada barrio con su conteo.
   - Cada barrio filtra el listado y no tiene página propia.
5. **Nuevo mockup `ficha-minima`:** solo tiene nombre, dirección, teléfono y rating, sin web, sin horarios y sin foto.
   - El header dice "Horario no informado".
   - Se quitan "Sobre el salón" y el texto de las reseñas.
   - "Horarios" se convierte en una lista de datos junto al mapa: teléfono, y horarios y web como "No informado".
   - Las secciones se renumeran 01 a 04, y el pin del mapa queda centrado.
6. **Home solo Córdoba:** la lista de ciudades se reemplaza por una línea mínima de cobertura.
7. **Estados:**
   - "Ciudad próximamente" pasa a llamarse "Búsqueda fuera de cobertura" y no se enlaza desde la home.
   - El texto de "Barrio chico" se actualiza.

## Verificación
- Grep en los 7 HTML: 0 emojis, 0 `rounded-full` y 0 "53".
- Los 14 PNG (390 y 1440) están regenerados. Revisados a ojo: home, listado-ciudad, listado-barrio y ficha-minima en las dos medidas, y estados en desktop. Las fichas básica y verificada heredan v4 sin cambios visuales.
