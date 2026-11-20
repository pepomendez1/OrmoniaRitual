import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { skinQuizCopy } from "@/data/skinQuiz";
import type { VisualGroup } from "@/lib/skinQuiz";
import { DiscoverVisual } from "./DiscoverVisual";
import { Wordmark } from "@/components/brand/Wordmark";

interface DiscoverShellProps {
  visualGroup: VisualGroup;
  /** 0–1. Si es `null`, no se dibuja la barra. */
  progress: number | null;
  stepLabel?: string;
  children: ReactNode;
}

/**
 * Marco de la experiencia "Descubrí tu piel".
 *
 * Header propio y mínimo —wordmark y salida, nada de tienda, cuenta ni
 * carrito— porque la persona está dentro de una experiencia enfocada y el
 * header de ecommerce solo ofrecería formas de abandonarla.
 *
 * Split persistente en desktop: el panel visual no se desmonta al cambiar de
 * pregunta, así el fundido entre bloques es continuo. En pantallas angostas
 * queda una sola columna, sin el panel visual: hasta que exista la fotografía
 * de producción, una franja tonal en mobile no suma contexto y empuja la
 * pregunta hacia abajo.
 */
export function DiscoverShell({
  visualGroup,
  progress,
  stepLabel,
  children,
}: DiscoverShellProps) {
  return (
    <div className="flex min-h-[100svh] flex-col bg-ivory text-ink">
      <header className="shrink-0">
        {progress !== null && (
          <div
            className="h-px w-full shrink-0 bg-ink/10"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
            aria-label="Progreso del cuestionario"
          >
            <div
              className="h-full bg-ink/70 motion-safe:transition-[width] motion-safe:duration-500 motion-safe:ease-out"
              style={{ width: `${Math.max(0, Math.min(1, progress)) * 100}%` }}
            />
          </div>
        )}

        <div className="flex items-center justify-between px-6 py-5 md:px-10">
          <Link
            to="/"
            aria-label="ORMONIA — Inicio"
            className="text-ink"
          >
            <Wordmark title="" className="h-[14px] md:h-[16px]" />
          </Link>

          <div className="flex items-center gap-6">
            {stepLabel && (
              <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-ink/66">
                {stepLabel}
              </span>
            )}
            <Link
              to="/"
              className="font-sans text-[10px] uppercase tracking-[0.2em] text-ink/66 transition-colors duration-300 hover:text-ink"
            >
              {skinQuizCopy.close}
            </Link>
          </div>
        </div>
      </header>

      <div className="grid flex-1 lg:grid-cols-[42fr_58fr]">
        <div className="relative hidden lg:block">
          <DiscoverVisual group={visualGroup} />
        </div>
        <main id="main" className="flex min-h-0 flex-col">
          {children}
        </main>
      </div>
    </div>
  );
}
