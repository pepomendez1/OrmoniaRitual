import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { isPurchasable, productHref, type Product } from "@/data/products";
import { shopCopy } from "@/data/shopCopy";
import { cn } from "@/lib/utils";

interface QuickAddButtonProps {
  product: Product;
  className?: string;
}

/**
 * Quick add circular.
 *
 * Hoy todos los productos tienen una única variante, así que agrega directo
 * y abre el mini carrito. Si un producto no se puede comprar desde acá
 * (próximamente, agotado, o en el futuro con variantes a elegir), el control
 * pasa a ser un link a su PDP, con una etiqueta que dice eso.
 */
export function QuickAddButton({ product, className }: QuickAddButtonProps) {
  const { add } = useCart();
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");

  const base = cn(
    "flex h-11 w-11 items-center justify-center rounded-full border border-ink/12 bg-ivory/60 text-ink backdrop-blur-sm transition-[opacity,background-color,border-color,transform] duration-380 ease-out hover:border-ink/25 hover:bg-ivory md:h-12 md:w-12",
    className
  );

  if (!isPurchasable(product)) {
    return (
      <Link to={productHref(product)} aria-label={`Ver ${product.name}`} className={base}>
        <ShoppingBag className="h-[18px] w-[18px]" aria-hidden="true" />
      </Link>
    );
  }

  const onClick = async () => {
    if (state === "busy") return;
    setState("busy");
    const ok = await add(product, 1);
    setState(ok ? "done" : "idle");
    if (ok) window.setTimeout(() => setState("idle"), 1600);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={shopCopy.quickAdd(product.name)}
      aria-busy={state === "busy" || undefined}
      className={base}
    >
      {state === "done" ? (
        <Check className="h-[18px] w-[18px]" aria-hidden="true" />
      ) : (
        <ShoppingBag className="h-[18px] w-[18px]" aria-hidden="true" />
      )}
    </button>
  );
}
