import { Link } from "react-router-dom";
import { RAIL_ITEM_ATTR } from "@/hooks/useHorizontalRail";
import { formatPrice } from "@/lib/price";
import { QuickAddButton } from "@/components/shop/QuickAddButton";
import { serumDisplayName, type CyclePhase, type Product } from "@/data/products";

/**
 * Tono de fondo por producto.
 *
 * Diferencian sin salirse de una misma familia clara: cuatro variaciones de
 * temperatura sobre el mismo campo, no cuatro mundos. El color nunca es el
 * único indicador —cada card lleva su fase escrita— y se mantiene suave para
 * que el producto domine.
 */
const phaseTone: Record<CyclePhase, string> = {
  Menstrual: "#DCC9C2",
  Follicular: "#D6DBC6",
  Ovulatory: "#DCD6B4",
  Luteal: "#D6C6B4",
};

/** Para productos sin fase asignada (AURA y futuros lanzamientos). */
const NEUTRAL_TONE = "#DED6C7";

interface ProductRailCardProps {
  product: Product;
}

/**
 * Tarjeta de producto del riel de shopping.
 *
 * Jerarquía: el producto manda. El nombre y el precio forman una línea
 * comercial unida por un hairline flexible, y debajo van los activos del
 * serum como dato informativo de menor peso. La fase no aparece: informa en El
 * Ciclo, pero acá no debe leerse como condición de compra.
 *
 * QUICK ADD
 * `QuickAddButton` agrega el sérum al carrito frontend (una única variante) y
 * abre el mini carrito. Si el producto no se pudiera comprar desde acá, el
 * mismo control pasa a ser un link a la PDP.
 *
 * HOVER
 * Si el producto declara `hoverImageSrc`, el hover revela esa fotografía; si
 * no, un placeholder limpio que marca dónde irá el material de campaña. Al reemplazarlo por un `<video muted loop
 * playsInline>` o por la segunda fotografía, el resto de la card, el riel y la
 * sección quedan igual. Solo se activa en punteros con hover real, así que en
 * táctil la card se queda en su estado de producto. Durante el hover el
 * quick-add sigue por encima y el nombre y el precio nunca se tapan: viven
 * fuera del recuadro.
 *
 * ANCHO
 * Hasta `lg` la tarjeta es una fracción del viewport. Desde `xl` la resuelve el
 * riel con `--rail-card`, que la calcula a partir del espacio visible para que
 * el asomo de la última tarjeta sea siempre el mismo. El fallback mantiene el
 * valor anterior si la tarjeta se reutilizara fuera del riel.
 *
 * Preparada para sumar reviews y badges debajo de la línea comercial cuando
 * existan datos reales.
 */
export function ProductRailCard({ product }: ProductRailCardProps) {
  const phase = product.phase;
  const tone = phase ? phaseTone[phase] : NEUTRAL_TONE;

  // Activos comunicables del producto, tal como están en `data/products.ts`.
  const actives = product.ingredients.join(" · ");

  return (
    <article
      {...{ [RAIL_ITEM_ATTR]: true }}
      className="group relative w-[76vw] flex-none snap-start md:w-[42vw] lg:w-[34vw] xl:w-[var(--rail-card,27vw)]"
    >
      <Link to={`/products/${product.slug}`} className="block">
        <div
          data-cursor-expand
          className="relative aspect-[3/4] overflow-hidden rounded-[18px] md:rounded-[24px]"
          style={{ backgroundColor: tone }}
        >
          {product.imageSrc && (
            <img
              src={product.imageSrc}
              alt={product.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-contain p-[13%] drop-shadow-[0_18px_26px_rgba(52,33,21,0.16)]"
            />
          )}

          {/*
            Estado de hover. Si el producto ya tiene fotografía editorial, se
            revela esa; si no, queda el placeholder que marca dónde irá. La
            transición es la misma en ambos casos.
          */}
          {product.hoverImageSrc ? (
            <img
              src={product.hoverImageSrc}
              alt=""
              aria-hidden="true"
              loading="lazy"
              style={{ objectPosition: product.hoverObjectPosition ?? "center" }}
              className="absolute inset-0 h-full w-full object-cover opacity-0 motion-safe:transition-opacity motion-safe:duration-520 motion-safe:ease-out [@media(hover:hover)]:group-hover:opacity-100"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-ivory px-6 opacity-0 motion-safe:transition-opacity motion-safe:duration-520 motion-safe:ease-out [@media(hover:hover)]:group-hover:opacity-100">
              <p className="text-center font-sans text-[10px] uppercase leading-[1.9] tracking-[0.22em] text-ink/70">
                Insertar video
                <br />
                Modelo + {product.name}
              </p>
            </div>
          )}
        </div>

        {/* Línea comercial: nombre — hairline — precio. */}
        <div className="mt-5 flex items-center gap-3">
          {/* Nombre del sérum en Cardone, como en el frasco. */}
          <h3 className="font-editorial text-[1.4rem] leading-none text-ink md:text-[1.55rem]">
            {serumDisplayName(product)}
          </h3>
          <span aria-hidden="true" className="h-px flex-1 bg-ink/16" />
          {typeof product.price === "number" && (
            <span className="font-sans text-[12px] font-semibold tabular-nums text-ink md:text-[13px]">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {actives && (
          <p className="mt-2 font-accent text-[11px] leading-[1.6] tracking-[0.02em] text-ink/66 md:text-[12px]">
            {actives}
          </p>
        )}
      </Link>

      <QuickAddButton
        product={product}
        className="absolute right-5 top-5 z-10 opacity-60 hover:!opacity-100 focus-visible:opacity-100 group-hover:scale-[1.04] group-hover:border-ink/20 group-hover:bg-ivory/90 group-hover:opacity-100 md:right-6 md:top-6"
      />
    </article>
  );
}
