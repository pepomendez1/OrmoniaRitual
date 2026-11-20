import { useEffect, useId, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { productHref } from "@/data/products";
import { learnCopy, readingHref } from "@/data/content";
import { searchCopy } from "@/data/shopCopy";
import { useLenisLock } from "@/hooks/useLenisLock";
import { useSiteSearch } from "@/hooks/useSiteSearch";
import { brandButton, eyebrowClass } from "@/lib/brandButton";
import { PriceTag } from "./PriceTag";
import { ProductVisual } from "./ProductVisual";
import { useSearchOverlay } from "./searchContext";

/**
 * Buscador — overlay desde arriba.
 *
 * Se eligió overlay y no página: convive con el header sin sacar a la persona
 * de donde está, y en mobile ocupa la pantalla completa. Radix Dialog da foco
 * atrapado, Escape y retorno del foco al botón BUSCAR.
 *
 * Estados: inicial (sugerencias), escribiendo/cargando, resultados y sin
 * resultados. Sin animaciones más allá de un fundido.
 */
export function SearchOverlay() {
  const { open, setOpen } = useSearchOverlay();
  const [query, setQuery] = useState("");
  const { results, status, total } = useSiteSearch(query);
  const statusId = useId();
  useLenisLock(open);

  // Cada apertura empieza limpia.
  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const close = () => setOpen(false);
  const showResults = status === "done" && total > 0;
  const showEmpty = status === "done" && total === 0;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-ink/25 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          aria-describedby={statusId}
          className="fixed inset-x-0 top-0 z-[61] flex max-h-[100svh] flex-col bg-ivory text-ink shadow-[0_24px_60px_-30px_rgba(25,21,17,0.35)] outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 max-md:h-[100svh] md:max-h-[86vh]"
        >
          <Dialog.Title className="sr-only">{searchCopy.label}</Dialog.Title>

          <div className="mx-auto flex w-full max-w-[1320px] items-center gap-4 border-b border-ink/12 px-6 py-4 md:px-10 md:py-6">
            <Search className="h-5 w-5 shrink-0 text-ink/60" aria-hidden="true" />
            <label htmlFor="site-search" className="sr-only">
              {searchCopy.placeholder}
            </label>
            <input
              id="site-search"
              type="search"
              autoComplete="off"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={searchCopy.placeholder}
              className="h-12 min-w-0 flex-1 bg-transparent focus-visible:shadow-none font-sans text-[1.35rem] tracking-[-0.02em] text-ink outline-none placeholder:text-ink/40 md:text-[1.9rem] [&::-webkit-search-cancel-button]:hidden"
            />
            <Dialog.Close
              aria-label={searchCopy.close}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink/70 transition-colors hover:text-ink"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </Dialog.Close>
          </div>

          <div data-lenis-prevent className="flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-[1320px] px-6 pb-12 pt-7 md:px-10 md:pt-9">
              <p id={statusId} aria-live="polite" className={`${eyebrowClass} text-ink/62`}>
                {status === "idle" && searchCopy.initialTitle}
                {status === "loading" && searchCopy.loading}
                {status === "done" && searchCopy.resultsCount(total)}
              </p>

              {status === "idle" && (
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {searchCopy.suggestions.map((term) => (
                    <li key={term}>
                      <button
                        type="button"
                        onClick={() => setQuery(term)}
                        className="rounded-full border border-ink/18 px-4 py-2 font-sans text-[13px] text-ink transition-colors duration-300 hover:border-ink/50"
                      >
                        {term}
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {showEmpty && (
                <div className="mt-6 max-w-[520px]">
                  <p className="font-sans text-[1.4rem] leading-[1.2] tracking-[-0.01em]">
                    {searchCopy.noResults(query.trim())}
                  </p>
                  <p className="mt-3 font-sans text-[13px] leading-relaxed text-ink/64">
                    {searchCopy.noResultsHint}
                  </p>
                  <Link
                    to="/products"
                    onClick={close}
                    className={`mt-7 ${brandButton({ variant: "secondary" })}`}
                  >
                    {searchCopy.viewShop}
                  </Link>
                </div>
              )}

              {showResults && results.products.length > 0 && (
                <section aria-label={searchCopy.products} className="mt-7">
                  <h2 className={`${eyebrowClass} text-ink`}>{searchCopy.products}</h2>
                  <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 lg:grid-cols-6">
                    {results.products.map((product) => (
                      <li key={product.id}>
                        <Link to={productHref(product)} onClick={close} className="group block">
                          <ProductVisual
                            product={product}
                            compact
                            className="aspect-[4/5] rounded-[14px]"
                          />
                          <p className="mt-3 font-sans text-[12px] uppercase tracking-[0.16em] text-ink group-hover:underline group-hover:underline-offset-4">
                            {product.name}
                          </p>
                          <PriceTag
                            product={product}
                            className="mt-1 block font-sans text-[12px] text-ink/72"
                            pendingClassName="text-[11px] text-ink/60"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {showResults && results.readings.length > 0 && (
                <section aria-label={searchCopy.readings} className="mt-10">
                  <h2 className={`${eyebrowClass} text-ink`}>{searchCopy.readings}</h2>
                  <ul className="mt-3">
                    {results.readings.map((reading) => (
                      <li key={reading.id} className="border-b border-ink/12">
                        <Link
                          to={readingHref(reading)}
                          onClick={close}
                          className="group flex items-center justify-between gap-6 py-5"
                        >
                          <span>
                            <span className="block font-sans text-[10px] uppercase tracking-[0.2em] text-ink/62">
                              {learnCopy.kindLabel[reading.kind]} · {reading.label}
                            </span>
                            <span className="mt-1.5 block font-display text-[1.25rem] leading-[1.15] tracking-[-0.02em] group-hover:underline group-hover:underline-offset-4">
                              {reading.title}
                            </span>
                          </span>
                          <ArrowRight className="h-4 w-4 shrink-0 text-ink/50 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
