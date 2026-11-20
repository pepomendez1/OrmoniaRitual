import { checkoutEnabled } from "@/commerce";
import type { Cart } from "@/commerce/types";
import { cartCopy } from "@/data/shopCopy";
import { brandButton } from "@/lib/brandButton";
import { formatPrice } from "@/lib/price";
import { FreeShippingNote } from "./FreeShippingNote";

/**
 * Subtotal, envío y CTA de checkout. Compartido por el drawer y `/cart`.
 *
 * Con el adapter local no hay checkout: el botón queda deshabilitado y el
 * texto dice por qué. No se simula una compra.
 */
export function CartSummary({ cart, children }: { cart: Cart; children?: React.ReactNode }) {
  const partial = cart.hasUnpricedLines;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-ink">
          {partial ? cartCopy.partialSubtotal : cartCopy.subtotal}
        </span>
        <span className="font-sans text-[15px] tabular-nums text-ink">
          {formatPrice(cart.subtotal)}
        </span>
      </div>
      {partial && (
        <p className="-mt-2 font-sans text-[11px] leading-relaxed text-ink/62">
          {cartCopy.unpricedNote}
        </p>
      )}

      <FreeShippingNote subtotal={cart.subtotal} partial={partial} />
      <p className="font-sans text-[11px] leading-relaxed text-ink/62">{cartCopy.shippingNote}</p>

      <div className="flex flex-col gap-3">
        {checkoutEnabled && cart.checkoutUrl ? (
          <a href={cart.checkoutUrl} className={brandButton({ size: "lg", block: true })}>
            {cartCopy.checkout}
          </a>
        ) : (
          <>
            <button
              type="button"
              disabled
              aria-describedby="checkout-pending"
              className={brandButton({ size: "lg", block: true })}
            >
              {cartCopy.checkout}
            </button>
            <p id="checkout-pending" className="font-sans text-[11px] leading-relaxed text-ink/62">
              {cartCopy.checkoutPending}
            </p>
          </>
        )}
        {children}
      </div>
    </div>
  );
}
