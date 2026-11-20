import { cartCopy, FREE_SHIPPING_THRESHOLD } from "@/data/shopCopy";
import { formatPrice } from "@/lib/price";

/**
 * Progreso hacia el envío gratis. Usa el único dato de envío aprobado (el
 * umbral); el costo real lo calcula el checkout. Con productos sin precio el
 * subtotal es parcial, así que no se promete nada: solo se informa el umbral.
 */
export function FreeShippingNote({
  subtotal,
  partial,
}: {
  subtotal: number;
  partial: boolean;
}) {
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
  const ratio = Math.max(0, Math.min(1, subtotal / FREE_SHIPPING_THRESHOLD));

  const message = partial
    ? `Envío gratis en órdenes mayores a ${formatPrice(FREE_SHIPPING_THRESHOLD)}.`
    : remaining <= 0
      ? cartCopy.freeShippingReached
      : cartCopy.freeShippingRemaining(formatPrice(remaining));

  return (
    <div>
      <p className="font-sans text-[12px] leading-relaxed text-ink/72">{message}</p>
      {!partial && (
        <div aria-hidden="true" className="mt-2.5 h-px w-full bg-ink/14">
          <div
            className="h-full bg-ink/70 motion-safe:transition-[width] motion-safe:duration-500"
            style={{ width: `${ratio * 100}%` }}
          />
        </div>
      )}
    </div>
  );
}
