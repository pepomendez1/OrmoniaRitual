import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { cartCopy } from "@/data/shopCopy";
import { useCart } from "@/hooks/useCart";
import { useLenisLock } from "@/hooks/useLenisLock";
import { brandButton } from "@/lib/brandButton";
import { CartError } from "./CartError";
import { CartLineItem } from "./CartLineItem";
import { CartSummary } from "./CartSummary";

/**
 * Mini carrito.
 *
 * Panel lateral sobre Radix Dialog: foco atrapado, Escape y click afuera
 * cierran, el foco vuelve al disparador. Se abre al agregar un producto y
 * desde CARRITO en el header.
 *
 * Velo liviano (no el negro 80% del Sheet genérico): el sitio sigue
 * presente detrás, como en el resto de la marca.
 */
export function CartDrawer() {
  const { cart, drawerOpen, setDrawerOpen, status } = useCart();
  useLenisLock(drawerOpen);
  const close = () => setDrawerOpen(false);
  const empty = cart.lines.length === 0;

  return (
    <Dialog.Root open={drawerOpen} onOpenChange={setDrawerOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-ink/25 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-[460px] flex-col bg-ivory text-ink shadow-[-24px_0_60px_-30px_rgba(25,21,17,0.35)] outline-none data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=closed]:duration-300 data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=open]:duration-500"
        >
          <div className="flex items-center justify-between border-b border-ink/12 px-6 py-5 md:px-8">
            <Dialog.Title className="font-sans text-[12px] uppercase tracking-[0.22em]">
              {cartCopy.drawerTitle}
              {cart.totalQuantity > 0 && (
                <span className="ml-2 tabular-nums text-ink/62">({cart.totalQuantity})</span>
              )}
            </Dialog.Title>
            <Dialog.Close
              aria-label={cartCopy.close}
              className="-mr-2 flex h-10 w-10 items-center justify-center rounded-full text-ink/70 transition-colors hover:text-ink"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </Dialog.Close>
          </div>

          <div data-lenis-prevent className="flex-1 overflow-y-auto px-6 md:px-8">
            <div className="pt-4">
              <CartError />
            </div>
            {status === "loading" ? (
              <p className="py-10 font-sans text-[12px] text-ink/62">{cartCopy.updating}</p>
            ) : empty ? (
              <div className="flex flex-col items-start gap-5 py-12">
                <p className="font-sans text-[1.4rem] leading-[1.2] tracking-[-0.01em]">
                  {cartCopy.empty.title}
                </p>
                <p className="max-w-[320px] font-sans text-[13px] leading-relaxed text-ink/64">
                  {cartCopy.empty.body}
                </p>
                <Link to="/products" onClick={close} className={brandButton({ variant: "secondary" })}>
                  {cartCopy.empty.cta}
                </Link>
              </div>
            ) : (
              <ul aria-label={cartCopy.drawerTitle}>
                {cart.lines.map((line) => (
                  <CartLineItem key={line.id} line={line} dense onNavigate={close} />
                ))}
              </ul>
            )}
          </div>

          {!empty && (
            <div className="border-t border-ink/12 bg-[#EFE7D8] px-6 py-6 md:px-8">
              <CartSummary cart={cart}>
                <Link
                  to="/cart"
                  onClick={close}
                  className={brandButton({ variant: "secondary", size: "lg", block: true })}
                >
                  {cartCopy.viewCart}
                </Link>
              </CartSummary>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
