import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { calendarTeaserCopy } from "@/data/content";
import { calendarProduct, primaryMediaOf, productHref } from "@/data/products";
import { CalendarVisual } from "@/components/shop/CalendarVisual";
import { PriceTag } from "@/components/shop/PriceTag";
import { brandButton } from "@/lib/brandButton";

const FIELD = "#F2EBDD";

/**
 * HOME 04 — Calendario cíclico.
 *
 * Ocupa el lugar estratégico que tenía la escena de Agua + El Registro, pero
 * no la reemplaza con otra newsletter: presenta un producto. Después de ver
 * qué se vende (Pack y Los esenciales), el calendario aparece como la
 * herramienta que acompaña el ritual fuera del frasco, y recién después El
 * Ciclo explica el sistema.
 *
 * Composición espejada respecto del Pack (visual a la izquierda, copy a la
 * derecha) para que la zona comercial tenga ritmo sin cambiar de lenguaje:
 * mismo campo, mismas esquinas, sin card flotante.
 *
 * Dos salidas: la página editorial (`/calendario`, principal) y la ficha
 * comercial (PDP). El precio solo aparece si existe.
 *
 * Visual: `calendarTeaserCopy.media` (mockup de páginas, TEMPORAL); si falta,
 * la foto de producto; si tampoco hay, `CalendarVisual`.
 */
export function CalendarSection() {
  const revealRef = useScrollReveal<HTMLDivElement>();
  const media = calendarTeaserCopy.media ?? primaryMediaOf(calendarProduct);

  return (
    <section
      id="calendario"
      aria-labelledby="calendar-heading"
      className="relative scroll-mt-24"
      style={{ backgroundColor: FIELD }}
    >
      <div
        ref={revealRef}
        className="mx-auto grid w-full max-w-[1320px] items-center gap-12 px-6 pb-[clamp(88px,12vh,140px)] pt-[clamp(40px,6vh,72px)] md:px-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-20"
      >
        <Link
          to={calendarTeaserCopy.ctaHref}
          tabIndex={-1}
          aria-hidden="true"
          data-cursor-expand
          className="group block overflow-hidden rounded-[22px] md:rounded-[28px]"
        >
          {media ? (
            <img
              src={media.src}
              alt=""
              loading="lazy"
              decoding="async"
              className="aspect-[3/2] w-full object-cover motion-safe:transition-transform motion-safe:duration-900 motion-safe:ease-out motion-safe:group-hover:scale-[1.02]"
            />
          ) : (
            <CalendarVisual className="aspect-[3/2] w-full" />
          )}
        </Link>

        <div className="text-ink lg:max-w-[460px]">
          <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-ink/66 md:text-[11px]">
            {calendarTeaserCopy.eyebrow}
          </p>
          <h2
            id="calendar-heading"
            className="mt-6 font-display text-[clamp(2.3rem,6.6vw,3rem)] leading-[1] tracking-[-0.035em] md:mt-7 lg:text-[clamp(2.6rem,3.8vw,3.7rem)] lg:leading-[0.96]"
          >
            {calendarTeaserCopy.title}
          </h2>
          <p className="mt-6 max-w-[400px] font-sans text-[13px] leading-relaxed text-ink/64 md:mt-7 md:text-[14px]">
            {calendarTeaserCopy.body}
          </p>

          {calendarProduct.price != null && (
            <PriceTag
              product={calendarProduct}
              className="mt-6 block font-sans text-[1.5rem] tracking-[-0.01em]"
            />
          )}

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 lg:mt-10">
            <Link
              to={calendarTeaserCopy.ctaHref}
              data-cursor-expand
              className={brandButton({ variant: "secondary", size: "lg" })}
            >
              {calendarTeaserCopy.cta}
            </Link>
            <Link to={productHref(calendarProduct)} className={brandButton({ variant: "quiet" })}>
              {calendarTeaserCopy.secondary}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
