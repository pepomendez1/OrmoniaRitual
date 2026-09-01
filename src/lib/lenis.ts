import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

let lenisInstance: Lenis | null = null;

/**
 * Inicializa Lenis (smooth scroll) y lo sincroniza con el ticker de GSAP
 * para que ScrollTrigger se mantenga coordinado con el scroll suavizado.
 *
 * Si el usuario tiene `prefers-reduced-motion: reduce`, no se inicializa el
 * smooth scroll y se devuelve `null`.
 *
 * La instancia queda además respaldada en una variable de módulo accesible
 * vía `getLenis()`, para que componentes aislados (p. ej. un CTA de scroll
 * interno) puedan pedir scroll programático sin acoplarse al provider.
 */
export function initLenis(): Lenis | null {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    return null;
  }

  const lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  lenisInstance = lenis;
  return lenis;
}

/**
 * Devuelve la instancia activa de Lenis, o `null` si no se inicializó
 * (p. ej. con prefers-reduced-motion, o antes de montar SmoothScrollProvider).
 */
export function getLenis(): Lenis | null {
  return lenisInstance;
}
