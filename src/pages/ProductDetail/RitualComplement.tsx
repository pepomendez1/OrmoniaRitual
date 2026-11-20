import { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarVisual } from "@/components/shop/CalendarVisual";
import { PriceTag } from "@/components/shop/PriceTag";
import { calendarProduct, isPurchasable, primaryMediaOf } from "@/data/products";
import { pdpCopy } from "@/data/pdpCopy";
import { useCart } from "@/hooks/useCart";
import { brandButton, eyebrowClass } from "@/lib/brandButton";

/**
 * "Completá el ritual" — el Calendario como único complemento del Pack.
 *
 * Pieza editorial/comercial integrada al recorrido, no un "productos
 * relacionados". Agrega el calendario con el mismo carrito que el resto
 * (quick add real, una sola variante) y abre el mini carrito sobre la PDP,
 * así la persona ve el subtotal actualizado sin salir de la página.
 *
 * Horizontal en desktop, apilado en mobile.
 */
export function RitualComplement() {
  const { add } = useCart();
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");
  const c = pdpCopy.complement;
  const product = calendarProduct;
  const media = primaryMediaOf(product);

  const onAdd = async () => {
    setState("busy");
    const ok = await add(product, 1);
    setState(ok ? "done" : "idle");
    if (ok) window.setTimeout(() => setState("idle"), 2400);
  };

  return (
    <section aria-labelledby="pdp-complement" className="border-t border-ink/12 bg-[#EAE1D1]">
      <div className="mx-auto grid w-full max-w-[1320px] items-center gap-10 px-6 py-16 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:px-10 md:py-20 lg:gap-16">
        <div className="overflow-hidden rounded-[22px]">
          {media ? (
            <img
              src={media.src}
              alt=""
              loading="lazy"
              style={{ objectPosition: media.objectPosition ?? "center" }}
              className="aspect-[5/4] w-full object-cover"
            />
          ) : (
            <CalendarVisual className="aspect-[5/4] w-full" showNote={false} />
          )}
        </div>

        <div className="text-ink">
          <p className={`${eyebrowClass} text-ink/62`}>{c.eyebrow}</p>
          <h2
            id="pdp-complement"
            className="mt-5 font-display text-[clamp(2rem,5.4vw,3rem)] leading-[1] tracking-[-0.035em]"
          >
            {c.title}
          </h2>
          <p className="mt-5 max-w-[420px] font-sans text-[14px] leading-relaxed text-ink/66">
            {c.body}
          </p>
          <PriceTag
            product={product}
            className="mt-6 block font-sans text-[18px] text-ink"
            pendingClassName="text-[12px] uppercase tracking-[0.16em] text-ink/66"
          />

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
            {isPurchasable(product) && (
              <button
                type="button"
                onClick={onAdd}
                aria-busy={state === "busy" || undefined}
                className={brandButton({ size: "lg" })}
              >
                {state === "done" ? c.added : c.add}
              </button>
            )}
            <Link to="/calendario" className={brandButton({ variant: "quiet" })}>
              {c.more}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
