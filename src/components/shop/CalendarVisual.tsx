import { cn } from "@/lib/utils";

interface CalendarVisualProps {
  className?: string;
  /** Muestra la nota de producción. Se apaga en miniaturas (carrito, buscador). */
  showNote?: boolean;
  compact?: boolean;
}

/**
 * Visual PROVISIONAL del Calendario cíclico.
 *
 * No existe todavía fotografía del objeto. En vez de un recuadro vacío, se
 * compone una portada tipográfica sobre el campo de la marca: se lee como
 * objeto y sostiene la composición, pero no describe nada que no esté
 * definido —ni interior, ni formato, ni materiales—. Lo dice en la nota.
 *
 * Al llegar la fotografía, `calendarProduct.imageSrc` y `calendarCopy.media`
 * la reemplazan y este componente deja de montarse.
 */
export function CalendarVisual({ className, showNote = true, compact = false }: CalendarVisualProps) {
  return (
    <div
      className={cn("relative flex items-center justify-center overflow-hidden bg-[#E7DDCC]", className)}
      role="img"
      aria-label="Calendario cíclico ORMONIA — visual provisional de la portada"
    >
      {/* Grano del campo, igual que el resto de los placeholders del sitio. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: "radial-gradient(rgba(52,33,21,0.12) 0.6px, transparent 0.7px)",
          backgroundSize: "3px 3px",
        }}
      />
      {/* Luz suave desde arriba a la izquierda: da volumen sin gradiente visible. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(90% 70% at 22% 12%, rgba(255,251,243,0.55) 0%, rgba(255,251,243,0) 60%)",
        }}
      />

      <div
        aria-hidden="true"
        className={cn(
          "relative flex aspect-[3/4] flex-col justify-between bg-[#F6F1E7] text-ink shadow-[0_30px_50px_-24px_rgba(52,33,21,0.35),0_2px_6px_rgba(52,33,21,0.06)] motion-safe:transition-transform motion-safe:duration-900 motion-safe:ease-out",
          compact
            ? "w-[58%] rotate-[-3deg] rounded-[3px] p-[9%]"
            : "h-[72%] max-w-[64%] rotate-[-3deg] rounded-[4px] p-[5%] motion-safe:group-hover:rotate-[-1.5deg] motion-safe:group-hover:-translate-y-1"
        )}
      >
        <span
          className={cn(
            "font-display uppercase tracking-[0.22em]",
            compact ? "text-[6px]" : "text-[clamp(9px,1.1vw,12px)]"
          )}
        >
          Ormonia
        </span>
        <div>
          <span
            className={cn(
              "block font-display italic leading-[0.98] tracking-[-0.02em]",
              compact ? "text-[11px]" : "text-[clamp(1.2rem,2.3vw,2rem)]"
            )}
          >
            Calendario
            <br />
            cíclico
          </span>
          <span className={cn("mt-[10%] block h-px w-1/3 bg-ink/30", compact && "mt-1.5")} />
        </div>
      </div>

      {showNote && !compact && (
        <span className="absolute bottom-5 left-5 font-sans text-[9px] uppercase tracking-[0.2em] text-ink/45 md:bottom-6 md:left-6">
          Visual provisional
        </span>
      )}
    </div>
  );
}
