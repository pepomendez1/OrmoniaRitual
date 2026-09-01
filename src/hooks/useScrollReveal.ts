import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface UseScrollRevealOptions {
  /** Retraso adicional (segundos) antes de iniciar el reveal. */
  delay?: number;
  /** Traslación vertical (px) antes del reveal. */
  y?: number;
  /** Duración de la animación (segundos). */
  duration?: number;
}

/**
 * Hook genérico de reveal al entrar en viewport (fade + translateY sutil).
 *
 * Si el usuario tiene `prefers-reduced-motion: reduce`, el contenido queda
 * visible de inmediato sin animar. Devuelve un ref a adjuntar al elemento.
 *
 * Uso: `const ref = useScrollReveal(); ... <div ref={ref}>`.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const { delay = 0, y = 24, duration = 0.8 } = options;
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Recalcular tras un frame para compensar carga de fuentes / layout.
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, [delay, y, duration]);

  return ref;
}
