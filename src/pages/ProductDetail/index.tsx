import { useParams } from "react-router-dom";
import { Header, HEADER_CLEARANCE, PAGE_LEAD } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { NarrativeText } from "@/components/ui/NarrativeText";
import { CTAButton } from "@/components/ui/CTAButton";
import { getProductBySlug } from "@/data/products";
import { pdpCopy } from "@/data/pdpCopy";
import { usePageMeta } from "@/hooks/usePageMeta";
import { SerumDetail } from "./SerumDetail";
import { PackDetail } from "./PackDetail";
import { CalendarDetail } from "./CalendarDetail";

/**
 * /products/:slug — elige el template según la categoría del producto.
 *
 *   serum     → SerumDetail (CLARITY, BLOOM, RADIANCE, RESTORE)
 *   set       → PackDetail (El Ritual; id interno `pack-x4`)
 *   calendar  → CalendarDetail (Calendario cíclico)
 *   mist      → SerumDetail en estado "próximamente" (AURA)
 *
 * Un slug inexistente muestra un estado controlado, no rompe la página.
 */
const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;

  usePageMeta(
    product
      ? {
          title: product.name,
          description: product.metaDescription ?? product.description,
          image: product.imageSrc,
          noindex: product.comingSoon,
        }
      : { title: "Producto no encontrado", noindex: true }
  );

  if (!product) {
    return (
      <>
        <Header />
        <main id="main" tabIndex={-1} className={`${HEADER_CLEARANCE} outline-none`}>
          <SectionWrapper className={PAGE_LEAD}>
            <div className="flex flex-col gap-6">
              <EditorialHeading eyebrow={pdpCopy.notFound.eyebrow} size="xl" as="h1">
                {pdpCopy.notFound.title}
              </EditorialHeading>
              <NarrativeText tone="muted" measure="normal">
                {pdpCopy.notFound.body}
              </NarrativeText>
              <div>
                <CTAButton to="/products">{pdpCopy.notFound.cta}</CTAButton>
              </div>
            </div>
          </SectionWrapper>
        </main>
        <Footer />
      </>
    );
  }

  switch (product.category) {
    case "set":
      return <PackDetail key={product.slug} product={product} />;
    case "calendar":
      return <CalendarDetail key={product.slug} product={product} />;
    default:
      return <SerumDetail key={product.slug} product={product} />;
  }
};

export default ProductDetail;
