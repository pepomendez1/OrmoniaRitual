import { Link, useParams } from "react-router-dom";
import { Header, HEADER_CLEARANCE } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { policies, policyCopy } from "@/data/policies";
import { usePageMeta } from "@/hooks/usePageMeta";
import { eyebrowClass, pageTitleClass } from "@/lib/brandButton";
import { cn } from "@/lib/utils";

/**
 * /ayuda/:slug — envíos, cambios, preguntas frecuentes, contacto y legales.
 *
 * Muestra solo datos confirmados (`facts`) y, mientras no exista el texto
 * validado, un aviso de "en preparación". Nunca un texto legal inventado.
 */
const Policy = () => {
  const { slug } = useParams<{ slug: string }>();
  const policy = policies.find((p) => p.slug === slug);
  usePageMeta({ title: policy?.title ?? policyCopy.notFound, noindex: !policy?.body });

  return (
    <>
      <Header />
      <main
        id="main"
        tabIndex={-1}
        className={`min-h-screen bg-[#F2EBDD] text-ink outline-none ${HEADER_CLEARANCE}`}
      >
        <div className="mx-auto grid w-full max-w-[1320px] gap-12 px-6 pb-24 pt-12 md:px-10 md:pt-16 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-20">
          <article>
            <p className={`${eyebrowClass} text-ink/62`}>{policyCopy.eyebrow}</p>
            <h1 className={`mt-5 ${pageTitleClass}`}>{policy?.title ?? policyCopy.notFound}</h1>

            {policy && (
              <div className="mt-10 flex max-w-[640px] flex-col gap-4 font-sans text-[15px] leading-relaxed text-ink/80">
                {policy.facts.map((fact) => (
                  <p key={fact}>{fact}</p>
                ))}
                {policy.body ? (
                  policy.body.map((p) => <p key={p}>{p}</p>)
                ) : (
                  <p className="mt-4 rounded-[14px] border border-dashed border-ink/25 px-5 py-4 text-[13px] text-ink/66">
                    {policyCopy.pending}
                  </p>
                )}
              </div>
            )}
          </article>

          <nav aria-label={policyCopy.others}>
            <p className={`${eyebrowClass} text-ink/62`}>{policyCopy.others}</p>
            <ul className="mt-4 border-t border-ink/12">
              {policies.map((p) => (
                <li key={p.slug} className="border-b border-ink/12">
                  <Link
                    to={`/ayuda/${p.slug}`}
                    aria-current={p.slug === slug ? "page" : undefined}
                    className={cn(
                      "block py-3 font-sans text-[13px] transition-colors",
                      p.slug === slug ? "text-ink" : "text-ink/62 hover:text-ink"
                    )}
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Policy;
