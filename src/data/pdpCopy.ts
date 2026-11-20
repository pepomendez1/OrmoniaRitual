import { formatPrice } from "@/lib/price";
import { FREE_SHIPPING_THRESHOLD } from "./shopCopy";

/**
 * Copy de las fichas de producto (PDP).
 *
 * Solo rótulos y textos de sistema. El contenido de cada producto vive en
 * `data/products.ts`; si un campo no existe, su sección no se renderiza.
 */
export const pdpCopy = {
  addToCart: "Agregar al carrito",
  adding: "Agregando…",
  availability: {
    available: "Disponible",
    soldOut: "Agotado",
    comingSoon: "Próximamente",
    /** Sin inventario conectado no se afirma stock. */
    unknown: "Stock a confirmar",
  },
  /** Producto sin precio definido: no se puede comprar todavía. */
  priceUnavailable: "Precio a confirmar",
  shippingLine: `Envío gratis en órdenes mayores a ${formatPrice(FREE_SHIPPING_THRESHOLD)}.`,
  sections: {
    description: "Descripción",
    actives: "Activos principales",
    howToUse: "Modo de uso",
    texture: "Textura",
    inci: "Ingredientes",
    specs: "Especificaciones",
    includes: "Qué incluye",
    faq: "Preguntas frecuentes",
    shipping: "Envíos y devoluciones",
  },
  shipping: {
    body: [
      `Envío gratis en órdenes mayores a ${formatPrice(FREE_SHIPPING_THRESHOLD)}.`,
      "Los costos y plazos de envío se calculan al finalizar la compra.",
    ],
    links: [
      { label: "Envíos", href: "/ayuda/envios" },
      { label: "Cambios y devoluciones", href: "/ayuda/cambios-y-devoluciones" },
    ],
  },
  phaseReference: (phase: string) => `Referencia de fase: ${phase.toLowerCase()}`,
  phaseNote: "La fase es una referencia. Podés usar cada sérum cuando tu piel lo pida.",
  serum: {
    campaign: "En campo",
    crossSell: "Completá tu ritual",
  },
  /**
   * PDP de El Ritual — EL RITUAL COMPLETO.
   *
   * Se lee como el ritual ORMONIA, no como cuatro productos juntos: sin
   * ahorro, bundle ni combo; sin links ni precios de los sérums sueltos.
   * Copy breve y sobrio, a validar con el equipo. Sin claims hormonales,
   * de diagnóstico ni de tratamiento.
   */
  pack: {
    eyebrow: "El ritual completo",
    lead: "Cuatro fórmulas para acompañar los distintos momentos de tu piel y construir una forma más consciente de observarla.",
    ritual: {
      eyebrow: "El ritual completo",
      title: "El cuidado como ritual.",
      body: [
        "Tu piel no responde igual todos los días. El ritual completo reúne cuatro fórmulas para acompañar esos cambios sin forzar siempre la misma respuesta.",
        "Antes de intervenir, observar. Elegir con lo que ves hoy. Volver al cuerpo, un gesto por vez.",
      ],
    },
    includes: {
      eyebrow: "El ritual incluye",
      title: "Cuatro fórmulas, una sola experiencia.",
      note: "Cada fase es una referencia del ritual, no una regla: podés elegir la fórmula según lo que tu piel pida hoy.",
    },
    living: {
      eyebrow: "Cómo vivir el ritual",
      title: "Un gesto breve, sostenido en el tiempo.",
      steps: [
        { title: "Observar", body: "Antes de elegir, mirá cómo está tu piel hoy." },
        { title: "Elegir", body: "La fase orienta; lo que observás decide qué fórmula acompaña este momento." },
        { title: "Acompañar", body: "Cuando la piel cambia, el cuidado también. Sin forzar la misma respuesta." },
        { title: "Volver", body: "Un momento propio, todos los días, para construir presencia." },
      ],
    },
  },
  /** Entrada al Test de perfil de piel. No es requisito para comprar ni una prescripción. */
  discoverSkin: {
    pack: {
      eyebrow: "Test de perfil de piel",
      title: "Conocé cómo responde tu piel.",
      body: "Un recorrido breve para reconocer su comportamiento y lo que necesita hoy.",
      cta: "Hacer el test",
    },
    serum: {
      eyebrow: "Test de perfil de piel",
      title: "¿No sabés qué necesita tu piel hoy?",
      body: "Conocé mejor cómo responde y qué parece necesitar en este momento.",
      cta: "Hacer el test",
    },
    href: "/descubri-tu-piel",
  },
  /** Único complemento destacado del Pack. */
  complement: {
    eyebrow: "Completá el ritual",
    title: "Sumá tu Calendario cíclico.",
    body: "Una herramienta para registrar cambios, reconocer patrones y acompañar tu ritual en el tiempo.",
    add: "Agregar calendario",
    added: "Calendario agregado",
    more: "Conocer el calendario",
  },
  calendar: {
    editorialCta: "Conocer el calendario",
    editorialNote: "Qué es, para qué sirve y cómo acompaña el ritual.",
  },
  notFound: {
    eyebrow: "404",
    title: "Este producto todavía no florece.",
    body: "No encontramos un producto con esa dirección.",
    cta: "Ir a la tienda",
  },
};
