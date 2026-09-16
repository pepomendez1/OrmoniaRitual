import { useCallback, useEffect, useRef, useState } from "react";

/** Marca los elementos que el riel considera "una tarjeta" para medir el paso. */
export const RAIL_ITEM_ATTR = "data-rail-item";

interface HorizontalRail<T extends HTMLElement> {
  railRef: React.RefObject<T>;
  canPrev: boolean;
  canNext: boolean;
  scrollByCard: (direction: 1 | -1) => void;
}

/**
 * Carrusel horizontal sin dependencias.
 *
 * El desplazamiento es scroll nativo con `scroll-snap`, así que el trackpad
 * horizontal, el swipe táctil y el foco de teclado funcionan solos y con el
 * snap del sistema. El hook agrega lo que el scroll nativo no da:
 *
 * - arrastre con mouse, desactivando el snap mientras dura para que no pelee
 *   con el gesto y anulando el click posterior para no abrir un producto al
 *   soltar;
 * - un paso medido sobre las tarjetas reales (`[data-rail-item]`), no estimado;
 * - el estado de los extremos, para deshabilitar las flechas.
 *
 * Respeta `prefers-reduced-motion` en el desplazamiento por flecha.
 */
export function useHorizontalRail<
  T extends HTMLElement = HTMLDivElement
>(): HorizontalRail<T> {
  const railRef = useRef<T>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const sync = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const max = rail.scrollWidth - rail.clientWidth;
    setCanPrev(rail.scrollLeft > 2);
    setCanNext(rail.scrollLeft < max - 2);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    sync();
    rail.addEventListener("scroll", sync, { passive: true });

    const observer = new ResizeObserver(sync);
    observer.observe(rail);

    return () => {
      rail.removeEventListener("scroll", sync);
      observer.disconnect();
    };
  }, [sync]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let activePointer: number | null = null;
    let startX = 0;
    let startLeft = 0;
    let dragging = false;

    const swallowClick = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const onPointerDown = (event: PointerEvent) => {
      // El touch ya tiene scroll e inercia nativos: no los interceptamos.
      if (event.pointerType !== "mouse") return;
      activePointer = event.pointerId;
      startX = event.clientX;
      startLeft = rail.scrollLeft;
      dragging = false;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (activePointer !== event.pointerId) return;
      const dx = event.clientX - startX;

      if (!dragging) {
        if (Math.abs(dx) < 6) return;
        dragging = true;
        rail.style.scrollSnapType = "none";
        rail.setPointerCapture(event.pointerId);
      }

      rail.scrollLeft = startLeft - dx;
    };

    const onPointerUp = (event: PointerEvent) => {
      if (activePointer !== event.pointerId) return;

      if (dragging) {
        rail.style.scrollSnapType = "";
        if (rail.hasPointerCapture(event.pointerId)) {
          rail.releasePointerCapture(event.pointerId);
        }
        // Soltar tras arrastrar no debe navegar al producto.
        rail.addEventListener("click", swallowClick, {
          capture: true,
          once: true,
        });
        window.setTimeout(() => {
          rail.removeEventListener("click", swallowClick, true);
        }, 0);
      }

      activePointer = null;
      dragging = false;
    };

    rail.addEventListener("pointerdown", onPointerDown);
    rail.addEventListener("pointermove", onPointerMove);
    rail.addEventListener("pointerup", onPointerUp);
    rail.addEventListener("pointercancel", onPointerUp);

    return () => {
      rail.removeEventListener("pointerdown", onPointerDown);
      rail.removeEventListener("pointermove", onPointerMove);
      rail.removeEventListener("pointerup", onPointerUp);
      rail.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  const scrollByCard = useCallback((direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;

    const items = rail.querySelectorAll<HTMLElement>(`[${RAIL_ITEM_ATTR}]`);
    const step =
      items.length > 1
        ? items[1].offsetLeft - items[0].offsetLeft
        : (items[0]?.offsetWidth ?? rail.clientWidth * 0.8);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollBy({
      left: step * direction,
      behavior: reduced ? "auto" : "smooth",
    });
  }, []);

  return { railRef, canPrev, canNext, scrollByCard };
}
