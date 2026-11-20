import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCart } from "@/hooks/useCart";
import { packCopy } from "@/data/content";
import {
  getProductBySlug,
  isPurchasable,
  packX4,
  productHref,
  serumDisplayName,
} from "@/data/products";
import { PriceTag } from "@/components/shop/PriceTag";
import { brandButton } from "@/lib/brandButton";
import { cn } from "@/lib/utils";

/** Campo claro de toda la zona comercial. */
const FIELD = "#F2EBDD";

/**
 * HOME 02 — El Ritual (id interno del producto: pack-x4).
 *
 * Lo primero que aparece al salir del Hero: la propuesta completa de ORMONIA,
 * antes que los sérums sueltos. Por eso es más comercial que su versión
 * anterior —nombre, precio cuando exista, qué incluye, CTA al PDP y agregar al
 * carrito— pero conserva la composición aprobada: copy a la izquierda y el
 * estuche dentro del arco a la derecha, integrado al campo claro, sin card.
 *
 * El paso desde el Hero es un corte limpio: el campo crema arranca en el
 * primer píxel y el header vuelve a ink por defecto, sin marcador de tono.
 *
 * Todo dato comercial sale de `packX4` (`data/products.ts`):
 * - el precio aparece solo cuando existe en el catálogo;
 * - no se comunica ahorro: el Pack es el ritual completo, no un descuento.
 *
 * Hover (desktop, `motion-safe`): crossfade del estuche a la fotografía de
 * campaña de los cuatro sérums sobre el cuerpo (`productionMedia.ritual`).
 * El cursor global pasa a ivory sobre el arco.
 *
 * `#el-ritual` es el ancla del CTA del Hero (`#pack-x4` redirige vía alias).
 */
export function PackRitualSection() {
  const revealRef = useScrollReveal<HTMLDivElement>();
  const { add } = useCart();

  const pack = packX4;
  const href = productHref(pack);
  const included = (pack.includes ?? [])
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const hasHoverImage = Boolean(pack.hoverImageSrc);

  return (
    <section
      id="el-ritual"
      aria-labelledby="pack-heading"
      className="relative scroll-mt-24 overflow-hidden"
      style={{ backgroundColor: FIELD }}
    >
      <div
        ref={revealRef}
        className="relative mx-auto grid w-full max-w-[1320px] items-center gap-12 px-6 pb-[clamp(64px,9vh,112px)] pt-[clamp(80px,11vh,128px)] md:px-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16"
      >
        {/* Copy comercial. */}
        <div className="order-2 text-ink lg:order-1">
          <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-ink/68 md:text-[11px]">
            {packCopy.eyebrow}
          </p>

          <h2
            id="pack-heading"
            className="mt-6 font-display text-[clamp(2.4rem,7vw,3.2rem)] leading-[1] tracking-[-0.035em] md:mt-7 lg:text-[clamp(2.7rem,4vw,3.9rem)] lg:leading-[0.96]"
          >
            {packCopy.titleLines[0]}
            <br />
            <em className="not-italic lg:italic">{packCopy.titleLines[1]}</em>
          </h2>

          <p className="mt-6 max-w-[400px] font-sans text-[13px] leading-relaxed text-ink/64 md:mt-7 md:text-[14px]">
            {packCopy.body}
          </p>

          {/* Qué incluye: cada sérum lleva a su ficha. */}
          <div className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-2 border-t border-ink/14 pt-5">
            <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-ink/62">
              {packCopy.includesLabel}
            </span>
            <ul className="flex flex-wrap gap-x-3 gap-y-1">
              {included.map((item, index) => (
                <li key={item.slug} className="font-editorial text-[1.25rem] leading-none md:text-[1.35rem]">
                  <Link
                    to={productHref(item)}
                    className="text-ink underline-offset-4 transition-colors hover:underline"
                  >
                    {serumDisplayName(item)}
                  </Link>
                  {index < included.length - 1 && (
                    <span aria-hidden="true" className="ml-3 text-ink/35">
                      ·
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {pack.price != null && (
            <PriceTag
              product={pack}
              className="mt-6 block font-sans text-[1.7rem] tracking-[-0.01em]"
            />
          )}

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 lg:mt-9">
            <Link
              to={href}
              data-cursor-expand
              className={brandButton({ size: "lg" })}
            >
              {packCopy.cta}
            </Link>
            {isPurchasable(pack) && (
              <button
                type="button"
                onClick={() => add(pack, 1)}
                className={brandButton({ variant: "quiet" })}
              >
                {packCopy.addToCart}
              </button>
            )}
          </div>
        </div>

        {/* Visual del pack dentro del arco: también lleva al PDP. */}
        <Link
          to={href}
          tabIndex={-1}
          aria-hidden="true"
          data-cursor-tone="light"
          data-cursor-expand
          className="group relative order-1 mx-auto block aspect-[5/6] w-full max-w-[460px] overflow-hidden rounded-t-full lg:order-2 lg:aspect-square lg:h-auto lg:max-h-[min(66vh,680px)] lg:w-full lg:max-w-[min(66vh,680px)]"
        >
          <img
            src={pack.imageSrc}
            alt=""
            loading="lazy"
            decoding="async"
            className={cn(
              "absolute inset-0 h-full w-full object-cover object-center",
              hasHoverImage &&
                "motion-safe:transition-opacity motion-safe:duration-650 motion-safe:ease-out motion-safe:group-hover:opacity-0"
            )}
          />
          {hasHoverImage && (
            <img
              src={pack.hoverImageSrc}
              alt=""
              loading="lazy"
              decoding="async"
              style={{ objectPosition: pack.hoverObjectPosition ?? "center" }}
              className="absolute inset-0 h-full w-full object-cover opacity-0 motion-safe:transition-opacity motion-safe:duration-650 motion-safe:ease-out motion-safe:group-hover:opacity-100"
            />
          )}
        </Link>
      </div>
    </section>
  );
}
