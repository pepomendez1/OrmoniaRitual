import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { RAIL_ITEM_ATTR } from "@/hooks/useHorizontalRail";
import { formatPrice } from "@/lib/price";
import { type CyclePhase, type Product } from "@/data/products";

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
 * El proyecto todavía no tiene carrito, así que el control no simula ninguna
 * compra: navega al PDP, que es el único destino real disponible hoy. Su
 * etiqueta accesible dice lo que realmente hace. Cuando exista el carrito,
 * este `Link` pasa a ser un `<button>` con `aria-label="Agregar X al carrito"`
 * y el resto de la card no cambia.
 *
 * HOVER
 * El material de campaña no existe todavía: el hover revela un placeholder
 * limpio que marca dónde irá. Al reemplazarlo por un `<video muted loop
 * playsInline>` o por la segunda fotografía, el resto de la card, el riel y la
 * sección quedan igual. Solo se activa en punteros con hover real, así que en
 * táctil la card se queda en su estado de producto. Durante el hover el
 * quick-add sigue por encima y el nombre y el precio nunca se tapan: viven
 * fuera del recuadro.
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
      className="group relative w-[76vw] flex-none snap-start md:w-[42vw] lg:w-[34vw] xl:w-[27vw] xl:max-w-[430px]"
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

          {/* Placeholder del material de campaña futuro. */}
          <div className="absolute inset-0 flex items-center justify-center bg-ivory px-6 opacity-0 motion-safe:transition-opacity motion-safe:duration-[520ms] motion-safe:ease-out [@media(hover:hover)]:group-hover:opacity-100">
            <p className="text-center font-sans text-[10px] uppercase leading-[1.9] tracking-[0.22em] text-ink/70">
              Insertar video
              <br />
              Modelo + {product.name}
            </p>
          </div>
        </div>

        {/* Línea comercial: nombre — hairline — precio. */}
        <div className="mt-5 flex items-center gap-3">
          <h3 className="font-sans text-[12px] uppercase tracking-[0.18em] text-ink md:text-[13px]">
            {product.name}
          </h3>
          <span aria-hidden="true" className="h-px flex-1 bg-ink/16" />
          {typeof product.price === "number" && (
            <span className="font-sans text-[12px] tabular-nums text-ink md:text-[13px]">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {actives && (
          <p className="mt-2 font-sans text-[10px] leading-[1.6] tracking-[0.06em] text-ink/62 md:text-[11px]">
            {actives}
          </p>
        )}
      </Link>

      <Link
        to={`/products/${product.slug}`}
        aria-label={`Comprar ${product.name}`}
        className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-ink/12 bg-ivory/55 text-ink opacity-60 backdrop-blur-sm transition-[opacity,background-color,border-color,transform] duration-[380ms] ease-out hover:!opacity-100 focus-visible:opacity-100 group-hover:scale-[1.04] group-hover:border-ink/20 group-hover:bg-ivory/90 group-hover:opacity-100 md:right-6 md:top-6 md:h-12 md:w-12"
      >
        <ShoppingBag className="h-[18px] w-[18px]" aria-hidden="true" />
      </Link>
    </article>
  );
}
