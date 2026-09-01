import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

/**
 * CTA editorial construido sobre la variante "editorial" de Button.
 * Línea de base + subrayado animado (crece de izquierda a derecha en hover),
 * sin pill ni sombra. Renderiza un Link de react-router vía asChild.
 */
export function CTAButton({ to, children, className, disabled }: CTAButtonProps) {
  return (
    <Button
      asChild
      variant="editorial"
      className={cn(disabled && "pointer-events-none opacity-50", className)}
    >
      <Link
        to={to}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        onClick={(e) => {
          if (disabled) e.preventDefault();
        }}
      >
        <span className="relative inline-block pb-1.5">
          {children}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-px bg-border"
          />
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-px w-0 bg-foreground transition-all duration-500 ease-out group-hover:w-full"
          />
        </span>
      </Link>
    </Button>
  );
}
