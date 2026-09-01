import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";
import { PlaceholderBlock } from "./PlaceholderBlock";

interface ProductDisplayProps {
  product: Product;
  className?: string;
  aspectRatio?: string;
}

/**
 * Imagen editorial de producto. Si hay asset real, ocupa el cuadrado de la
 * colección; PlaceholderBlock queda únicamente como fallback.
 */
export function ProductDisplay({ product, className, aspectRatio }: ProductDisplayProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {product.imageSrc ? (
        <div
          className="relative overflow-hidden bg-[#d8c9b5]"
          style={{ aspectRatio: aspectRatio ?? "1 / 1" }}
        >
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-[#342115]/[0.025]" />
          <img
            src={product.imageSrc}
            alt={`${product.name}${product.phase ? ` — fase ${product.phase}` : ""}`}
            className="h-full w-full object-contain p-[7%] transition-transform duration-700 ease-out group-hover:scale-[1.035]"
            loading="lazy"
          />
        </div>
      ) : (
        <PlaceholderBlock label={`Product image placeholder — ${product.name}`} aspectRatio={aspectRatio ?? "1 / 1"} />
      )}
      <div className="flex flex-col gap-1">
        <span className="font-display text-xl text-foreground">{product.name}</span>
        {product.comingSoon && (
          <span className="font-sans text-[11px] uppercase tracking-editorial text-accent">Próximamente</span>
        )}
      </div>
    </div>
  );
}
