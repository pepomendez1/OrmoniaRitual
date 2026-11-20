import { useState } from "react";
import { primaryMediaOf, toneOf, type Product, type ProductMedia } from "@/data/products";
import { ProductVisual } from "@/components/shop/ProductVisual";
import { cn } from "@/lib/utils";

/**
 * Galería de PDP.
 *
 * La primera pieza es la media principal del producto (packshot sobre su
 * tono, foto del estuche o el visual provisional del calendario); después,
 * `product.gallery`. Miniaturas como botones reales (con su `aria-current`),
 * sin carrusel automático. En mobile las miniaturas pasan a un riel con swipe.
 */
export function ProductGallery({ product }: { product: Product }) {
  const primary = primaryMediaOf(product);
  const items: Array<ProductMedia | null> = [primary, ...(product.gallery ?? [])];
  const [index, setIndex] = useState(0);
  const active = items[index] ?? null;

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] md:rounded-[24px]">
        {index === 0 || !active ? (
          <ProductVisual product={product} eager className="absolute inset-0 h-full w-full" />
        ) : (
          <div className="absolute inset-0" style={{ backgroundColor: toneOf(product) }}>
            <img
              key={active.src}
              src={active.src}
              alt={active.alt}
              decoding="async"
              style={{ objectPosition: active.objectPosition ?? "center" }}
              className={cn(
                "absolute inset-0 h-full w-full motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-500",
                active.fit === "contain" ? "object-contain p-[13%]" : "object-cover"
              )}
            />
          </div>
        )}
      </div>

      {items.length > 1 && (
        <ul
          aria-label="Imágenes del producto"
          className="flex gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, i) => (
            <li key={item?.src ?? `primary-${i}`} className="shrink-0">
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ver imagen ${i + 1} de ${items.length}`}
                aria-current={i === index ? "true" : undefined}
                className={cn(
                  "relative block h-[88px] w-[72px] overflow-hidden rounded-[12px] border transition-[border-color,opacity] duration-300 md:h-[104px] md:w-[84px]",
                  i === index ? "border-ink/70" : "border-transparent opacity-75 hover:opacity-100"
                )}
              >
                {i === 0 || !item ? (
                  <ProductVisual product={product} compact className="absolute inset-0 h-full w-full" />
                ) : (
                  <img
                    src={item.src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
