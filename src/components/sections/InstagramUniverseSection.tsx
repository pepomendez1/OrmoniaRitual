import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SiteLink } from "@/components/ui/SiteLink";
import { instagramCopy } from "@/data/content";
import { getInstagramPosts, INSTAGRAM_SLOTS } from "@/lib/instagram";

const FIELD = "#F2EBDD";

/**
 * HOME 08 — Instagram / Universo ORMONIA.
 *
 * Tres piezas grandes, con las mismas esquinas y el mismo campo que el resto
 * de la zona clara: se lee como parte de la página, no como un widget. En
 * mobile es un riel con swipe, una pieza y parte de la siguiente.
 *
 * Mientras no haya posts, cada lugar es un campo tonal con su nota de
 * producción y el bloque dice "Próximamente": no se simulan publicaciones.
 */
export function InstagramUniverseSection() {
  const ref = useScrollReveal<HTMLDivElement>();
  const posts = getInstagramPosts();
  const slots = Array.from({ length: INSTAGRAM_SLOTS }, (_, i) => posts[i] ?? null);
  const live = posts.length > 0;

  return (
    <section
      id="instagram"
      aria-labelledby="instagram-heading"
      style={{ backgroundColor: FIELD }}
    >
      <div
        ref={ref}
        className="mx-auto w-full max-w-[1320px] pb-[clamp(88px,12vh,140px)]"
      >
        <div className="flex flex-col gap-6 px-6 text-ink md:flex-row md:items-end md:justify-between md:gap-12 md:px-10">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-ink/66 md:text-[11px]">
              {instagramCopy.handle ?? instagramCopy.eyebrow}
            </p>
            <h2
              id="instagram-heading"
              className="mt-5 font-display text-[clamp(2.1rem,6vw,2.8rem)] leading-[1.02] tracking-[-0.035em] md:mt-6 lg:text-[clamp(2.4rem,3.2vw,3.2rem)] lg:leading-[0.98]"
            >
              {instagramCopy.title}
            </h2>
          </div>
          <div className="flex max-w-[360px] flex-col gap-4 md:items-end md:pb-1 md:text-right">
            {!live && (
              <p className="font-sans text-[13px] leading-relaxed text-ink/64 md:text-[14px]">
                {instagramCopy.body}
              </p>
            )}
            {instagramCopy.profileUrl && (
              <SiteLink
                href={instagramCopy.profileUrl}
                className="w-fit border-b border-ink/45 pb-1.5 font-sans text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 hover:border-ink"
              >
                {instagramCopy.follow}
              </SiteLink>
            )}
          </div>
        </div>

        <ul
          aria-label={instagramCopy.title}
          className="mt-10 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 [scrollbar-width:none] md:mt-12 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-10 [&::-webkit-scrollbar]:hidden"
        >
          {slots.map((post, i) => (
            <li
              key={post?.id ?? `slot-${i}`}
              className="w-[78vw] shrink-0 snap-start md:w-auto"
            >
              {post ? (
                /*
                 * Una pieza sin permalink todavía no es una publicación real:
                 * se muestra la fotografía pero no se enlaza a ningún lado.
                 */
                (() => {
                  const media = (
                    <img
                      src={post.image}
                      alt={post.alt}
                      loading="lazy"
                      style={{ objectPosition: post.objectPosition ?? "center" }}
                      className="absolute inset-0 h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-900 motion-safe:ease-out motion-safe:group-hover:scale-[1.03]"
                    />
                  );
                  const frame =
                    "group relative block aspect-[4/5] overflow-hidden rounded-[20px] bg-[#E2D6C4]";

                  return post.permalink ? (
                    <a
                      href={post.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={frame}
                    >
                      {media}
                    </a>
                  ) : (
                    <div className={frame}>{media}</div>
                  );
                })()
              ) : (
                <div
                  aria-hidden="true"
                  className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-[#E2D6C4]"
                >
                  <div
                    className="absolute inset-0 opacity-50"
                    style={{
                      backgroundImage:
                        "radial-gradient(rgba(52,33,21,0.14) 0.6px, transparent 0.7px)",
                      backgroundSize: "3px 3px",
                    }}
                  />
                  {i === 0 && (
                    <span className="absolute bottom-5 left-5 font-sans text-[9px] uppercase tracking-[0.2em] text-ink/40">
                      {instagramCopy.pending}
                    </span>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
