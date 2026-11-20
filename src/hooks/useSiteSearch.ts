import { useEffect, useState } from "react";
import { searchSite, type SearchResults } from "@/lib/search";

export type SearchStatus = "idle" | "loading" | "done";

const EMPTY: SearchResults = { products: [], readings: [] };
/** Espera breve al tipear: evita recalcular (o pedir a la red) en cada tecla. */
const DEBOUNCE_MS = 160;

/** Estado de búsqueda: inicial, cargando, resultados o sin resultados. */
export function useSiteSearch(query: string) {
  const [results, setResults] = useState<SearchResults>(EMPTY);
  const [status, setStatus] = useState<SearchStatus>("idle");

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults(EMPTY);
      setStatus("idle");
      return;
    }
    setStatus("loading");
    let alive = true;
    const timer = window.setTimeout(() => {
      searchSite(query).then((next) => {
        if (!alive) return;
        setResults(next);
        setStatus("done");
      });
    }, DEBOUNCE_MS);
    return () => {
      alive = false;
      window.clearTimeout(timer);
    };
  }, [query]);

  const total = results.products.length + results.readings.length;
  return { results, status, total };
}
