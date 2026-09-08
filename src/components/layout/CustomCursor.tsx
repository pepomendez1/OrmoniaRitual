import { useEffect, useMemo, useRef } from "react";
import { gsap } from "@/lib/gsap";

const HIDE_CURSOR_STYLE =
  "html.ormonia-cursor, html.ormonia-cursor *{cursor:none!important}";

/** Tonos del cursor. Ink por defecto; ivory sobre escenas oscuras. */
const RING_INK = "rgba(25,21,17,0.40)";
const RING_IVORY = "rgba(242,235,221,0.72)";
const DOT_INK = "rgba(25,21,17,1)";
const DOT_IVORY = "rgba(242,235,221,1)";

/**
 * Cursor personalizado minimal: un punto + un anillo fino que siguen al
 * mouse con leve retraso (GSAP `quickTo`). El anillo se expande al pasar
 * sobre cualquier elemento con `data-cursor-expand`.
 *
 * Tono contextual: sobre un elemento con `data-cursor-tone="light"` el anillo
 * y el punto pasan a ivory, para no perderse en escenas oscuras. El cambio se
 * interpola con el mismo tween que la escala, así la transición es suave. Es
 * una variante del mismo cursor, no un segundo sistema.
 *
 * Solo desktop con mouse fino: si no se da `(pointer: fine) and (hover: hover)`
 * o si hay `prefers-reduced-motion: reduce`, el componente no renderiza nada
 * y el cursor nativo queda intacto. Oculta el cursor nativo globalmente
 * (incluido enlaces, que tienen `cursor: pointer` por defecto) solo mientras
 * está activo, vía un `<style>` acotado y reversible; se remueve en cleanup.
 * No reemplaza el foco de teclado (`:focus-visible` global se conserva).
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const supported = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine) and (hover: hover)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useEffect(() => {
    if (!supported) return;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const style = document.createElement("style");
    style.setAttribute("data-ormonia-cursor", "");
    style.textContent = HIDE_CURSOR_STYLE;
    document.head.appendChild(style);
    document.documentElement.classList.add("ormonia-cursor");

    gsap.set([ring, dot], { xPercent: -50, yPercent: -50, opacity: 0 });
    gsap.set(ring, { borderColor: RING_INK });
    gsap.set(dot, { backgroundColor: DOT_INK });

    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });

    let shown = false;
    const onMove = (e: PointerEvent) => {
      if (!shown) {
        shown = true;
        gsap.to([ring, dot], { opacity: 1, duration: 0.3 });
      }
      ringX(e.clientX);
      ringY(e.clientY);
      dotX(e.clientX);
      dotY(e.clientY);
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const expand = !!target?.closest("[data-cursor-expand]");
      const light = !!target?.closest('[data-cursor-tone="light"]');
      gsap.to(ring, {
        scale: expand ? 1.9 : 1,
        borderColor: light ? RING_IVORY : RING_INK,
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.to(dot, {
        opacity: expand ? 0 : 1,
        backgroundColor: light ? DOT_IVORY : DOT_INK,
        duration: 0.3,
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.classList.remove("ormonia-cursor");
      style.remove();
      gsap.killTweensOf([ring, dot]);
    };
  }, [supported]);

  if (!supported) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-7 w-7 rounded-full border opacity-0"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full opacity-0"
      />
    </>
  );
}
