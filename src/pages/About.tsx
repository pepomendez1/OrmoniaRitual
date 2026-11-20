import { Link } from "react-router-dom";
import { Header, HEADER_CLEARANCE } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import { ProductionPhoto } from "@/components/media/ProductionPhoto";
import { Wordmark } from "@/components/brand/Wordmark";
import { aboutCopy } from "@/data/about";
import { serums } from "@/data/products";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { brandButton, eyebrowClass, leadClass, sectionTitleClass } from "@/lib/brandButton";

const FIELD = "#F2EBDD";

/**
 * /about — Sobre ORMONIA.
 *
 * Editorial y visual, no corporativa. Solo usa copy que ya existía en el
 * proyecto (frase de marca, manifiesto de `pageShells.about`, Adentro/afuera,
 * las cuatro palabras del ritual) y cuatro fotografías de la producción real.
 * Nada de historia de fundadora, fechas, certificaciones ni procesos que no
 * estén documentados: `aboutCopy` marca dónde irían cuando existan.
 */
const About = () => {
  usePageMeta("about");
  const c = aboutCopy;
  const r1 = useScrollReveal<HTMLDivElement>();
  const r2 = useScrollReveal<HTMLDivElement>();

  return (
    <>
      <Header />
      <main
        id="main"
        tabIndex={-1}
        className={`min-h-screen text-ink outline-none ${HEADER_CLEARANCE}`}
        style={{ backgroundColor: FIELD }}
      >
        {/*
          Apertura: marca y frase, y debajo la fotografía de campo como un gran
          bloque apaisado. Es una persona pequeña dentro del bosque: solo se
          lee en formato ancho, por eso deja de ser una columna vertical.
        */}
        <section aria-labelledby="about-title" className="mx-auto w-full max-w-[1320px] px-6 pb-16 pt-12 md:px-10 md:pb-24 md:pt-16">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div>
              <p className={`${eyebrowClass} text-ink/62`}>{c.eyebrow}</p>
              <h1
                id="about-title"
                className="mt-6"
              >
                {/* Pantalla de marca: el logotipo oficial, con su nombre accesible. */}
                <Wordmark
                  title={c.wordmark}
                  className="h-[clamp(2.4rem,9vw,4.2rem)] lg:h-[clamp(3.4rem,5.4vw,5.6rem)]"
                />
              </h1>
            </div>
            {/* Frase de marca: acento en Cardone, junto al logotipo. */}
            <p className="max-w-[440px] font-editorial text-[clamp(1.7rem,4vw,2.4rem)] leading-[1.12] lg:pb-3 lg:text-right">
              {c.tagline}
            </p>
          </div>
          <div className="mt-10 aspect-[4/5] overflow-hidden rounded-[24px] sm:aspect-[16/10] md:mt-14 md:rounded-[28px] lg:aspect-[21/9]">
            <ProductionPhoto image={c.media.opening} eager />
          </div>
        </section>

        {/* Manifiesto */}
        <section aria-label={c.manifesto.eyebrow} className="border-t border-ink/12">
          <div ref={r1} className="mx-auto w-full max-w-[1320px] px-6 py-20 md:px-10 md:py-28">
            <p className={`${eyebrowClass} text-ink/62`}>{c.manifesto.eyebrow}</p>
            <p className="mt-8 max-w-[980px] font-display text-[clamp(1.8rem,4.6vw,3.2rem)] leading-[1.1] tracking-[-0.03em]">
              {c.manifesto.body}
            </p>
          </div>
        </section>

        {/* Adentro / afuera */}
        <section aria-labelledby="about-inside" className="bg-deepBrown text-ivory" data-header-tone="light">
          <div className="mx-auto grid w-full max-w-[1320px] items-center gap-10 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
            <div className="aspect-[4/5] overflow-hidden rounded-[22px]">
              <ProductionPhoto image={c.media.inside} />
            </div>
            <div>
              <p className={`${eyebrowClass} text-ivory/62`}>{c.inside.eyebrow}</p>
              <h2 id="about-inside" className="mt-5 font-display text-[clamp(2.2rem,5.6vw,3.6rem)] leading-[1] tracking-[-0.04em]">
                {c.inside.title}
              </h2>
              <p className="mt-7 max-w-[460px] font-sans text-[14px] leading-relaxed text-ivory/80 md:text-[15px]">
                {c.inside.body}
              </p>
              <p className="mt-8 font-editorial text-[1.4rem] text-ivory/80">{c.inside.caption}</p>
            </div>
          </div>
        </section>

        {/* El ritual */}
        <section aria-labelledby="about-ritual" className="mx-auto w-full max-w-[1320px] px-6 py-20 md:px-10 md:py-28">
          <div ref={r2}>
            <p className={`${eyebrowClass} text-ink/62`}>{c.ritual.eyebrow}</p>
            <h2 id="about-ritual" className={`mt-5 ${sectionTitleClass}`}>
              {c.ritual.title}
            </h2>
            <ol className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[20px] bg-ink/12 md:grid-cols-4">
              {c.ritual.words.map((word, i) => (
                <li key={word} className="bg-[#F2EBDD] px-5 py-8 md:px-7 md:py-12">
                  <span className="font-sans text-[10px] tabular-nums tracking-[0.2em] text-ink/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-4 block font-display text-[clamp(1.6rem,3vw,2.3rem)] italic tracking-[-0.03em]">
                    {word}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Campo: dos texturas de la producción como contrapunto, no una galería. */}
        <section aria-label={c.field.label} className="mx-auto w-full max-w-[1320px] px-6 md:px-10">
          <ul className="grid grid-cols-2 gap-3 md:gap-5">
            {c.media.field.map((m) => (
              <li key={m.id} className="aspect-[4/5] overflow-hidden rounded-[18px] md:rounded-[22px]">
                <ProductionPhoto image={m} />
              </li>
            ))}
          </ul>
        </section>

        {/* Las fórmulas */}
        <section aria-labelledby="about-formulas" className="mx-auto w-full max-w-[1320px] px-6 py-20 md:px-10 md:py-28">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={`${eyebrowClass} text-ink/62`}>{c.formulas.eyebrow}</p>
              <h2 id="about-formulas" className={`mt-5 ${sectionTitleClass}`}>
                {c.formulas.title}
              </h2>
            </div>
            <p className={`max-w-[360px] ${leadClass}`}>{c.formulas.body}</p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-5">
            {serums.map((serum) => (
              <ShopProductCard key={serum.id} product={serum} aspect="aspect-[3/4]" meta={serum.tagline} />
            ))}
          </div>
        </section>

        {/* Salidas */}
        <section className="border-t border-ink/12">
          <div className="mx-auto flex w-full max-w-[1320px] flex-col items-start gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between md:px-10 md:py-20">
            <p className="max-w-[520px] font-display text-[clamp(1.6rem,3.6vw,2.3rem)] leading-[1.1] tracking-[-0.03em]">
              {c.closing.title}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/descubri-tu-piel" className={brandButton({ size: "lg" })}>
                {c.closing.primary}
              </Link>
              <Link to="/products" className={brandButton({ variant: "secondary", size: "lg" })}>
                {c.closing.secondary}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
