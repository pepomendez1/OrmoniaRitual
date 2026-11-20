/**
 * Producción fotográfica real de ORMONIA.
 *
 * Único lugar donde viven los paths de la producción: los componentes y el
 * resto de la data (productos, copy, diagnóstico) leen de acá. Cambiar una
 * foto o su recorte es tocar una línea de este archivo.
 *
 * ARCHIVOS
 * - Originales (intactos): `public/fotos-editadas/DSCxxxxx.jpg`.
 * - Versiones web: `public/fotos-editadas/web/DSCxxxxx.jpg`, mismo nombre,
 *   lado largo y compresión según el uso (ver ORMONIA_INTEGRAL_PASS.md §11).
 *
 * CRITERIOS
 * - `alt`: descriptivo y breve solo si la foto informa algo (producto);
 *   vacío si es ambientación.
 * - Las fotos no establecen relaciones nuevas: que una modelo aparezca en un
 *   hover no la vincula a una fase ni a un claim. El copy sigue saliendo del
 *   producto.
 * - Producto visible verificado por etiqueta antes de asignar una foto a un
 *   sérum (p. ej. DSC04698 muestra CLARITY, no RADIANCE).
 */

export interface ProductionImage {
  /** Nombre del archivo original, para trazabilidad (`DSC05278`). */
  id: string;
  src: string;
  /** Versión distinta para mobile, si el recorte no alcanza. */
  mobileSrc?: string;
  alt: string;
  objectPosition: string;
  objectPositionMobile?: string;
}

const web = (id: string) => `/fotos-editadas/web/${id}.jpg`;

function photo(
  id: string,
  alt: string,
  objectPosition = "50% 50%",
  objectPositionMobile?: string
): ProductionImage {
  return { id, src: web(id), alt, objectPosition, objectPositionMobile };
}

export const productionMedia = {
  /**
   * Hero — segundo estado. Las cuatro modelos en el arroyo: la imagen de
   * universo de la campaña. Solo acá (no se repite en otras secciones).
   */
  hero: {
    alternate: {
      ...photo("DSC05278", "", "50% 58%"),
      /**
       * Las modelos ocupan todo el ancho de la foto: en un recorte vertical
       * de mobile quedarían dos o tres cortadas. Debajo de este ancho el Hero
       * queda estático con la imagen original.
       */
      minWidth: 768,
      /** Sombra mínima arriba: el cielo nublado es claro y el header es ivory. */
      scrim: "linear-gradient(180deg, rgba(25,21,17,0.30) 0%, rgba(25,21,17,0) 26%)",
    },
  },

  /** El Ritual: el sistema completo, no cuatro productos sueltos. */
  ritual: {
    /** Los cuatro sérums sobre el cuerpo. Los frascos están en el tercio izquierdo. */
    onBody: photo(
      "DSC04044",
      "Los cuatro sérums ORMONIA apoyados sobre el cuerpo de una modelo, en un bosque de pinos.",
      "12% 50%",
      "8% 50%"
    ),
    /** Las cuatro fórmulas juntas sobre agujas de pino. */
    fourFormulas: photo(
      "DSC04246",
      "Los cuatro sérums ORMONIA sobre agujas de pino.",
      "50% 50%"
    ),
  },

  /** Sérums: hover de las cards y galerías de PDP. */
  serums: {
    clarity: {
      // Campaña. Sin producto a la vista: es atmósfera, no product shot.
      hover: photo("DSC04573", "", "58% 58%"),
      gallery: [
        photo("DSC04199", "Sérum CLARITY sobre agujas de pino.", "50% 52%"),
        photo("DSC04208", "Detalle de la etiqueta de CLARITY.", "50% 22%"),
        photo("DSC04698", "Manos sosteniendo el sérum CLARITY.", "50% 50%"),
      ],
    },
    bloom: {
      hover: photo("DSC04795", "", "42% 52%"),
      gallery: [
        photo("DSC04870", "BLOOM dentro de un zapato transparente, junto a un cala.", "50% 55%"),
        photo("DSC04815", "Una mano apoya BLOOM sobre una roca con musgo, junto al agua.", "50% 42%"),
      ],
    },
    radiance: {
      /*
       * DSC04446 es la única toma donde el frasco visible es RADIANCE. El
       * mapeo original (DSC04698) mostraba CLARITY: se movió a la galería de
       * CLARITY para no etiquetar mal el producto.
       */
      hover: photo("DSC04446", "", "50% 48%"),
      gallery: [photo("DSC04446", "Manos sosteniendo el sérum RADIANCE.", "50% 48%")],
    },
    restore: {
      hover: photo("DSC05225", "", "50% 38%"),
      gallery: [
        photo("DSC05225", "Una modelo sostiene el sérum RESTORE entre las manos.", "50% 38%"),
        photo("DSC05172", "", "45% 42%"),
        photo("DSC05204", "", "50% 60%"),
      ],
    },
  },

  /** Test de perfil de piel. */
  skinProfile: {
    /** Bloque de Home y entrada desde la PDP de El Ritual. Rostro en primer plano. */
    home: {
      ...photo("DSC04862", "", "50% 42%", "34% 50%"),
      /**
       * Velo localizado del lado del copy: oscurece apenas el pelo y la mejilla
       * izquierda para que el texto ivory se lea, sin tapar el rostro.
       */
      scrim:
        "linear-gradient(90deg, rgba(20,14,10,0.62) 0%, rgba(20,14,10,0.38) 26%, rgba(20,14,10,0.08) 48%, rgba(20,14,10,0) 60%)",
      scrimMobile:
        "linear-gradient(180deg, rgba(20,14,10,0.08) 0%, rgba(20,14,10,0.36) 52%, rgba(20,14,10,0.62) 100%)",
    },
    /** Panel del cuestionario, primer bloque: la mirada. */
    quizIntro: photo("DSC04862", "", "50% 46%"),
    /** Panel del resultado. */
    quizResult: photo("DSC05005", "", "50% 40%"),
  },

  /** Sobre ORMONIA: dos grandes bloques de naturaleza/persona y macros de contrapunto. */
  about: {
    opening: photo("DSC04269", "", "50% 70%", "50% 60%"),
    inside: photo("DSC03650", "", "50% 50%"),
    field: [photo("DSC03674", "", "50% 50%"), photo("DSC04194", "", "50% 45%")],
  },

  /** Lecturas (Home y Explorar): naturaleza y textura, no skincare literal. */
  readings: {
    /*
     * Arroyo vertical: en el marco 4:3 deja bosque, agua y piedra con poco
     * cielo. DSC04479 (paisaje abierto) se probó primero: en 4:3 era mitad
     * cielo gris plano.
     */
    featured: photo("DSC04535", "", "50% 72%"),
    second: photo("DSC04169", "", "50% 50%"),
    third: photo("DSC03653", "", "50% 55%"),
  },

  /** El universo ORMONIA: tres piezas de campaña (sin captions ni links inventados). */
  instagram: [
    photo("DSC04573", "", "58% 56%"),
    photo("DSC04888", "", "50% 45%"),
    photo("DSC05172", "", "45% 42%"),
  ],

  /** Cierre "Unite al ritual". */
  closing: photo("DSC05189", "", "50% 62%", "36% 60%"),
};
