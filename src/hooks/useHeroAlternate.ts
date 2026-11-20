import { useEffect, useState } from "react";

/** Tiempo que cada imagen queda quieta, sin contar el fundido (ms). */
export const HERO_HOLD_MS = 9000;
/** Duración del crossfade entre las dos imágenes (ms). */
export const HERO_FADE_MS = 1800;

/**
 * Segundo estado fotográfico del Hero.
 *
 * Alterna el fondo entre la imagen original y una segunda, sin interfaz: ni
 * dots ni flechas ni cambio de texto. Cada imagen queda `HERO_HOLD_MS` y el
 * relevo dura `HERO_FADE_MS`.
 *
 * - No corre con `prefers-reduced-motion` ni por debajo de `minWidth`: ahí el
 *   Hero queda estático con la imagen original.
 * - La segunda imagen se precarga recién cuando la página terminó de cargar,
 *   así no compite con la primera, y el ciclo arranca cuando ya está
 *   decodificada: nunca entra a medio cargar.
 * - Se pausa con la pestaña oculta.
 */
export function useHeroAlternate(src: string | null, minWidth: number) {
  const [ready, setReady] = useState(false);
  const [showing, setShowing] = useState(false);
  const [enabled, setEnabled] = useState(false);

  // ¿Corresponde el slideshow en este dispositivo? Se reevalúa al redimensionar.
  useEffect(() => {
    if (!src) return;
    const mq = window.matchMedia(
      `(min-width: ${minWidth}px) and (prefers-reduced-motion: no-preference)`
    );
    const sync = () => {
      setEnabled(mq.matches);
      if (!mq.matches) setShowing(false);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [src, minWidth]);

  // Precarga diferida y decodificada.
  useEffect(() => {
    if (!src || !enabled || ready) return;
    let alive = true;
    const load = () => {
      const img = new Image();
      img.src = src;
      img
        .decode()
        .then(() => alive && setReady(true))
        .catch(() => undefined);
    };
    if (document.readyState === "complete") load();
    else window.addEventListener("load", load, { once: true });
    return () => {
      alive = false;
      window.removeEventListener("load", load);
    };
  }, [src, enabled, ready]);

  // Alternancia.
  useEffect(() => {
    if (!enabled || !ready) return;
    let timer = 0;
    const tick = () => {
      if (!document.hidden) setShowing((v) => !v);
      timer = window.setTimeout(tick, HERO_HOLD_MS + HERO_FADE_MS);
    };
    timer = window.setTimeout(tick, HERO_HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [enabled, ready]);

  return { mounted: enabled && ready, showing };
}
