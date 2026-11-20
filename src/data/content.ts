import { productionMedia } from "./productionMedia";

/**
 * Bloques de copy reutilizables del sitio ORMONIA.
 * Centralizados aquí para editarlos en un solo lugar en vez de dispersos.
 */

export const brandCopy = {
  wordmark: "ORMONIA",
  tagline: "Lo que cambia adentro se expresa afuera.",
  shortPitch: "Fórmulas pensadas para acompañar lo que tu piel necesita.",
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
    { label: "Explorar", href: "/explore" },
  ],
  /**
   * Zona derecha del header. Ya funcionan sobre la capa de comercio local:
   * CUENTA navega a /account, BUSCAR abre el buscador y CARRITO el mini
   * carrito con la cantidad real. Ver `Header.tsx`.
   */
  utilities: {
    account: { label: "Cuenta", href: "/account" },
    search: { label: "Buscar" },
    cart: { label: "Carrito" },
  },
  /** Menú mobile: todo lo navegable, en una sola columna. */
  primary: [
    { label: "Tienda", href: "/products" },
    { label: "Sobre Ormonia", href: "/about" },
    { label: "Explorar", href: "/explore" },
    { label: "Calendario", href: "/calendario" },
    { label: "Test de perfil de piel", href: "/descubri-tu-piel" },
  ],
};

export const heroCopy = {
  line1: "Lo que cambia adentro",
  line2: "se expresa afuera.",
  cta: "Descubrir el ritual",
  /** Ancla de El Ritual, la sección que sigue al Hero. */
  ctaTarget: "#el-ritual",
};

/**
 * Popup diferido de descubrimiento.
 *
 * Invita al Test de perfil de piel (`/descubri-tu-piel`). Usa el mismo
 * naming y la misma bajada que el bloque de Home, sin atar la piel al ciclo
 * ni definir perfiles que todavía no existen (Sprint 07B).
 *
 * `incentive`: el 5% está aprobado en el Master Plan pero todavía no hay
 * mecanismo para aplicarlo (Shopify). Se mantiene el texto existente.
 */
export const discoverPopupCopy = {
  eyebrow: "Test de perfil de piel",
  title: "Conocé cómo responde tu piel.",
  body: "Un recorrido breve para reconocer su comportamiento y lo que necesita hoy.",
  incentive: "5% off en tu primer ritual",
  cta: "Hacer el test",
  ctaHref: "/descubri-tu-piel",
  dismiss: "Ahora no",
  close: "Cerrar",
};

/**
 * Media del hero (Sprint 01). `src` es la URL pública del asset real
 * (pradera con caballo) servida desde /public; cambiar la imagen es editar
 * esta sola línea. `alt` describe la escena para lectores de pantalla.
 */
export const heroMedia = {
  src: "/pradera-y-caballo.jpg",
  alt: "Pradera abierta bajo luz cálida con un caballo pastando; tonos verdes y tierra.",
};

/**
 * HOME 05 — Agua / El Ritmo.
 *
 * Dos momentos de texto, no más: la escena es una pausa sensorial, no un
 * bloque explicativo. El agua sostiene el aire; el copy solo lo puntúa.
 */
/**
 * HOME 05 — Agua / El Ritmo.
 *
 * Dos momentos, sin eyebrow: la escena es una pausa sensorial y cuantos menos
 * elementos tenga, mejor respira. El relevo entre ambos es continuo, no un
 * cambio de estado.
 */
