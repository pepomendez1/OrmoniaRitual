import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { brandCopy, nav } from "@/data/content";
import { cn } from "@/lib/utils";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "relative pb-1 font-sans text-[12px] uppercase tracking-editorial transition-colors",
    isActive ? "text-accent" : "text-foreground hover:text-accent"
  );

/**
 * Cabecera editorial: wordmark ORMONIA, navegación de escritorio y
 * menú móvil (Sheet). Incluye skip-link de accesibilidad al contenido.
 */
export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-none focus:bg-background focus:px-4 focus:py-2 focus:font-sans focus:text-sm focus:text-foreground"
      >
        Saltar al contenido
      </a>
      <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between px-6 py-6 md:px-8">
        <Link
          to="/"
          className="font-display text-xl tracking-[-0.02em] text-foreground"
          aria-label="ORMONIA — Inicio"
        >
          {brandCopy.wordmark}
        </Link>

        <nav aria-label="Navegación principal" className="hidden items-center gap-8 md:flex">
          {nav.primary.map((item) =>
            item.href ? (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === "/"}
                className={navLinkClass}
              >
                {item.label}
              </NavLink>
            ) : (
              <span
                key={item.label}
                aria-disabled="true"
                title="Próximamente"
                className="pb-1 font-sans text-[12px] uppercase tracking-editorial text-muted-foreground"
              >
                {item.label}
              </span>
            )
          )}
        </nav>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Abrir menú"
                className="text-foreground"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-sm">
              <SheetHeader className="text-left">
                <SheetTitle className="font-display tracking-[-0.02em]">
                  {brandCopy.wordmark}
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Navegación móvil" className="mt-8 flex flex-col gap-1">
                {nav.primary.map((item) =>
                  item.href ? (
                    <NavLink
                      key={item.href}
                      to={item.href}
                      end={item.href === "/"}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "border-b border-border py-3 font-sans text-sm uppercase tracking-editorial transition-colors",
                          isActive ? "text-accent" : "text-foreground"
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  ) : (
                    <span
                      key={item.label}
                      aria-disabled="true"
                      title="Próximamente"
                      className="border-b border-border py-3 font-sans text-sm uppercase tracking-editorial text-muted-foreground"
                    >
                      {item.label}
                    </span>
                  )
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
