import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "@/lib/gsap";
import { scrollToAnchor } from "@/lib/anchor";

/** Tiempo para que GSAP monte los pins antes de medir el destino. */
const SETTLE_MS = 450;

/**
 * Anclas que cambiaron de nombre o de sección. `#ritmo` era la escena de
 * Agua + El Registro, ya desmontada: El Registro vive ahora en el cierre.
 */
const ALIASES: Record<string, string> = {
  ritmo: "unite-al-ritual",
  /** Ancla histórica de la sección de El Ritual. */
  "pack-x4": "el-ritual",
};

/**
 * Al llegar a una página con hash ("/#ciclo" desde otra ruta), desplaza hasta
 * el ancla. Espera a que ScrollTrigger cree los pins: si se mide antes, las
 * posiciones de las secciones pinneadas todavía no son las reales.
 */
export function useHashScroll() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const raw = decodeURIComponent(hash.slice(1));
    const id = ALIASES[raw] ?? raw;
    const timer = window.setTimeout(() => {
      ScrollTrigger.refresh();
      scrollToAnchor(id);
    }, SETTLE_MS);
    return () => window.clearTimeout(timer);
  }, [hash]);
}
