import { usePageMeta } from "./usePageMeta";

/**
 * Atajo histórico: solo el título ("Tienda — ORMONIA"). Sin argumento deja el
 * título de marca. Para description/OG usar `usePageMeta` directamente.
 */
export function usePageTitle(title?: string | null) {
  usePageMeta({ title: title ?? null });
}
