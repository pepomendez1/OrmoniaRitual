import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Header, HEADER_CLEARANCE } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import type { Product } from "@/data/products";

/** Campo de la zona comercial. */
export const PDP_FIELD = "#F2EBDD";

/**
 * Marco común de PDP: header, campo claro, above the fold en dos columnas
 * (media | compra) y lo que cada template agregue debajo.
 *
 * En desktop la columna de compra queda fija mientras la galería scrollea,
 * así AGREGAR AL CARRITO no se pierde.
 */
export function PdpLayout({
  breadcrumb,
  media,
  buy,
  children,
}: {
  breadcrumb: { label: string; href: string };
  media: ReactNode;
  buy: ReactNode;
  children?: ReactNode;
}) {
  return (
    <>
      <Header />
      <main
        id="main"
        tabIndex={-1}
        className={`min-h-screen outline-none ${HEADER_CLEARANCE}`}
        style={{ backgroundColor: PDP_FIELD }}
      >
        <div className="mx-auto w-full max-w-[1320px] px-6 pb-20 pt-6 md:px-10 md:pt-8">
          <nav aria-label="Ruta" className="font-sans text-[10px] uppercase tracking-[0.22em] text-ink/62">
            <Link to="/products" className="hover:text-ink">
              Tienda
            </Link>
            <span aria-hidden="true" className="mx-2.5">
              /
            </span>
            <Link to={breadcrumb.href} className="hover:text-ink">
              {breadcrumb.label}
            </Link>
          </nav>

          <div className="mt-6 grid gap-10 md:mt-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16 xl:gap-24">
            <div>{media}</div>
            <div className="lg:sticky lg:top-28 lg:self-start">{buy}</div>
          </div>
        </div>
        {children}
      </main>
      <Footer />
    </>
  );
}

/** Bloque de sección dentro de una PDP, con el mismo ancho que el above the fold. */
export function PdpSection({
  title,
  eyebrow,
  children,
  className,
}: {
  title?: ReactNode;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`border-t border-ink/12 ${className ?? ""}`}>
      <div className="mx-auto w-full max-w-[1320px] px-6 py-16 md:px-10 md:py-20">
        {eyebrow && (
          <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-ink/62 md:text-[11px]">
            {eyebrow}
          </p>
        )}
        {title && (
          <h2 className="mt-4 font-display text-[clamp(1.9rem,5vw,2.4rem)] leading-[1.04] tracking-[-0.035em] text-ink lg:text-[clamp(2.2rem,2.8vw,2.8rem)]">
            {title}
          </h2>
        )}
        <div className={title || eyebrow ? "mt-10" : undefined}>{children}</div>
      </div>
    </section>
  );
}

/** Cross-sell sutil: grilla de productos relacionados. */
export function CrossSell({ title, items }: { title: string; items: Product[] }) {
  if (items.length === 0) return null;
  return (
    <PdpSection eyebrow={title}>
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-5">
        {items.map((item) => (
          <ShopProductCard key={item.id} product={item} />
        ))}
      </div>
    </PdpSection>
  );
}
