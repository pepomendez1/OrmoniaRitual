import { primaryMediaOf, toneOf, type Product } from "@/data/products";
import { CalendarVisual } from "./CalendarVisual";
import { cn } from "@/lib/utils";

interface ProductVisualProps {
  product: Product;
  className?: string;
  /** Revela `hoverImageSrc` al pasar el mouse sobre el `group` contenedor. */
  withHover?: boolean;
  /** Miniatura (carrito, buscador): sin notas ni sombras grandes. */
  compact?: boolean;
  eager?: boolean;
}

/**
 * Media principal de un producto, según lo que exista:
 * - sérum: packshot recortado (`contain`) sobre su tono;
 * - set: fotografía del estuche a sangre (`cover`);
 * - calendario sin foto: `CalendarVisual`.
 */
export function ProductVisual({
  product,
  className,
  withHover = false,
  compact = false,
  eager = false,
}: ProductVisualProps) {
  const media = primaryMediaOf(product);
  const hover = withHover ? product.hoverImageSrc : undefined;

  if (!media && product.category === "calendar") {
    return <CalendarVisual className={className} compact={compact} />;
  }

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ backgroundColor: toneOf(product) }}
    >
      {media && (
        <img
          src={media.src}
          alt={media.alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          style={{ objectPosition: media.objectPosition ?? "center" }}
          className={cn(
            "absolute inset-0 h-full w-full",
            media.fit === "contain"
              ? cn(
                  "object-contain",
                  compact
                    ? "p-[10%]"
                    : "p-[13%] drop-shadow-[0_18px_26px_rgba(52,33,21,0.16)]"
                )
              : "object-cover",
            hover &&
              media.fit === "cover" &&
              "motion-safe:transition-opacity motion-safe:duration-650 motion-safe:ease-out [@media(hover:hover)]:group-hover:opacity-0"
          )}
        />
      )}
      {!media && (
        <span className="absolute inset-0 flex items-center justify-center font-display text-xl tracking-[0.12em] text-ink/50">
          {product.name}
        </span>
      )}
      {hover && (
        <img
          src={hover}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          style={{ objectPosition: product.hoverObjectPosition ?? "center" }}
          className="absolute inset-0 h-full w-full object-cover opacity-0 motion-safe:transition-opacity motion-safe:duration-520 motion-safe:ease-out [@media(hover:hover)]:group-hover:opacity-100"
        />
      )}
    </div>
  );
}
