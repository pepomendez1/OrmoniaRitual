import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ScrollCTAButton } from "@/components/ui/ScrollCTAButton";
import { heroCopy, heroMedia } from "@/data/content";
import { productionMedia } from "@/data/productionMedia";
import { HERO_FADE_MS, useHeroAlternate } from "@/hooks/useHeroAlternate";

/**
 * Portada — El paisaje.
 *
 * Fotografía de pradera a sangre, composición editorial centrada: la
 * declaración de marca al eje y el CTA justo debajo, con aire alrededor.
 * El wordmark lo sostiene el header (centrado, sticky), así que la portada
 * no lo repite.
 *
 * El headline es el principal gesto gráfico del primer viewport (72–112px en
 * desktop) y el CTA es un marco fino sobre fondo transparente: tiene presencia
 * sin competir con él. El bloque se centra en el espacio que queda bajo el
 * header, con un pequeño levantamiento óptico para equilibrar con el caballo y
 * el horizonte en vez de caer en el centro matemático.
 *
 * `data-header-hero` le dice al header dónde termina esta escena, para
 * disolverse al salir de ella. `data-header-tone="light"` cubre el Hero
 * completo: mientras el usuario siga acá, la navegación es ivory sobre la
 * fotografía, sin fondo ni blur en ningún momento del scroll.
 *
 * El CTA no navega: hace scroll suave hasta el bloque de El Ritual. Cuando
 * exista Shopify se evaluará dirigirlo al PDP del pack.
 *
 * Salida por scroll: el paisaje se desenfoca apenas y el texto se va. Entrega
 * a El Ritual, sobre campo claro, con un corte limpio: ya no tiñe la foto hacia
 * el mineral de El Ciclo (que ahora vive más abajo) ni hace un fundido de
 * color para "coser" ambas escenas.
 *
 * Segundo estado: el fondo alterna, en un crossfade lento, entre la pradera
 * y la foto de campaña de las cuatro modelos (`productionMedia.hero`). Solo
 * cambia la fotografía: claim, CTA y header quedan quietos. Ver
 * `useHeroAlternate` para tiempos, precarga y en qué casos no corre.
 *
 * Respeta `prefers-reduced-motion`: contenido visible de inmediato, sin
 * respiración ambiental, sin scroll-scrub y sin alternar fondos.
 */
export function HeroLandscape() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaWrapRef = useRef<HTMLDivElement>(null);
  /** Capa con las dos fotografías: el scrub de salida la afecta entera. */
  const layerRef = useRef<HTMLDivElement>(null);
  const alternate = productionMedia.hero.alternate;
  const { mounted: alternateMounted, showing: alternateShowing } = useHeroAlternate(
    alternate.src,
    alternate.minWidth
  );
  const textRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const entrance = [statementRef.current, ctaRef.current].filter(
        (el): el is HTMLHeadingElement | HTMLDivElement => el !== null
      );

      if (prefersReducedMotion) {
        gsap.set(entrance, { opacity: 1, y: 0 });
        return;
      }

      // 1. Entrada al cargar (no ligada a scroll): stagger corto, sin rebote.
      gsap.fromTo(
        entrance,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power2.out",
          delay: 0.2,
          stagger: 0.16,
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

      // 3. Salida por scroll hacia El Ritual: todo simultáneo, scrub.
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
          layerRef.current,
          { scale: 1, filter: "blur(0px)" },
          { scale: 1.07, filter: "blur(7px)", ease: "none", duration: 1 },
          0
        )
        .to(textRef.current, { opacity: 0, y: -22, ease: "none", duration: 1 }, 0);
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
      data-header-hero
      data-header-tone="light"
      className="relative h-[calc(100svh-34px)] min-h-[560px] w-full overflow-hidden md:h-[calc(100svh-38px)]"
    >
      <div ref={mediaWrapRef} className="absolute inset-0 h-full w-full">
        {/*
          object-position: recorte responsive preparado para el encuadre final.
          Ajustable aquí cuando se defina el framing definitivo de la imagen.
        */}
        <div ref={layerRef} className="relative h-full w-full">
          <img
            src={heroMedia.src}
            alt={heroMedia.alt}
            className="h-full w-full object-cover object-[65%_45%] md:object-[68%_38%]"
          />
          {/*
            Segundo estado: se monta recién cuando la foto está decodificada,
            y entra/sale solo por opacidad, encima de la original.
          */}
          {alternateMounted && (
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                opacity: alternateShowing ? 1 : 0,
                transition: `opacity ${HERO_FADE_MS}ms ease-in-out`,
              }}
            >
              <img
                src={alternate.src}
                alt=""
                className="h-full w-full object-cover"
                style={{ objectPosition: alternate.objectPosition }}
              />
              <div className="absolute inset-0" style={{ backgroundImage: alternate.scrim }} />
            </div>
          )}
        </div>
      </div>

      {/* Velos de legibilidad, siempre sutiles: nunca un bloque plano. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_58%_at_50%_52%,rgba(25,21,17,0.34)_0%,rgba(25,21,17,0.12)_52%,transparent_78%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/42 via-ink/8 to-transparent"
      />

      {/*
        pt: despeja el header (64px mobile, 76px md, 82px xl).
        pb extra: levanta ópticamente el bloque respecto del centro matemático
        para equilibrar con el caballo y el horizonte de la fotografía.
      */}
      <div
        ref={textRef}
        className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 pb-[10vh] pt-[64px] text-center md:px-10 md:pb-[7vh] md:pt-[76px] xl:pt-[82px]"
      >
        <h1
          ref={statementRef}
          className="max-w-[26ch] font-display text-[clamp(1.85rem,8.2vw,3.1rem)] leading-[0.98] tracking-[-0.03em] text-ivory [text-shadow:0_2px_48px_rgba(0,0,0,0.32)] md:text-[clamp(3.4rem,7.4vw,4.8rem)] md:leading-[0.95] md:tracking-[-0.035em] lg:text-[clamp(4.5rem,6vw,7rem)] lg:leading-[0.94] lg:tracking-[-0.04em]"
        >
          {heroCopy.line1}
          <br />
          {heroCopy.line2}
        </h1>
        <div ref={ctaRef} className="mt-11 md:mt-14">
          <ScrollCTAButton
            href={heroCopy.ctaTarget}
            tone="light"
            shape="outline"
            data-cursor-expand
          >
            {heroCopy.cta}
          </ScrollCTAButton>
        </div>
      </div>
    </section>
  );
}
