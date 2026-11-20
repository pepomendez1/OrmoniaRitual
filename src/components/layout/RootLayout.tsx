import { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigationType } from "react-router-dom";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { SearchOverlay } from "@/components/shop/SearchOverlay";
import { SearchContext } from "@/components/shop/searchContext";
import { useCart } from "@/hooks/useCart";
import { getLenis } from "@/lib/lenis";

/**
 * Layout raíz de todas las rutas.
 *
 * Monta una sola vez lo que es global y necesita el router: el mini carrito y
 * el buscador (sus links navegan). Las páginas siguen renderizando su propio
 * Header/Footer, como hasta ahora.
 *
 * También resuelve el scroll al cambiar de página: al navegar hacia adelante
 * se vuelve arriba (React Router no lo hace solo, y Lenis conservaba la
 * posición anterior). Con hash, la página destino resuelve el ancla
 * (`useHashScroll`). En "atrás/adelante" del navegador no se fuerza nada.
 */
export function RootLayout() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();
  const { setDrawerOpen } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setDrawerOpen(false);
    setSearchOpen(false);
    if (hash || navigationType === "POP") return;
    const lenis = getLenis();
    if (lenis) {
      lenis.resize();
      lenis.scrollTo(0, { immediate: true, force: true });
    }
    window.scrollTo(0, 0);
    // `hash` y `navigationType` acompañan al pathname; solo importa el cambio de página.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const search = useMemo(() => ({ open: searchOpen, setOpen: setSearchOpen }), [searchOpen]);

  return (
    <SearchContext.Provider value={search}>
      <Outlet />
      <CartDrawer />
      <SearchOverlay />
    </SearchContext.Provider>
  );
}
