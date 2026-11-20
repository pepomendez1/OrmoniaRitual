import { Link } from "react-router-dom";
import type { CartLine } from "@/commerce/types";
import { getProductById, productHref, productKicker } from "@/data/products";
import { cartCopy, priceCopy } from "@/data/shopCopy";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/price";
import { cn } from "@/lib/utils";
import { ProductVisual } from "./ProductVisual";
import { QuantityControl } from "./QuantityControl";

interface CartLineItemProps {
  line: CartLine;
  /** Drawer: miniatura más chica y tipografía compacta. */
  dense?: boolean;
  /** Se llama al navegar al producto (el drawer se cierra). */
  onNavigate?: () => void;
}

/** Una línea del carrito. La comparten el mini carrito y `/cart`. */
export function CartLineItem({ line, dense = false, onNavigate }: CartLineItemProps) {
  const { update, remove, pendingLineId, status } = useCart();
  const product = getProductById(line.productId);
  if (!product) return null;

  const busy = pendingLineId === line.id;
  const href = productHref(product);

  return (
    <li
      aria-busy={busy || undefined}
      className={cn(
        "grid gap-4 border-t border-ink/12 first:border-t-0 motion-safe:transition-opacity motion-safe:duration-300",
        dense ? "grid-cols-[84px_minmax(0,1fr)] py-5" : "grid-cols-[96px_minmax(0,1fr)] py-7 sm:grid-cols-[132px_minmax(0,1fr)] sm:gap-6",
        busy && "opacity-60"
      )}
    >
      <Link to={href} onClick={onNavigate} tabIndex={-1} aria-hidden="true">
        <ProductVisual product={product} compact className="aspect-[4/5] rounded-[12px]" />
      </Link>

      <div className="flex min-w-0 flex-col justify-between gap-3">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Link
              to={href}
              onClick={onNavigate}
              className="font-sans text-[12px] uppercase tracking-[0.16em] text-ink underline-offset-4 hover:underline md:text-[13px]"
            >
              {product.name}
            </Link>
            <p className="mt-1.5 font-sans text-[11px] leading-snug text-ink/62">
              {productKicker(product)}
            </p>
          </div>
          <p className="shrink-0 font-sans text-[13px] tabular-nums text-ink">
            {line.lineTotal != null ? (
              formatPrice(line.lineTotal)
            ) : (
              <span className="text-[11px] text-ink/62">{priceCopy.pending}</span>
            )}
          </p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <QuantityControl
            size="sm"
            value={line.quantity}
            label={product.name}
            disabled={busy || status === "loading"}
            onChange={(next) => (next < 1 ? remove(line.id) : update(line.id, next))}
          />
          <button
            type="button"
            onClick={() => remove(line.id)}
            disabled={busy}
            aria-label={cartCopy.removeLabel(product.name)}
            className="font-sans text-[10px] uppercase tracking-[0.18em] text-ink/62 underline-offset-4 transition-colors hover:text-ink hover:underline disabled:opacity-40"
          >
            {cartCopy.remove}
          </button>
        </div>
      </div>
    </li>
  );
}
