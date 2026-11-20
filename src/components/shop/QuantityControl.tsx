import { Minus, Plus } from "lucide-react";
import { MAX_LINE_QUANTITY } from "@/commerce/types";
import { cartCopy } from "@/data/shopCopy";
import { cn } from "@/lib/utils";

interface QuantityControlProps {
  value: number;
  onChange: (value: number) => void;
  /** Nombre del producto, para las etiquetas accesibles de los botones. */
  label: string;
  min?: number;
  max?: number;
  disabled?: boolean;
  size?: "sm" | "md";
  className?: string;
}

/**
 * Selector de cantidad −/+. Botones reales con etiqueta propia; el número se
 * anuncia en vivo para lectores de pantalla. Sin input libre: evita estados
 * inválidos y en mobile no abre el teclado.
 */
export function QuantityControl({
  value,
  onChange,
  label,
  min = 1,
  max = MAX_LINE_QUANTITY,
  disabled,
  size = "md",
  className,
}: QuantityControlProps) {
  const button =
    "flex h-full items-center justify-center text-ink/70 transition-colors duration-300 hover:text-ink disabled:pointer-events-none disabled:opacity-30";
  const box = size === "sm" ? "h-9 w-9" : "h-[48px] w-11 md:h-[50px]";

  return (
    <div
      role="group"
      aria-label={`${cartCopy.quantity}: ${label}`}
      className={cn(
        "inline-flex items-center rounded-[12px] border border-ink/20",
        disabled && "opacity-60",
        className
      )}
    >
      <button
        type="button"
        className={cn(button, box)}
        onClick={() => onChange(value - 1)}
        disabled={disabled || value <= min}
        aria-label={cartCopy.decrease(label)}
      >
        <Minus className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
      <span
        aria-live="polite"
        className={cn(
          "min-w-[2ch] text-center font-sans tabular-nums text-ink",
          size === "sm" ? "text-[13px]" : "text-[14px]"
        )}
      >
        {value}
      </span>
      <button
        type="button"
        className={cn(button, box)}
        onClick={() => onChange(value + 1)}
        disabled={disabled || value >= max}
        aria-label={cartCopy.increase(label)}
      >
        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}
