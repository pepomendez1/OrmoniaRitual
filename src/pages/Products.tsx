import { Link } from "react-router-dom";
import { Header, HEADER_CLEARANCE } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PriceTag } from "@/components/shop/PriceTag";
import { ProductVisual } from "@/components/shop/ProductVisual";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import {
  auraTeaser,
  calendarProduct,
  getProductBySlug,
  isPurchasable,
  packX4,
  productHref,
  serums,
} from "@/data/products";
import { packCopy } from "@/data/content";
import { shopCopy } from "@/data/shopCopy";
import { useCart } from "@/hooks/useCart";
import { usePageMeta } from "@/hooks/usePageMeta";
import {
  brandButton,
  eyebrowClass,
  leadClass,
  pageTitleClass,
  sectionTitleClass,
} from "@/lib/brandButton";

const FIELD = "#F2EBDD";

/**
 * /products — Tienda.
 *
 * Seis productos no necesitan filtros: es una página continua con jerarquía.
 *
 *   RITUAL COMPLETO          El Ritual (pieza principal, ancho completo)
 *   HERRAMIENTAS DEL RITUAL  Calendario cíclico (+ salida a /calendario)
 *   SÉRUMS                   CLARITY · BLOOM · RADIANCE · RESTORE
 *   PRÓXIMAMENTE             AURA
 *
 * No se organiza por fase. Sumar un producto es agregarlo al catálogo
 * (`data/products.ts`) con su categoría; las grillas lo toman solas.
 */
const Products = () => {
  usePageMeta("shop");
  const { add } = useCart();
  const included = (packX4.includes ?? []).map((slug) => getProductBySlug(slug)?.name).filter(Boolean);
  const s = shopCopy.sections;

  return (
    <>
      <Header />
      <main
        id="main"
        tabIndex={-1}
        className={`min-h-screen outline-none ${HEADER_CLEARANCE}`}
        style={{ backgroundColor: FIELD }}
      >
        <div className="mx-auto w-full max-w-[1320px] px-6 md:px-10">
          {/* Encabezado */}
          <header className="flex flex-col gap-6 pb-12 pt-12 text-ink md:flex-row md:items-end md:justify-between md:pb-14 md:pt-16">
            <div>
              <p className={`${eyebrowClass} text-ink/66`}>{shopCopy.eyebrow}</p>
              <h1 className={`mt-5 ${pageTitleClass}`}>{shopCopy.title}</h1>
            </div>
            <p className={`max-w-[360px] ${leadClass} md:pb-2`}>{shopCopy.body}</p>
          </header>

          {/* 1 · Ritual completo — El Ritual */}
          <section aria-labelledby="shop-ritual" className="border-t border-ink/14 py-12 md:py-16">
            <p className={`${eyebrowClass} text-ink/62`}>{s.ritual.eyebrow}</p>
            <div className="mt-6 grid items-center gap-8 md:mt-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-14">
              <Link
                to={productHref(packX4)}
                data-cursor-expand
                data-cursor-tone="light"
                className="group block"
                aria-label={packX4.name}
              >
                <ProductVisual
                  product={packX4}
                  withHover
                  eager
                  className="aspect-[4/3] rounded-[22px] md:rounded-[28px]"
                />
              </Link>
              <div className="text-ink">
                <h2 id="shop-ritual" className={sectionTitleClass}>
                  {packX4.name}
                </h2>
                <p className="mt-3 font-display text-[1.3rem] italic leading-[1.2] text-ink/80">
                  {packCopy.titleLines.join(" ")}
                </p>
                <p className={`mt-5 max-w-[380px] ${leadClass}`}>{packX4.description}</p>
                <p className="mt-5 font-sans text-[11px] uppercase tracking-[0.16em] text-ink/62">
                  {packCopy.includesLabel} · {included.join(" · ")}
                </p>
                <PriceTag
                  product={packX4}
                  className="mt-6 block font-sans text-[17px] text-ink"
                  pendingClassName="text-[12px] uppercase tracking-[0.16em] text-ink/66"
                />
                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <Link to={productHref(packX4)} className={brandButton({ size: "lg" })}>
                    {shopCopy.viewProduct}
                  </Link>
                  {isPurchasable(packX4) && (
                    <button
                      type="button"
                      onClick={() => add(packX4, 1)}
                      className={brandButton({ variant: "quiet" })}
                    >
                      {packCopy.addToCart}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* 2 · Herramientas del ritual — Calendario */}
          <section aria-labelledby="shop-tools" className="border-t border-ink/14 py-12 md:py-16">
            <div className="grid gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-end">
              <div className="text-ink md:order-1">
                <p className={`${eyebrowClass} text-ink/62`}>{s.tools.eyebrow}</p>
                <h2 id="shop-tools" className={`mt-5 ${sectionTitleClass}`}>
                  {s.tools.title}
                </h2>
                <p className={`mt-5 max-w-[380px] ${leadClass}`}>{s.tools.body}</p>
                <Link to="/calendario" className={`mt-7 ${brandButton({ variant: "quiet" })}`}>
                  {s.tools.editorialCta}
                </Link>
              </div>
              <ShopProductCard
                product={calendarProduct}
                aspect="aspect-[4/3]"
                className="md:order-2"
              />
            </div>
          </section>

          {/* 3 · Sérums */}
          <section aria-labelledby="shop-serums" className="border-t border-ink/14 py-12 md:py-16">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-12">
              <div>
                <p className={`${eyebrowClass} text-ink/62`}>{s.serums.eyebrow}</p>
                <h2 id="shop-serums" className={`mt-5 ${sectionTitleClass}`}>
                  {s.serums.title}
                </h2>
              </div>
              <p className={`max-w-[360px] ${leadClass} md:pb-1`}>{s.serums.body}</p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:mt-12 lg:grid-cols-4 lg:gap-x-5">
              {serums.map((serum) => (
                <ShopProductCard
                  key={serum.id}
                  product={serum}
                  aspect="aspect-[3/4]"
                  meta={serum.ingredients.join(" · ")}
                />
              ))}
            </div>
          </section>

          {/* 4 · Próximamente */}
          <section aria-labelledby="shop-upcoming" className="border-t border-ink/14 pb-24 pt-12 md:pb-28 md:pt-16">
            <div className="grid items-center gap-6 sm:grid-cols-[180px_minmax(0,1fr)] md:gap-10">
              <div className="aspect-square rounded-[18px] bg-[#E2D6C4]" aria-hidden="true">
                <span className="flex h-full items-center justify-center font-display text-[1.6rem] tracking-[0.14em] text-ink/45">
                  {auraTeaser.name}
                </span>
              </div>
              <div className="text-ink">
                <p className={`${eyebrowClass} text-ink/62`}>{s.upcoming.eyebrow}</p>
                <h2 id="shop-upcoming" className="mt-3 font-display text-[1.7rem] leading-[1.1] tracking-[-0.03em]">
                  {auraTeaser.name} · {auraTeaser.tagline}
                </h2>
                <p className={`mt-3 max-w-[460px] ${leadClass}`}>{auraTeaser.description}</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Products;
