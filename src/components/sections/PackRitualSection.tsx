import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { packCopy } from "@/data/content";
import { cn } from "@/lib/utils";

/**
 * Tono exacto con el que cierra El Ciclo (velo de salida sobre RESTORE).
 * La sección arranca ahí, así el bloque nace de la escena anterior.
 */
const HANDOFF_IN = "#674F3E";
/** Campo con el que abre el bloque de productos individuales (Sprint 04B). */
const HANDOFF_OUT = "#EEE5D8";

/**
 * Un único campo vertical para toda la sección: entra en el tono del Ciclo,
 * se hunde para sostener la card y se abre hacia el campo claro del bloque
 * siguiente. Un solo degradado continuo, no bandas superpuestas.
 */
const SECTION_FIELD = `linear-gradient(180deg,
  ${HANDOFF_IN} 0%,
  #56402F 12%,
  #3C2D21 40%,
  #4F3B2B 68%,
  #937D68 86%,
  ${HANDOFF_OUT} 100%)`;

/**
 * Luz y sombra sobre la fotografía, no un panel.
 *
 * Desktop: la sombra entra por el flanco izquierdo y se apaga por completo
 * antes del 88% del ancho, de modo que la mitad derecha de la imagen queda
 * prácticamente limpia y no hay ninguna frontera recta.
 *
 * Los valores están calibrados para que el borde derecho del bloque de texto
 * caiga sobre ~0.62 de sombra: ivory sobre el fondo más claro de la foto da
 * 6.7:1 ahí.
 */
const SHADE_DESKTOP = `linear-gradient(90deg,
  rgba(26,18,12,0.92) 0%,
  rgba(26,18,12,0.86) 24%,
  rgba(26,18,12,0.66) 48%,
  rgba(26,18,12,0.28) 70%,
  rgba(26,18,12,0) 88%)`;

/**
 * En pantallas angostas no hay ancho para una sombra lateral, así que la luz
 * cae desde arriba y la sombra se acumula al pie, donde se apoya el copy. La
 * fotografía sigue siendo el fondo de toda la card.
 */
const SHADE_COMPACT = `linear-gradient(180deg,
  rgba(26,18,12,0.24) 0%,
  rgba(26,18,12,0.12) 26%,
  rgba(26,18,12,0.52) 58%,
  rgba(26,18,12,0.86) 82%,
  rgba(26,18,12,0.94) 100%)`;

/**
 * HOME 03 — Pack x4 / Ritual completo.
 *
 * Una sola superficie fotográfica: la imagen del pack ocupa la card completa y
 * el texto se apoya sobre ella con un degradado que solo aporta legibilidad.
 * No hay columna de texto ni panel: el bloque de copy es un único stack
 * compacto en el tercio izquierdo, centrado en vertical con un leve ajuste
 * óptico hacia abajo.
 *
 * El encuadre está calculado: con `aspect-[1.38/1]` la ventana visible cubre el
 * 58% de la altura de la fotografía, lo que deja los cuatro frascos dentro y
 * recorta solo los extremos de la escena (la punta del gotero superior y la
 * base del drapeado). Cambiar esa proporción cambia cuántos frascos entran.
 *
 * `#pack-x4` es el ancla del CTA del hero. La sección cose el tono con el que
 * cierra El Ciclo y entrega al campo del bloque de productos, sin tocar la
 * lógica del Ciclo.
 *
 * Hover (desktop, con `motion-safe`): crossfade lento a la segunda fotografía
 * real y una respiración de escala mínima. El cursor circular global se expande
 * y pasa a su variante ivory dentro de la card, vía `data-cursor-expand` y
 * `data-cursor-tone`.
 *
 * Preparado para Sprint 04+: precio, ahorro frente a comprar los cuatro por
 * separado, segunda imagen de campaña y PDP de Shopify. Sin lógica de compra.
 */
