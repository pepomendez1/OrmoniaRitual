import { useEffect, type ReactNode } from "react";
import { initLenis } from "@/lib/lenis";

/**
 * Monta/desmonta Lenis (smooth scroll) a nivel de app.
 * Respeta `prefers-reduced-motion`: initLenis devuelve null y no hay smooth scroll.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = initLenis();
    return () => {
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
