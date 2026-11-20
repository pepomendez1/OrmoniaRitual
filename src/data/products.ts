/**
 * Catálogo ORMONIA.
 *
 * Un solo modelo para todo lo que se vende —sérums, El Ritual, el Calendario
 * cíclico y lo que venga (AURA)— para que Tienda, PDP, carrito y búsqueda
 * recorran la misma lista sin casos especiales.
 *
 * FUENTE DEL DATO
 * Hoy el catálogo es local. Cuando exista Shopify, precio, disponibilidad,
 * inventario y variante pasan a venir de la Storefront API (ver
 * `src/commerce/README.md`); el contenido editorial (copy, activos, galería)
 * puede quedarse acá o migrar a metafields. Las vistas no cambian.
 *
 * DATOS QUE NO EXISTEN TODAVÍA
 * Se dejan en `null`, `undefined` o `[]`. Las vistas esconden el bloque
 * correspondiente: nunca se muestra un valor inventado ni un lorem ipsum.
 * El inventario de lo que falta está en `ORMONIA_INTEGRAL_PASS.md`.
 */

import { productionMedia, type ProductionImage } from "./productionMedia";

/** Foto de producción → media de galería/hover del catálogo. */
function fromProduction(image: ProductionImage): ProductMedia {
  return { src: image.src, alt: image.alt, fit: "cover", objectPosition: image.objectPosition };
}

export type CyclePhase = "Menstrual" | "Follicular" | "Ovulatory" | "Luteal";

/**
 * Qué es cada producto. Gobierna el template de PDP y la sección de la
 * Tienda; no implica nada sobre cuándo usarlo.
 */
export type ProductCategory = "serum" | "set" | "calendar" | "mist";

export interface ProductMedia {
  src: string;
  alt: string;
  kind?: "image" | "video";
  /** Recorte por breakpoint. Mobile cae al de desktop si no se declara. */
  objectPosition?: string;
  objectPositionMobile?: string;
  /** `contain` para packshots sobre fondo; `cover` para fotografía. */
  fit?: "contain" | "cover";
}

/**
 * Escena fotográfica de un sérum dentro de El Ciclo.
 *
 * Toda la parte visual que depende de la foto vive acá —archivo, recortes,
 * tono y tinta del texto—, así una imagen o un crop se cambia sin tocar la
 * animación (`CycleSection` solo lee estos datos).
 */
