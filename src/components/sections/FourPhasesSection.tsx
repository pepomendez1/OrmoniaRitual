import { type CSSProperties } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useHorizontalRail } from "@/hooks/useHorizontalRail";
import { ProductRailCard } from "@/components/ui/ProductRailCard";
import { products } from "@/data/products";
import { fourPhasesCopy } from "@/data/content";

/** Campo de toda la zona comercial: el mismo con el que cierra el Pack x4. */
const FIELD = "#F2EBDD";

/**
 * Margen lateral común al encabezado, al riel y a las flechas.
 *
 * Alinea la primera tarjeta con el título en cualquier ancho y, al crecer con
 * el viewport, mantiene el contenido centrado sin encerrar el riel en una caja:
 * las tarjetas siguen sangrando por el borde derecho.
 */
const GUTTER = "max(1.5rem, min(2.5rem, 4vw), calc((100vw - 1560px) / 2 + 2.5rem))";

/**
 * Alto del bloque de nombre/precio/fase, incluido el respiro inferior del riel.
 * Se usa para centrar las flechas sobre la fotografía y no sobre la tarjeta
 * entera, que incluye el texto.
 */
const META_BLOCK = "72px";

/**
 * HOME 04 — Productos individuales.
 *
 * Segunda pieza de la zona comercial, sobre el mismo campo claro que el Pack
 * x4: no hay banda, separación ni transición entre ambas.
 *
 * Riel horizontal de tarjetas grandes. El desplazamiento es scroll nativo con
 * `scroll-snap`, así que trackpad, swipe y teclado funcionan sin librerías; el
 * hook agrega arrastre con mouse, el paso por tarjeta y el estado de los
 * extremos para deshabilitar las flechas.
 *
 * ESCALABLE
 * La sección recorre el array `products`: sumar AURA o un quinto serum es
 * agregarlo ahí. El ancho de tarjeta es una fracción del viewport, no una
 * columna de grilla, así que la cantidad de items no altera la composición.
 */
export function FourPhasesSection() {
  const headerRef = useScrollReveal<HTMLDivElement>();
  const { railRef, canPrev, canNext, scrollByCard } =
    useHorizontalRail<HTMLDivElement>();

  const arrowClass =
    "pointer-events-auto absolute flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-ink/12 bg-ivory/70 text-ink shadow-[0_2px_12px_rgba(52,33,21,0.07)] backdrop-blur-sm transition-[background-color,border-color,opacity,transform] duration-300 ease-out hover:scale-105 hover:border-ink/25 hover:bg-ivory/95 disabled:pointer-events-none disabled:opacity-25";

  const arrowY = { top: `calc((100% - ${META_BLOCK}) / 2)` };

  return (
    <section
      id="serums"
      aria-labelledby="serums-heading"
      className="relative overflow-hidden pb-24 pt-14 md:pb-28 md:pt-16"
      style={{ backgroundColor: FIELD, "--rail-gutter": GUTTER } as CSSProperties}
    >
      {/* Encabezado compacto: titular y bajada como un solo grupo. */}
      <div
        ref={headerRef}
        className="max-w-[560px] text-ink"
        style={{ paddingInline: "var(--rail-gutter)" }}
      >
        <h2
          id="serums-heading"
          className="font-display text-[clamp(2.1rem,6vw,2.8rem)] leading-[1.02] tracking-[-0.035em] lg:text-[clamp(2.4rem,3.2vw,3.2rem)] lg:leading-[0.98]"
        >
          {fourPhasesCopy.title}
        </h2>
        <p className="mt-4 max-w-[400px] font-sans text-[13px] leading-relaxed text-ink/64 md:mt-5 md:text-[14px]">
          {fourPhasesCopy.body}
        </p>
      </div>

      <div className="relative mt-9 md:mt-11">
        <div
          ref={railRef}
          role="region"
          aria-label="Serums individuales"
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{
            paddingInline: "var(--rail-gutter)",
            scrollPaddingInline: "var(--rail-gutter)",
          }}
        >
          {products.map((product) => (
            <ProductRailCard key={product.slug} product={product} />
          ))}
        </div>

        {/* Flechas sobre el riel, centradas respecto de la fotografía. */}
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          <button
            type="button"
            aria-label="Ver serums anteriores"
            onClick={() => scrollByCard(-1)}
            disabled={!canPrev}
            className={arrowClass}
            style={{
              ...arrowY,
              left: "calc(var(--rail-gutter) - 26px)",
            }}
          >
            <ChevronLeft className="h-[18px] w-[18px]" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Ver más serums"
            onClick={() => scrollByCard(1)}
            disabled={!canNext}
            className={arrowClass}
            style={{
              ...arrowY,
              right: "calc(var(--rail-gutter) - 26px)",
            }}
          >
            <ChevronRight className="h-[18px] w-[18px]" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
