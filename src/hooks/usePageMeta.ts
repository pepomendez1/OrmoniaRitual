import { useEffect } from "react";
import { brandCopy } from "@/data/content";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  pageMeta,
  type PageMeta,
  type PageMetaKey,
} from "@/data/seo";

const HOME_TITLE = `${brandCopy.wordmark} — ${brandCopy.tagline}`;
const SITE_URL = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "") ?? null;

/** Crea o actualiza un `<meta>`; `null` lo elimina. */
function setMeta(attr: "name" | "property", key: string, value: string | null) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (value == null) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function setCanonical(href: string | null) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!href) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}

const absolute = (path: string) => (SITE_URL ? `${SITE_URL}${path}` : path);

/**
 * Metadatos de la página: title, description, Open Graph y canonical.
 *
 * Acepta una clave de `data/seo.ts` ("shop", "about"…) o un objeto armado
 * por la página (PDP, lectura). SPA sin SSR: los crawlers que ejecutan JS
 * los leen; para previews de redes sociales hará falta prerender cuando
 * exista el dominio (documentado en ORMONIA_INTEGRAL_PASS.md).
 */
export function usePageMeta(input: PageMetaKey | PageMeta) {
  const meta: PageMeta = typeof input === "string" ? pageMeta[input] : input;
  const { title, description, image, path, noindex } = meta;

  useEffect(() => {
    const fullTitle = title ? `${title} — ${brandCopy.wordmark}` : HOME_TITLE;
    const desc = description ?? DEFAULT_DESCRIPTION;
    const pathname = path ?? window.location.pathname;
    const url = SITE_URL ? `${SITE_URL}${pathname}` : null;

    document.title = fullTitle;
    setMeta("name", "description", desc);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", desc);
    setMeta("property", "og:image", absolute(image ?? DEFAULT_OG_IMAGE));
    setMeta("property", "og:url", url);
    setMeta("name", "robots", noindex ? "noindex" : null);
    setCanonical(url);
  }, [title, description, image, path, noindex]);
}
