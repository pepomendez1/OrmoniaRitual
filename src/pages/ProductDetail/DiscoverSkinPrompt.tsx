import { Link } from "react-router-dom";
import { pdpCopy } from "@/data/pdpCopy";
import { productionMedia } from "@/data/productionMedia";
import { ProductionPhoto } from "@/components/media/ProductionPhoto";
import { brandButton, eyebrowClass } from "@/lib/brandButton";

/**
 * Entrada al Test de perfil de piel desde una PDP.
 *
 * - `pack`: bloque propio dentro del recorrido del ritual, con la foto de
 *   piel del shooting a un lado.
 * - `serum`: franja discreta debajo de la información del producto; botón
 *   secundario para no competir con AGREGAR AL CARRITO.
 *
 * El test no es requisito para comprar ni devuelve una prescripción: el copy
 * solo invita a entender cómo responde la piel.
 */
export function DiscoverSkinPrompt({ variant }: { variant: "pack" | "serum" }) {
  const c = pdpCopy.discoverSkin[variant];
  const href = pdpCopy.discoverSkin.href;

  if (variant === "serum") {
    return (
      <section aria-labelledby="pdp-discover" className="border-t border-ink/12">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-6 px-6 py-14 md:flex-row md:items-end md:justify-between md:gap-12 md:px-10 md:py-16">
          <div className="max-w-[520px]">
            <p className={`${eyebrowClass} text-ink/62`}>{c.eyebrow}</p>
            <h2
              id="pdp-discover"
              className="mt-4 font-display text-[clamp(1.6rem,4.2vw,2.1rem)] leading-[1.08] tracking-[-0.03em] text-ink"
            >
              {c.title}
            </h2>
            <p className="mt-3 font-sans text-[13px] leading-relaxed text-ink/64 md:text-[14px]">
              {c.body}
            </p>
          </div>
          <Link to={href} className={`shrink-0 ${brandButton({ variant: "secondary" })}`}>
            {c.cta}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="pdp-discover" className="border-t border-ink/12">
      <div className="mx-auto grid w-full max-w-[1320px] items-center gap-10 px-6 py-16 md:grid-cols-2 md:px-10 md:py-24 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] md:order-2">
          {/* La misma fotografía de producción que el bloque del Test en Home. */}
          <ProductionPhoto image={productionMedia.skinProfile.home} className="absolute inset-0" />
        </div>
        <div className="text-ink md:order-1">
          <p className={`${eyebrowClass} text-ink/62`}>{c.eyebrow}</p>
          <h2
            id="pdp-discover"
            className="mt-5 font-display text-[clamp(2rem,5.4vw,3rem)] leading-[1] tracking-[-0.035em]"
          >
            {c.title}
          </h2>
          <p className="mt-5 max-w-[400px] font-sans text-[14px] leading-relaxed text-ink/66">
            {c.body}
          </p>
          <Link to={href} className={`mt-8 ${brandButton({ size: "lg" })}`}>
            {c.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
