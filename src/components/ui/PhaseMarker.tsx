import { cn } from "@/lib/utils";
import { phaseAccent, phaseLabel, type CyclePhase } from "@/data/products";

interface PhaseMarkerProps {
  phase: CyclePhase;
  className?: string;
}

/**
 * Etiqueta rectangular (sin pill) con punto de color de fase.
 * El color del punto proviene del token del sistema para la fase correspondiente.
 */
export function PhaseMarker({ phase, className }: PhaseMarkerProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border border-border bg-secondary px-3 py-1.5 font-sans text-[10px] uppercase tracking-editorial text-foreground",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5"
        style={{ backgroundColor: phaseAccent[phase] }}
      />
      {phaseLabel[phase]}
    </span>
  );
}
