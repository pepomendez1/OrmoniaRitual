import { useRef } from "react";
import { brandCopy, closingCopy } from "@/data/content";

/**
 * Cierre editorial: repite el wordmark y la tagline de marca sobre deep-brown.
 * Ref preparado para la animación tipo "ripple".
 */
export function ClosingSection() {
  // TODO: animación tipo "ripple" del wordmark al entrar en viewport.
  const rippleRef = useRef<HTMLDivElement>(null);

  return (
    <section data-header-tone="light" className="bg-deepBrown px-6 py-32 text-center md:px-8 md:py-48">
      <div
        ref={rippleRef}
        className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-6"
      >
        <span className="font-sans text-[11px] uppercase tracking-editorial text-ivory/70">
          {closingCopy.eyebrow}
        </span>
        <h2 className="font-display text-[clamp(2rem,6vw,4rem)] leading-tight tracking-[-0.02em] text-ivory">
          {closingCopy.title}
        </h2>
        <p className="font-sans text-base text-ivory/70">{closingCopy.body}</p>
        <span className="mt-4 font-display text-2xl tracking-[-0.02em] text-ivory">
          {brandCopy.wordmark}
        </span>
      </div>
    </section>
  );
}
