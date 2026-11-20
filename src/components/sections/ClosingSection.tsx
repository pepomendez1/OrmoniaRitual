import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SiteLink } from "@/components/ui/SiteLink";
import { closingCopy } from "@/data/content";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { ProductionPhoto } from "@/components/media/ProductionPhoto";
import { productionMedia } from "@/data/productionMedia";

/**
 * HOME 09 — Cierre "Unite al ritual".
 *
 * Único plano oscuro después de la zona clara: es el final de la página y
 * continúa sin corte en el footer, que comparte el mismo campo. Un titular,
 * la frase de marca, dos salidas —el diagnóstico y la tienda— y, por debajo,
 * El Registro como formulario de una línea: secundario, no un bloque propio.
 *
 * Abre con una sola fotografía de campaña a sangre (`productionMedia.closing`)
 * como último momento visual de la Home, y recién después el texto sobre el
 * campo oscuro. No es otro Hero: la imagen no lleva texto encima. Sobre ella
 * el header vuelve a ink, porque el cielo de la foto es claro.
 */
export function ClosingSection() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="unite-al-ritual"
      aria-labelledby="closing-heading"
      data-header-tone="light"
      className="bg-deepBrown pb-24 text-center text-ivory md:pb-32"
    >
      <div
        data-header-tone="dark"
        className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-[21/9]"
      >
        <ProductionPhoto image={productionMedia.closing} />
      </div>
      <div
        ref={ref}
        className="mx-auto flex w-full max-w-[880px] flex-col items-center px-6 pt-[clamp(88px,12vh,152px)] md:px-10"
      >
        <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-ivory/62 md:text-[11px]">
          {closingCopy.eyebrow}
        </p>
        <h2
          id="closing-heading"
          className="mt-6 font-display text-[clamp(3rem,10vw,6.5rem)] leading-[0.95] tracking-[-0.04em] md:mt-8"
        >
          {closingCopy.title}
        </h2>
        <p className="mt-6 max-w-[420px] font-sans text-[14px] leading-relaxed text-ivory/72 md:mt-8 md:text-[15px]">
          {closingCopy.body}
        </p>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4 md:mt-12">
          {closingCopy.links.map((link) => (
            <SiteLink
              key={link.label}
              href={link.href}
              className="inline-flex h-[48px] min-w-[220px] items-center justify-center rounded-[12px] border border-ivory/45 px-7 font-sans text-[11px] uppercase tracking-[0.18em] text-ivory transition-[background-color,border-color,color] duration-500 ease-out hover:border-ivory hover:bg-ivory hover:text-ink md:h-[52px] md:text-[12px]"
            >
              {link.label}
            </SiteLink>
          ))}
        </div>
        <div className="mt-16 flex w-full justify-center border-t border-ivory/14 pt-10 text-left md:mt-20">
          <NewsletterForm tone="light" />
        </div>
      </div>
    </section>
  );
}
