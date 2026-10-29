import { detalleCompleto, bytesFoto, hayClavePlaces } from "@/lib/google";

export const revalidate = 691200;

export async function GET(_request: Request, contexto: { params: Promise<{ placeId: string }> }) {
  if (!hayClavePlaces()) return new Response(null, { status: 404 });
  const { placeId } = await contexto.params;
  const detalle = await detalleCompleto(decodeURIComponent(placeId));
  if (!detalle?.fotoNombre) return new Response(null, { status: 404 });
  const foto = await bytesFoto(detalle.fotoNombre);
  if (!foto) return new Response(null, { status: 404 });
  return new Response(foto.buffer, {
    headers: {
      "Content-Type": foto.tipo,
      "Cache-Control": "public, max-age=3600, s-maxage=691200",
    },
  });
}
