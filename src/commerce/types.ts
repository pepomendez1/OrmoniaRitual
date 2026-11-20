/**
 * Contrato de comercio de ORMONIA.
 *
 * Las vistas (drawer, /cart, quick add, header) solo conocen estos tipos y la
 * interfaz `CommerceAdapter`. Hoy la implementa `localAdapter` (estado en
 * localStorage, para la demo frontend). Cuando existan credenciales, un
 * adapter de Shopify Storefront implementa la misma interfaz y se cambia en
 * `commerce/index.ts`. Ninguna vista se reescribe.
 *
 * La forma imita a propósito el objeto `Cart` de la Storefront Cart API
 * (líneas con `merchandiseId`, `quantity`, costo y `checkoutUrl`), para que
 * el mapeo futuro sea directo.
 */

export interface CartLine {
  /** Id de la línea (en Shopify, `CartLine.id`). */
  id: string;
  /**
   * Variante comprada. En Shopify es el `ProductVariant` GID; en local,
   * `local:<productId>` mientras el producto no exista en la tienda.
   */
  merchandiseId: string;
  /** Producto del catálogo local, para nombre, imagen y link. */
  productId: string;
  quantity: number;
  /** Precio unitario. `null` = precio todavía no definido. */
  unitPrice: number | null;
  /** `unitPrice × quantity`, o `null` si el precio no existe. */
  lineTotal: number | null;
}

export interface Cart {
  id: string;
  lines: CartLine[];
  /** Unidades totales (no líneas): lo que muestra el header. */
  totalQuantity: number;
  /** Suma de las líneas con precio. */
  subtotal: number;
  /** `true` si alguna línea no tiene precio: el subtotal es parcial. */
  hasUnpricedLines: boolean;
  /**
   * URL de checkout que entrega Shopify (`Cart.checkoutUrl`). `null` en la
   * demo local: no hay checkout y la UI lo dice, no lo simula.
   */
  checkoutUrl: string | null;
}

export interface CartLineInput {
  productId: string;
  merchandiseId: string;
  quantity: number;
}

export interface CommerceAdapter {
  /** "local" mientras no haya tienda conectada. */
  readonly provider: "local" | "shopify";
  getCart(): Promise<Cart>;
  addLines(lines: CartLineInput[]): Promise<Cart>;
  updateLine(lineId: string, quantity: number): Promise<Cart>;
  removeLine(lineId: string): Promise<Cart>;
}

/** Límite de unidades por línea en la UI, mientras no haya inventario real. */
export const MAX_LINE_QUANTITY = 10;
