import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ScrollCTAButton } from "@/components/ui/ScrollCTAButton";
import { brandCopy, heroCopy, heroMedia } from "@/data/content";

/**
 * Portada — El paisaje.
 *
 * Imagen de pradera a pantalla completa, composición editorial asimétrica
 * (texto a la izquierda en desktop dejando espacio negativo a la derecha;
 * anclado abajo en mobile para no tapar el centro/alto de la imagen),
 * entrada sutil al cargar (wordmark → declaración → CTA) y una transición
 * de scroll que "profundiza" en el paisaje (escala + desenfoque + oscurecido
 * + desvanecido del texto) en vez de cortar seco hacia RhythmSection.
 *
 * Respeta `prefers-reduced-motion`: contenido visible de inmediato, sin
 * respiración ambiental ni scroll-scrub.
 */
export function HeroLandscape() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaWrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const scrollOverlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLSpanElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const entrance = [wordmarkRef, statementRef, ctaRef]
        .map((r) => r.current)
        .filter((el): el is HTMLElement => el !== null);

      if (prefersReducedMotion) {
        gsap.set(entrance, { opacity: 1, y: 0 });
        return;
      }

      // 1. Entrada al cargar (no ligada a scroll): stagger corto, sin rebote.
      gsap.fromTo(
        entrance,
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power2.out",
          delay: 0.15,
          stagger: 0.12,
        }
      );

      // 2. Respiración ambiental, casi imperceptible, una sola vez.
      if (mediaWrapRef.current) {
        gsap.to(mediaWrapRef.current, {
          scale: 1.04,
          duration: 18,
          ease: "sine.inOut",
        });
      }

      // 3. Transición de scroll hacia RhythmSection: todo simultáneo, scrub.
      const scrub = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.3,
        },
      });
      scrub
        .fromTo(
          imgRef.current,
          { scale: 1, filter: "blur(0px)" },
          { scale: 1.08, filter: "blur(10px)", ease: "none", duration: 1 },
          0
        )
        .to(
          scrollOverlayRef.current,
          { opacity: 0.6, ease: "none", duration: 1 },
          0
        )
        .to(
          textRef.current,
          { opacity: 0, y: -16, ease: "none", duration: 1 },
          0
        );
    });

    // Recalcular tras un frame para compensar carga de fuentes / layout.
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Portada — El paisaje"
      className="relative h-[100svh] min-h-screen w-full overflow-hidden"
    >
      <div ref={mediaWrapRef} className="absolute inset-0 h-full w-full">
        {/*
          object-position: recorte responsive preparado para el encuadre final.
          Ajustable aquí cuando se defina el framing definitivo de la imagen.
        */}
        <img
          ref={imgRef}
          src={heroMedia.src}
          alt={heroMedia.alt}
          className="h-full w-full object-cover object-[65%_45%] md:object-[68%_38%]"
        />
      </div>

      {/* Overlays de legibilidad, siempre sutiles. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-ink/30 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/50 via-ink/10 to-transparent"
      />
      {/* Oscurece el paisaje a medida que se hace scroll (transición). */}
      <div
        ref={scrollOverlayRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-ink opacity-0"
      />

      <div
        ref={textRef}
        className="relative z-10 flex h-full w-full flex-col justify-end px-6 pb-24 md:w-[56%] md:justify-center md:px-10 md:pb-0 lg:pl-16"
      >
        <span
          ref={wordmarkRef}
          className="mb-4 font-display text-lg tracking-[-0.01em] text-ivory md:text-xl"
        >
          {brandCopy.wordmark}
        </span>
        <h1
          ref={statementRef}
          className="font-display text-[clamp(2rem,5.5vw,3.75rem)] leading-[1.12] text-ivory"
        >
          {heroCopy.line1}
          <br />
          {heroCopy.line2}
        </h1>
        <div ref={ctaRef} className="mt-9">
          <ScrollCTAButton href="#ritmo" tone="light" data-cursor-expand>
            {heroCopy.cta}
          </ScrollCTAButton>
        </div>
      </div>

      {/* Punto de origen para Sprint 02 (línea orgánica). No se anima todavía. */}
      <div
        aria-hidden="true"
        data-transition-origin
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
      />
    </section>
  );
}
