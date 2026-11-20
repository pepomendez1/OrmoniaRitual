import { createContext } from "react";
import type { Product } from "@/data/products";
import type { Cart } from "./types";

export type CartStatus = "loading" | "ready" | "updating";

export interface CartContextValue {
  cart: Cart;
  status: CartStatus;
  /** Mensaje para la persona si la última operación falló. */
  error: string | null;
  /** Línea que se está actualizando, para deshabilitar solo sus controles. */
  pendingLineId: string | null;
  /** Último producto agregado: el drawer lo destaca. */
  lastAddedId: string | null;
  add: (
    product: Product,
    quantity?: number,
    options?: { openDrawer?: boolean }
  ) => Promise<boolean>;
  update: (lineId: string, quantity: number) => Promise<boolean>;
  remove: (lineId: string) => Promise<boolean>;
  clearError: () => void;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}

export const EMPTY_CART: Cart = {
  id: "empty",
  lines: [],
  totalQuantity: 0,
  subtotal: 0,
  hasUnpricedLines: false,
  checkoutUrl: null,
};

export const CartContext = createContext<CartContextValue | null>(null);
