import * as React from "react";
import { cn } from "@/lib/utils";

interface PlaceholderBlockProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "role"> {
  /** Propósito del espacio reservado, ej. "Hero image placeholder". */
  label: string;
  /** Relación de aspecto CSS, ej. "3 / 4". Por defecto "3 / 4". */
  aspectRatio?: string;
}

/**
 * Bloque neutro y rotulado para marcar el lugar de una imagen/video futuro.
 * Fondo plano (beige/sand), borde discreto, sin degradés ni texturas.
 * El label claramente indica que es un placeholder, no influye en la dirección de arte.
 */
export function PlaceholderBlock({
  label,
  aspectRatio = "3 / 4",
  className,
  style,
  ...rest
}: PlaceholderBlockProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "flex w-full items-center justify-center bg-muted px-6",
        className
      )}
      style={{ aspectRatio, ...style }}
      {...rest}
    >
      <span className="select-none text-center font-sans text-[10px] uppercase tracking-editorial text-muted-foreground/80">
        {label}
      </span>
    </div>
  );
}
