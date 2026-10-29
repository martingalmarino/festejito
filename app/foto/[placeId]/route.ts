import { detallePlace, bytesFoto, hayClavePlaces } from "@/lib/google";

export const revalidate = 72000;

export async function GET(_request: Request, contexto: { params: Promise<{ placeId: string }> }) {
  if (!hayClavePlaces()) return new Response(null, { status: 404 });
  const { placeId } = await contexto.params;
  const detalle = await detallePlace(decodeURIComponent(placeId));
  if (!detalle?.fotoNombre) return new Response(null, { status: 404 });
  const foto = await bytesFoto(detalle.fotoNombre);
  if (!foto) return new Response(null, { status: 404 });
  return new Response(foto.buffer, {
    headers: {
      "Content-Type": foto.tipo,
      "Cache-Control": "public, max-age=3600, s-maxage=72000",
    },
  });
}
