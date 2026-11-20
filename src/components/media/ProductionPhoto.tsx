import type { CSSProperties } from "react";
import type { ProductionImage } from "@/data/productionMedia";
import { cn } from "@/lib/utils";

interface ProductionPhotoProps {
  image: ProductionImage;
  className?: string;
  /** Above the fold: `eager`. Todo lo demás carga al acercarse. */
  eager?: boolean;
}

/**
 * Foto de producción con recorte propio en mobile y en desktop (`md`).
 *
 * Los recortes se pasan como variables CSS para no generar una clase por
 * valor. Si la foto declara `mobileSrc`, el navegador baja solo la que usa.
 * Sin filtros: las fotos ya vienen editadas.
 */
export function ProductionPhoto({ image, className, eager = false }: ProductionPhotoProps) {
  const style = {
    "--op-m": image.objectPositionMobile ?? image.objectPosition,
    "--op-d": image.objectPosition,
  } as CSSProperties;

  const img = (
    <img
      src={image.src}
      alt={image.alt}
      aria-hidden={image.alt ? undefined : true}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      style={style}
      className={cn(
        "h-full w-full object-cover [object-position:var(--op-m)] md:[object-position:var(--op-d)]",
        className
      )}
    />
  );

  if (!image.mobileSrc) return img;
  return (
    <picture className="contents">
      <source media="(max-width: 767px)" srcSet={image.mobileSrc} />
      {img}
    </picture>
  );
}
