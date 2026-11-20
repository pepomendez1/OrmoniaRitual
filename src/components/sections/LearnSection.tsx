import { type ReactNode } from "react";
import { ArrowRight, Play } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SiteLink } from "@/components/ui/SiteLink";
import { learnCopy, readingHref, type Reading } from "@/data/content";
import { cn } from "@/lib/utils";

/** Mismo campo claro que la zona comercial: la Home sigue en su universo ivory. */
const FIELD = "#F2EBDD";

/**
 * HOME 07 — Lecturas para el ritual.
 *
 * Cambio de ritmo después de la campaña de Descubrí tu piel: deja de haber una
 * gran imagen a sangre y aparece una composición de lectura —una pieza
 * destacada y un índice con filetes—, más cerca de una revista que de una
 * grilla de blog o de otra zona de compra.
 *
 * Todo sale de `learnCopy.readings`. Toda pieza es clickeable: con `href`
 * real va a la nota o al video; sin él abre su ficha en `/explore/:id`, que
 * muestra la pieza y dice que todavía no está publicada (sin inventar el
 * texto). Una sin `media` muestra un campo tonal con su nota de producción.
 */
export function LearnSection() {
  const ref = useScrollReveal<HTMLDivElement>();
  const [featured, ...rest] = learnCopy.readings;

  return (
    <section
      id="lecturas"
      aria-labelledby="lecturas-heading"
      className="relative"
      style={{ backgroundColor: FIELD }}
    >
      <div
        ref={ref}
        className="mx-auto w-full max-w-[1320px] px-6 pb-[clamp(88px,12vh,140px)] pt-[clamp(88px,12vh,140px)] md:px-10"
      >
        <ReadingsHeader />

        {featured && (
          <div className="mt-12 grid gap-12 md:mt-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
            <FeaturedReading reading={featured} />
            {rest.length > 0 && (
              <ol className="flex flex-col">
                {rest.map((reading) => (
                  <li key={reading.id} className="border-t border-ink/14 last:border-b">
                    <IndexReading reading={reading} />
                  </li>
                ))}
              </ol>
            )}
          </div>
        )}

        <SiteLink
          href={learnCopy.ctaHref}
          className="mt-12 inline-flex border-b border-ink/45 pb-1.5 font-sans text-[11px] uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:border-ink md:mt-14"
        >
          {learnCopy.cta}
        </SiteLink>
      </div>
    </section>
  );
}

export function ReadingsHeader({ as: Heading = "h2" }: { as?: "h1" | "h2" }) {
  return (
    <div className="flex flex-col gap-6 text-ink md:flex-row md:items-end md:justify-between md:gap-12">
      <div>
        <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-ink/66 md:text-[11px]">
          {learnCopy.eyebrow}
        </p>
        <Heading
          id="lecturas-heading"
          className="mt-5 font-display text-[clamp(2.1rem,6vw,2.8rem)] leading-[1.02] tracking-[-0.035em] md:mt-6 lg:text-[clamp(2.4rem,3.2vw,3.2rem)] lg:leading-[0.98]"
        >
          {learnCopy.title}
        </Heading>
      </div>
      <p className="max-w-[360px] font-sans text-[13px] leading-relaxed text-ink/64 md:pb-1 md:text-[14px]">
        {learnCopy.body}
      </p>
    </div>
  );
}

/** Formato + etiqueta editorial, y "Próximamente" si la pieza no está publicada. */
function ReadingMeta({ reading }: { reading: Reading }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[10px] uppercase tracking-[0.22em] text-ink/66">
      <span>{learnCopy.kindLabel[reading.kind]}</span>
      <span aria-hidden="true">·</span>
      <span>{reading.label}</span>
      {reading.meta && (
        <>
          <span aria-hidden="true">·</span>
          <span>{reading.meta}</span>
        </>
      )}
      {!reading.href && (
        <span className="ml-1 rounded-full border border-ink/18 px-2.5 py-0.5 tracking-[0.18em] text-ink/66">
          {learnCopy.soon}
        </span>
      )}
    </p>
  );
}

