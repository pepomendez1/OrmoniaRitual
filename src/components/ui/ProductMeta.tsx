import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";
import { PhaseMarker } from "./PhaseMarker";

interface ProductMetaProps {
  product: Product;
  className?: string;
}

/**
 * Metadatos editoriales del producto: marcador de fase, tagline y conteo
 * de ingredientes (o nota de "en desarrollo" para AURA).
 */
export function ProductMeta({ product, className }: ProductMetaProps) {
  const count = product.ingredients.length;
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {product.phase ? (
        <PhaseMarker phase={product.phase} />
      ) : (
        <span className="font-sans text-[10px] uppercase tracking-editorial text-muted-foreground">
          Niebla de cierre
        </span>
      )}
      <p className="font-sans text-sm text-muted-foreground">
        {product.tagline}
      </p>
      <p className="font-sans text-[11px] uppercase tracking-wide text-muted-foreground">
        {count > 0 ? `${count} activos` : "Fórmula en desarrollo"}
      </p>
    </div>
  );
}
