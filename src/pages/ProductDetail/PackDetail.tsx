import {
  getProductBySlug,
  phaseLabel,
  productHref,
  serumDisplayName,
  toneOf,
  type Product,
} from "@/data/products";
import { pdpCopy } from "@/data/pdpCopy";
import { productionMedia } from "@/data/productionMedia";
import { ProductionPhoto } from "@/components/media/ProductionPhoto";
import { eyebrowClass, sectionTitleClass } from "@/lib/brandButton";
import { BuyBox } from "./BuyBox";
import { buildInfoSections } from "./buildInfoSections";
import { DiscoverSkinPrompt } from "./DiscoverSkinPrompt";
import { InfoSections } from "./InfoSections";
import { PdpLayout, PdpSection } from "./PdpLayout";
import { ProductGallery } from "./ProductGallery";
import { RitualComplement } from "./RitualComplement";

/**
 * PDP de EL RITUAL (id interno `pack-x4`) — el ritual completo.
 *
 * Se lee como el ritual ORMONIA, no como cuatro productos juntos. Por eso,
 * dentro de esta página los sérums nunca aparecen como productos: sin cards,
 * sin links a sus PDP, sin precios sueltos, sin quick add y sin ahorro. Sus
 * nombres están solo para decir qué integra el ritual.
 *
 * Recorrido:
 *   1. Compra (galería + BuyBox: EL RITUAL COMPLETO / El Ritual / Las 4 fases,
 *      un solo ritual. / bajada / precio / cantidad)
 *   2. El ritual completo — por qué es un sistema
 *   3. El ritual incluye — las cuatro fórmulas como una unidad, sin click
 *   4. Cómo vivir el ritual
 *   5. Descubrí tu piel — invitación, no requisito
 *   6. Completá el ritual — el Calendario, único complemento
 *   7. Detalles / envío (y modo de uso o FAQ cuando existan en la data)
 */
export function PackDetail({ product }: { product: Product }) {
  const c = pdpCopy.pack;
  const formulas = (product.includes ?? [])
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is Product => Boolean(p));
  // Producción real: el ritual sobre el cuerpo y las cuatro fórmulas juntas.
  const ritualPhoto = productionMedia.ritual.onBody;
  const formulasPhoto = productionMedia.ritual.fourFormulas;

  return (
    <PdpLayout
      breadcrumb={{ label: product.name, href: productHref(product) }}
      media={<ProductGallery product={product} />}
      buy={
        /*
          Titular = el nombre del producto (El Ritual); descriptor = su
          tagline. Qué contiene se explica en "El ritual incluye", no acá.
        */
        <BuyBox product={product} eyebrow={c.eyebrow} subtitle={product.tagline} lead={c.lead} />
      }
    >
      {/* 2 · El ritual completo */}
      <section aria-labelledby="pack-ritual" className="border-t border-ink/12">
        <div className="mx-auto grid w-full max-w-[1320px] items-center gap-10 px-6 py-16 md:px-10 md:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <p className={`${eyebrowClass} text-ink/62`}>{c.ritual.eyebrow}</p>
            <h2 id="pack-ritual" className={`mt-5 ${sectionTitleClass} text-ink`}>
              {c.ritual.title}
            </h2>
            <div className="mt-7 flex max-w-[460px] flex-col gap-4">
              {c.ritual.body.map((p) => (
                <p key={p} className="font-sans text-[14px] leading-relaxed text-ink/72 md:text-[15px]">
                  {p}
                </p>
              ))}
            </div>
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-[22px]">
            <ProductionPhoto image={ritualPhoto} />
          </div>
        </div>
      </section>

      {/* 3 · El ritual incluye — una unidad, no cuatro productos */}
      <section aria-labelledby="pack-includes" className="bg-deepBrown text-ivory" data-header-tone="light">
        <div className="mx-auto grid w-full max-w-[1320px] gap-12 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <div className="flex flex-col justify-between gap-10">
            <div>
              <p className={`${eyebrowClass} text-ivory/62`}>{c.includes.eyebrow}</p>
              <h2
                id="pack-includes"
                className="mt-5 font-display text-[clamp(2.2rem,5.6vw,3.4rem)] leading-[1] tracking-[-0.04em]"
              >
                {c.includes.title}
              </h2>
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-[20px]">
              <ProductionPhoto image={formulasPhoto} />
            </div>
          </div>

          <div className="flex flex-col justify-end">
            <ol className="border-t border-ivory/16">
              {formulas.map((formula, i) => (
                <li
                  key={formula.slug}
                  className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-4 border-b border-ivory/16 py-6 md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1fr)] md:py-7"
                >
                  <span className="font-accent text-[15px] text-ivory/55">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: toneOf(formula) }}
                      />
                      <span className="font-editorial text-[clamp(1.9rem,4.4vw,2.6rem)] leading-none">
                        {serumDisplayName(formula)}
                      </span>
                    </span>
                    {formula.phase && (
                      <span className="mt-2 block font-sans text-[10px] uppercase tracking-[0.22em] text-ivory/55">
                        {phaseLabel[formula.phase]}
                      </span>
                    )}
                  </span>
                  <span className="col-start-2 mt-3 font-display text-[1.1rem] italic leading-[1.3] text-ivory/80 md:col-start-3 md:mt-0">
                    {formula.tagline}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-6 max-w-[460px] font-sans text-[12px] leading-relaxed text-ivory/62">
              {c.includes.note}
            </p>
          </div>
        </div>
      </section>

      {/* 4 · Cómo vivir el ritual */}
      <section aria-labelledby="pack-living" className="mx-auto w-full max-w-[1320px] px-6 py-16 md:px-10 md:py-24">
        <p className={`${eyebrowClass} text-ink/62`}>{c.living.eyebrow}</p>
        <h2 id="pack-living" className={`mt-5 max-w-[640px] ${sectionTitleClass} text-ink`}>
          {c.living.title}
        </h2>
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {c.living.steps.map((step, i) => (
            <li key={step.title} className="border-t border-ink/16 pt-6 text-ink">
              <span className="font-sans text-[11px] tabular-nums tracking-[0.2em] text-ink/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-[1.7rem] italic leading-[1.05] tracking-[-0.03em]">
                {step.title}
              </h3>
              <p className="mt-3 max-w-[280px] font-sans text-[13px] leading-relaxed text-ink/66">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* 5 · Test de perfil de piel */}
      <DiscoverSkinPrompt variant="pack" />

      {/* 6 · Completá el ritual — Calendario */}
      <RitualComplement />

      {/* 7 · Detalles y envío */}
      <PdpSection>
        <div className="max-w-[860px]">
          <InfoSections
            sections={buildInfoSections(product, { description: false, actives: false })}
          />
        </div>
      </PdpSection>
    </PdpLayout>
  );
}
