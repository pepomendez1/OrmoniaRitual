import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routers } from "./router";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { RootLayout } from "@/components/layout/RootLayout";
import { CartProvider } from "@/commerce/CartProvider";

const queryClient = new QueryClient();

/*
 * El router se crea una sola vez, a nivel de módulo. Antes se creaba dentro
 * del render de App: cualquier re-render remontaba todas las rutas (Audit T10).
 *
 * `RootLayout` envuelve todas las rutas para montar los overlays globales
 * (mini carrito y buscador). `routers` sigue siendo la lista plana que lee la
 * plataforma (`window.__routers__`).
 */
const router = createBrowserRouter([{ element: <RootLayout />, children: routers }]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SmoothScrollProvider>
          <CartProvider>
            <CustomCursor />
            <Toaster />
            <Sonner />
            <RouterProvider router={router} />
          </CartProvider>
        </SmoothScrollProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
