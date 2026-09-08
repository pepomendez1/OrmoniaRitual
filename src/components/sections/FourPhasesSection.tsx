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
 * Los cuatro productos individuales.
 *
 * El bloque comercial del Pack x4 (HOME 03) vive ahora en su propio
 * componente, `PackRitualSection`, que se ubica antes de esta sección y se
 * queda con el ancla del CTA del hero. Acá solo quedan los productos
 * individuales (HOME 04), que se rediseñan como carrusel de cards grandes en
 * Sprint 04B.
 *
 * Recibe el campo claro con el que cierra la sección del Pack, así que ya no
 * necesita banda de continuidad propia.
 */
export function FourPhasesSection() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <SectionWrapper id="serums" className="relative overflow-hidden bg-[#eee5d8] py-24 lg:py-32">
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

      </div>
    </SectionWrapper>
  );
}
