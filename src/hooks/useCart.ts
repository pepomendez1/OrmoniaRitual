import { useContext } from "react";
import { CartContext, type CartContextValue } from "@/commerce/cartContext";

/** Acceso al carrito. Requiere `CartProvider` (montado en `App`). */
export function useCart(): CartContextValue {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart debe usarse dentro de <CartProvider>.");
  return value;
}
