# Prompt: completar piloto Google Places Córdoba (29/10/2026)
Completar Place Details (Pro) de los IDs sin datos, sin repetir búsquedas; luego teléfono/web (Enterprise) solo para infantiles reales. Topes: 300 GetPlace/día, 500 SearchText/día, cupo gratis mensual (Pro 5000, Enterprise 1000). Cortar ante error de cuota. Costo $0. Key en variable de entorno GOOGLE_PLACES_API_KEY (nunca en archivos).
Reglas Google: solo place_id se guarda permanente; el resto se muestra en vivo con atribución "Datos de Google".