function ReadingMedia({
  reading,
  className,
  showPending,
}: {
  reading: Reading;
  className?: string;
  showPending?: boolean;
}) {
  return (
    <div
      className={cn("relative overflow-hidden bg-[#E2D6C4]", className)}
      aria-hidden={reading.media ? undefined : true}
    >
      {reading.media ? (
        <img
          src={reading.media.src}
          alt={reading.media.alt}
          loading="lazy"
          style={{ objectPosition: reading.media.objectPosition ?? "center" }}
          className="absolute inset-0 h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-900 motion-safe:ease-out motion-safe:group-hover:scale-[1.03]"
        />
      ) : (
        <>
          {/* Grano: el campo no se lee como bloque plano sin la imagen. */}
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "radial-gradient(rgba(52,33,21,0.14) 0.6px, transparent 0.7px)",
              backgroundSize: "3px 3px",
            }}
          />
          {showPending && (
            <span className="absolute bottom-5 left-5 font-sans text-[9px] uppercase tracking-[0.2em] text-ink/40">
              {learnCopy.pending}
            </span>
          )}
        </>
      )}

      {reading.kind === "video" && (
        <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/60 bg-ink/25 text-ivory backdrop-blur-sm">
          <Play className="ml-0.5 h-5 w-5" aria-hidden="true" />
        </span>
      )}
    </div>
  );
}

/**
 * Envuelve la pieza en su link: la nota/video si está publicada, o su ficha
 * en /explore si todavía no. El foco visible y el hover viven en el link.
 */
function ReadingFrame({
  reading,
  className,
  children,
}: {
  reading: Reading;
  className?: string;
  children: ReactNode;
}) {
  return (
    <article>
      <SiteLink
        href={readingHref(reading)}
        className={cn("group block rounded-[20px] focus-visible:outline-none", className)}
      >
        {children}
      </SiteLink>
    </article>
  );
}

/** Señal explícita de que la pieza se abre: no depende solo del hover. */
function ReadMore({ reading }: { reading: Reading }) {
  return (
    <span className="mt-5 inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.2em] text-ink">
      <span className="border-b border-ink/40 pb-1 transition-colors duration-300 group-hover:border-ink">
        {reading.kind === "video" ? "Ver" : "Leer"}
      </span>
      <ArrowRight
        aria-hidden="true"
        className="h-3.5 w-3.5 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:translate-x-1"
      />
    </span>
  );
}

/** Nivel del titular de cada pieza: h3 bajo la sección de Home, h2 en /learn. */
type PieceHeading = "h2" | "h3";

export function FeaturedReading({
  reading,
  headingAs: Title = "h3",
}: {
  reading: Reading;
  headingAs?: PieceHeading;
}) {
  return (
    <ReadingFrame reading={reading} className="flex flex-col text-ink">
      <ReadingMedia
        reading={reading}
        showPending
        className="aspect-[4/3] w-full rounded-[20px]"
      />
      <div className="mt-6 md:mt-7">
        <ReadingMeta reading={reading} />
        <Title className="mt-4 max-w-[520px] font-display text-[clamp(1.6rem,4.6vw,2.1rem)] leading-[1.08] tracking-[-0.03em] decoration-ink/40 underline-offset-[6px] group-hover:underline">
          {reading.title}
        </Title>
        <p className="mt-3 max-w-[460px] font-sans text-[13px] leading-relaxed text-ink/64 md:text-[14px]">
          {reading.teaser}
        </p>
        <ReadMore reading={reading} />
      </div>
    </ReadingFrame>
  );
}

export function IndexReading({
  reading,
  headingAs: Title = "h3",
}: {
  reading: Reading;
  headingAs?: PieceHeading;
}) {
  return (
    <ReadingFrame
      reading={reading}
      className="grid grid-cols-[minmax(0,1fr)_112px] items-start gap-5 py-7 text-ink transition-colors duration-300 hover:bg-ink/[0.025] sm:grid-cols-[minmax(0,1fr)_168px] sm:gap-8 md:py-8"
    >
      <div>
        <ReadingMeta reading={reading} />
        <Title className="mt-3 font-display text-[1.35rem] leading-[1.12] tracking-[-0.025em] decoration-ink/40 underline-offset-[5px] group-hover:underline md:text-[1.55rem]">
          {reading.title}
        </Title>
        <p className="mt-2.5 font-sans text-[13px] leading-relaxed text-ink/64">
          {reading.teaser}
        </p>
      </div>
      <ReadingMedia reading={reading} className="aspect-[4/3] w-full rounded-[14px]" />
    </ReadingFrame>
  );
}
