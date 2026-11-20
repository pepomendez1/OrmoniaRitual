import { Link } from "react-router-dom";
import { Header, HEADER_CLEARANCE } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalendarVisual } from "@/components/shop/CalendarVisual";
import { PriceTag } from "@/components/shop/PriceTag";
import { calendarCopy } from "@/data/calendar";
import { calendarProduct, isPurchasable, primaryMediaOf, productHref } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { brandButton, eyebrowClass, leadClass, sectionTitleClass } from "@/lib/brandButton";

const FIELD = "#F2EBDD";

/**
 * /calendario — página EDITORIAL del Calendario cíclico.
 *
 * Explica; no vende primero. El orden sigue el brief: hero, qué es, su lugar
 * en el ritual, cómo se usa, el interior (cuando haya fotos), la relación con
 * el registro personal y recién al final el CTA a la ficha comercial.
 *
 * La PDP (`/products/calendario-ciclico`) es la que prioriza precio, stock y
 * AGREGAR AL CARRITO. Las dos se enlazan entre sí.
 *
 * Bloques sin dato (interior, precio) no se renderizan.
 */
const Calendar = () => {
  usePageMeta("calendar");
  const { add } = useCart();
  const product = primaryMediaOf(calendarProduct);
  const media = calendarCopy.hero.media ?? product;
  const c = calendarCopy;
  const reveal = useScrollReveal<HTMLDivElement>();

  return (
    <>
      <Header />
      <main
        id="main"
        tabIndex={-1}
        className={`min-h-screen text-ink outline-none ${HEADER_CLEARANCE}`}
        style={{ backgroundColor: FIELD }}
      >
        {/* 1 · Hero editorial */}
        <section aria-labelledby="calendar-title" className="mx-auto w-full max-w-[1320px] px-6 pb-16 pt-12 md:px-10 md:pb-24 md:pt-16">
          <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <div className="lg:pb-6">
              <p className={`${eyebrowClass} text-ink/62`}>{c.hero.eyebrow}</p>
              <h1
                id="calendar-title"
                className="mt-6 font-display text-[clamp(3.2rem,11vw,5.4rem)] leading-[0.92] tracking-[-0.045em] lg:text-[clamp(4.4rem,6.6vw,6.8rem)]"
              >
                {c.hero.title[0]}
                <br />
                <em>{c.hero.title[1]}</em>
              </h1>
              <p className={`mt-7 max-w-[400px] ${leadClass}`}>{c.hero.lead}</p>
            </div>
            {media ? (
              <img
                src={media.src}
                alt={media.alt}
                className="aspect-[3/2] w-full rounded-[24px] object-cover md:rounded-[28px]"
              />
            ) : (
              <CalendarVisual className="aspect-[3/2] w-full rounded-[24px] md:rounded-[28px]" />
            )}
          </div>
        </section>

        {/* 2 · Qué es */}
        <section aria-labelledby="calendar-what" className="border-t border-ink/12">
          <div ref={reveal} className="mx-auto grid w-full max-w-[1320px] gap-8 px-6 py-16 md:px-10 md:py-24 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <div>
              <p className={`${eyebrowClass} text-ink/62`}>{c.what.eyebrow}</p>
              <h2 id="calendar-what" className={`mt-5 ${sectionTitleClass}`}>
                {c.what.title}
              </h2>
            </div>
            <div className="flex flex-col gap-4 lg:pt-10">
              {c.what.body.map((p) => (
                <p key={p} className="max-w-[560px] font-display text-[clamp(1.3rem,3vw,1.7rem)] leading-[1.3] tracking-[-0.02em] text-ink/85">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* 3 · Dentro del ritual */}
        <section aria-labelledby="calendar-role" className="bg-deepBrown text-ivory" data-header-tone="light">
          <div className="mx-auto w-full max-w-[1320px] px-6 py-20 md:px-10 md:py-28">
            <div className="grid items-center gap-12 md:grid-cols-[minmax(0,1fr)_auto] md:gap-16">
              <div>
                <p className={`${eyebrowClass} text-ivory/62`}>{c.role.eyebrow}</p>
                <h2 id="calendar-role" className="mt-5 max-w-[760px] font-display text-[clamp(2.3rem,6.4vw,4rem)] leading-[0.98] tracking-[-0.04em]">
                  {c.role.title}
                </h2>
                <p className="mt-7 max-w-[520px] font-sans text-[14px] leading-relaxed text-ivory/80 md:text-[15px]">
                  {c.role.body}
                </p>
              </div>
              {c.role.media && (
                <img
                  src={c.role.media.src}
                  alt={c.role.media.alt}
                  loading="lazy"
                  decoding="async"
                  className="mx-auto aspect-square w-[min(72vw,300px)] rounded-[18px] object-cover [filter:sepia(0.4)_brightness(0.95)] lg:w-[340px]"
                />
              )}
            </div>
            <ul className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-[18px] bg-ivory/14 md:grid-cols-4">
              {c.role.words.map((word, i) => (
                <li key={word} className="bg-deepBrown px-5 py-7 md:py-9">
                  <span className="font-sans text-[10px] tabular-nums tracking-[0.2em] text-ivory/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-3 block font-display text-[1.5rem] italic tracking-[-0.02em]">
                    {word}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 4 · Cómo se usa */}
        <section aria-labelledby="calendar-how" className="mx-auto w-full max-w-[1320px] px-6 py-16 md:px-10 md:py-24">
          <p className={`${eyebrowClass} text-ink/62`}>{c.howTo.eyebrow}</p>
          <h2 id="calendar-how" className={`mt-5 ${sectionTitleClass}`}>
            {c.howTo.title}
          </h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {c.howTo.steps.map((step, i) => (
              <li key={step.title} className="border-t border-ink/16 pt-6">
                <span className="font-accent text-[15px] text-ink/55">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-[1.8rem] leading-[1.05] tracking-[-0.03em]">
                  {step.title}
                </h3>
                <p className={`mt-3 max-w-[320px] ${leadClass}`}>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 5 · Interior — solo con fotografías reales */}
        {c.interior.media.length > 0 && (
          <section aria-label={c.interior.eyebrow} className="border-t border-ink/12">
            <div className="mx-auto w-full max-w-[1320px] px-6 py-16 md:px-10 md:py-24">
              <div className="grid items-center gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
                <div className="md:order-2">
                  <p className={`${eyebrowClass} text-ink/62`}>{c.interior.eyebrow}</p>
                  <h2 className={`mt-5 ${sectionTitleClass}`}>{c.interior.title}</h2>
                  <p className={`mt-6 max-w-[420px] ${leadClass}`}>{c.interior.body}</p>
                </div>
                <ul className="grid gap-4 md:order-1">
                  {c.interior.media.map((m) => (
                    <li key={m.src}>
                      <img
                        src={m.src}
                        alt={m.alt}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[4/5] w-full rounded-[22px] object-cover"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* 6 · Registro personal */}
        <section aria-labelledby="calendar-personal" className="border-t border-ink/12">
          <div className="mx-auto grid w-full max-w-[1320px] gap-8 px-6 py-16 md:px-10 md:py-24 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className={`${eyebrowClass} text-ink/62`}>{c.personal.eyebrow}</p>
              <h2 id="calendar-personal" className={`mt-5 ${sectionTitleClass}`}>
                {c.personal.title}
              </h2>
            </div>
            <div className="flex flex-col items-start gap-7 lg:pt-10">
              <p className={`max-w-[480px] ${leadClass}`}>{c.personal.body}</p>
              <Link to={c.personal.ctaHref} className={brandButton({ variant: "quiet" })}>
                {c.personal.cta}
              </Link>
            </div>
          </div>
        </section>

        {/* 7 · Hacia la compra */}
        <section aria-labelledby="calendar-buy" className="border-t border-ink/12">
          <div className="mx-auto grid w-full max-w-[1320px] items-center gap-10 px-6 py-16 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:px-10 md:py-24 lg:gap-16">
            <Link to={productHref(calendarProduct)} tabIndex={-1} aria-hidden="true" className="group block overflow-hidden rounded-[22px]">
              {product ? (
                <img
                  src={product.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover motion-safe:transition-transform motion-safe:duration-900 motion-safe:group-hover:scale-[1.02]"
                />
              ) : (
                <CalendarVisual className="aspect-square w-full" showNote={false} />
              )}
            </Link>
            <div>
              <p className={`${eyebrowClass} text-ink/62`}>{c.buy.eyebrow}</p>
              <h2 id="calendar-buy" className={`mt-5 ${sectionTitleClass}`}>
                {calendarProduct.name}
              </h2>
              <PriceTag
                product={calendarProduct}
                className="mt-5 block font-sans text-[17px]"
                pendingClassName="text-[12px] uppercase tracking-[0.16em] text-ink/66"
              />
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Link to={productHref(calendarProduct)} className={brandButton({ size: "lg" })}>
                  {c.buy.cta}
                </Link>
                {isPurchasable(calendarProduct) && (
                  <button
                    type="button"
                    onClick={() => add(calendarProduct, 1)}
                    className={brandButton({ variant: "quiet" })}
                  >
                    {c.buy.add}
                  </button>
                )}
              </div>
              <p className="mt-10 max-w-[460px] font-sans text-[11px] leading-relaxed text-ink/62">
                {c.disclaimer}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Calendar;
