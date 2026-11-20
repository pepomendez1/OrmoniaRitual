import { SiteLink } from "@/components/ui/SiteLink";
import { Wordmark } from "@/components/brand/Wordmark";
import { announcementCopy, brandCopy, footerCopy, type FooterLink } from "@/data/content";

const linkClass =
  "font-sans text-[13px] text-ivory/72 transition-colors duration-300 hover:text-ivory";
/** Destino todavía inexistente: se lee, pero no parece clickeable. */
const inertClass = "font-sans text-[13px] text-ivory/38";

function FooterLinks({ links, className }: { links: FooterLink[]; className?: string }) {
  return (
    <ul className={className}>
      {links.map((link) => (
        <li key={link.label}>
          <SiteLink href={link.href} className={linkClass} inertClassName={inertClass}>
            {link.label}
          </SiteLink>
        </li>
      ))}
    </ul>
  );
}

/**
 * Footer de ecommerce/editorial.
 *
 * Comparte el campo deep-brown del cierre "Unite al ritual", así el final de
 * la Home es un solo plano. En las demás páginas funciona igual de solo.
 *
 * Navegación, ayuda, redes y políticas salen de `footerCopy`. Lo que todavía
 * no existe tiene `href: null` y se muestra inerte: no se inventan páginas ni
 * textos legales.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer data-header-tone="light" className="bg-deepBrown text-ivory">
      <div className="mx-auto w-full max-w-[1320px] px-6 md:px-10">
        <div className="grid gap-12 border-t border-ivory/14 py-16 md:grid-cols-2 md:py-20 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Wordmark className="h-[21px] self-start" />
            <p className="max-w-[300px] font-sans text-[13px] leading-relaxed text-ivory/62">
              {footerCopy.tagline}
            </p>
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-ivory/62">
              {announcementCopy.message}
            </p>
          </div>

          {footerCopy.columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading} className="flex flex-col gap-5">
              <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-ivory/62">
                {col.heading}
              </span>
              <FooterLinks links={col.links} className="flex flex-col gap-3" />
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-5 border-t border-ivory/14 py-8 md:flex-row md:items-center md:justify-between">
          <p className="font-sans text-[11px] text-ivory/62">
            © {year} {footerCopy.copyright}
          </p>
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-10">
            <nav aria-label="Legales">
              <FooterLinks links={footerCopy.legal} className="flex flex-wrap gap-x-6 gap-y-2" />
            </nav>
            <nav aria-label="Redes">
              <FooterLinks links={footerCopy.social} className="flex gap-6" />
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
