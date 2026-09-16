/**
 * Formato de precio para Argentina: 55000 → "$55.000".
 *
 * Los precios viven en `data/products.ts` y son provisionales: cuando Shopify
 * sea la fuente, cambia el origen del dato pero no este formateo ni las vistas.
 */
export function formatPrice(value: number): string {
  return `$${value.toLocaleString("es-AR")}`;
}
