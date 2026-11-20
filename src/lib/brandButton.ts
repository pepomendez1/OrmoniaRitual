import { cva, type VariantProps } from "class-variance-authority";

/**
 * Botones de marca ORMONIA.
 *
 * Hasta ahora cada sección escribía su propio botón con las mismas cuatro o
 * cinco decisiones (alto, radio 12px, mayúsculas espaciadas, transición de
 * 500ms). Esta receta las fija una vez para lo nuevo —carrito, PDP, Tienda,
 * cuenta— sin tocar los CTAs ya aprobados de Hero, Pack o Descubrí tu piel.
 *
 * Es solo una clase: se aplica igual a `<button>`, `<a>` o `<Link>`.
 *
 * - primary: sólido ink. La acción principal de una pantalla.
 * - secondary: marco fino transparente; se llena al hover.
 * - quiet: texto con subrayado, para acciones terciarias.
 * - icon: círculo para quick add, cerrar y flechas.
 *
 * `tone="light"` invierte para fondos oscuros. Disabled y loading se expresan
 * con atributos (`disabled`, `aria-disabled`, `aria-busy`), no con clases.
 */
export const brandButton = cva(
  [
    "inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap font-sans uppercase",
    "transition-[background-color,border-color,color,opacity,transform] duration-500 ease-out",
    "disabled:pointer-events-none disabled:opacity-40 aria-disabled:pointer-events-none aria-disabled:opacity-40",
    "aria-busy:cursor-progress",
  ],
  {
    variants: {
      variant: {
        primary: "rounded-[12px]",
        secondary: "rounded-[12px] border bg-transparent",
        quiet: "h-auto border-b px-0 pb-1.5 tracking-[0.2em]",
        icon: "rounded-full border",
      },
      tone: {
        dark: "",
        light: "",
      },
      size: {
        md: "",
        lg: "",
      },
      block: {
        true: "w-full",
        false: "w-fit",
      },
    },
    compoundVariants: [
      { variant: ["primary", "secondary"], size: "md", className: "h-[48px] px-7 text-[11px] tracking-[0.18em] md:h-[50px]" },
      { variant: ["primary", "secondary"], size: "lg", className: "h-[54px] px-9 text-[12px] tracking-[0.2em]" },
      { variant: "quiet", className: "text-[11px]" },
      { variant: "icon", size: "md", className: "h-11 w-11" },
      { variant: "icon", size: "lg", className: "h-12 w-12" },

      { variant: "primary", tone: "dark", className: "bg-ink text-ivory hover:bg-deepBrown" },
      { variant: "primary", tone: "light", className: "bg-ivory text-ink hover:bg-sand" },
      { variant: "secondary", tone: "dark", className: "border-ink/45 text-ink hover:border-ink hover:bg-ink hover:text-ivory" },
      { variant: "secondary", tone: "light", className: "border-ivory/55 text-ivory hover:border-ivory hover:bg-ivory hover:text-ink" },
      { variant: "quiet", tone: "dark", className: "border-ink/45 text-ink hover:border-ink" },
      { variant: "quiet", tone: "light", className: "border-ivory/55 text-ivory hover:border-ivory" },
      { variant: "icon", tone: "dark", className: "border-ink/14 bg-ivory/70 text-ink hover:border-ink/30 hover:bg-ivory" },
      { variant: "icon", tone: "light", className: "border-ivory/30 bg-ink/20 text-ivory hover:border-ivory/60" },
    ],
    defaultVariants: {
      variant: "primary",
      tone: "dark",
      size: "md",
      block: false,
    },
  }
);

export type BrandButtonProps = VariantProps<typeof brandButton>;

/** Eyebrow / metadata: la etiqueta en mayúsculas espaciadas que usa todo el sitio. */
export const eyebrowClass =
  "font-sans text-[10px] uppercase tracking-[0.28em] md:text-[11px]";

/** Titular de sección (h2) — mismo cuerpo que Los esenciales, Lecturas e Instagram. */
export const sectionTitleClass =
  "font-display text-[clamp(2.1rem,6vw,2.8rem)] leading-[1.02] tracking-[-0.035em] lg:text-[clamp(2.4rem,3.2vw,3.2rem)] lg:leading-[0.98]";

/** Titular de página (h1) en las interiores. */
export const pageTitleClass =
  "font-display text-[clamp(2.5rem,7vw,3.4rem)] leading-[1] tracking-[-0.04em] lg:text-[clamp(3rem,4.4vw,4.4rem)] lg:leading-[0.96]";

/** Bajada / cuerpo secundario sobre ivory. */
export const leadClass = "font-sans text-[13px] leading-relaxed text-ink/64 md:text-[14px]";

/** Campo de input de marca (email, búsqueda). */
export const inputClass =
  "h-[52px] w-full rounded-[12px] border border-ink/20 bg-transparent px-5 font-sans text-[14px] text-ink outline-none transition-colors duration-300 placeholder:text-ink/45 focus:border-ink/60 aria-[invalid=true]:border-terracotta";
