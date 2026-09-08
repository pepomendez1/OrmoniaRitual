import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { discoverPopupCopy } from "@/data/content";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "ormonia:discover-popup";
/** Una vez cerrado, no vuelve a aparecer durante 14 días. */
const SNOOZE_MS = 14 * 24 * 60 * 60 * 1000;
/** Nunca al cargar: se abre por tiempo o por profundidad de scroll. */
const DELAY_MS = 16000;
const SCROLL_RATIO = 0.28;

function isSnoozed(): boolean {
  try {
    if (sessionStorage.getItem(STORAGE_KEY) === "seen") return true;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const until = Number(raw);
    return Number.isFinite(until) && Date.now() < until;
  } catch {
    // Almacenamiento bloqueado (modo privado): se comporta como no visto.
    return false;
  }
}

function snooze() {
  try {
    sessionStorage.setItem(STORAGE_KEY, "seen");
    localStorage.setItem(STORAGE_KEY, String(Date.now() + SNOOZE_MS));
  } catch {
    // Sin almacenamiento no hay memoria entre visitas; no es un error crítico.
  }
}

/**
 * Invitación diferida al descubrimiento de piel / fenotipo (Sprint 01).
 *
 * No es un modal: es un panel discreto anclado abajo, sin overlay ni captura
 * de foco, para no arruinar la primera impresión del hero. Aparece por delay
 * o por scroll (lo que ocurra primero, nunca al cargar), se puede cerrar y
 * recuerda el cierre en session/localStorage con una frecuencia razonable.
 *
 * NO implementa el quiz: el CTA resuelve provisionalmente en /discover.
 * La lógica de fenotipos pertenece al Sprint 07.
 */
export function DiscoverPopup() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const armedRef = useRef(true);

  const dismiss = useCallback(() => {
    armedRef.current = false;
    setOpen(false);
    snooze();
  }, []);

  useEffect(() => {
    if (isSnoozed()) return;

    const reveal = () => {
      if (!armedRef.current) return;
      armedRef.current = false;
      setOpen(true);
    };

    const timer = window.setTimeout(reveal, DELAY_MS);

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= SCROLL_RATIO) reveal();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, dismiss]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-labelledby="discover-popup-title"
      aria-describedby="discover-popup-body"
      className={cn(
        "fixed bottom-5 left-5 right-5 z-[60] max-w-[380px] border border-ink/10 bg-ivory/95 p-7 shadow-[0_24px_60px_rgba(52,33,21,0.16)] backdrop-blur-xl",
        "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700",
        "sm:left-7 sm:right-auto sm:bottom-7"
      )}
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label={discoverPopupCopy.close}
        className="absolute right-4 top-4 text-ink/40 transition-colors hover:text-ink"
      >
        <X className="h-4 w-4" />
      </button>

      <p className="font-sans text-[9px] uppercase tracking-[0.26em] text-ink/45">
        {discoverPopupCopy.eyebrow}
      </p>
      <h2
        id="discover-popup-title"
        className="mt-4 font-display text-[2rem] leading-[1.02] tracking-[-0.03em] text-ink"
      >
        {discoverPopupCopy.title}
      </h2>
      <p
        id="discover-popup-body"
        className="mt-4 font-sans text-[13px] leading-relaxed text-ink/62"
      >
        {discoverPopupCopy.body}
      </p>
      <p className="mt-5 font-sans text-[9px] uppercase tracking-[0.2em] text-terracotta">
        {discoverPopupCopy.incentive}
      </p>

      <div className="mt-7 flex items-center gap-6">
        <Link
          to={discoverPopupCopy.ctaHref}
          onClick={dismiss}
          className="group inline-flex items-center gap-3 border-b border-ink/45 pb-1.5 font-sans text-[10px] uppercase tracking-[0.2em] text-ink transition-colors hover:border-ink"
        >
          {discoverPopupCopy.cta}
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
        <button
          type="button"
          onClick={dismiss}
          className="font-sans text-[10px] uppercase tracking-[0.18em] text-ink/40 transition-colors hover:text-ink/70"
        >
          {discoverPopupCopy.dismiss}
        </button>
      </div>
    </div>
  );
}
