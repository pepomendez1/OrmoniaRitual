import { catalog, productKicker, type Product } from "@/data/products";
import { learnCopy, type Reading } from "@/data/content";

/**
 * Búsqueda sobre los datos locales: productos (nombre, tagline, descripción,
 * activos, fase) y lecturas (título, bajada, etiqueta).
 *
 * Es async a propósito: cuando exista Shopify, el cuerpo pasa a la Predictive
 * Search API y las vistas ya manejan el estado de carga.
 */

export interface SearchResults {
  products: Product[];
  readings: Reading[];
}

/** Minúsculas y sin tildes: "sérum" encuentra "serum" y viceversa. */
export function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

function score(haystack: string[], terms: string[]): number {
  const fields = haystack.map(normalize);
  let total = 0;
  for (const term of terms) {
    let best = 0;
    fields.forEach((field, index) => {
      if (!field.includes(term)) return;
      // Un acierto en el nombre (primer campo) pesa más que en la descripción.
      const weight = index === 0 ? 4 : index === 1 ? 2 : 1;
      const atStart = field.startsWith(term) || field.includes(` ${term}`) ? 1 : 0;
      best = Math.max(best, weight + atStart);
    });
    // Todos los términos tienen que aparecer en algún campo.
    if (best === 0) return 0;
    total += best;
  }
  return total;
}

function rank<T>(items: T[], fields: (item: T) => string[], terms: string[]): T[] {
  return items
    .map((item) => ({ item, s: score(fields(item), terms) }))
    .filter((entry) => entry.s > 0)
    .sort((a, b) => b.s - a.s)
    .map((entry) => entry.item);
}

export async function searchSite(query: string): Promise<SearchResults> {
  const terms = normalize(query).split(/\s+/).filter((t) => t.length > 1);
  if (terms.length === 0) return { products: [], readings: [] };

  return {
    products: rank(
      catalog,
      (p) => [
        p.name,
        `${productKicker(p)} ${p.tagline}`,
        p.description,
        p.ingredients.join(" "),
        p.category === "calendar" ? "calendario ciclico registro observar" : "",
        (p.searchKeywords ?? []).join(" "),
        p.category === "serum" ? "serum serums" : "",
      ],
      terms
    ),
    readings: rank(
      learnCopy.readings,
      (r) => [r.title, r.label, r.teaser, learnCopy.kindLabel[r.kind]],
      terms
    ),
  };
}

