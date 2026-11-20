import { getLenis } from "./lenis";

/**
 * Anclas internas de la Home ("/#el-ritual", "/#ciclo"…).
 *
 * React Router no hace scroll a un hash: cambia la URL y nada más. Estas
 * utilidades resuelven el scroll con Lenis (con fallback nativo si no está
 * activo, p. ej. con reduced motion), igual que `ScrollCTAButton`.
 */

/** Separa "/#serums" en ruta "/" e id "serums". `null` si no es un ancla. */
export function parseAnchorHref(
  href: string
): { path: string; id: string } | null {
  const index = href.indexOf("#");
  if (index === -1) return null;
  return { path: href.slice(0, index) || "/", id: href.slice(index + 1) };
}

/** Desplaza hasta el elemento con ese id. Devuelve `false` si no existe. */
export function scrollToAnchor(id: string, offset = -88): boolean {
  const el = document.getElementById(id);
  if (!el) return false;

  const lenis = getLenis();
  if (lenis) {
    // Tras un cambio de ruta Lenis puede conservar el alto de la página
    // anterior y recortar el destino a ese límite. Se remide antes de ir.
    lenis.resize();
    lenis.scrollTo(el, { offset, duration: 1.4 });
    return true;
  }

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  return true;
}
