import { formatPrice } from "@/lib/price";
import { priceCopy } from "@/data/shopCopy";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

interface PriceTagProps {
  product: Product;
  className?: string;
  /** Clase para el estado sin precio (más tenue, sin tabular). */
  pendingClassName?: string;
}

/**
 * Precio de un producto con sus estados: precio, precio tachado (solo con
 * dato real), sin precio todavía, agotado o próximamente.
 */
export function PriceTag({ product, className, pendingClassName }: PriceTagProps) {
  if (product.comingSoon) {
    return <span className={cn(className, pendingClassName)}>{priceCopy.comingSoon}</span>;
  }
  if (product.price == null) {
    return <span className={cn(className, pendingClassName)}>{priceCopy.pending}</span>;
  }
  return (
    // Precio: ALT Systema Semibold (metadata destacada).
    <span className={cn("font-semibold tabular-nums", className)}>
      {product.compareAtPrice != null && product.compareAtPrice > product.price && (
        <s className="mr-2 opacity-55">{formatPrice(product.compareAtPrice)}</s>
      )}
      {formatPrice(product.price)}
      {product.available === false && (
        <span className="ml-2 uppercase tracking-[0.14em] opacity-70">· {priceCopy.soldOut}</span>
      )}
    </span>
  );
}
