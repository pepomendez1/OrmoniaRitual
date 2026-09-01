import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Learn from "./pages/Learn";
import Discover from "./pages/Discover";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

export const routers = [
  {
    path: "/",
    name: "home",
    element: <Home />,
  },
  {
    path: "/products",
    name: "products",
    element: <Products />,
  },
  {
    path: "/products/:slug",
    name: "product-detail",
    element: <ProductDetail />,
  },
  {
    path: "/learn",
    name: "learn",
    element: <Learn />,
  },
  {
    path: "/discover",
    name: "discover",
    element: <Discover />,
  },
  {
    path: "/about",
    name: "about",
    element: <About />,
  },
  /* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */
  {
    path: "*",
    name: "404",
    element: <NotFound />,
  },
];

declare global {
  interface Window {
    __routers__: typeof routers;
  }
}

window.__routers__ = routers;
