import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { ScrollTrigger } from "@/lib/gsap";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { brandCopy, nav } from "@/data/content";
import { cn } from "@/lib/utils";

/**
 * Tono del header según lo que tenga detrás.
 * - "light": escena oscura/fotográfica → texto ivory.
 * - "dark":  fondo claro → texto ink.
 *
 * Una sección declara su tono con `data-header-tone="light" | "dark"`.
 */
export type HeaderTone = "light" | "dark";

interface HeaderProps {
  /** Tono al que se vuelve cuando no hay ninguna escena marcada debajo. */
  defaultTone?: HeaderTone;
  /**
   * `true` en páginas donde el header se apoya sobre un hero a sangre: evita
   * que el plano claro parpadee en el primer frame, antes de resolver el tono.
   */
  overlay?: boolean;
}

/** Línea de referencia (px) para decidir qué escena está detrás del header. */
const TONE_LINE = 72;

/**
 * Margen (px) con el que la disolución arranca antes del borde del Hero, para
 * que termine justo cuando la escena siguiente toma la pantalla.
 */
const HERO_EXIT_LEAD = 120;

/**
 * Cabecera editorial ORMONIA — smart header.
 *
 * Jerarquía (Master Plan §5 / HOME 01, refinado por feedback CEO):
 *
 *   [ franja de envío — en flujo, no sticky ]
 *   [ navegación · ORMONIA · utilidades ]
 *
 * ORMONIA es el elemento dominante del header (36–52px); la navegación tiene
 * peso real (13–14px). "Fino" significa refinado y liviano, no pequeño.
 *
 * El header NO tiene fondo en ningún estado: ni plano, ni blur, ni caja. Lo
 * único que cambia es el color del texto, según la escena que tenga detrás.
 * Cuando hace falta contraste, solo un text-shadow muy sutil.
 *
 * Comportamiento:
 * - Durante el Hero acompaña la escena, transparente sobre la fotografía y
 *   desplazado hacia abajo mientras la franja siga a la vista.
 * - Al acercarse al final del Hero y seguir bajando, se disuelve: opacidad a 0
 *   y un desplazamiento corto hacia arriba. No pasa por ningún estado claro
 *   antes de irse.
 * - Al scrollear hacia arriba vuelve como navegación flotante transparente,
 *   sin la franja de envío; la sección de atrás sigue viéndose.
 *
 * CUENTA / BUSCAR / CARRITO todavía no tienen destino: se muestran como
 * afordancias inertes hasta que exista Shopify. No inventan navegación.
 */
