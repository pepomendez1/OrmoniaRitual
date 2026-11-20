import { Link } from "react-router-dom";
import { Header, HEADER_CLEARANCE, PAGE_LEAD } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  FeaturedReading,
  IndexReading,
  ReadingsHeader,
} from "@/components/sections/LearnSection";
import { exploreCopy } from "@/data/explore";
import { learnCopy } from "@/data/content";
import { usePageMeta } from "@/hooks/usePageMeta";
import { eyebrowClass } from "@/lib/brandButton";

/**
 * /explore — Explorar: la biblioteca editorial de ORMONIA.
 *
 * Misma dirección visual que Lecturas en Home (pieza destacada + índice con
 * filetes) y la misma data (`learnCopy.readings`): publicar una pieza la
 * suma en ambos lugares.
 *
 * Debajo, "También en ORMONIA": las otras puertas editoriales del sitio
 * (Calendario, Descubrí tu piel, El Ciclo, Sobre ORMONIA). Sin filtros: con
 * tres piezas no ordenan nada. Cuando haya muchas, el formato (`kind`) y la
 * etiqueta ya están en la data para agregarlos.
 */
const Explore = () => {
  usePageMeta("explore");
  const [featured, ...rest] = learnCopy.readings;

  return (
    <>
      <Header />
      <main
        id="main"
        tabIndex={-1}
        className={`min-h-screen bg-[#F2EBDD] outline-none ${HEADER_CLEARANCE}`}
      >
        <div className={`mx-auto w-full max-w-[1320px] px-6 pb-20 md:px-10 ${PAGE_LEAD}`}>
          <ReadingsHeader as="h1" />
          {featured && (
            <div className="mt-12 grid gap-12 md:mt-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
              <FeaturedReading reading={featured} headingAs="h2" />
              {rest.length > 0 && (
                <ol className="flex flex-col">
                  {rest.map((reading) => (
                    <li key={reading.id} className="border-t border-ink/14 last:border-b">
                      <IndexReading reading={reading} headingAs="h2" />
                    </li>
                  ))}
                </ol>
              )}
            </div>
          )}
        </div>

        <section aria-labelledby="explore-more" className="border-t border-ink/12">
          <div className="mx-auto w-full max-w-[1320px] px-6 pb-24 pt-14 md:px-10 md:pb-28">
            <h2 id="explore-more" className={`${eyebrowClass} text-ink/62`}>
              {exploreCopy.moreTitle}
            </h2>
            <ul className="mt-8 grid gap-px overflow-hidden rounded-[20px] bg-ink/12 sm:grid-cols-2 lg:grid-cols-4">
              {exploreCopy.doors.map((door) => (
                <li key={door.href} className="bg-[#F2EBDD]">
                  <Link
                    to={door.href}
                    className="group flex h-full flex-col justify-between gap-10 p-6 text-ink transition-colors duration-300 hover:bg-[#EAE1D1] md:p-7"
                  >
                    <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-ink/62">
                      {door.eyebrow}
                    </span>
                    <span>
                      <span className="block font-display text-[1.6rem] leading-[1.08] tracking-[-0.03em] group-hover:underline group-hover:underline-offset-4">
                        {door.title}
                      </span>
                      <span className="mt-2 block font-sans text-[13px] leading-relaxed text-ink/64">
                        {door.body}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Explore;
