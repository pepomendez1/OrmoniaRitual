import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getLenis } from "@/lib/lenis";

type ScrollCTAButtonTone = "light" | "dark";
type ScrollCTAButtonShape = "underline" | "outline";

export interface ScrollCTAButtonProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  /** Selector/anchor del elemento destino, p. ej. "#pack-x4". */
  href: string;
  /** "dark" (sobre fondos claros, igual a CTAButton) | "light" (sobre imagen). */
  tone?: ScrollCTAButtonTone;
  /**
   * "underline" — CTA editorial de línea, para dentro del cuerpo de la página.
   * "outline" — marco fino y fondo transparente, solo texto, para cuando el
   * CTA es protagonista sobre fotografía a pantalla completa: tiene presencia
   * sin pesar como una cápsula sólida ni competir con el headline. Sin ícono
   * ni símbolo: la única señal interactiva extra es el cursor circular, que
   * se activa con `data-cursor-expand` desde el consumidor.
   */
  shape?: ScrollCTAButtonShape;
  /**
   * Desplazamiento extra al llegar al destino. Negativo = frena antes, para
   * dejar aire bajo el header sticky. El fallback nativo usa `scroll-mt-*`.
   */
  offset?: number;
  /** Acepta atributos data-* arbitrarios (p. ej. data-cursor-expand). */
  [key: `data-${string}`]: string | number | boolean | undefined;
}

/**
 * CTA de scroll interno. No navega de ruta: hace scroll suave dentro de la
 * misma página vía Lenis, con fallback a `scrollIntoView` si Lenis no está
 * activo (reduced motion / aún no montado). Accesible por teclado al ser un
 * `<a>` real, y hereda el foco visible global.
 *
 * `shape` decide el lenguaje visual: línea editorial o botón pill.
 */
export function ScrollCTAButton({
  href,
  tone = "dark",
  shape = "underline",
  offset = -88,
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
        lenis.scrollTo(el, { offset, duration: 1.4 });
        return;
      }
    } catch {
      // Lenis no disponible o destruido → fallback nativo.
    }

    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  };

  if (shape === "outline") {
    return (
      <a
        href={href}
        {...rest}
        onClick={handleClick}
        className={cn(
          "inline-flex h-[48px] items-center justify-center rounded-[12px] border bg-transparent px-7 font-sans text-[11px] uppercase tracking-[0.18em] transition-[background-color,border-color,color] duration-500 ease-out md:h-[52px] md:px-9 md:text-[12px]",
          isLight
            ? "border-ivory/65 text-ivory hover:border-ivory hover:bg-ivory hover:text-ink"
            : "border-ink/45 text-ink hover:border-ink hover:bg-ink hover:text-ivory",
          className
        )}
      >
        {children}
      </a>
    );
  }

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