export function Header({ defaultTone = "dark", overlay = false }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [tone, setTone] = useState<HeaderTone>(overlay ? "light" : defaultTone);
  const [pastHero, setPastHero] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const direction = useScrollDirection(12);

  // Mientras la franja de envío siga a la vista, el header se apoya debajo de
  // ella; después queda pegado al borde superior. Se escribe directo al DOM
  // para no re-renderizar en cada frame de scroll.
  useEffect(() => {
    const header = headerRef.current;
    let heroEnd = 0;
    let ticking = false;

    const measureHero = () => {
      const hero = document.querySelector<HTMLElement>("[data-header-hero]");
      heroEnd = hero ? hero.offsetTop + hero.offsetHeight : 0;
    };

    const update = () => {
      ticking = false;
      const y = window.scrollY;

      if (header) {
        const barHeight = barRef.current?.offsetHeight ?? 0;
        header.style.top = `${Math.max(0, barHeight - y)}px`;
      }

      setPastHero(y > Math.max(0, heroEnd - HERO_EXIT_LEAD));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    const onResize = () => {
      measureHero();
      onScroll();
    };

    measureHero();
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Contraste adaptativo: cada escena marcada con data-header-tone toma el
  // control mientras pasa por detrás del header. La resolución se hace por
  // geometría (qué escena cruza la línea del header) en vez de confiar en el
  // orden de los toggles, así el estado inicial ya es correcto al cargar.
  useEffect(() => {
    const scenes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-header-tone]")
    );
    if (scenes.length === 0) {
      setTone(defaultTone);
      return;
    }

    const resolve = () => {
      const scene = scenes.find((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top <= TONE_LINE && rect.bottom > TONE_LINE;
      });
      setTone((scene?.dataset.headerTone as HeaderTone) ?? defaultTone);
    };

    resolve();

    const triggers = scenes.map((scene) =>
      ScrollTrigger.create({
        trigger: scene,
        start: `top top+=${TONE_LINE}`,
        end: `bottom top+=${TONE_LINE}`,
        onToggle: resolve,
        onRefresh: resolve,
      })
    );

    return () => triggers.forEach((t) => t.kill());
  }, [defaultTone]);

  const inHeroScene = !pastHero;
  const revealed = inHeroScene || direction === "up";
  const isLight = tone === "light";

  const linkBase = cn(
    "relative whitespace-nowrap font-sans text-[13px] uppercase tracking-[0.13em] transition-colors duration-[380ms] ease-out xl:text-[14px]",
    isLight && "[text-shadow:0_1px_14px_rgba(25,21,17,0.45)]"
  );

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      linkBase,
      "after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:transition-all after:duration-500 after:ease-out hover:after:w-full",
      isLight
        ? "text-ivory/90 hover:text-ivory after:bg-ivory"
        : "text-ink/72 hover:text-ink after:bg-ink",
      isActive && (isLight ? "text-ivory after:w-full" : "text-ink after:w-full")
    );

  return (
    <>
      {/* Franja de envío: en el flujo del documento, queda atrás al scrollear. */}
      <div ref={barRef}>
        <AnnouncementBar />
      </div>

      <header
        ref={headerRef}
        // `top` lo gobierna el efecto de scroll; la transición excluye `top`
        // a propósito para que el offset bajo la franja siga al scroll 1:1.
        className={cn(
          "fixed inset-x-0 z-50 transition-[transform,opacity] duration-[420ms] ease-out",
          "focus-within:translate-y-0 focus-within:opacity-100",
          revealed
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-5 opacity-0"
        )}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-background focus:px-4 focus:py-2 focus:font-sans focus:text-sm focus:text-foreground"
        >
          Saltar al contenido
        </a>

        {/* Sin velo, sin plano, sin blur: la navegación va directo sobre el
            contenido en todos los estados. Solo cambia el color del texto. */}
        <div className="relative h-[64px] md:h-[76px] xl:h-[82px]">
          <div className="relative mx-auto grid h-full w-full max-w-[1680px] grid-cols-[1fr_auto_1fr] items-center gap-6 px-6 lg:px-10 xl:px-16">
            {/* Izquierda — navegación */}
            <nav
              aria-label="Navegación principal"
              className="hidden items-center gap-8 lg:flex xl:gap-11"
            >
              {nav.left.map((item) => (
                <NavLink key={item.href} to={item.href} className={linkClass}>
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex lg:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Abrir menú"
                    className={cn(
                      "-ml-2 h-10 w-10 transition-colors duration-[380ms] ease-out hover:bg-transparent",
                      isLight ? "text-ivory" : "text-ink"
                    )}
                  >
                    <Menu className="!h-6 !w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full sm:max-w-sm">
                  <SheetHeader className="text-left">
                    <SheetTitle className="font-display text-3xl uppercase tracking-[0.09em]">
                      {brandCopy.wordmark}
                    </SheetTitle>
                  </SheetHeader>
                  <nav
                    aria-label="Navegación móvil"
                    className="mt-8 flex flex-col gap-1"
                  >
                    {nav.primary.map((item) =>
                      item.href ? (
                        <NavLink
                          key={item.href}
                          to={item.href}
                          onClick={() => setOpen(false)}
                          className={({ isActive }) =>
                            cn(
                              "border-b border-border py-4 font-sans text-[15px] uppercase tracking-[0.12em] transition-colors",
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
                          className="border-b border-border py-4 font-sans text-[15px] uppercase tracking-[0.12em] text-muted-foreground"
                        >
                          {item.label}
                        </span>
                      )
                    )}
                  </nav>
                  <ul className="mt-8 flex flex-col gap-3">
                    {nav.utilities.map((item) => (
                      <li
                        key={item.label}
                        aria-disabled="true"
                        title="Próximamente"
                        className="font-sans text-[12px] uppercase tracking-[0.14em] text-muted-foreground"
                      >
                        {item.label}
                      </li>
                    ))}
                  </ul>
                </SheetContent>
              </Sheet>
            </div>

            {/* Centro — wordmark: el elemento dominante del header. */}
            <Link
              to="/"
              aria-label="ORMONIA — Inicio"
              className={cn(
                "justify-self-center whitespace-nowrap font-display text-[clamp(2.25rem,2.6vw,3.25rem)] uppercase leading-none tracking-[0.09em] transition-colors duration-[380ms] ease-out",
                isLight
                  ? "text-ivory [text-shadow:0_2px_22px_rgba(25,21,17,0.4)]"
                  : "text-ink"
              )}
            >
              {brandCopy.wordmark}
            </Link>

            {/* Derecha — utilidades (inertes hasta Shopify) */}
            <ul className="hidden items-center justify-end gap-8 lg:flex xl:gap-11">
              {nav.utilities.map((item) => (
                <li
                  key={item.label}
                  aria-disabled="true"
                  title="Próximamente"
                  className={cn(
                    linkBase,
                    "cursor-default",
                    isLight ? "text-ivory/90" : "text-ink/72"
                  )}
                >
                  {item.label}
                </li>
              ))}
            </ul>

            <span
              aria-hidden="true"
              className={cn(
                linkBase,
                "justify-self-end lg:hidden",
                isLight ? "text-ivory/90" : "text-ink/72"
              )}
            >
              Carrito
            </span>
          </div>
        </div>
      </header>
    </>
  );
}
