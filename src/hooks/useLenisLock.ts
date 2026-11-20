import { useEffect } from "react";
import { getLenis } from "@/lib/lenis";

/**
 * Detiene el smooth scroll de la página mientras un overlay está abierto.
 *
 * Radix bloquea el scroll nativo del body, pero Lenis escucha la rueda por su
 * cuenta y seguiría moviendo la página detrás del drawer. Los contenedores con
 * scroll propio dentro del overlay llevan `data-lenis-prevent`.
 */
export function useLenisLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const lenis = getLenis();
    lenis?.stop();
    return () => {
      lenis?.start();
    };
  }, [locked]);
}
