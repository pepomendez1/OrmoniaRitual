import { Link, useParams } from "react-router-dom";
import { Header, HEADER_CLEARANCE } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { IndexReading } from "@/components/sections/LearnSection";
import { SiteLink } from "@/components/ui/SiteLink";
import { learnCopy } from "@/data/content";
import { exploreCopy } from "@/data/explore";
import { usePageMeta } from "@/hooks/usePageMeta";
import { brandButton, eyebrowClass, leadClass } from "@/lib/brandButton";

/**
 * /explore/:id — ficha de una lectura.
 *
 * Hoy ninguna pieza tiene texto publicado, y no se inventa: la ficha muestra
 * portada, título y bajada (contenido existente) y dice con honestidad que la
 * lectura todavía no está publicada. Cuando una pieza tenga `href` real
 * (nota o video), el botón la abre; cuando haya cuerpo propio, esta vista es
 * donde se renderiza.
 */
const ReadingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const reading = learnCopy.readings.find((r) => r.id === id);
  const others = learnCopy.readings.filter((r) => r.id !== id);
  const r = exploreCopy.reading;

  usePageMeta(
    reading
      ? { title: reading.title, description: reading.teaser, image: reading.media?.src }
      : { title: r.notFound, noindex: true }
  );

  return (
    <>
      <Header />
      <main
        id="main"
        tabIndex={-1}
        className={`min-h-screen bg-[#F2EBDD] text-ink outline-none ${HEADER_CLEARANCE}`}
      >
        <article className="mx-auto w-full max-w-[1320px] px-6 pb-16 pt-8 md:px-10 md:pt-10">
          <Link to="/explore" className={brandButton({ variant: "quiet" })}>
            {r.back}
          </Link>

          {!reading ? (
            <p className="mt-12 font-display text-[2rem]">{r.notFound}</p>
          ) : (
            <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-[#E2D6C4]">
                {reading.media && (
                  <img
                    src={reading.media.src}
                    alt={reading.media.alt}
                    style={{ objectPosition: reading.media.objectPosition ?? "center" }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col justify-end">
                <p className={`${eyebrowClass} text-ink/62`}>
                  {learnCopy.kindLabel[reading.kind]} · {reading.label}
                  {reading.meta ? ` · ${reading.meta}` : ""}
                </p>
                <h1 className="mt-5 font-display text-[clamp(2.4rem,6vw,3.8rem)] leading-[1] tracking-[-0.04em]">
                  {reading.title}
                </h1>
                <p className={`mt-6 max-w-[460px] ${leadClass}`}>{reading.teaser}</p>

                {reading.href ? (
                  <SiteLink href={reading.href} className={`mt-9 ${brandButton({ size: "lg" })}`}>
                    {r.external}
                  </SiteLink>
                ) : (
                  <div className="mt-9 rounded-[14px] border border-dashed border-ink/25 px-5 py-4">
                    <p className="font-sans text-[12px] uppercase tracking-[0.16em] text-ink">
                      {r.unpublished}
                    </p>
                    <p className="mt-1.5 font-sans text-[13px] text-ink/64">{r.unpublishedBody}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </article>

        {others.length > 0 && (
          <section aria-labelledby="more-readings" className="border-t border-ink/12">
            <div className="mx-auto w-full max-w-[1320px] px-6 pb-24 pt-12 md:px-10">
              <h2 id="more-readings" className={`${eyebrowClass} text-ink/62`}>
                {r.more}
              </h2>
              <ol className="mt-4 grid md:grid-cols-2 md:gap-x-12">
                {others.map((other) => (
                  <li key={other.id} className="border-t border-ink/14">
                    <IndexReading reading={other} />
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};

export default ReadingDetail;
