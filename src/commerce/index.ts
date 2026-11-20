import type { Product } from "@/data/products";
import { localAdapter } from "./localAdapter";
import type { CommerceAdapter } from "./types";

export * from "./types";

/**
 * Punto único de selección del backend de comercio.
 *
 * Hoy siempre es el adapter local. Cuando existan `VITE_SHOPIFY_STORE_DOMAIN`
 * y `VITE_SHOPIFY_STOREFRONT_TOKEN`, acá se devuelve el adapter de Shopify
 * (a implementar con la Storefront Cart API, ver `commerce/README.md`).
 * No se agrega antes: no hay credenciales ni productos cargados que probar.
 */
export const commerce: CommerceAdapter = localAdapter;

/** `true` cuando el checkout es real. La UI de carrito lo usa para su CTA. */
export const checkoutEnabled = commerce.provider !== "local";

/**
 * Variante a comprar para un producto. Hoy todos tienen una única variante
 * inicial: la de Shopify si ya existe, o un id local estable.
 */
export function merchandiseIdOf(product: Product): string {
  return product.shopifyVariantId ?? `local:${product.id}`;
}
