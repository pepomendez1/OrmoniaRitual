import { packX4, phaseLabel, serums, toneOf, type Product } from "@/data/products";
import { pdpCopy } from "@/data/pdpCopy";
import { BuyBox } from "./BuyBox";
import { buildInfoSections } from "./buildInfoSections";
import { DiscoverSkinPrompt } from "./DiscoverSkinPrompt";
import { InfoSections } from "./InfoSections";
import { CrossSell, PdpLayout, PdpSection } from "./PdpLayout";
import { ProductGallery } from "./ProductGallery";

/**
 * PDP de sérum — template común para CLARITY, BLOOM, RADIANCE y RESTORE.
 *
 * Identidad propia por producto a través de su tono (galería, chips de
 * activos y la franja de descripción) y de su campaña cuando existe. La fase
 * es metadata secundaria al pie del bloque de compra, con una nota explícita:
 * no limita cuándo usarlo ni condiciona la compra.
 *
 * Secciones sin dato (modo de uso, textura, INCI, FAQ) no se renderizan.
 * Debajo de la información, una entrada discreta a Descubrí tu piel.
 */
export function SerumDetail({ product }: { product: Product }) {
  const tone = toneOf(product);
  const campaign = product.campaign ?? [];
  const others = serums.filter((s) => s.slug !== product.slug);
  const crossSell = [packX4, ...others].slice(0, 4);

  return (
    <PdpLayout
      breadcrumb={{ label: product.name, href: `/products/${product.slug}` }}
      media={<ProductGallery product={product} />}
      buy={
        <BuyBox
          product={product}
          subtitle={product.tagline}
          footer={
            product.phase && (
              <div className="flex flex-col gap-1.5">
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-ink/62">
                  {pdpCopy.phaseReference(phaseLabel[product.phase])}
                </p>
                <p className="font-sans text-[12px] leading-relaxed text-ink/62">
                  {pdpCopy.phaseNote}
                </p>
              </div>
            )
          }
        >
          {product.ingredients.length > 0 && (
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-ink/62">
                {pdpCopy.sections.actives}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {product.ingredients.map((item) => (
                  <li
                    key={item}
                    className="rounded-full px-3.5 py-1.5 font-accent text-[13px] text-ink"
                    style={{ backgroundColor: tone }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </BuyBox>
      }
    >
      {/* Descripción en grande, sobre el tono del producto. */}
      <section style={{ backgroundColor: tone }}>
        <div className="mx-auto w-full max-w-[1320px] px-6 py-16 md:px-10 md:py-24">
          <p className="max-w-[880px] font-display text-[clamp(1.6rem,4.4vw,2.6rem)] leading-[1.12] tracking-[-0.03em] text-ink">
            {product.description}
          </p>
        </div>
      </section>

      <PdpSection>
        <div className="max-w-[860px]">
          <InfoSections sections={buildInfoSections(product, { description: false })} />
        </div>
      </PdpSection>

      {/* Después de la información principal: no compite con la compra. */}
      <DiscoverSkinPrompt variant="serum" />

      {campaign.length > 0 && (
        <PdpSection eyebrow={pdpCopy.serum.campaign}>
          <ul className="grid gap-4 md:grid-cols-3 md:gap-5">
            {campaign.map((media) => (
              <li key={media.src} className="overflow-hidden rounded-[20px]">
                <img
                  src={media.src}
                  alt={media.alt}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: media.objectPosition ?? "center" }}
                  className="aspect-[4/5] w-full object-cover"
                />
              </li>
            ))}
          </ul>
        </PdpSection>
      )}

      <CrossSell title={pdpCopy.serum.crossSell} items={crossSell} />
    </PdpLayout>
  );
}
