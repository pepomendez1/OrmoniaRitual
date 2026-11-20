import { useState, type ReactNode } from "react";
import { PriceTag } from "@/components/shop/PriceTag";
import { QuantityControl } from "@/components/shop/QuantityControl";
import { isPurchasable, isSerum, productKicker, serumDisplayName, type Product } from "@/data/products";
import { pdpCopy } from "@/data/pdpCopy";
import { useCart } from "@/hooks/useCart";
import { brandButton } from "@/lib/brandButton";

interface BuyBoxProps {
  product: Product;
  /** Reemplaza la metadata del catálogo (p. ej. "El ritual completo"). */
  eyebrow?: string;
  /** Reemplaza el nombre como titular (h1). Por defecto, `product.name`. */
  title?: ReactNode;
  /** Bajada en cuerpo de texto, entre el titular y el precio. */
  lead?: string;
  /** Subtítulo editorial bajo el nombre (p. ej. "Las 4 fases, un solo ritual."). */
  subtitle?: string;
  /** Contenido entre el precio y la compra: activos, qué incluye… */
  children?: ReactNode;
  /** Pie: metadata secundaria (fase, links editoriales). */
  footer?: ReactNode;
}

/**
 * Bloque de compra, above the fold en todas las PDP.
 *
 * Orden: metadata → nombre → subtítulo → precio → disponibilidad →
 * (contenido propio del template) → cantidad + AGREGAR AL CARRITO.
 *
 * Sin precio definido no se puede comprar (`isPurchasable`): el botón queda
 * deshabilitado y lo dice. Sin dato de stock no se afirma nada: "Stock a
 * confirmar".
 */
export function BuyBox({
  product,
  eyebrow,
  title,
  lead,
  subtitle,
  children,
  footer,
}: BuyBoxProps) {
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [state, setState] = useState<"idle" | "busy">("idle");
  const purchasable = isPurchasable(product);

  const onAdd = async () => {
    setState("busy");
    const ok = await add(product, quantity);
    setState("idle");
    if (ok) setQuantity(1);
  };

  const availability =
    product.comingSoon
      ? pdpCopy.availability.comingSoon
      : product.available === false
        ? pdpCopy.availability.soldOut
        : product.available === true
          ? pdpCopy.availability.available
          : pdpCopy.availability.unknown;

  return (
    <div className="flex flex-col text-ink">
      <p className="font-sans text-[10px] uppercase tracking-[0.26em] text-ink/62 md:text-[11px]">
        {eyebrow ?? productKicker(product)}
      </p>
      {/* Sérums: el nombre en Cardone, como en el frasco. Pack y Calendario siguen en la serif de titulares. */}
      <h1
        className={
          !title && isSerum(product)
            ? "mt-5 font-editorial text-[clamp(3rem,9vw,4.1rem)] leading-[0.95] lg:text-[clamp(3.4rem,4.8vw,5rem)]"
            : "mt-5 font-display text-[clamp(2.6rem,8vw,3.6rem)] leading-[0.98] tracking-[-0.04em] lg:text-[clamp(3rem,4.2vw,4.4rem)]"
        }
      >
        {title ?? serumDisplayName(product)}
      </h1>
      {subtitle && (
        <p className="mt-4 font-display text-[1.25rem] italic leading-[1.2] tracking-[-0.02em] text-ink/80 md:text-[1.4rem]">
          {subtitle}
        </p>
      )}

      {lead && (
        <p className="mt-5 max-w-[440px] font-sans text-[14px] leading-relaxed text-ink/72 md:text-[15px]">
          {lead}
        </p>
      )}

      <div className="mt-7 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-ink/14 pt-5">
        <PriceTag
          product={product}
          className="font-sans text-[18px] text-ink md:text-[20px]"
          pendingClassName="text-[13px] uppercase tracking-[0.16em] text-ink/70"
        />
        <span className="flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.16em] text-ink/62">
          <span
            aria-hidden="true"
            className={
              product.available === false || product.comingSoon
                ? "h-1.5 w-1.5 rounded-full bg-ink/30"
                : "h-1.5 w-1.5 rounded-full bg-olive"
            }
          />
          {availability}
        </span>
      </div>

      {children && <div className="mt-7">{children}</div>}

      {purchasable ? (
        <div className="mt-8 flex flex-wrap items-stretch gap-3">
          <QuantityControl value={quantity} onChange={setQuantity} label={product.name} />
          <button
            type="button"
            onClick={onAdd}
            aria-busy={state === "busy" || undefined}
            className={`${brandButton({ size: "lg" })} min-w-[220px] flex-1`}
          >
            {state === "busy" ? pdpCopy.adding : pdpCopy.addToCart}
          </button>
        </div>
      ) : (
        <button type="button" disabled className={`mt-8 ${brandButton({ size: "lg", block: true })}`}>
          {product.comingSoon
            ? pdpCopy.availability.comingSoon
            : product.available === false
              ? pdpCopy.availability.soldOut
              : pdpCopy.priceUnavailable}
        </button>
      )}

      <p className="mt-4 font-sans text-[11px] leading-relaxed text-ink/62">{pdpCopy.shippingLine}</p>

      {footer && <div className="mt-7 border-t border-ink/14 pt-5">{footer}</div>}
    </div>
  );
}
