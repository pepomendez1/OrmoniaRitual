/**
 * /calendario — página editorial del Calendario cíclico.
 *
 * COPY PROVISIONAL, A VALIDAR CON EL EQUIPO. Describe el calendario solo como
 * herramienta de observación y registro personal. Reglas:
 * - nunca decir que predice, diagnostica, equilibra, regula o modifica
 *   procesos hormonales;
 * - no describir el objeto físico (medidas, materiales, páginas, interior)
 *   hasta tener el dato: esos bloques están en `null`/`[]` y no se renderizan.
 *
 * La ficha comercial es otra: `calendarProduct` en `data/products.ts`.
 */

export interface CalendarStep {
  title: string;
  body: string;
}

export const calendarCopy = {
  hero: {
    eyebrow: "Herramientas del ritual",
    title: ["Calendario", "cíclico."],
    lead: "Un objeto para observar y registrar cómo se ve y se siente tu piel a lo largo del mes.",
    /** TEMPORAL · mockup de portada y páginas. `null` usa la foto de producto. */
    media: {
      src: "/production-temp/calendar/calendario-paginas.jpg",
      alt: "Portada y páginas interiores del Calendario cíclico: mapa cíclico, etapas, registro diario y reflexiones.",
    } as { src: string; alt: string } | null,
  },
  what: {
    eyebrow: "Qué es",
    title: "Un lugar para anotar lo que ves.",
    body: [
      "El Calendario cíclico acompaña el ritual ORMONIA fuera del frasco. No te dice qué va a pasar ni cómo tendría que estar tu piel: te da un lugar para registrar cómo está.",
    ],
  },
  role: {
    eyebrow: "Dentro del ritual",
    title: "Observar antes de intervenir.",
    body: "El ritual empieza mirando. Registrar, día a día, si tu piel se siente tirante, luminosa o sensible ayuda a reconocer tus propios patrones y a elegir con más calma qué necesita.",
    words: ["Escuchar", "Observar", "Acompañar", "Cuidar"],
    /**
     * TEMPORAL · grabado de referencia (fases lunares): la idea de un ciclo
     * que se observa entero. Verificar derechos de uso antes de publicar.
     * Es chico (405px): no mostrarlo a más de ~360px.
     */
    media: {
      src: "/production-temp/references/moon-phases.jpg",
      alt: "Grabado antiguo con las fases de la luna dispuestas en círculo.",
    } as { src: string; alt: string } | null,
  },
  howTo: {
    eyebrow: "Cómo se usa",
    title: "Un gesto breve.",
    steps: [
      {
        title: "Mirar",
        body: "Elegí un momento del día y observá tu piel con luz natural, sin apuro.",
      },
      {
        title: "Anotar",
        body: "Registrá lo que notás: cómo se siente, cómo se ve, qué cambió.",
      },
      {
        title: "Reconocer",
        body: "Con el tiempo, lo anotado deja ver cómo responde tu piel en distintos momentos.",
      },
    ] as CalendarStep[],
  },
  /**
   * Visual del interior / páginas. Con `[]` el bloque completo no se
   * renderiza.
   */
  interior: {
    eyebrow: "Por dentro",
    // Frase tomada del propio mockup del calendario. Provisional.
    title: "Un mapa en constante movimiento.",
    body: "Mapa cíclico, etapas, registro diario y reflexiones: un lugar para cada cosa que observás.",
    // TEMPORAL · mockup del libro abierto. Reemplazar por fotografía final.
    media: [
      {
        src: "/production-temp/calendar/calendario-abierto.jpg",
        alt: "Calendario cíclico abierto: presentación, cómo usarlo y mapa cíclico circular para registrar cada día.",
      },
    ] as Array<{ src: string; alt: string }>,
  },
  personal: {
    eyebrow: "Tu registro",
    title: "No hay una piel ideal a la que llegar.",
    body: "Lo que anotás es tuyo. No hay respuestas correctas: solo lo que observás, en tus propios términos. Si querés empezar por entender cómo responde tu piel, podés hacer el Test de perfil de piel.",
    cta: "Hacer el test",
    ctaHref: "/descubri-tu-piel",
  },
  disclaimer:
    "El Calendario cíclico es una herramienta de observación personal. No predice, no diagnostica y no reemplaza la consulta con un profesional de la salud.",
  buy: {
    eyebrow: "El objeto",
    cta: "Ver producto",
    add: "Agregar al carrito",
  },
};