export const rhythmCopy = {
  moments: [
    {
      lines: ["La piel también", "tiene un ritmo."],
      note: "Cambia, responde, se transforma." as string | null,
    },
    {
      lines: ["Aprender a mirarla", "cambia la forma de cuidarla."],
      note: null as string | null,
    },
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
 * HOME 02 — El Ritual (id interno del producto: pack-x4).
 *
 * Primera pieza después del Hero: la propuesta completa de ORMONIA antes que
 * los productos sueltos. Nombre, precio, disponibilidad e imágenes salen del
 * producto (`packX4` en `data/products.ts`); acá vive solo el copy editorial.
 *
 * Sin narrativa de ahorro: el Pack es el ritual completo, no un descuento
 * (decisión de marca, 2026-10-29). El precio sale de `packX4.price`.
 */
export const packCopy = {
  eyebrow: "El Ritual",
  titleLines: ["Las 4 fases,", "un solo ritual."],
  body: "Los cuatro sérums del ritual ORMONIA, reunidos en un solo estuche. Una forma simple de recorrer el ritual completo.",
  includesLabel: "Incluye",
  cta: "Descubrir el ritual",
  addToCart: "Agregar al carrito",
};

/**
 * HOME 04 — Calendario cíclico (teaser).
 *
 * Presenta el calendario como producto real del ritual, no como artículo ni
 * newsletter. Copy breve y PROVISIONAL (a validar): describe una herramienta
 * de observación y registro. Nunca predecir, diagnosticar ni regular.
 */
export const calendarTeaserCopy = {
  eyebrow: "Herramientas del ritual",
  title: "Calendario cíclico.",
  body: "Un objeto para observar y registrar cómo cambia tu piel a lo largo del mes. Sin predicciones: solo lo que ves, en tus propios términos.",
  cta: "Conocer el calendario",
  ctaHref: "/calendario",
  secondary: "Ver producto",
  /** TEMPORAL · mockup: portada y páginas interiores. `null` usa la foto de producto. */
  media: {
    src: "/production-temp/calendar/calendario-paginas.jpg",
    alt: "Portada y páginas interiores del Calendario cíclico ORMONIA.",
  } as { src: string; alt: string } | null,
};

export const insideOutsideCopy = {
  eyebrow: "Adentro / afuera",
  title: "Lo que vivís adentro se ve afuera.",
  body: "El descanso, la hidratación, el estrés y el ánimo dejan huella en la piel. No se trata de corregir, sino de acompañar lo que ya está cambiando.",
  caption: "Cuidado como reflejo, no como corrección.",
};

export const ritualWords = ["Escuchar", "Observar", "Acompañar", "Cuidar"];

export const discoverCopy = {
  eyebrow: "Encontrá tu ritmo",
  title: "¿En qué fase estás hoy?",
  body: "Un breve quiz te acerca al serum que tu piel pide ahora mismo. Sin prisa, sin prescripción.",
  cta: "Descubrir mi ritual",
};

/**
 * HOME 06 — Test de perfil de piel (después de El Ciclo).
 *
 * Entrada al diagnóstico. No explica el cuestionario: invita. La curiosidad
 * hace el trabajo y el test explica después.
 *
 * El copy es la acción que sigue a la reflexión de HOME 05: allí la idea es
 * que mirar la piel importa; acá, que la tuya responde de una forma propia.
 * Por eso el titular no vuelve sobre observar.
 *
 * ────────────────────────────────────────────────────────────────────────
 * BRIEF DEL ASSET DEFINITIVO
 *
 * Fotografía editorial horizontal, piel real de una persona real, con detalle
 * visible de textura. Luz natural o suave, sin retoque excesivo. Nada de spa
 * genérico ni de estética clínica. Debe traer espacio negativo previsto para
 * el copy —preferentemente a la izquierda— y funcionar recortada tanto en
 * desktop como en mobile.
 *
 * Para incorporarla alcanza con `media.src`, su `alt`, el `tone` según si la
 * imagen es clara u oscura, y los dos `objectPosition`. El layout no cambia.
 * ────────────────────────────────────────────────────────────────────────
 */
export const discoverSkinCopy = {
  eyebrow: "Test de perfil de piel",
  titleLines: ["Conocé cómo responde", "tu piel."],
  body: "Un recorrido breve para reconocer su comportamiento y lo que necesita hoy.",
  cta: "Hacer el test",
  ctaHref: "/descubri-tu-piel",
  media: {
    /**
     * Producción real: rostro en primer plano (`productionMedia.skinProfile`).
     * Piel, observación y perfil, no naturaleza genérica.
     */
    src: productionMedia.skinProfile.home.src as string | null,
    alt: productionMedia.skinProfile.home.alt,
    /**
     * Gobierna el contraste de toda la pieza: "light" deja el copy en ink y el
     * header en su tinta por defecto; "dark" lo pasa todo a ivory y declara el
     * tono claro para la navegación.
     */
    tone: "dark" as "light" | "dark",
    /** Campo tonal mientras no haya imagen. */
    placeholderTone: "#8A7564",
    objectPosition: productionMedia.skinProfile.home.objectPosition,
    objectPositionMobile: productionMedia.skinProfile.home.objectPositionMobile,
    /** Velo localizado del lado del copy (reemplaza al genérico del tono). */
    scrim: productionMedia.skinProfile.home.scrim as string | null,
    scrimMobile: productionMedia.skinProfile.home.scrimMobile as string | null,
    pending: "Producción · fotografía editorial de piel",
  },
};

/**
 * HOME 07 — Lecturas para el ritual.
 *
 * Bloque editorial: cambia el ritmo después de la campaña del Test de perfil de piel.
 * No es otra zona de compra ni una grilla de blog.
 *
 * Cada pieza declara su formato (`kind`): un video de YouTube, una nota o un
 * escrito. El primer ítem es el destacado. Para publicar una pieza real basta
 * con completar `href` (ruta interna o URL externa) y `media`; mientras `href`
 * sea `null` la pieza se muestra como "Próximamente" y no enlaza a ningún
 * lado. No inventar links ni contenido.
 *
 * Los tres textos actuales vienen del contenido existente del repo.
 */
export type ReadingKind = "video" | "nota" | "escrito";

export interface Reading {
  id: string;
  kind: ReadingKind;
  /** Etiqueta editorial visible (Ensayo, Glosa, Práctica…). */
  label: string;
  title: string;
  teaser: string;
  href: string | null;
  /** Imagen de portada. `null` mientras no exista la pieza de producción. */
  media: { src: string; alt: string; objectPosition?: string } | null;
  /** Duración ("12 min") o tiempo de lectura, si se conoce. */
  meta?: string | null;
}

export const learnCopy = {
  eyebrow: "Lecturas",
  title: "Lecturas para el ritual.",
  body: "Botánica, ciclo y cuidado. Material editorial para acompañar tu práctica.",
  cta: "Ver todas las lecturas",
  ctaHref: "/explore",
  soon: "Próximamente",
  kindLabel: {
    video: "Video",
    nota: "Nota",
    escrito: "Escrito",
  } as Record<ReadingKind, string>,
  pending: "Producción · imagen editorial",
  readings: [
    {
      id: "ciclo-guia-estacional",
      kind: "escrito",
      label: "Ensayo",
      title: "El ciclo como guía estacional",
      teaser:
        "Por qué tu piel pide cosas distintas en cada fase y cómo leer esas señales.",
      href: null,
      // Producción real: naturaleza y textura, no skincare literal.
      media: {
        src: productionMedia.readings.featured.src,
        alt: productionMedia.readings.featured.alt,
        objectPosition: productionMedia.readings.featured.objectPosition,
      },
    },
    {
      id: "botanica-de-los-serums",
      kind: "nota",
      label: "Glosa",
      title: "Botánica de los serums",
      teaser:
        "Los activos de cada fórmula, su origen y su función en el gesto del ritual.",
      href: null,
      // Producción real: naturaleza y textura, no skincare literal.
      media: {
        src: productionMedia.readings.second.src,
        alt: productionMedia.readings.second.alt,
        objectPosition: productionMedia.readings.second.objectPosition,
      },
    },
    {
      id: "ritual-paso-a-paso",
      kind: "nota",
      label: "Práctica",
      title: "El ritual paso a paso",
      teaser:
        "Cómo aplicar, en qué orden y cuándo. Una guía sencilla para sostener la práctica.",
      href: null,
      // Producción real: naturaleza y textura, no skincare literal.
      media: {
        src: productionMedia.readings.third.src,
        alt: productionMedia.readings.third.alt,
        objectPosition: productionMedia.readings.third.objectPosition,
      },
    },
  ] as Reading[],
};

/**
 * Destino de una lectura. Con `href` real (nota publicada, video de YouTube)
 * va ahí; sin él abre su ficha en `/explore/:id`, que muestra la pieza y dice
 * con honestidad que todavía no está publicada.
 */
export function readingHref(reading: Reading): string {
  return reading.href ?? `/explore/${reading.id}`;
}

/**
 * El Registro — newsletter.
 *
 * Ya no es una sección de Home: la escena de agua (`RhythmSection`) quedó
 * desmontada. Sobrevive como módulo secundario dentro del cierre "Unite al
 * ritual" (`NewsletterForm`), sin bloque propio.
 *
 * Copy deliberadamente corto: la interfaz necesita respirar. Sin cadencias,
 * frecuencias ni promesas editoriales de más.
 *
 * `disclaimer` se conserva para `RegisterSection`, el bloque autónomo que
 * queda disponible en el repo; la escena de agua no lo renderiza.
 */
export const registerCopy = {
  eyebrow: "El Registro",
  title: "El Registro",
  body: "Ideas, fórmulas y rituales para entender mejor tu piel y elegir cómo cuidarla.",
  placeholder: "Tu email",
  cta: "Recibir El Registro",
  disclaimer: "Al registrarte aceptás recibir comunicaciones de ORMONIA.",
  /**
   * Respuesta honesta al enviar mientras no haya proveedor conectado: no
   * confirma una suscripción que no ocurrió. Se elimina al conectar el envío.
   */
  pendingNotice: "El Registro todavía no está abierto. Muy pronto vas a poder sumarte.",
};

/**
 * HOME 08 — Instagram / Universo ORMONIA.
 *
 * Tres piezas visibles, integradas a la estética del sitio (no un widget de
 * plugin). Hoy no hay cuenta ni API conectadas: `posts` está vacío y se ven
 * tres campos tonales con su nota de producción.
 *
 * Para conectarlo:
 * - selección curada: completar `posts` a mano (imagen, alt, permalink);
 * - feed dinámico: la Instagram Graph API necesita un token que no puede vivir
 *   en el frontend. Un endpoint propio (o servicio aprobado) devuelve esta
 *   misma forma y la sección no cambia (`lib/instagram.ts`).
 *
 * `handle` y `profileUrl` en `null` hasta tener la cuenta confirmada.
 */
export interface InstagramPost {
  id: string;
  image: string;
  alt: string;
  /** `null` mientras no exista la publicación real: no se inventan enlaces. */
  permalink: string | null;
  objectPosition?: string;
}

export const instagramCopy = {
  eyebrow: "Instagram",
  title: "El universo ORMONIA.",
  body: "Rituales, procesos y campo visual. Pronto en Instagram.",
  note: "Próximamente",
  handle: null as string | null,
  profileUrl: null as string | null,
  follow: "Seguir en Instagram",
  pending: "Producción · contenido de Instagram",
  /*
   * Producción real de campaña. Son fotografías, no publicaciones: van sin
   * caption y sin permalink, así la pieza no enlaza a ningún lado. Cuando se
   * conecte el feed, `lib/instagram.ts` devuelve los posts con su permalink.
   */
  posts: productionMedia.instagram.map((image) => ({
    id: image.id,
    image: image.src,
    alt: image.alt,
    permalink: null,
    objectPosition: image.objectPosition,
  })) as InstagramPost[],
};

/**
 * HOME 09 — Cierre "Unite al ritual".
 *
 * Cierre emocional (Master Plan §5). Al salir la escena de agua de Home, El
 * Registro vive acá como formulario compacto y secundario —no un bloque de
 * newsletter—, debajo de las dos salidas principales.
 */
export const closingCopy = {
  eyebrow: "ORMONIA",
  title: "Unite al ritual.",
  body: "Lo que cambia adentro se expresa afuera.",
  links: [
    { label: "Hacer el test", href: "/descubri-tu-piel" },
    { label: "Ir a la tienda", href: "/products" },
  ],
};

/**
 * Footer.
 *
 * Los destinos que todavía no existen (ayuda, políticas, redes) quedan en
 * `null`: se ven como texto inerte y no inventan páginas ni textos legales.
 * Completar `href` cuando cada página o cuenta exista.
 */
export interface FooterLink {
  label: string;
  href: string | null;
}

export const footerCopy = {
  /** Bajada aprobada de Los esenciales: el producto no queda atado a una fase. */
  tagline: "Fórmulas pensadas para acompañar lo que tu piel necesita.",
  columns: [
    {
      heading: "Tienda",
      links: [
        { label: "Toda la tienda", href: "/products" },
        { label: "El Ritual", href: "/products/el-ritual" },
        { label: "Calendario cíclico", href: "/products/calendario-ciclico" },
        { label: "CLARITY", href: "/products/clarity" },
        { label: "BLOOM", href: "/products/bloom" },
        { label: "RADIANCE", href: "/products/radiance" },
        { label: "RESTORE", href: "/products/restore" },
      ] as FooterLink[],
    },
    {
      heading: "ORMONIA",
      links: [
        { label: "Sobre ORMONIA", href: "/about" },
        { label: "Explorar", href: "/explore" },
        { label: "Calendario", href: "/calendario" },
        { label: "Test de perfil de piel", href: "/descubri-tu-piel" },
        { label: "Cuenta", href: "/account" },
        { label: "Carrito", href: "/cart" },
      ] as FooterLink[],
    },
    {
      heading: "Ayuda",
      links: [
        { label: "Envíos", href: "/ayuda/envios" },
        { label: "Cambios y devoluciones", href: "/ayuda/cambios-y-devoluciones" },
        { label: "Preguntas frecuentes", href: "/ayuda/preguntas-frecuentes" },
        { label: "Contacto", href: "/ayuda/contacto" },
      ] as FooterLink[],
    },
  ],
  social: [{ label: "Instagram", href: instagramCopy.profileUrl }] as FooterLink[],
  legal: [
    { label: "Términos y condiciones", href: "/ayuda/terminos" },
    { label: "Política de privacidad", href: "/ayuda/privacidad" },
  ] as FooterLink[],
  copyright: "ORMONIA",
};

export const notFoundCopy = {
  code: "404",
  title: "Esta página todavía no florece.",
  body: "La dirección no existe o aún no está disponible. Volvé al ritual para continuar.",
  cta: "Volver al inicio",
};

export const pageShells = {
  products: {
    eyebrow: "Tienda",
    title: "Los esenciales de ORMONIA.",
    body: "Fórmulas pensadas para acompañar lo que tu piel necesita. AURA, la niebla de cierre, llegará pronto.",
  },
  learn: {
    eyebrow: "Explorar",
    title: "Lecturas para el ritual.",
    body: "Botánica, ciclo y cuidado. Material editorial para acompañar tu práctica.",
  },
  discover: {
    eyebrow: "Descubrí",
    title: "Encontrá tu ritmo.",
    body: "El quiz de ritmo llegará pronto. Mientras tanto, explorá los serums y sus fases.",
  },
  about: {
    eyebrow: "Nosotros",
    title: "ORMONIA.",
    body: "Una práctica de cuidado que escucha el ciclo. Pronto compartiremos la historia, la filosofía y el campo detrás de cada fórmula.",
  },
};
