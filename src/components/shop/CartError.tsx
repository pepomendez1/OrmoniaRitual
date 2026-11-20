import { X } from "lucide-react";
import { cartCopy } from "@/data/shopCopy";
import { useCart } from "@/hooks/useCart";

/** Aviso de error del carrito: sobrio, cerrable, anunciado a lectores de pantalla. */
export function CartError() {
  const { error, clearError } = useCart();
  if (!error) return null;
  return (
    <div
      role="alert"
      className="flex items-start justify-between gap-4 rounded-[12px] border border-terracotta/40 bg-terracotta/[0.06] px-4 py-3 font-sans text-[12px] leading-relaxed text-ink"
    >
      <span>{error}</span>
      <button
        type="button"
        onClick={clearError}
        aria-label={cartCopy.dismissError}
        className="shrink-0 text-ink/62 hover:text-ink"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
