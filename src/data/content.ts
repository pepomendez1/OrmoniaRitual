/**
 * Bloques de copy reutilizables del sitio ORMONIA.
 * Centralizados aquí para editarlos en un solo lugar en vez de dispersos.
 */

export const brandCopy = {
  wordmark: "ORMONIA",
  tagline: "Lo que cambia adentro se expresa afuera.",
  shortPitch: "Serums rituales formulados para cada fase del ciclo.",
};

/**
 * Barra superior del header. Umbral aprobado: ARS 145.000.
 */
export const announcementCopy = {
  message: "Envío gratis en órdenes mayores a $145.000",
};

export const nav = {
  /** Zona izquierda del header (desktop). Jerarquía aprobada en el Master Plan. */
  left: [
    { label: "Tienda", href: "/products" },
    { label: "Sobre Ormonia", href: "/about" },
    { label: "Explorar", href: "/learn" },
  ],
  /**
   * Zona derecha del header. Todavía no existe cuenta, buscador ni carrito:
   * se muestran como afordancias inertes hasta que Shopify esté integrado.
   * No inventar rutas ni comportamiento de compra antes de ese sprint.
   */
  utilities: [
    { label: "Cuenta", href: null as string | null },
    { label: "Buscar", href: null as string | null },
    { label: "Carrito", href: null as string | null },
  ],
  primary: [
    { label: "Tienda", href: "/products" },
    { label: "Sobre Ormonia", href: "/about" },
    { label: "Explorar", href: "/learn" },
    { label: "Descubrir tu ritual", href: "/discover" },
    // Placeholder: futuro punto de entrada al carrito/ritual (se conectará en un sprint posterior).
    { label: "Tu ritual", href: null as string | null },
  ],
};

export const heroCopy = {
  line1: "Lo que cambia adentro",
  line2: "se expresa afuera.",
  cta: "Descubrir el ritual",
  /** Ancla interna del bloque Pack x4. Mientras no exista PDP/Shopify. */
  ctaTarget: "#pack-x4",
};

/**
 * Popup diferido de descubrimiento (Sprint 01).
 * No implementa el quiz: solo la invitación. La lógica de fenotipos se define
 * en Sprint 07, cuando la CEO cierre el modelo.
 */
export const discoverPopupCopy = {
  eyebrow: "Descubrimiento",
  title: "Descubrí tu piel",
  body: "Tu fenotipo describe cómo responde tu piel a lo largo del ciclo. Reconocerlo es el primer gesto para construir un ritual más propio.",
  incentive: "5% off en tu primer ritual",
  cta: "Descubrir mi piel",
  ctaHref: "/discover",
  dismiss: "Ahora no",
  close: "Cerrar",
};

/**
 * Media del hero (Sprint 01). `src` es la URL pública del asset real
 * (pradera con caballo) servida desde /public; cambiar la imagen es editar
 * esta sola línea. `alt` describe la escena para lectores de pantalla.
 */
export const heroMedia = {
  src: "/pradera-y-caballo.png",
  alt: "Pradera abierta bajo luz cálida con un caballo pastando; tonos verdes y tierra.",
};

export const rhythmCopy = {
  eyebrow: "El ritmo",
  statements: [
    "Tu piel no es igual todos los días.",
    "Tu cuerpo tampoco.",
    "Entonces, ¿por qué tu skincare debería serlo?",
  ],
};

export const cycleCopy = {
  eyebrow: "Las cuatro fases",
  title: "Cuatro fases, cuatro gestos.",
  body: "Menstrual, folicular, ovulatoria y lútea. Cada una con un carácter propio y un serum que la acompaña.",
  phases: [
    { phase: "Menstrual", note: "Introspección y descanso" },
    { phase: "Follicular", note: "Energía ascendente" },
    { phase: "Ovulatory", note: "Luz en su punto alto" },
    { phase: "Luteal", note: "Reparación y preparación" },
  ],
};

/**
 * HOME 04 — Productos individuales.
 *
 * El mensaje baja el énfasis en la vida cíclica: los serums se compran por lo
 * que la piel necesita, no por estar en una fase determinada. La fase sigue
 * informando cada producto, pero como dato secundario, no como condición.
 *
 * Sin eyebrow: "Los serums" repetía la idea del titular y sumaba ruido.
 */
export const fourPhasesCopy = {
  title: "Los esenciales de ORMONIA.",
  body: "Fórmulas pensadas para acompañar lo que tu piel necesita.",
};

/**
 * HOME 03 — Pack x4 / Ritual completo.
 *
 * Momento comercial central: comprar los cuatro serums juntos es la forma de
 * vivir el ciclo completo. `price` y `savings` quedan preparados para cuando
 * existan precios definitivos y se pueda comunicar la ventaja frente a
 * comprarlos por separado; mientras son `null`, esos bloques no se renderizan.
 *
 * `ctaHref` resuelve provisionalmente en la ruta de productos existente. Cuando
 * exista el PDP del pack en Shopify, se cambia solo esta línea.
 *
 * El bloque no vuelve a nombrar los cuatro serums: el usuario acaba de verlos
 * en El Ciclo. Acá el mensaje es el ritual completo, no cada fórmula.
 */
