import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ritualWords } from "@/data/content";

/**
 * Ritual — placeholder editorial deliberado hasta contar con macro/video real.
 * Evita cuatro palabras flotando sin contexto: una sola composición oscura,
 * material y contenida que luego podrá alojar el asset del gotero/manos.
 */
export function RitualSection() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="ritual" data-header-tone="light" className="relative overflow-hidden bg-[#342115] px-6 py-28 text-[#f2ebdd] md:px-8 lg:py-40">
      <div className="pointer-events-none absolute -right-[16vw] -top-[24vw] h-[52vw] w-[52vw] rounded-full border border-[#f2ebdd]/10" aria-hidden="true" />
      <div ref={ref} className="mx-auto grid w-full max-w-[1200px] gap-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="mb-8 font-sans text-[10px] uppercase tracking-[0.24em] text-[#f2ebdd]/50">El ritual</p>
          <h2 className="max-w-[680px] font-display text-[clamp(3.4rem,6.5vw,7.5rem)] leading-[0.9] tracking-[-0.04em]">
            Escuchar antes de intervenir.
          </h2>
          <p className="mt-8 max-w-md font-sans text-sm leading-relaxed text-[#f2ebdd]/58">
            Un gesto breve. Una pausa para observar la piel y acompañar el momento en el que está.
          </p>
        </div>

        <ol className="border-t border-[#f2ebdd]/20">
          {ritualWords.map((word, index) => (
            <li key={word} className="group flex items-baseline justify-between border-b border-[#f2ebdd]/20 py-5 md:py-6">
              <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#f2ebdd]/38">0{index + 1}</span>
              <span className="font-display text-[clamp(2rem,4vw,4.6rem)] leading-none text-[#f2ebdd]/85 transition-transform duration-500 group-hover:-translate-x-2">{word}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
