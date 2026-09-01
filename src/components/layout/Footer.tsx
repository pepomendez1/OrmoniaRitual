import { Link } from "react-router-dom";
import { brandCopy, footerCopy } from "@/data/content";

/**
 * Pie editorial con columnas de navegación, referencia a "El registro"
 * y línea de cierre de marca.
 */
export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-6 py-20 md:grid-cols-4 md:px-8">
        <div className="flex flex-col gap-4">
          <span className="font-display text-xl tracking-[-0.02em] text-foreground">
            {brandCopy.wordmark}
          </span>
          <p className="max-w-xs font-sans text-sm text-muted-foreground">
            {footerCopy.tagline}
          </p>
        </div>
        {footerCopy.columns.map((col) => (
          <nav
            key={col.heading}
            aria-label={col.heading}
            className="flex flex-col gap-3"
          >
            <span className="font-sans text-[11px] uppercase tracking-editorial text-foreground">
              {col.heading}
            </span>
            <ul className="flex flex-col gap-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="font-sans text-sm text-muted-foreground transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-[1200px] px-6 py-8 text-center font-sans text-[11px] uppercase tracking-editorial text-muted-foreground md:px-8">
          {footerCopy.closing}
        </p>
      </div>
    </footer>
  );
}
