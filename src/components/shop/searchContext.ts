import { createContext, useContext } from "react";

export interface SearchOverlayState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const SearchContext = createContext<SearchOverlayState | null>(null);

/** Abre/cierra el buscador desde cualquier lugar (header, menú mobile). */
export function useSearchOverlay(): SearchOverlayState {
  const value = useContext(SearchContext);
  if (!value) throw new Error("useSearchOverlay requiere el layout raíz.");
  return value;
}
