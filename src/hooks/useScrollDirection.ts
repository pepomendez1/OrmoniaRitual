import { useEffect, useState } from "react";

export type ScrollDirection = "up" | "down";

/**
 * Dirección de scroll estable.
 *
 * Solo cambia cuando el desplazamiento acumulado supera `threshold`, de modo
 * que los movimientos de 1–2px (trackpad, rebote, subpíxeles) no producen
 * flicker. La lectura se hace dentro de un `requestAnimationFrame` para no
 * forzar layout en cada evento de scroll.
 *
 * Arranca en "up" para que un header que dependa de esto sea visible al cargar.
 */
export function useScrollDirection(threshold = 12): ScrollDirection {
  const [direction, setDirection] = useState<ScrollDirection>("up");

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;

      if (Math.abs(y - last) < threshold) return;

      setDirection(y > last ? "down" : "up");
      last = Math.max(0, y);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return direction;
}
