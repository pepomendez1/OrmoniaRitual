/**
 * Copy de la capa comercial: Tienda, carrito, búsqueda y cuenta.
 *
 * Mismo criterio que `content.ts`: textos centralizados, sin promesas que el
 * sitio todavía no puede cumplir (checkout, plazos de envío, políticas).
 */

/**
 * Umbral de envío gratis aprobado (Handoff §8). Es el único dato de envío
 * confirmado: costos y plazos los calcula el checkout cuando exista.
 */
export const FREE_SHIPPING_THRESHOLD = 145000;

export const priceCopy = {
  /** Producto sin precio definido todavía. */
  pending: "Precio a confirmar",
  soldOut: "Agotado",
  comingSoon: "Próximamente",
};

export const shopCopy = {
  eyebrow: "Tienda",
  title: "Tienda ORMONIA.",
  body: "Fórmulas pensadas para acompañar lo que tu piel necesita.",
  sections: {
    ritual: {
      eyebrow: "Ritual completo",
      title: "Las 4 fases, un solo ritual.",
    },
    tools: {
      eyebrow: "Herramientas del ritual",
      title: "Para observar y registrar.",
      body: "El Calendario cíclico acompaña el ritual fuera del frasco: un lugar para anotar cómo se ve y se siente tu piel.",
      editorialCta: "Conocer el calendario",
    },
    serums: {
      eyebrow: "Sérums",
      title: "Los esenciales.",
      body: "Cada fórmula se elige por lo que tu piel necesita. La fase es una referencia, no una condición.",
    },
    upcoming: {
      eyebrow: "Próximamente",
    },
  },
  viewProduct: "Ver producto",
  quickAdd: (name: string) => `Agregar ${name} al carrito`,
};

export const cartCopy = {
  title: "Carrito",
  drawerTitle: "Tu carrito",
  close: "Cerrar carrito",
  empty: {
    title: "Tu carrito está vacío.",
    body: "Empezá por el ritual completo o elegí el sérum que tu piel necesita hoy.",
    cta: "Ir a la tienda",
  },
  added: "Agregado al carrito",
  quantity: "Cantidad",
  increase: (name: string) => `Sumar una unidad de ${name}`,
  decrease: (name: string) => `Restar una unidad de ${name}`,
  remove: "Quitar",
  removeLabel: (name: string) => `Quitar ${name} del carrito`,
  subtotal: "Subtotal",
  partialSubtotal: "Subtotal parcial",
  unpricedNote:
    "Algunos productos todavía no tienen precio confirmado y no están sumados.",
  shippingNote: "Los costos de envío se calculan al finalizar la compra.",
  freeShippingReached: "Tu pedido tiene envío gratis.",
  freeShippingRemaining: (amount: string) =>
    `Te faltan ${amount} para el envío gratis.`,
  viewCart: "Ver carrito",
  checkout: "Finalizar compra",
  /**
   * Demo local: no hay checkout. Se dice tal cual, sin simular una compra.
   * Desaparece al conectar Shopify (`checkoutEnabled`).
   */
  checkoutPending:
    "La compra online se habilita cuando abra la tienda. Tu carrito queda guardado en este navegador.",
  continueShopping: "Seguir comprando",
  updating: "Actualizando…",
  errors: {
    load: "No pudimos recuperar tu carrito.",
    add: "No pudimos agregar el producto. Probá de nuevo.",
    update: "No pudimos actualizar el carrito. Probá de nuevo.",
  },
  dismissError: "Cerrar aviso",
};

export const searchCopy = {
  label: "Buscar",
  open: "Abrir búsqueda",
  close: "Cerrar búsqueda",
  placeholder: "Buscar productos, activos o lecturas",
  initialTitle: "Sugerencias",
  suggestions: ["El Ritual", "Calendario", "Niacinamida", "Centella", "Bloom"],
  products: "Productos",
  readings: "Lecturas",
  loading: "Buscando…",
  noResults: (query: string) => `No encontramos resultados para “${query}”.`,
  noResultsHint: "Probá con el nombre de un sérum, un activo o una palabra como “ritual”.",
  resultsCount: (n: number) => (n === 1 ? "1 resultado" : `${n} resultados`),
  viewShop: "Ver toda la tienda",
};

/**
 * Cuenta.
 *
 * El acceso real será con Shopify Customer Accounts (sin contraseña: código
 * por email). No se construye un login clásico que después habría que tirar.
 * Mientras tanto, la vista con sesión se puede recorrer en modo DEMO, con
 * datos ficticios declarados como tales (`data/accountDemo.ts`).
 */
export const accountCopy = {
  title: "Cuenta",
  signedOut: {
    eyebrow: "Tu cuenta",
    title: "Accedé a tu cuenta.",
    body: "Tus pedidos y tus datos de envío, en un solo lugar. Vas a ingresar con tu email, sin contraseña.",
    cta: "Acceder",
    pending: "El acceso se habilita cuando abra la tienda.",
    demoCta: "Ver la cuenta en modo demo",
  },
  demoBanner: "Modo demo · datos ficticios para revisar el diseño. Nada de esto es un pedido real.",
  nav: {
    summary: "Resumen",
    orders: "Pedidos",
    profile: "Perfil y direcciones",
    logout: "Cerrar sesión",
  },
  greeting: (name: string) => `Hola, ${name}.`,
  summaryBody: "Acá vas a encontrar tus pedidos y los datos de envío.",
  lastOrder: "Último pedido",
  noOrders: "Todavía no hiciste pedidos.",
  orderLabel: (n: string) => `Pedido ${n}`,
  viewOrder: "Ver detalle",
  backToOrders: "Volver a pedidos",
  orderNotFound: "No encontramos ese pedido.",
  items: "Productos",
  shippingAddress: "Dirección de envío",
  total: "Total",
  profile: "Datos personales",
  addresses: "Direcciones",
  defaultAddress: "Principal",
  loading: "Cargando tu cuenta…",
  error: "No pudimos cargar tu cuenta. Probá de nuevo en unos minutos.",
  retry: "Reintentar",
};
