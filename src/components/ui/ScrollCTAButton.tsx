import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getLenis } from "@/lib/lenis";

type ScrollCTAButtonTone = "light" | "dark";

export interface ScrollCTAButtonProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  /** Selector/anchor del elemento destino, p. ej. "#ritmo". */
  href: string;
  /** "dark" (sobre fondos claros, igual a CTAButton) | "light" (sobre imagen). */
  tone?: ScrollCTAButtonTone;
  /** Acepta atributos data-* arbitrarios (p. ej. data-cursor-expand). */
  [key: `data-${string}`]: string | number | boolean | undefined;
}

/**
 * CTA editorial de scroll interno. Mismo lenguaje visual que CTAButton
 * (línea de base + subrayado animado que crece en hover) pero envuelve un
 * `<a href>` en vez de un `<Link>`, así no navega de ruta: hace scroll suave
 * dentro de la misma página vía Lenis, con fallback a `scrollIntoView` si
 * Lenis no está activo (reduced motion / aún no montado). Accessible por
 * teclado al ser un `<a>` real, y hereda el foco visible global.
 */
export function ScrollCTAButton({
  href,
  tone = "dark",
  className,
  onClick,
  children,
  ...rest
}: ScrollCTAButtonProps) {
  const isLight = tone === "light";

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    e.preventDefault();

    const el = document.querySelector(href) as HTMLElement | null;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    try {
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(el, { offset: 0, duration: 1.2 });
        return;
      }
    } catch {
      // Lenis no disponible o destruido → fallback nativo.
    }

    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <Button
      asChild
      variant="editorial"
      className={cn(isLight ? "text-ivory" : "text-foreground", className)}
    >
      <a href={href} {...rest} onClick={handleClick}>
        <span className="relative inline-block pb-1.5">
          {children}
          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-x-0 bottom-0 h-px",
              isLight ? "bg-ivory/40" : "bg-border"
            )}
          />
          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-x-0 bottom-0 h-px w-0 transition-all duration-500 ease-out group-hover:w-full",
              isLight ? "bg-ivory" : "bg-foreground"
            )}
          />
        </span>
      </a>
    </Button>
  );
}
