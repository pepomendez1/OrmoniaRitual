export type CyclePhase = "Menstrual" | "Follicular" | "Ovulatory" | "Luteal";

export interface Product {
  slug: string;
  name: string;
  phase: CyclePhase | null;
  tagline: string;
  description: string;
  ingredients: string[];
  imageSrc?: string;
  comingSoon?: boolean;
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

export const products: Product[] = [
  {
    slug: "clarity",
    imageSrc: "/products/clarity.png",
    name: "CLARITY",
    phase: "Menstrual",
    tagline: "Claridad que retorna.",
    description:
      "Un serum de baja densidad para los días de introspección. Calma la sensibilidad y devuelve luminosidad apagada.",
    ingredients: [
      "Jojoba",
      "Caléndula",
      "Rosa mosqueta",
      "Vitamina E",
    ],
  },
  {
    slug: "bloom",
    imageSrc: "/products/bloom.png",
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
    slug: "radiance",
    imageSrc: "/products/radiance.png",
    name: "RADIANCE",
    phase: "Ovulatory",
    tagline: "Luz en su punto alto.",
    description:
      "El serum de mayor potencia. Ilumina, afina la textura y acompaña el pico natural de luminosidad.",
    ingredients: [
      "Magnesium Ascorbyl Phosphate",
      "Glicerina",
      "Panthenol",
    ],
  },
  {
    slug: "restore",
    imageSrc: "/products/restore.png",
    name: "RESTORE",
    phase: "Luteal",
    tagline: "Repara y prepara.",
    description:
      "Densidad nutritiva para los días previos. Repara la barrera cutánea y suaviza las señales del ciclo que se acerca.",
    ingredients: [
      "Glicerina",
      "Centella asiática",
      "Pentapeptide-18",
    ],
  },
];

export const auraTeaser: Product = {
  slug: "aura",
  name: "AURA",
  phase: null,
  tagline: "Niebla de aura.",
  description:
    "Una niebla facial de cierre del ritual. Próximamente, para sellar y extender el cuidado más allá del rostro.",
  ingredients: [],
  comingSoon: true,
};

/** Devuelve un producto por slug (incluye el teaser de AURA). */
export function getProductBySlug(slug: string): Product | undefined {
  return [...products, auraTeaser].find((p) => p.slug === slug);
}
