import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { NarrativeText } from "@/components/ui/NarrativeText";
import { ProductDisplay } from "@/components/ui/ProductDisplay";
import { ProductMeta } from "@/components/ui/ProductMeta";
import { products } from "@/data/products";
import { fourPhasesCopy } from "@/data/content";

/**
 * Four products + the commercial expression of the complete ritual.
 * Sprint 03.7 gives the collection a warmer editorial field and elevates the
 * four-product set instead of treating it as a secondary SKU.
 */
export function FourPhasesSection() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <SectionWrapper id="serums" className="relative overflow-hidden bg-[#eee5d8] py-28 lg:py-36">
      <div className="pointer-events-none absolute left-[-12vw] top-[18%] h-[32vw] w-[32vw] rounded-full bg-[#6b6a4b]/[0.07] blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-[8%] right-[-8vw] h-[30vw] w-[38vw] rounded-[50%] bg-[#6a4a35]/[0.065] blur-3xl" aria-hidden="true" />

      <div ref={ref} className="relative z-10 flex flex-col gap-16">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <EditorialHeading eyebrow={fourPhasesCopy.eyebrow} size="xl" as="h2">
            {fourPhasesCopy.title}
          </EditorialHeading>
          <NarrativeText tone="muted" measure="wide" className="lg:pb-2">
            {fourPhasesCopy.body}
          </NarrativeText>
        </div>

        <div className="grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.slug}
              to={`/products/${product.slug}`}
              className="group flex flex-col gap-5"
            >
              <ProductDisplay product={product} className="[&>div:first-child]:bg-[#d7c4ad]" />
              <ProductMeta product={product} />
            </Link>
          ))}
        </div>

        <div className="relative mt-4 overflow-hidden bg-[#342115] text-[#f2ebdd] lg:min-h-[680px]">
          <div className="grid lg:min-h-[680px] lg:grid-cols-[1.08fr_0.92fr]">
            <div className="relative min-h-[480px] overflow-hidden lg:min-h-0">
              <img
                src="/products/ritual-completo.png"
                alt="Pack de cuatro serums Ormonia para acompañar las cuatro fases del ciclo"
                className="absolute inset-0 h-full w-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#342115]/8" />
              <div className="absolute inset-y-0 right-0 hidden w-28 bg-[linear-gradient(90deg,transparent,rgba(52,33,21,0.72))] lg:block" />
            </div>

            <div className="relative flex flex-col justify-between px-7 py-10 md:px-10 lg:px-14 lg:py-14">
              <div>
                <p className="mb-10 font-sans text-[10px] uppercase tracking-[0.25em] text-[#f2ebdd]/48">El ritual completo · Pack x4</p>
                <h3 className="max-w-[520px] font-display text-[clamp(3rem,5.2vw,6rem)] leading-[0.92] tracking-[-0.04em]">
                  Las 4 fases,<br />un solo ritual.
                </h3>
                <p className="mt-8 max-w-md font-sans text-sm leading-relaxed text-[#f2ebdd]/64">
                  Los cuatro serums de Ormonia reunidos para acompañar el ciclo completo, fase por fase, dentro de un mismo ritual.
                </p>
              </div>

              <div className="mt-14 flex flex-col gap-7 border-t border-[#f2ebdd]/16 pt-7 sm:flex-row sm:items-end sm:justify-between lg:flex-col lg:items-start xl:flex-row xl:items-end">
                <p className="max-w-xs font-sans text-[10px] uppercase leading-relaxed tracking-[0.18em] text-[#f2ebdd]/42">
                  Claridad · Apertura · Luminosidad · Restauración
                </p>
                <Link
                  to="/products"
                  className="group inline-flex w-fit items-center gap-5 border-b border-[#f2ebdd]/55 pb-2 font-sans text-[10px] uppercase tracking-[0.2em] text-[#f2ebdd] transition-colors hover:border-[#f2ebdd]"
                >
                  Descubrir el ritual completo
                  <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
