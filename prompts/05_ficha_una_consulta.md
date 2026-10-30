# Prompt para Cursor: que una ficha gaste 1 sola consulta (rama base-cordoba)
1. En la página de ficha (/proveedor/[slug]) NO llamar a listarSalones() ni a nada que pida detalles de otros salones. Buscar el salón y armar "cercanos" solo con el catálogo local leerSemillas() (lib/catalogo.ts: place_id, barrio, slug). Llamar a Google solo con detalleCompleto(placeId) de ese salón.
2. En "cercanos", mostrar solo datos del catálogo local (barrio + link), sin nombre de Google.
3. En lib/google.ts, en fetch de respuestas no-200 usar cache: 'no-store' (no next.revalidate) para que Next no guarde errores. Las 200 siguen con revalidate 691200 vía la Data Cache de Next (no depender solo de la caché en memoria, que se pierde por instancia).
4. Home: sacar force-dynamic si hace que pida los 79 en cada instancia; que use revalidate 691200.
No tocar nada más. Build verde y 0 llamadas a Places en el build.
