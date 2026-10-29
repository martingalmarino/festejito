export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function placeSuffix(placeId: string) {
  return placeId.slice(-8).toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function venueSlug(barrio: string, placeId: string) {
  return `salon-${slugify(barrio)}-${placeSuffix(placeId)}`;
}
