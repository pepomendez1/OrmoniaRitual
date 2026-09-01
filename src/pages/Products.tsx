import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { NarrativeText } from "@/components/ui/NarrativeText";
import { ProductDisplay } from "@/components/ui/ProductDisplay";
import { ProductMeta } from "@/components/ui/ProductMeta";
import { products, auraTeaser } from "@/data/products";
import { pageShells } from "@/data/content";

const Products = () => {
  const shell = pageShells.products;
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="pt-28 outline-none md:pt-36">
        <SectionWrapper>
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-6">
              <EditorialHeading eyebrow={shell.eyebrow} size="xl" as="h1">
                {shell.title}
              </EditorialHeading>
              <NarrativeText tone="muted" measure="wide">
                {shell.body}
              </NarrativeText>
            </div>
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <Link
                  key={product.slug}
                  to={`/products/${product.slug}`}
                  className="flex flex-col gap-5"
                >
                  <ProductDisplay product={product} />
                  <ProductMeta product={product} />
                </Link>
              ))}
              {/* AURA — Próximamente */}
              <Link
                to="/products/aura"
                className="flex flex-col gap-5"
                aria-label="AURA — Próximamente"
              >
                <ProductDisplay product={auraTeaser} />
                <ProductMeta product={auraTeaser} />
              </Link>
            </div>
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
};

export default Products;