export const packCopy = {
  eyebrow: "Pack x4 · Ritual completo",
  titleLines: ["Las 4 fases,", "un solo ritual."],
  /**
   * Provisional. Cuando el pricing definitivo confirme el número, esta línea
   * pasa a comunicar el ahorro concreto ("Ahorrá X% con el ritual completo").
   * No inventar el porcentaje antes de esa confirmación.
   */
  body: "Una forma simple de recorrer el ritual completo y ahorrar eligiendo el set.",
  cta: "Descubrir el ritual completo",
  ctaHref: "/products",
  price: null as string | null,
  savings: null as string | null,
  media: {
    /**
     * Assets provisionales del estuche del Pack x4 (1200×896).
     *
     * `pack-box-dark.png` —la caja negra vista desde arriba— queda disponible
     * como tercera imagen futura. No hay galería todavía.
     */
    primary: {
      src: "/products/pack-box-open.png",
      alt: "Estuche abierto del Pack x4 de Ormonia con los serums en su interior.",
    },
    /** En `null` la pieza usa una sola imagen estable, sin crossfade. */
    hover: {
      src: "/products/pack-box-hand.png",
      alt: "",
    } as { src: string; alt: string } | null,
  },
};

export const insideOutsideCopy = {
  eyebrow: "Adentro / afuera",
  title: "Lo que vives adentro se ve afuera.",
  body: "El descanso, la hidratación, el estrés y el ánimo dejan huella en la piel. No se trata de corregir, sino de acompañar lo que ya está cambiando.",
  caption: "Cuidado como reflejo, no como corrección.",
};

export const ritualWords = ["Escuchar", "Observar", "Acompañar", "Cuidar"];

export const discoverCopy = {
  eyebrow: "Encuentra tu ritmo",
  title: "¿En qué fase estás hoy?",
  body: "Un breve quiz te acerca al serum que tu piel pide ahora mismo. Sin prisa, sin prescripción.",
  cta: "Descubrir mi ritual",
};

export const learnCopy = {
  eyebrow: "Aprender",
  title: "Lecturas para el ritual.",
  body: "Botánica, ciclo y cuidado. Material editorial para acompañar tu práctica.",
  cards: [
    {
      title: "El ciclo como guía estacional",
      teaser:
        "Por qué tu piel pide cosas distintas en cada fase y cómo leer esas señales.",
      label: "Ensayo",
    },
    {
      title: "Botánica de los serums",
      teaser:
        "Los activos de cada fórmula, su origen y su función en el gesto del ritual.",
      label: "Glosa",
    },
    {
      title: "El ritual paso a paso",
      teaser:
        "Cómo aplicar, en qué orden y cuándo. Una guía sencilla para sostener la práctica.",
      label: "Práctica",
    },
  ],
};

export const registerCopy = {
  eyebrow: "El registro",
  title: "Únete al registro.",
  body: "Primeras fórmulas, notas editoriales y el lanzamiento de AURA. Sin ruido, solo lo esencial.",
  placeholder: "Tu correo",
  cta: "Registrarme",
  disclaimer: "Al registrarte aceptas recibir comunicaciones de ORMONIA.",
};

export const instagramCopy = {
  eyebrow: "Universo",
  title: "El universo ORMONIA.",
  note: "Próximamente",
  body: "Rituales, procesos y campo visual. Pronto en Instagram.",
};

export const closingCopy = {
  eyebrow: "ORMONIA",
  title: "Lo que cambia adentro se expresa afuera.",
  body: "Un ritual que acompaña cada fase.",
};

export const footerCopy = {
  tagline: "Serums rituales para cada fase del ciclo.",
  columns: [
    {
      heading: "Tienda",
      links: [
        { label: "Los serums", href: "/products" },
        { label: "CLARITY", href: "/products/clarity" },
        { label: "BLOOM", href: "/products/bloom" },
        { label: "RADIANCE", href: "/products/radiance" },
        { label: "RESTORE", href: "/products/restore" },
      ],
    },
    {
      heading: "Explorar",
      links: [
        { label: "Aprender", href: "/learn" },
        { label: "Descubre", href: "/discover" },
        { label: "Nosotros", href: "/about" },
      ],
    },
    {
      heading: "Contacto",
      links: [
        { label: "El registro", href: "/#registro" },
        { label: "Instagram", href: "/#instagram" },
      ],
    },
  ],
  closing: "ORMONIA — Ritual, ritmo y botánica en armonía.",
};

export const notFoundCopy = {
  code: "404",
  title: "Esta página todavía no florece.",
  body: "La dirección no existe o aún no está disponible. Vuelve al ritual para continuar.",
  cta: "Volver al inicio",
};

export const pageShells = {
  products: {
    eyebrow: "Tienda",
    title: "Cuatro serums, un ciclo.",
    body: "Cada serum acompaña una fase. AURA, la niebla de cierre, llegará pronto.",
  },
  learn: {
    eyebrow: "Aprender",
    title: "Lecturas para el ritual.",
    body: "Pronto: ensayos, glosas y guías prácticas sobre botánica, ciclo y cuidado.",
  },
  discover: {
    eyebrow: "Descubre",
    title: "Encuentra tu ritmo.",
    body: "El quiz de ritmo llegará pronto. Mientras tanto, explora los serums y sus fases.",
  },
  about: {
    eyebrow: "Nosotros",
    title: "ORMONIA.",
    body: "Una práctica de cuidado que escucha el ciclo. Pronto compartiremos la historia, la filosofía y el campo detrás de cada fórmula.",
  },
};
