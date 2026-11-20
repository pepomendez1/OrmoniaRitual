import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { isPurchasable, type Product } from "@/data/products";
import { cartCopy } from "@/data/shopCopy";
import { commerce, merchandiseIdOf } from "./index";
import { LOCAL_CART_STORAGE_KEY } from "./localAdapter";
import { CartContext, EMPTY_CART, type CartStatus } from "./cartContext";
import type { Cart } from "./types";

/**
 * Estado del carrito para toda la app.
 *
 * Habla solo con `commerce` (el adapter activo). Cada operación es async
 * aunque el adapter local resuelva al instante: así la UI ya maneja carga y
 * error como lo va a necesitar con la red de Shopify.
 *
 * Vive fuera del router: el estado sobrevive a cambios de ruta. El drawer se
 * monta en el layout raíz y lee `drawerOpen` de acá.
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>(EMPTY_CART);
  const [status, setStatus] = useState<CartStatus>("loading");
  const [error, setError] = useState<string | null>(null);
  const [pendingLineId, setPendingLineId] = useState<string | null>(null);
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    let alive = true;
    commerce
      .getCart()
      .then((next) => alive && setCart(next))
      .catch(() => alive && setError(cartCopy.errors.load))
      .finally(() => alive && setStatus("ready"));
    return () => {
      alive = false;
    };
  }, []);

  // Otra pestaña cambió el carrito local: se relee para no mostrar un estado viejo.
  useEffect(() => {
    if (commerce.provider !== "local") return;
    const onStorage = (event: StorageEvent) => {
      if (event.key !== LOCAL_CART_STORAGE_KEY) return;
      commerce.getCart().then(setCart).catch(() => undefined);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const run = useCallback(
    async (operation: () => Promise<Cart>, lineId: string | null, message: string) => {
      setStatus("updating");
      setPendingLineId(lineId);
      setError(null);
      try {
        setCart(await operation());
        return true;
      } catch {
        setError(message);
        return false;
      } finally {
        setStatus("ready");
        setPendingLineId(null);
      }
    },
    []
  );

  const add = useCallback(
    async (product: Product, quantity = 1, options?: { openDrawer?: boolean }) => {
      if (!isPurchasable(product)) return false;
      const ok = await run(
        () =>
          commerce.addLines([
            { productId: product.id, merchandiseId: merchandiseIdOf(product), quantity },
          ]),
        null,
        cartCopy.errors.add
      );
      if (ok) {
        setLastAddedId(product.id);
        if (options?.openDrawer !== false) setDrawerOpen(true);
      }
      return ok;
    },
    [run]
  );

  const update = useCallback(
    (lineId: string, quantity: number) =>
      run(() => commerce.updateLine(lineId, quantity), lineId, cartCopy.errors.update),
    [run]
  );

  const remove = useCallback(
    (lineId: string) =>
      run(() => commerce.removeLine(lineId), lineId, cartCopy.errors.update),
    [run]
  );

  const value = useMemo(
    () => ({
      cart,
      status,
      error,
      pendingLineId,
      lastAddedId,
      add,
      update,
      remove,
      clearError: () => setError(null),
      drawerOpen,
      setDrawerOpen,
    }),
    [cart, status, error, pendingLineId, lastAddedId, add, update, remove, drawerOpen]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
