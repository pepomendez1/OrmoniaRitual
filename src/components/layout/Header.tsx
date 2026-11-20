import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, ShoppingBag } from "lucide-react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { useSearchOverlay } from "@/components/shop/searchContext";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useCart } from "@/hooks/useCart";
import { brandCopy, nav } from "@/data/content";
import { cn } from "@/lib/utils";
import { Wordmark } from "@/components/brand/Wordmark";

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

/**
 * Compensación del header fijo para las páginas interiores.
 *
 * El header no ocupa lugar en el flujo, así que el `<main>` de cada página
 * tiene que reservar exactamente su altura —las mismas medidas que la barra
 * interna de más abajo— o el primer bloque queda tapado. Nada más que eso: el
 * aire editorial lo pone `PAGE_LEAD`.
 *
 * Antes cada página resolvía esto por su cuenta con un `pt-28 md:pt-36` que ya
 * incluía el respiro, y encima el `SectionWrapper` sumaba su propio `py-32`.
 * El resultado era un hueco de ~190px bajo el header: la página parecía
 * arrancar caída.
 */
export const HEADER_CLEARANCE = "pt-16 md:pt-[76px] xl:pt-[82px]";

/**
 * Aire entre el header y el primer bloque de una página interior.
 *
 * Deliberadamente menor que el ritmo entre secciones del `SectionWrapper`: una
 * sección que sigue a otra necesita separarse, pero la primera solo tiene que
 * despegarse del header. Se aplica sobre el wrapper, donde `cn` lo resuelve
 * por encima del `py` de la sección.
 */
export const PAGE_LEAD = "pt-14 md:pt-16 lg:pt-20";

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
 * CUENTA navega a /account, BUSCAR abre el buscador y CARRITO el mini
 * carrito, con la cantidad real del carrito frontend ("CARRITO 2"). En mobile
 * queda a la vista el carrito (ícono + cantidad); el resto vive en el menú.
 */
