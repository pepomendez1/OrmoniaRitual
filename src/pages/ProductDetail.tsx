import { Link, useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { NarrativeText } from "@/components/ui/NarrativeText";
import { ProductDisplay } from "@/components/ui/ProductDisplay";
import { ProductMeta } from "@/components/ui/ProductMeta";
import { IngredientList } from "@/components/ui/IngredientList";
import { CTAButton } from "@/components/ui/CTAButton";
import { getProductBySlug, products } from "@/data/products";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;

  // Slug inválido: estado controlado, no rompe la página.
  if (!product) {
    return (
      <>
        <Header />
        <main id="main" tabIndex={-1} className="pt-28 outline-none md:pt-36">
          <SectionWrapper>
            <div className="flex flex-col gap-6">
              <EditorialHeading eyebrow="404" size="xl" as="h1">
                Este serum todavía no florece.
              </EditorialHeading>
              <NarrativeText tone="muted" measure="normal">
                No encontramos un serum con esa dirección.
              </NarrativeText>
              <div>
                <CTAButton to="/products">Ver todos los serums</CTAButton>
              </div>
            </div>
          </SectionWrapper>
        </main>
        <Footer />
      </>
    );
  }

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="pt-28 outline-none md:pt-36">
        <SectionWrapper>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            <ProductDisplay product={product} aspectRatio="4 / 5" />
            <div className="flex flex-col gap-6">
              <ProductMeta product={product} />
              <EditorialHeading as="h1" size="xl">
                {product.name}
              </EditorialHeading>
              <NarrativeText size="lg" tone="muted" measure="normal">
                {product.description}
              </NarrativeText>
              <div>
                <p className="mb-3 font-sans text-[11px] uppercase tracking-editorial text-foreground">
                  {product.comingSoon ? "Estado" : "Ingredientes"}
                </p>
                <IngredientList ingredients={product.ingredients} />
              </div>
              {/* CTA deshabilitado/placeholder — sin lógica de carrito en Sprint 00. */}
              <div className="mt-2">
                <CTAButton to="/products" disabled>
                  {product.comingSoon ? "Próximamente" : "Añadir al ritual"}
                </CTAButton>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {related.length > 0 && (
          <SectionWrapper>
            <div className="flex flex-col gap-10">
              <EditorialHeading eyebrow="Continúa el ritual" size="lg" as="h2">
                Otros serums
              </EditorialHeading>
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/products/${p.slug}`}
                    className="flex flex-col gap-5"
                  >
                    <ProductDisplay product={p} />
                    <ProductMeta product={p} />
                  </Link>
                ))}
              </div>
            </div>
          </SectionWrapper>
        )}
      </main>
      <Footer />
    </>
  );
};

export default ProductDetail;
