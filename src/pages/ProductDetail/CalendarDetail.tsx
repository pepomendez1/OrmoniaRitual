import { Link } from "react-router-dom";
import { packX4, productHref, type Product } from "@/data/products";
import { pdpCopy } from "@/data/pdpCopy";
import { brandButton } from "@/lib/brandButton";
import { BuyBox } from "./BuyBox";
import { buildInfoSections } from "./buildInfoSections";
import { InfoSections } from "./InfoSections";
import { CrossSell, PdpLayout, PdpSection } from "./PdpLayout";
import { ProductGallery } from "./ProductGallery";

/**
 * PDP del Calendario cíclico — ficha COMERCIAL.
 *
 * Prioriza media, título, precio, stock, cantidad y AGREGAR AL CARRITO. Qué
 * es y cómo acompaña el ritual se explica en la página editorial
 * (`/calendario`); acá solo se la señala.
 *
 * Qué incluye, cómo usar, materiales/medidas, galería y FAQ se renderizan
 * recién cuando existan en `calendarProduct`. Hoy están vacíos: no se
 * muestran títulos huecos ni lorem ipsum.
 */
export function CalendarDetail({ product }: { product: Product }) {
  const includes = product.includes ?? [];

  return (
    <PdpLayout
      breadcrumb={{ label: product.name, href: productHref(product) }}
      media={<ProductGallery product={product} />}
      buy={
        <BuyBox
          product={product}
          subtitle={product.tagline}
          footer={
            <div className="flex flex-col items-start gap-3">
              <p className="font-sans text-[12px] leading-relaxed text-ink/62">
                {pdpCopy.calendar.editorialNote}
              </p>
              <Link to="/calendario" className={brandButton({ variant: "quiet" })}>
                {pdpCopy.calendar.editorialCta}
              </Link>
            </div>
          }
        >
          <p className="font-sans text-[14px] leading-relaxed text-ink/72">{product.description}</p>
        </BuyBox>
      }
    >
      <PdpSection>
        <div className="max-w-[860px]">
          <InfoSections
            sections={buildInfoSections(product, {
              actives: false,
              extra: includes.length
                ? [
                    {
                      id: "includes",
                      title: pdpCopy.sections.includes,
                      content: (
                        <ul className="flex flex-col gap-2">
                          {includes.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      ),
                    },
                  ]
                : [],
            })}
          />
        </div>
      </PdpSection>

      <CrossSell title="Para acompañarlo" items={[packX4]} />
    </PdpLayout>
  );
}
