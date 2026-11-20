import { type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { discoverSkinCopy } from "@/data/content";
import { cn } from "@/lib/utils";

/**
 * HOME 06 — Descubrí tu piel.
 *
 * Pieza de campaña, no una sección informativa: una gran composición
 * fotográfica, muy poco texto y un CTA claro hacia el diagnóstico. No dice
 * cuántas preguntas hay, ni cómo funciona, ni qué devuelve.
 *
 * El contraste lo gobierna `media.tone` desde la data, así que cuando llegue
 * la fotografía de producción basta con declararla y decir si es clara u
 * oscura: copy, velo de legibilidad y tono del header se acomodan solos, sin
 * tocar el layout.
 *
 * Movimiento deliberadamente mínimo —solo un reveal y la transición del CTA—
 * porque esta pieza entra justo después de El Ciclo, que ya trae
 * bastante. Acá trabaja la fotografía.
 */
export function DiscoverYourSkinSection() {
  const revealRef = useScrollReveal<HTMLDivElement>();
  const { media } = discoverSkinCopy;
  const isDark = media.tone === "dark";

  return (
    <section
      id="descubri-tu-piel"
      aria-labelledby="discover-skin-heading"
      className="relative h-[90svh] min-h-[560px] w-full overflow-hidden"
      style={
        {
          backgroundColor: media.placeholderTone,
          "--op-mobile": media.objectPositionMobile,
          "--op-desktop": media.objectPosition,
        } as CSSProperties
      }
    >
      {/* Sobre fotografía oscura la navegación invierte a ivory. */}
      {isDark && (
        <div
          aria-hidden="true"
          data-header-tone="light"
          className="pointer-events-none absolute inset-0"
        />
      )}

      {media.src ? (
        <img
          src={media.src}
          alt={media.alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover [object-position:var(--op-mobile)] md:[object-position:var(--op-desktop)]"
        />
      ) : (
        <div aria-hidden="true" className="absolute inset-0">
          {/* Grano: evita que el campo se lea como un bloque de color plano
              mientras no exista la fotografía. */}
          <div
            className="absolute inset-0 opacity-55"
            style={{
              backgroundImage:
                "radial-gradient(rgba(52,33,21,0.15) 0.6px, transparent 0.7px)",
              backgroundSize: "3px 3px",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(120% 90% at 76% 38%, rgba(255,250,240,0.42) 0%, rgba(255,250,240,0) 62%)",
            }}
          />
          <span className="absolute bottom-8 right-8 font-sans text-[9px] uppercase tracking-[0.2em] text-ink/35">
            {media.pending}
          </span>
        </div>
      )}

      {/*
        Velo de legibilidad, solo del lado del copy. Si la foto declara su
        propio velo (`media.scrim`), se usa ese —más liviano y pensado para
        esa imagen—; si no, el genérico del tono. En mobile el copy va al pie
        y el velo se concentra abajo.
      */}
      {media.scrim ? (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden md:block"
            style={{ backgroundImage: media.scrim }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 md:hidden"
            style={{ backgroundImage: media.scrimMobile ?? media.scrim }}
          />
        </>
      ) : (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: isDark
              ? "linear-gradient(90deg, rgba(26,18,12,0.76) 0%, rgba(26,18,12,0.54) 34%, rgba(26,18,12,0.18) 62%, rgba(26,18,12,0) 84%)"
              : "linear-gradient(90deg, rgba(242,235,221,0.72) 0%, rgba(242,235,221,0.44) 36%, rgba(242,235,221,0.12) 64%, rgba(242,235,221,0) 86%)",
          }}
        />
      )}

      <div
        className={cn(
          "absolute inset-0 flex px-6 sm:px-10 lg:px-[7vw]",
          media.scrim ? "items-end pb-16 md:items-center md:pb-0" : "items-center"
        )}
      >
        <div
          ref={revealRef}
          className={cn("max-w-[520px]", isDark ? "text-ivory" : "text-ink")}
        >
          <p
            className={cn(
              "font-sans text-[10px] uppercase tracking-[0.28em] md:text-[11px]",
              isDark ? "text-ivory/70" : "text-ink/62"
            )}
          >
            {discoverSkinCopy.eyebrow}
          </p>

          <h2
            id="discover-skin-heading"
            className={cn(
              "mt-6 font-display text-[clamp(2.1rem,6.4vw,2.8rem)] leading-[1.04] tracking-[-0.035em] md:mt-7 lg:text-[clamp(2.4rem,3.4vw,3.6rem)] lg:leading-[1]",
              isDark && "[text-shadow:0_2px_34px_rgba(16,12,8,0.45)]"
            )}
          >
            {discoverSkinCopy.titleLines[0]}
            <br />
            {discoverSkinCopy.titleLines[1]}
          </h2>

          <p
            className={cn(
              "mt-6 max-w-[380px] font-sans text-[13px] leading-relaxed md:mt-7 md:text-[14px]",
              isDark ? "text-ivory/80" : "text-ink/66"
            )}
          >
            {discoverSkinCopy.body}
          </p>

          <Link
            to={discoverSkinCopy.ctaHref}
            data-cursor-expand
            className={cn(
              "mt-9 inline-flex h-[52px] w-fit items-center justify-center rounded-[12px] px-8 font-sans text-[12px] uppercase tracking-[0.2em] transition-[background-color,border-color,color] duration-500 ease-out md:mt-10 md:h-[56px] md:px-9",
              isDark
                ? "border border-ivory/65 bg-transparent text-ivory hover:border-ivory hover:bg-ivory hover:text-ink"
                : "bg-ink text-ivory hover:bg-deepBrown"
            )}
          >
            {discoverSkinCopy.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
