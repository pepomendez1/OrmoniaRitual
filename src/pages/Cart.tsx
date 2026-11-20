import { Link } from "react-router-dom";
import { Header, HEADER_CLEARANCE } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartError } from "@/components/shop/CartError";
import { CartLineItem } from "@/components/shop/CartLineItem";
import { CartSummary } from "@/components/shop/CartSummary";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import { cartCopy } from "@/data/shopCopy";
import { catalog } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { usePageMeta } from "@/hooks/usePageMeta";
import { brandButton, eyebrowClass, pageTitleClass } from "@/lib/brandButton";

const FIELD = "#F2EBDD";

/**
 * /cart — carrito completo.
 *
 * Mismas piezas que el mini carrito (`CartLineItem`, `CartSummary`) en una
 * página: productos con cantidad y quitar, subtotal, envío y FINALIZAR
 * COMPRA. Con el adapter local, el checkout está deshabilitado y lo dice.
 *
 * Estados: cargando, vacío (con sugerencias reales del catálogo), con
 * productos, y error de actualización (aviso cerrable).
 */
const Cart = () => {
  usePageMeta("cart");
  const { cart, status } = useCart();
  const empty = cart.lines.length === 0;
  const inCart = new Set(cart.lines.map((line) => line.productId));
  const suggestions = catalog.filter((p) => !inCart.has(p.id)).slice(0, 4);

  return (
    <>
      <Header />
      <main
        id="main"
        tabIndex={-1}
        className={`min-h-screen outline-none ${HEADER_CLEARANCE}`}
        style={{ backgroundColor: FIELD }}
      >
        <div className="mx-auto w-full max-w-[1320px] px-6 pb-20 pt-12 md:px-10 md:pt-16">
          <p className={`${eyebrowClass} text-ink/66`}>ORMONIA</p>
          <h1 className={`mt-5 text-ink ${pageTitleClass}`}>
            {cartCopy.title}
            {cart.totalQuantity > 0 && (
              <span className="ml-3 align-top font-sans text-[14px] tracking-normal text-ink/62">
                ({cart.totalQuantity})
              </span>
            )}
          </h1>

          <div className="mt-6 max-w-[720px]">
            <CartError />
          </div>

          {status === "loading" ? (
            <p className="mt-12 font-sans text-[13px] text-ink/62" aria-live="polite">
              {cartCopy.updating}
            </p>
          ) : empty ? (
            <div className="mt-10 border-t border-ink/14 pt-10 md:mt-12">
              <p className="font-sans text-[clamp(1.4rem,3vw,1.7rem)] leading-[1.2] tracking-[-0.01em] text-ink">
                {cartCopy.empty.title}
              </p>
              <p className="mt-4 max-w-[420px] font-sans text-[14px] leading-relaxed text-ink/64">
                {cartCopy.empty.body}
              </p>
              <Link to="/products" className={`mt-8 ${brandButton({ size: "lg" })}`}>
                {cartCopy.empty.cta}
              </Link>
            </div>
          ) : (
            <div className="mt-10 grid gap-12 md:mt-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
              <ul aria-label={cartCopy.title} className="border-y border-ink/14">
                {cart.lines.map((line) => (
                  <CartLineItem key={line.id} line={line} />
                ))}
              </ul>
              <aside
                aria-label="Resumen"
                className="h-fit rounded-[20px] bg-[#EAE1D1] p-6 md:p-8 lg:sticky lg:top-28"
              >
                <CartSummary cart={cart}>
                  <Link to="/products" className={`self-center ${brandButton({ variant: "quiet" })}`}>
                    {cartCopy.continueShopping}
                  </Link>
                </CartSummary>
              </aside>
            </div>
          )}

          {!empty && status !== "loading" && suggestions.length > 0 && (
            <section aria-labelledby="cart-suggestions" className="mt-20 border-t border-ink/14 pt-12">
              <h2 id="cart-suggestions" className={`${eyebrowClass} text-ink/62`}>
                Completá tu ritual
              </h2>
              <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-5">
                {suggestions.map((product) => (
                  <ShopProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cart;
