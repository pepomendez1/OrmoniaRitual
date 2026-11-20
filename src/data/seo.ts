import { brandCopy } from "./content";

/**
 * Metadatos por ruta.
 *
 * Una sola tabla para title, description y og:image de las páginas
 * principales. Las PDP y lecturas los derivan de su propio dato (nombre y
 * descripción corta) en vez de repetirlos acá.
 *
 * Canonical y og:url necesitan el dominio definitivo: se leen de
 * `VITE_SITE_URL`. Mientras no esté, no se escriben (una URL relativa en
 * canonical es peor que ninguna).
 */
export interface PageMeta {
  /** Sin la marca: el hook agrega " — ORMONIA". `null` = título de marca. */
  title: string | null;
  description?: string;
  /** Ruta pública de la imagen OG. */
  image?: string;
  /** Path para canonical. Si falta, se usa `location.pathname`. */
  path?: string;
  noindex?: boolean;
}

export const DEFAULT_DESCRIPTION =
  "ORMONIA. Fórmulas pensadas para acompañar lo que tu piel necesita. Lo que cambia adentro se expresa afuera.";

export const DEFAULT_OG_IMAGE = "/pradera-y-caballo.jpg";

export const pageMeta = {
  home: {
    title: null,
    description: DEFAULT_DESCRIPTION,
  },
  shop: {
    title: "Tienda",
    description:
      "El Ritual, el Calendario cíclico y los sérums CLARITY, BLOOM, RADIANCE y RESTORE.",
    image: "/products/pack-box-open.jpg",
  },
  about: {
    title: "Nosotros",
    description: brandCopy.tagline,
  },
  explore: {
    title: "Explorar",
    description: "Lecturas para el ritual: botánica, ciclo y cuidado.",
  },
  calendar: {
    title: "Calendario cíclico",
    description:
      "Una herramienta para observar y registrar cómo cambia tu piel a lo largo del mes.",
  },
  discover: {
    title: "Test de perfil de piel",
    description:
      "Un recorrido breve para entender cómo se comporta tu piel y qué necesita hoy.",
  },
  cart: { title: "Carrito", noindex: true },
  account: { title: "Cuenta", noindex: true },
  notFound: { title: "Página no encontrada", noindex: true },
} satisfies Record<string, PageMeta>;

export type PageMetaKey = keyof typeof pageMeta;
