# Barrios que no coinciden con la lista de contenidos

Lista canónica en `contenido/ciudades/cordoba.md` (sección «Barrios para páginas /barrio/»):

Nueva Córdoba · Güemes · General Paz · Alta Córdoba · Cerro de las Rosas · Villa Belgrano · Argüello · Jardín · Alberdi · San Vicente

Regla de esta etapa: si el nombre del CSV es exactamente uno de esos, se usa tal cual. Si no está en la lista, no se renombra (no hay otra fuente oficial cargada en el repo) y se documenta acá. Un hub se indexa igual con 3 fichas o más, aunque el nombre no esté en la lista.

## En la lista, con fichas infantiles

| Barrio | Fichas | Hub indexable |
|---|---:|---|
| Alta Córdoba | 7 | sí |
| Alberdi | 5 | sí |
| Argüello | 3 | sí |
| Villa Belgrano | 3 | sí |
| General Paz | 2 | no |
| San Vicente | 2 | no |
| Cerro de las Rosas | 2 | no |
| Jardín | 1 | no |
| Nueva Córdoba | 1 | no |

## En la lista, sin fichas infantiles

- Güemes: está en contenidos y no tiene ningún `place_id` con `clasificacion=infantil`.

## No están en la lista

Estos nombres salen de `place_ids_cordoba.csv` y se muestran así. No se unificaron a la lista porque no corresponden a ninguno de esos diez.

Hub indexable (3 o más), aunque no está en contenidos:

- General Pueyrredón: 4 fichas. En la navegación compacta del diseño se abrevia «Gral. Pueyrredón». El nombre canónico de la ficha y del H1 es General Pueyrredón.

Con 2 fichas (índice «Otros barrios», sin página indexable):

- Parque Capital
- Alto Alberdi
- Villa Eucarística
- 1 de Mayo
- Las Flores

Con 1 ficha:

- Rogelio Martínez
- San Fernando
- California
- Las Palmas
- Santa Isabel 1A Sección
- Los Plátanos
- Santa Rosa Residencial
- Yofre Norte
- José Ignacio Díaz 2A Sección
- Los Álamos
- Juniors
- Providencia
- Parque Liceo 1A Sección
- La France
- San Lorenzo Sud
- Alto Palermo
- Empalme
- Obrero
- Inaudi
- Centro
- Villa Coronel Olmedo
- Center
- La Carolina
- Ampliación Las Palmas
- Valle del Cerro
- Los Paraísos
- Villa Warcalde
- Alto Hermoso
- Doctor Rene Favaloro
- Ampliación Residencial América
- Parque Atlántica
- Camino a San Carlos
- Docta
- Uritorco
- Teniente Benjamín Matienzo
- Lamadrid
- Villa Cabrera
- Tablada Park
- Manantiales II

## Notas de ortografía, sin cambio

No se corrigieron porque la lista de contenidos no trae la forma oficial y el prompt pide no inventar datos:

- Doctor Rene Favaloro: en el CSV falta la tilde de René.
- Santa Isabel 1A Sección, José Ignacio Díaz 2A Sección y Parque Liceo 1A Sección: el CSV escribe «1A» / «2A», no «1ª» / «2ª».