export function PackRitualSection() {
  const revealRef = useScrollReveal<HTMLDivElement>();

  const { media } = packCopy;
  const hoverMedia = media.hover ?? media.primary;
  const hasHoverImage = media.hover !== null;

  return (
    <section
      id="pack-x4"
      aria-labelledby="pack-heading"
      className="relative scroll-mt-28 overflow-hidden pb-24 pt-10 md:pb-32 md:pt-12 lg:pb-40 lg:pt-16"
      style={{ backgroundImage: SECTION_FIELD }}
    >
      {/* Tono del header mientras el campo es oscuro, antes de que el degradado
          se abra hacia el bloque siguiente. Solo declara contraste. */}
      <div
        aria-hidden="true"
        data-header-tone="light"
        className="pointer-events-none absolute inset-x-0 top-0 h-[86%]"
      />

      <div ref={revealRef} className="relative flex justify-center px-[4vw]">
        {/*
          Alto gobernado por el viewport y acotado en los extremos, así la
          composición se percibe casi completa de una vez en laptop. En desktop
          el ancho se deriva del alto por proporción; en pantallas angostas la
          card ocupa el ancho disponible.
        */}
        <div
          data-cursor-expand
          data-cursor-tone="light"
          className="group relative w-[92vw] overflow-hidden rounded-[22px] shadow-[0_40px_120px_rgba(14,8,4,0.4)] h-[clamp(520px,76vh,680px)] md:rounded-[30px] lg:h-[clamp(600px,78vh,880px)] lg:aspect-[1.38/1] lg:w-auto lg:max-w-[94vw] lg:rounded-[38px]"
        >
          {/* Fotografía — ocupa toda la card. */}
          <div className="absolute inset-0 motion-safe:transition-transform motion-safe:duration-[1100ms] motion-safe:ease-out motion-safe:group-hover:scale-[1.02]">
            <img
              src={media.primary.src}
              alt={media.primary.alt}
              loading="lazy"
              className={cn(
                "absolute inset-0 h-full w-full object-cover object-[center_45%]",
                hasHoverImage &&
                  "motion-safe:transition-opacity motion-safe:duration-[900ms] motion-safe:ease-out motion-safe:group-hover:opacity-0"
              )}
            />
            {hasHoverImage && (
              <img
                src={hoverMedia.src}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-[center_45%] opacity-0 motion-safe:transition-opacity motion-safe:duration-[900ms] motion-safe:ease-out motion-safe:group-hover:opacity-100"
              />
            )}
          </div>

          {/* Sombra de legibilidad. Nunca un rectángulo. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 lg:hidden"
            style={{ backgroundImage: SHADE_COMPACT }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden lg:block"
            style={{ backgroundImage: SHADE_DESKTOP }}
          />

          {/* Un único stack de contenido, compacto. Al pie en pantallas
              angostas; centro-izquierda en desktop. */}
          <div className="absolute inset-0 flex items-end px-7 pb-10 sm:px-10 lg:items-center lg:pb-0 lg:pl-16 lg:pt-12 xl:pl-20">
            <div className="max-w-[430px] text-[#F2EBDD] xl:max-w-[480px]">
              <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#F2EBDD]/60">
                {packCopy.eyebrow}
              </p>
              <h2
                id="pack-heading"
                className="mt-5 font-display text-[clamp(2.1rem,8.4vw,3rem)] leading-[0.96] tracking-[-0.035em] [text-shadow:0_2px_30px_rgba(18,11,6,0.42)] lg:text-[clamp(2.6rem,3.6vw,4.1rem)] lg:leading-[0.93]"
              >
                {packCopy.titleLines[0]}
                <br />
                {packCopy.titleLines[1]}
              </h2>
              <p className="mt-[22px] max-w-[400px] font-sans text-[13px] leading-relaxed text-[#F2EBDD]/78 lg:text-sm">
                {packCopy.body}
              </p>

              {/* Precio y ahorro: aparecen recién cuando existan definitivos. */}
              {packCopy.price && (
                <div className="mt-6 flex items-baseline gap-4">
                  <span className="font-display text-2xl tracking-[-0.02em]">
                    {packCopy.price}
                  </span>
                  {packCopy.savings && (
                    <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-[#F2EBDD]/70">
                      {packCopy.savings}
                    </span>
                  )}
                </div>
              )}

              {/*
                Mismo lenguaje que el CTA del hero: marco fino, transparente,
                esquinas moderadas, sin ícono. Navega a la ruta de productos
                existente hasta que exista el PDP del pack.
              */}
              <Link
                to={packCopy.ctaHref}
                className="mt-8 inline-flex h-[48px] w-fit items-center justify-center rounded-[12px] border border-[#F2EBDD]/60 bg-transparent px-7 font-sans text-[11px] uppercase tracking-[0.18em] text-[#F2EBDD] transition-[background-color,border-color,color] duration-500 ease-out hover:border-[#F2EBDD] hover:bg-[#F2EBDD] hover:text-[#23180F] md:h-[52px] md:px-9 md:text-[12px] lg:mt-9"
              >
                {packCopy.cta}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