export function Header({ defaultTone = "dark", overlay = false }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [tone, setTone] = useState<HeaderTone>(overlay ? "light" : defaultTone);
  const [pastHero, setPastHero] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const direction = useScrollDirection(12);
  const { cart, setDrawerOpen } = useCart();
  const search = useSearchOverlay();
  const count = cart.totalQuantity;
  const cartLabel = count > 0 ? `${nav.utilities.cart.label}, ${count} ${count === 1 ? "producto" : "productos"}` : nav.utilities.cart.label;

  /*
   * Un solo bucle de scroll gobierna las tres cosas que dependen de él: el
   * apoyo del header bajo la franja, la salida del Hero y el tono del texto.
   *
   * El tono se resuelve por geometría en cada frame —qué escena marcada cruza
   * la línea del header— en vez de depender de los bordes de un ScrollTrigger.
   * Resolverlo solo en los bordes dejaba el color desactualizado cuando el
   * header reaparecía al scrollear hacia arriba sin cruzar ninguno.
   *
   * Gana el ÚLTIMO marcador coincidente en orden de DOM, así un marcador hijo
   * pisa a su sección contenedora, que es la precedencia correcta.
   */
  useEffect(() => {
    const header = headerRef.current;
    let heroEnd = 0;
    let ticking = false;

    const measure = () => {
      const hero = document.querySelector<HTMLElement>("[data-header-hero]");
      heroEnd = hero ? hero.offsetTop + hero.offsetHeight : 0;
    };

    /*
     * Los marcadores se consultan en cada frame en vez de cachearse: el pin de
     * ScrollTrigger reescribe el DOM después de montar el header, y una lista
     * cacheada queda desactualizada. Son unos pocos elementos con un selector
     * de atributo — el costo es despreciable frente a la clase de bug que evita.
     */
    const resolveTone = () => {
      const scenes = document.querySelectorAll<HTMLElement>("[data-header-tone]");
      let found: HeaderTone | null = null;
      scenes.forEach((scene) => {
        const rect = scene.getBoundingClientRect();
        if (rect.top <= TONE_LINE && rect.bottom > TONE_LINE) {
          found = (scene.dataset.headerTone as HeaderTone) ?? null;
        }
      });
      setTone(found ?? defaultTone);
    };

    const update = () => {
      ticking = false;
      const y = window.scrollY;

      if (header) {
        const barHeight = barRef.current?.offsetHeight ?? 0;
        header.style.top = `${Math.max(0, barHeight - y)}px`;
      }

      setPastHero(y > Math.max(0, heroEnd - HERO_EXIT_LEAD));
      resolveTone();
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [defaultTone]);

  const inHeroScene = !pastHero;
  const revealed = inHeroScene || direction === "up";
  const isLight = tone === "light";

  const linkBase = cn(
    "relative whitespace-nowrap font-sans text-[13px] uppercase tracking-[0.13em] transition-colors duration-380 ease-out xl:text-[14px]",
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

  const utilityClass = cn(
    linkBase,
    "after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:transition-all after:duration-500 after:ease-out hover:after:w-full",
    isLight
      ? "text-ivory/90 hover:text-ivory after:bg-ivory"
      : "text-ink/72 hover:text-ink after:bg-ink"
  );

  return (
    <>
      {/* Franja de envío: en el flujo del documento, queda atrás al scrollear. */}
      <div ref={barRef} role="region" aria-label="Aviso de envío">
        <AnnouncementBar />
      </div>

      <header
        ref={headerRef}
        // `top` lo gobierna el efecto de scroll; la transición excluye `top`
        // a propósito para que el offset bajo la franja siga al scroll 1:1.
        className={cn(
          "fixed inset-x-0 z-50 transition-[transform,opacity] duration-420 ease-out",
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
          <div className="relative mx-auto grid h-full w-full max-w-[1680px] grid-cols-[1fr_auto_1fr] items-center gap-3 px-6 md:gap-6 lg:px-10 xl:px-16">
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
              <button
                type="button"
                aria-label="Abrir menú"
                aria-expanded={open}
                onClick={() => setOpen(true)}
                className={cn(
                  "-ml-2 flex h-11 w-11 items-center justify-center transition-colors duration-380 ease-out",
                  isLight ? "text-ivory" : "text-ink"
                )}
              >
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>
              <MobileMenu open={open} onOpenChange={setOpen} />
            </div>

            {/* Centro — wordmark: el elemento dominante del header. */}
            <Link
              to="/"
              aria-label="ORMONIA — Inicio"
              className={cn(
                "justify-self-center transition-colors duration-380 ease-out",
                isLight
                  ? "text-ivory [filter:drop-shadow(0_2px_14px_rgba(25,21,17,0.38))]"
                  : "text-ink"
              )}
            >
              {/* Logotipo oficial (vector), no texto: el mismo ORMONIA® de los frascos. */}
              <Wordmark title="" className="h-[24px] md:h-[clamp(25px,1.95vw,34px)]" />
            </Link>

            {/* Derecha — utilidades. */}
            <ul className="hidden items-center justify-end gap-8 lg:flex xl:gap-11">
              <li>
                <NavLink to={nav.utilities.account.href} className={linkClass}>
                  {nav.utilities.account.label}
                </NavLink>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => search.setOpen(true)}
                  aria-haspopup="dialog"
                  className={utilityClass}
                >
                  {nav.utilities.search.label}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(true)}
                  aria-haspopup="dialog"
                  aria-label={cartLabel}
                  className={utilityClass}
                >
                  {nav.utilities.cart.label}
                  {count > 0 && <span className="ml-1.5 tabular-nums">{count}</span>}
                </button>
              </li>
            </ul>

            {/*
              Mobile: solo el carrito, como ícono con su cantidad. Con el
              wordmark centrado no entra más en 390px sin achicarlo; BUSCAR,
              CUENTA y el resto viven en el menú.
            */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-haspopup="dialog"
              aria-label={cartLabel}
              className={cn(
                "-mr-2 flex h-11 min-w-11 items-center justify-center gap-1 justify-self-end px-2 font-sans text-[12px] tabular-nums transition-colors duration-380 ease-out lg:hidden",
                isLight ? "text-ivory" : "text-ink"
              )}
            >
              <ShoppingBag className="h-[20px] w-[20px]" aria-hidden="true" />
              {count > 0 && <span aria-hidden="true">{count}</span>}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
