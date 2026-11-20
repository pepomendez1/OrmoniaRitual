import { Link, Navigate, useLocation } from "react-router-dom";
import { skinReadingPlaceholder, skinResultCopy } from "@/data/skinQuiz";
import { clearStoredQuiz, readStoredQuiz } from "@/hooks/useSkinQuiz";
import { hasAnswers, readSkin, type QuizAnswers } from "@/lib/skinQuiz";
import { DiscoverShell } from "./DiscoverShell";
import { usePageTitle } from "@/hooks/usePageTitle";

/**
 * /descubri-tu-piel/resultado — shell del resultado.
 *
 * Está diseñado como el resultado final, pero su contenido es provisional y lo
 * declara: los ejes y los bloques no se infieren de las respuestas todavía.
 *
 * Las respuestas llegan por `location.state` y se pasan a `readSkin()`, que
 * hoy devuelve el contenido de demostración. Cuando Sprint 07B implemente el
 * modelo de fenotipos, cambia el cuerpo de esa función y esta vista queda
 * igual: ya consume la forma definitiva.
 *
 * La lectura separa el fenotipo —comportamiento estructural— del estado
 * actual —lo que la piel parece pedir ahora—, para no quedar atada a devolver
 * un único código fijo.
 *
 * Sin respuestas (entrada directa por URL o pestaña nueva) no hay lectura que
 * mostrar: se redirige al comienzo del recorrido en vez de presentar un
 * resultado que nadie generó.
 */
const DiscoverSkinResult = () => {
  usePageTitle("Tu lectura");
  const location = useLocation();
  const answers =
    (location.state as { answers?: QuizAnswers } | null)?.answers ??
    readStoredQuiz()?.answers ??
    {};

  if (!hasAnswers(answers)) {
    return <Navigate to="/descubri-tu-piel" replace />;
  }

  const reading = readSkin(answers, skinReadingPlaceholder);

  return (
    <DiscoverShell visualGroup="resultado" progress={1}>
      <div className="flex flex-1 flex-col gap-14 px-6 py-12 md:px-12 lg:px-16 lg:py-16">
        <div className="max-w-[560px]">
          <div className="flex flex-wrap items-center gap-4">
            <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-ink/66">
              {skinResultCopy.eyebrow}
            </p>
            {reading.provisional && (
              <span className="rounded-full border border-ink/20 px-3 py-1 font-sans text-[9px] uppercase tracking-[0.18em] text-ink/66">
                {skinResultCopy.provisionalBadge}
              </span>
            )}
          </div>

          <h1 className="mt-6 font-display text-[clamp(2rem,3.4vw,3rem)] leading-[1.04] tracking-[-0.035em]">
            {reading.phenotype.title}
          </h1>
          <p className="mt-5 font-sans text-[14px] leading-relaxed text-ink/68">
            {reading.phenotype.summary}
          </p>
        </div>

        {/* Lo que observamos — ejes de demostración. */}
        <section aria-labelledby="result-observed" className="max-w-[560px]">
          <h2
            id="result-observed"
            className="font-sans text-[10px] uppercase tracking-[0.24em] text-ink/66"
          >
            {skinResultCopy.observedTitle}
          </h2>
          <ul className="mt-7 flex flex-col gap-7">
            {reading.currentState.axes.map((axis) => (
              <li key={axis.id}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-sans text-[13px] uppercase tracking-[0.14em] text-ink">
                    {axis.label}
                  </span>
                  {/* Valores de demo: no se muestran como si fueran una
                      medición mientras la lectura sea provisional. */}
                  {!reading.provisional && (
                    <span className="font-sans text-[11px] text-ink/66">
                      {Math.round(axis.value * 100)}
                    </span>
                  )}
                </div>
                <div className="mt-3 h-px w-full bg-ink/12">
                  {!reading.provisional && (
                    <div
                      className="h-full bg-ink/70"
                      style={{ width: `${axis.value * 100}%` }}
                    />
                  )}
                </div>
                <p className="mt-3 font-sans text-[12px] leading-relaxed text-ink/66">
                  {axis.note}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Lo que tu piel parece pedir ahora. */}
        <section aria-labelledby="result-needs" className="max-w-[640px]">
          <h2
            id="result-needs"
            className="font-sans text-[10px] uppercase tracking-[0.24em] text-ink/66"
          >
            {skinResultCopy.needsTitle}
          </h2>
          <div className="mt-7 grid gap-7 sm:grid-cols-3">
            {reading.currentState.needs.map((need) => (
              <div key={need.title} className="border-t border-ink/14 pt-5">
                <h3 className="font-display text-[1.25rem] leading-[1.15] tracking-[-0.02em]">
                  {need.title}
                </h3>
                <p className="mt-3 font-sans text-[12px] leading-relaxed text-ink/66">
                  {need.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tu ritual — slots a la espera del modelo. */}
        <section aria-labelledby="result-ritual" className="max-w-[640px]">
          <h2
            id="result-ritual"
            className="font-sans text-[10px] uppercase tracking-[0.24em] text-ink/66"
          >
            {skinResultCopy.ritualTitle}
          </h2>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {skinResultCopy.ritualSlots.map((slot) => {
              const value = reading.ritual[slot.id as keyof typeof reading.ritual];
              return (
                <div
                  key={slot.id}
                  className="rounded-[14px] border border-dashed border-ink/20 px-5 py-6"
                >
                  <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-ink/66">
                    {slot.label}
                  </p>
                  <p className="mt-3 font-sans text-[13px] text-ink/70">
                    {value ?? "—"}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="mt-5 font-sans text-[12px] leading-relaxed text-ink/66">
            {skinResultCopy.ritualPending}
          </p>
        </section>

        <div className="flex flex-wrap items-center gap-6 pt-2">
          <Link
            to="/descubri-tu-piel"
            onClick={clearStoredQuiz}
            className="h-[52px] rounded-[11px] bg-ink px-8 font-sans text-[12px] uppercase leading-[52px] tracking-[0.2em] text-ivory transition-colors duration-300 hover:bg-deepBrown"
          >
            {skinResultCopy.restart}
          </Link>
          <Link
            to="/"
            className="font-sans text-[11px] uppercase tracking-[0.18em] text-ink/66 transition-colors duration-300 hover:text-ink"
          >
            {skinResultCopy.home}
          </Link>
          {/* Después de la lectura, no antes: la tienda como salida secundaria. */}
          <Link
            to="/products"
            className="font-sans text-[11px] uppercase tracking-[0.18em] text-ink/66 transition-colors duration-300 hover:text-ink"
          >
            {skinResultCopy.shop}
          </Link>
        </div>
      </div>
    </DiscoverShell>
  );
};

export default DiscoverSkinResult;
