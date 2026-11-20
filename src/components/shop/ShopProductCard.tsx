import { Link } from "react-router-dom";
import { isSerum, productHref, productKicker, serumDisplayName, type Product } from "@/data/products";
import { cn } from "@/lib/utils";
import { PriceTag } from "./PriceTag";
import { ProductVisual } from "./ProductVisual";
import { QuickAddButton } from "./QuickAddButton";

interface ShopProductCardProps {
  product: Product;
  /** Proporción de la imagen. Las cards de sérum son más verticales. */
  aspect?: string;
  className?: string;
  /** Texto bajo el nombre. Por defecto, la metadata del catálogo. */
  meta?: string;
  headingAs?: "h2" | "h3";
}

/**
 * Card de producto para Tienda, cross-sell y resultados.
 *
 * Mismo lenguaje que las cards de Los esenciales —esquinas grandes, tono por
 * producto, línea comercial nombre · hairline · precio, quick add circular—,
 * pero en grilla en vez de riel. El hover revela la fotografía editorial si
 * existe; en táctil la card queda en su estado de producto.
 */
export function ShopProductCard({
  product,
  aspect = "aspect-[4/5]",
  className,
  meta,
  headingAs: Heading = "h3",
}: ShopProductCardProps) {
  const href = productHref(product);

  return (
    <article className={cn("group relative", className)}>
      <Link to={href} className="block" data-cursor-expand>
        <ProductVisual
          product={product}
          withHover
          className={cn(aspect, "rounded-[18px] md:rounded-[22px]")}
        />
      </Link>

      <QuickAddButton
        product={product}
        className="absolute right-4 top-4 z-10 opacity-70 hover:!opacity-100 focus-visible:opacity-100 group-hover:opacity-100 md:right-5 md:top-5"
      />

      <Link to={href} className="mt-4 block md:mt-5">
        <div className="flex items-center gap-3">
          <Heading
            className={cn(
              "text-ink group-hover:underline group-hover:underline-offset-4",
              // Sérums: nombre en Cardone, como en el frasco. El resto, label funcional.
              isSerum(product)
                ? "font-editorial text-[1.35rem] leading-none md:text-[1.5rem]"
                : "font-sans text-[12px] uppercase tracking-[0.18em] md:text-[13px]"
            )}
          >
            {serumDisplayName(product)}
          </Heading>
          <span aria-hidden="true" className="h-px flex-1 bg-ink/16" />
          <PriceTag
            product={product}
            className="font-sans text-[12px] text-ink md:text-[13px]"
            pendingClassName="text-[10px] uppercase tracking-[0.14em] text-ink/62"
          />
        </div>
        <p className="mt-2 font-sans text-[11px] leading-[1.6] tracking-[0.04em] text-ink/62">
          {meta ?? productKicker(product)}
        </p>
      </Link>
    </article>
  );
}