export interface CycleScene {
  /** Versión web optimizada (`public/cycle/`). Los originales: `assets-source/cycle/`. */
  src: string;
  /** Recorte en desktop: escena pineada a pantalla completa (≈16:10–16:9). */
  objectPosition: string;
  /** Recorte en mobile: columna vertical, la foto 16:9 se recorta fuerte. */
  objectPositionMobile: string;
  /**
   * Brillo de la foto detrás del texto. Decide el tono declarativo del header
   * (`data-header-tone`): "dark" → navegación ivory; "light" → ink.
   */
  tone: "light" | "dark";
  /** Tinta del copy sobre esta foto (titular, fase, indicador). */
  ink: string;
  /** Color promedio de la foto: se ve mientras carga, así no hay flash. */
  base: string;
  /**
   * Velo localizado detrás del copy, solo si el crop y la tinta no alcanzan
   * para la legibilidad. Debe ser casi imperceptible. Por defecto, ninguno.
   */
  textScrim?: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface Product {
  /** Identificador estable interno. Hoy coincide con el slug. */
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  /** Referencia de fase. Metadata secundaria: nunca condiciona la compra. */
  phase: CyclePhase | null;
  /**
   * Precio en pesos, sin decimales. `null` = todavía no definido: la UI
   * muestra "Precio a confirmar" y no calcula ahorros ni totales con él.
   * PROVISIONAL hasta Shopify. Nunca escribir precios en el JSX.
   */
  price: number | null;
  /** Precio de referencia tachado. Solo con dato real confirmado. */
  compareAtPrice?: number | null;

  /* — Shopify. `null` hasta que el producto exista en la tienda. — */
  shopifyProductId?: string | null;
  /** Variante única inicial. No se inventan variantes. */
  shopifyVariantId?: string | null;
  /** Unidades. `null` = desconocido (no se muestra "quedan X"). */
  inventory?: number | null;
  /**
   * Disponibilidad comercial. `undefined` = sin dato todavía: se trata como
   * disponible para la demo de carrito, sin afirmar stock.
   */
  available?: boolean;
  comingSoon?: boolean;

  /* — Contenido. — */
  tagline: string;
  /** Descripción corta: cards, buscador, carrito, metadatos SEO. */
  description: string;
  /** Meta description propia, si difiere de `description`. */
  metaDescription?: string;
  /**
   * Términos de búsqueda internos. Permiten encontrar el producto por nombres
   * que NO se muestran (p. ej. "pack x4" para El Ritual).
   */
  searchKeywords?: string[];
  /** Activos principales (nombres comunicables tal como figuran hoy). */
  ingredients: string[];
  /** Lista INCI completa. Pendiente de laboratorio. */
  inci?: string | null;
  /** Párrafos de detalle para la PDP. */
  details?: string[];
  /** Pasos de uso. Pendiente: el Master Plan pide no reducirlo a "2–3 gotas". */
  howToUse?: string[];
  texture?: string | null;
  /** Medidas, materiales, contenido neto… solo con dato confirmado. */
  specs?: ProductSpec[];
  /** Para sets: slugs de los productos que incluye. Para el calendario: piezas. */
  includes?: string[];
  faq?: ProductFaq[];

  /** Escena de El Ciclo (solo sérums con fase). */
  cycleScene?: CycleScene;

  /* — Media. — */
  imageSrc?: string;
  imageAlt?: string;
  /** Recorte de `imageSrc` cuando el marco no tiene su misma proporción. */
  imageObjectPosition?: string;
  /**
   * Fotografía de campaña que se revela en el hover de la card (solo en
   * punteros con hover). Sale de `productionMedia`. Sin ella la card muestra
   * el placeholder "INSERTAR VIDEO".
   */
  hoverImageSrc?: string;
  hoverObjectPosition?: string;
  /** Galería de PDP, además de `imageSrc`. */
  gallery?: ProductMedia[];
  /**
   * Fotografía editorial de la sección "En campo" de la PDP. Separada de la
   * galería a propósito: una misma foto no aparece dos veces en la página.
   */
  campaign?: ProductMedia[];
}

/**
 * Color de acento por fase (token del sistema de diseño).
 * Menstrual → terracotta, Follicular → olive, Ovulatory → amber, Luteal → deepBrown.
 */
export const phaseAccent: Record<CyclePhase, string> = {
  Menstrual: "hsl(var(--color-terracotta))",
  Follicular: "hsl(var(--color-olive))",
  Ovulatory: "hsl(var(--color-amber))",
  Luteal: "hsl(var(--color-deep-brown))",
};

export const phaseLabel: Record<CyclePhase, string> = {
  Menstrual: "Menstrual",
  Follicular: "Folicular",
  Ovulatory: "Ovulatoria",
  Luteal: "Lútea",
};

/**
 * Tono de fondo por producto. Cuatro temperaturas sobre el mismo campo claro:
 * dan identidad propia a cada sérum sin que el color sea el único indicador.
 */
export const productTone: Record<string, string> = {
  clarity: "#DCC9C2",
  bloom: "#D6DBC6",
  radiance: "#DCD6B4",
  restore: "#D6C6B4",
  "el-ritual": "#E2D6C4",
  "calendario-ciclico": "#E7DDCC",
};

/** Para productos sin tono propio (AURA y futuros lanzamientos). */
export const NEUTRAL_TONE = "#DED6C7";

export function toneOf(product: Product): string {
  return productTone[product.slug] ?? NEUTRAL_TONE;
}

/* ───────────────────────────── Sérums ───────────────────────────── */

export const serums: Product[] = [
  {
    id: "clarity",
    // Cálido · ámbar · aceite · tierra · caléndula y rosa mosqueta.
    cycleScene: {
      src: "/cycle/clarity.jpg",
      // Se corre a la derecha: el lino terracota sale de la zona del eyebrow y
      // la etiqueta de fase; el aceite queda bajo el titular y el frasco
      // sobre la roca, entre los pétalos.
      objectPosition: "92% 50%",
      // Ventana sobre la roca: pétalos arriba, piedra lisa detrás del frasco.
      objectPositionMobile: "62% 50%",
      tone: "light",
      ink: "#2B1D13",
      base: "#936E4A",
    },
    slug: "clarity",
    category: "serum",
    price: 55000,
    imageSrc: "/products/clarity.webp",
    hoverImageSrc: productionMedia.serums.clarity.hover.src,
    hoverObjectPosition: productionMedia.serums.clarity.hover.objectPosition,
    gallery: productionMedia.serums.clarity.gallery.map(fromProduction),
    name: "CLARITY",
    phase: "Menstrual",
    tagline: "Claridad que retorna.",
    description:
      "Un serum de baja densidad para los días de introspección. Calma la sensibilidad y devuelve luminosidad apagada.",
    ingredients: ["Jojoba", "Caléndula", "Rosa mosqueta", "Vitamina E"],
  },
  {
    id: "bloom",
    // Fresco · húmedo · pale sage · mañana.
    cycleScene: {
      src: "/cycle/bloom.jpg",
      /*
       * El archivo tiene una costura vertical en su mitad exacta (x = 50%):
       * el recorte la lleva lo más a la izquierda posible, hacia la zona de
       * copy y lejos del frasco protagonista.
       */
      objectPosition: "100% 50%",
      // Ventana a la izquierda de la costura: agua arriba, piedra pálida abajo.
      objectPositionMobile: "18% 50%",
      tone: "light",
      ink: "#22261A",
      base: "#AAA391",
    },
    slug: "bloom",
    category: "serum",
    price: 55000,
    imageSrc: "/products/bloom.webp",
    hoverImageSrc: productionMedia.serums.bloom.hover.src,
    hoverObjectPosition: productionMedia.serums.bloom.hover.objectPosition,
    gallery: productionMedia.serums.bloom.gallery.map(fromProduction),
    name: "BLOOM",
    phase: "Follicular",
    tagline: "Despierta y florece.",
    description:
      "Para el momento de energía ascendente. Equilibra, renueva y prepara la piel para los días de mayor vitalidad.",
    ingredients: [
      "Niacinamida",
      "Glicerina",
      "Sodium Hyaluronate",
      "Acetyl Hexapeptide-8",
    ],
  },
  {
    id: "radiance",
    // Luminoso · agua · sol · piedra clara.
    cycleScene: {
      src: "/cycle/radiance.jpg",
      // Toda la lámina de agua a la vista; las piedras quedan a la derecha.
      objectPosition: "30% 50%",
      // Centro de agua calma, sin piedras sueltas detrás del frasco.
      objectPositionMobile: "42% 50%",
      tone: "light",
      ink: "#2A2418",
      base: "#B8A792",
      // Los reflejos del agua comían la etiqueta chica de fase: un lavado ivory
      // muy suave, solo del lado del copy, los calma sin oscurecer la foto.
      textScrim:
        "linear-gradient(90deg, rgba(242,235,221,0.34) 0%, rgba(242,235,221,0.2) 26%, rgba(242,235,221,0) 46%)",
    },
    slug: "radiance",
    category: "serum",
    price: 55000,
    imageSrc: "/products/radiance.webp",
    hoverImageSrc: productionMedia.serums.radiance.hover.src,
    hoverObjectPosition: productionMedia.serums.radiance.hover.objectPosition,
    gallery: productionMedia.serums.radiance.gallery.map(fromProduction),
    name: "RADIANCE",
    phase: "Ovulatory",
    tagline: "Luz en su punto alto.",
    description:
      "El serum de mayor potencia. Ilumina, afina la textura y acompaña el pico natural de luminosidad.",
    ingredients: ["Magnesium Ascorbyl Phosphate", "Glicerina", "Panthenol"],
  },
  {
    id: "restore",
    // Profundo · musgo · centella · humedad de bosque.
    cycleScene: {
      src: "/cycle/restore.jpg",
      // Hojas de centella a la izquierda, roca y lino detrás del frasco.
      objectPosition: "40% 50%",
      // Ventana sobre la roca, con hojas de centella arriba y abajo.
      objectPositionMobile: "52% 50%",
      tone: "dark",
      ink: "#F2EBDD",
      base: "#464A2D",
    },
    slug: "restore",
    category: "serum",
    price: 55000,
    imageSrc: "/products/restore.webp",
    hoverImageSrc: productionMedia.serums.restore.hover.src,
    hoverObjectPosition: productionMedia.serums.restore.hover.objectPosition,
    gallery: productionMedia.serums.restore.gallery.map(fromProduction),
    name: "RESTORE",
    phase: "Luteal",
    tagline: "Repara y prepara.",
    description:
      "Densidad nutritiva para los días previos. Repara la barrera cutánea y suaviza las señales del ciclo que se acerca.",
    ingredients: ["Glicerina", "Centella asiática", "Pentapeptide-18"],
  },
];

/**
 * Alias histórico: El Ciclo y el riel de Los esenciales recorren `products`
 * esperando solo sérums. Se conserva para no tocar esas secciones aprobadas.
 */
export const products = serums;

/* ───────────────────────── El Ritual (id interno: pack-x4) ───────────────────────── */

/**
 * EL RITUAL — el ritual completo.
 *
 * INTERNO vs VISIBLE: el id (`pack-x4`), la constante (`packX4`) y el
 * template (`PackDetail`) conservan el nombre histórico para no invalidar
 * carritos guardados ni referencias. De cara al cliente "Pack x4" no existe:
 * se llama El Ritual y vive en `/products/el-ritual` (`/products/pack-x4`
 * redirige). "pack", "x4", "4 sérums" solo sirven como palabras de búsqueda.
 *
 * Se presenta como el ritual ORMONIA, no como un bundle de cuatro productos:
 * su valor es el sistema completo. Por decisión de marca NO se comunica
 * ahorro frente a los sérums sueltos, aunque exista diferencia de precio.
 */
export const packX4: Product = {
  id: "pack-x4",
  slug: "el-ritual",
  category: "set",
  name: "El Ritual",
  phase: null,
  /** Precio confirmado (ARS). Fuente canónica hasta Shopify. */
  price: 160000,
  tagline: "Las 4 fases, un solo ritual.",
  description:
    "Cuatro fórmulas para acompañar los distintos momentos de tu piel y construir una forma más consciente de observarla.",
  metaDescription: "Las 4 fases, un solo ritual. Conocé El Ritual de ORMONIA.",
  searchKeywords: ["pack", "pack x4", "x4", "4 serums", "cuatro serums", "set", "estuche", "ritual completo"],
  ingredients: [],
  includes: ["clarity", "bloom", "radiance", "restore"],
  imageSrc: "/products/pack-box-open.jpg",
  imageAlt: "Estuche abierto de El Ritual de ORMONIA con las cuatro fórmulas en su interior.",
  // Default: el estuche (packaging). Hover: los cuatro sérums sobre el cuerpo,
  // producción real que comunica el ritual como sistema.
  hoverImageSrc: productionMedia.ritual.onBody.src,
  hoverObjectPosition: productionMedia.ritual.onBody.objectPosition,
  // Las cuatro fórmulas juntas (DSC04246) viven en "El ritual incluye" de la
  // PDP: no se repiten acá.
  gallery: [
    {
      src: "/products/pack-box-hand.jpg",
      alt: "Una mano retira una fórmula del estuche de El Ritual.",
      fit: "cover",
    },
    {
      src: "/products/pack-box-dark.jpg",
      alt: "Estuche negro de El Ritual visto desde arriba.",
      fit: "cover",
    },
  ],
};

/* ──────────────────────── Calendario cíclico ──────────────────────── */

/**
 * Calendario cíclico ORMONIA — herramienta de observación y registro.
 *
 * NO predice, diagnostica, equilibra ni regula nada: acompaña a mirar. Todo
 * lo que describe el objeto físico (medidas, materiales, páginas, interior)
 * está pendiente y se deja vacío. La página editorial vive en `/calendario`
 * (`data/calendar.ts`); esta ficha es la comercial.
 *
 * Precio confirmado: $25.000. Imágenes: mockups PROVISIONALES de
 * `/production-temp/calendar/` (portada + interior). Si se quitan, la UI
 * vuelve a `CalendarVisual`, un visual provisional
 * de portada que no describe el interior.
 */
export const calendarProduct: Product = {
  id: "calendario-ciclico",
  slug: "calendario-ciclico",
  category: "calendar",
  name: "Calendario cíclico",
  phase: null,
  /** Precio confirmado (ARS). Fuente canónica hasta Shopify. */
  price: 25000,
  tagline: "Una herramienta para observar tu piel.",
  description:
    "Un objeto del ritual para registrar cómo se ve y se siente tu piel a lo largo del mes.",
  ingredients: [],
  // TEMPORAL · mockups de producto. Reemplazar por la fotografía final.
  imageSrc: "/production-temp/calendar/calendario-producto.jpg",
  imageAlt: "Calendario cíclico ORMONIA: portada con el mapa de las fases de la luna y el libro abierto detrás.",
  imageObjectPosition: "50% 100%",
  hoverImageSrc: "/production-temp/calendar/calendario-abierto.jpg",
  hoverObjectPosition: "50% 45%",
  // Pendientes: medidas, materiales, cantidad de páginas, contenido interior.
  specs: [],
  includes: [],
  howToUse: [],
  gallery: [
    {
      src: "/production-temp/calendar/calendario-abierto.jpg",
      alt: "Calendario cíclico abierto: página de presentación y mapa cíclico circular.",
      fit: "cover",
    },
    {
      src: "/production-temp/calendar/calendario-paginas.jpg",
      alt: "Portada y páginas interiores del Calendario cíclico: mapa cíclico, etapas, registro diario y reflexiones.",
      fit: "cover",
    },
  ],
};

/* ──────────────────────────── Futuro ──────────────────────────── */

export const auraTeaser: Product = {
  id: "aura",
  slug: "aura",
  category: "mist",
  name: "AURA",
  phase: null,
  price: null,
  tagline: "Niebla de aura.",
  description:
    "Una niebla facial de cierre del ritual. Próximamente, para sellar y extender el cuidado más allá del rostro.",
  ingredients: [],
  comingSoon: true,
  available: false,
};

/**
 * Todo lo vendible, en el orden de la Tienda. AURA queda fuera: se muestra
 * aparte como "próximamente" y no entra al carrito ni al buscador comercial.
 */
export const catalog: Product[] = [packX4, calendarProduct, ...serums];

/** Devuelve un producto por slug (incluye el teaser de AURA). */
export function getProductBySlug(slug: string): Product | undefined {
  return [...catalog, auraTeaser].find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return [...catalog, auraTeaser].find((p) => p.id === id);
}

export function productHref(product: Pick<Product, "slug">): string {
  return `/products/${product.slug}`;
}

/**
 * ¿Se puede agregar al carrito? Requiere precio definido: un producto con
 * `price === null` se muestra ("Precio a confirmar") pero no se vende.
 */
export function isPurchasable(product: Product): boolean {
  return !product.comingSoon && product.available !== false && product.price != null;
}

/**
 * Media principal: packshot recortado para los sérums (`contain`, sobre su
 * tono) y fotografía a sangre para el resto (`cover`). `null` sin imagen.
 */
export function primaryMediaOf(product: Product): ProductMedia | null {
  if (!product.imageSrc) return null;
  return {
    src: product.imageSrc,
    alt: product.imageAlt ?? product.name,
    fit: product.category === "serum" ? "contain" : "cover",
    objectPosition: product.imageObjectPosition,
  };
}

/**
 * Nombre de un sérum en la voz del packaging: en el frasco va en Cardone y en
 * tipo título ("Clarity"), no en mayúsculas. El resto de los productos
 * conserva su nombre tal cual. Es solo presentación: el dato no cambia.
 */
export function isSerum(product: Pick<Product, "category">): boolean {
  return product.category === "serum";
}

export function serumDisplayName(product: Pick<Product, "category" | "name">): string {
  if (!isSerum(product)) return product.name;
  const lower = product.name.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

/** Metadata corta para cards y resultados de búsqueda. */
export function productKicker(product: Product): string {
  switch (product.category) {
    case "set":
      return "El ritual completo";
    case "calendar":
      return "Herramienta del ritual";
    case "mist":
      return "Próximamente";
    default:
      // La fase no va acá: es metadata secundaria y la PDP la muestra al pie.
      return "Sérum";
  }
}
