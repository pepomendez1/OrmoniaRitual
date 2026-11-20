import { lazy, Suspense, type ComponentType } from "react";
import { Navigate } from "react-router-dom";
import Home from "./pages/Home";

/*
 * Home viaja en el bundle inicial: es la puerta de entrada. El resto de las
 * rutas se descarga recién al visitarlas, así el diagnóstico, la tienda y las
 * páginas secundarias no pesan sobre la primera carga.
 */
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Calendar = lazy(() => import("./pages/Calendar"));
const Explore = lazy(() => import("./pages/Explore"));
const ReadingDetail = lazy(() => import("./pages/Explore/ReadingDetail"));
const DiscoverSkin = lazy(() => import("./pages/DiscoverSkin"));
const DiscoverSkinResult = lazy(() => import("./pages/DiscoverSkin/Result"));
const About = lazy(() => import("./pages/About"));
const Cart = lazy(() => import("./pages/Cart"));
const Account = lazy(() => import("./pages/Account"));
const Policy = lazy(() => import("./pages/Policy"));
const NotFound = lazy(() => import("./pages/NotFound"));

/** Mientras llega el chunk: el mismo campo ivory, sin spinner ni salto. */
function page(Component: ComponentType) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F2EBDD]" />}>
      <Component />
    </Suspense>
  );
}

export const routers = [
  {
    path: "/",
    name: "home",
    element: <Home />,
  },

  /* — Tienda — */
  {
    path: "/products",
    name: "products",
    element: page(Products),
  },
  /** Alias en inglés/castellano que la gente puede tipear o compartir. */
  { path: "/shop", name: "shop", element: <Navigate to="/products" replace /> },
  { path: "/tienda", name: "tienda", element: <Navigate to="/products" replace /> },
  /** Slug histórico de El Ritual: los links viejos siguen funcionando. */
  {
    path: "/products/pack-x4",
    name: "pack-x4-legacy",
    element: <Navigate to="/products/el-ritual" replace />,
  },
  {
    path: "/products/:slug",
    name: "product-detail",
    element: page(ProductDetail),
  },
  {
    path: "/cart",
    name: "cart",
    element: page(Cart),
  },

  /* — Editorial — */
  {
    path: "/calendario",
    name: "calendar",
    element: page(Calendar),
  },
  {
    path: "/explore",
    name: "explore",
    element: page(Explore),
  },
  {
    path: "/explore/:id",
    name: "reading",
    element: page(ReadingDetail),
  },
  /** Ruta histórica de Lecturas: se conserva como redirect. */
  { path: "/learn", name: "learn", element: <Navigate to="/explore" replace /> },
  {
    path: "/about",
    name: "about",
    element: page(About),
  },

  /* — Diagnóstico — */
  /*
   * Ruta legacy. El diagnóstico real vive en /descubri-tu-piel; se redirige
   * para no romper links viejos. `pages/Discover.tsx` se conserva en el repo.
   */
  {
    path: "/discover",
    name: "discover",
    element: <Navigate to="/descubri-tu-piel" replace />,
  },
  {
    path: "/descubri-tu-piel",
    name: "discover-skin",
    element: page(DiscoverSkin),
  },
  {
    path: "/descubri-tu-piel/resultado",
    name: "discover-skin-result",
    element: page(DiscoverSkinResult),
  },

  /* — Cuenta y ayuda — */
  {
    path: "/account",
    name: "account",
    element: page(Account),
  },
  {
    path: "/account/pedidos/:orderId",
    name: "account-order",
    element: page(Account),
  },
  {
    path: "/ayuda/:slug",
    name: "help",
    element: page(Policy),
  },

  /* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */
  {
    path: "*",
    name: "404",
    element: page(NotFound),
  },
];

declare global {
  interface Window {
    __routers__: typeof routers;
  }
}

window.__routers__ = routers;
