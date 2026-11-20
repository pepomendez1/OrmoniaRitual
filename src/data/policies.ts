import { formatPrice } from "@/lib/price";
import { FREE_SHIPPING_THRESHOLD } from "./shopCopy";

/**
 * Páginas de ayuda y legales (/ayuda/:slug).
 *
 * NO HAY TEXTOS LEGALES TODAVÍA, y no se redactan acá: términos, privacidad,
 * cambios y devoluciones necesitan validación legal (en Argentina, además, el
 * "Botón de arrepentimiento", Res. SCI 424/2020 — ver Audit Roadmap).
 *
 * Cada página declara solo lo que está confirmado (`facts`). `body` en `null`
 * muestra un aviso de "en preparación". Al tener el texto, se completa `body`
 * con párrafos y el aviso desaparece.
 */
export interface Policy {
  slug: string;
  title: string;
  /** Datos confirmados que ya se pueden publicar. */
  facts: string[];
  /** Texto final, validado. `null` mientras no exista. */
  body: string[] | null;
}

export const policies: Policy[] = [
  {
    slug: "envios",
    title: "Envíos",
    facts: [
      `Envío gratis en órdenes mayores a ${formatPrice(FREE_SHIPPING_THRESHOLD)}.`,
      "Los costos y plazos de envío se calculan al finalizar la compra.",
    ],
    body: null,
  },
  { slug: "cambios-y-devoluciones", title: "Cambios y devoluciones", facts: [], body: null },
  { slug: "preguntas-frecuentes", title: "Preguntas frecuentes", facts: [], body: null },
  { slug: "contacto", title: "Contacto", facts: [], body: null },
  { slug: "terminos", title: "Términos y condiciones", facts: [], body: null },
  { slug: "privacidad", title: "Política de privacidad", facts: [], body: null },
];

export const policyCopy = {
  eyebrow: "Ayuda",
  pending: "Esta página se completa antes de abrir la tienda.",
  others: "Más ayuda",
  notFound: "No encontramos esa página de ayuda.",
};
