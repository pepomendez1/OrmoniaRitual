import { productionMedia } from "./productionMedia";
import type {
  QuizOption,
  QuizQuestion,
  SkinReading,
  VisualGroup,
} from "@/lib/skinQuiz";

/**
 * Contenido de "Descubrí tu piel" — versión V1.
 *
 * Preguntas, explicaciones y copy del resultado. Sin lógica: el motor vive en
 * `lib/skinQuiz.ts` y el estado en `hooks/useSkinQuiz.ts`.
 *
 * Las explicaciones son deliberadamente humanas y no afirman certeza médica:
 * describen por qué preguntamos, no qué diagnosticamos.
 */

const PRIORITIES: QuizOption[] = [
  { id: "hidratacion", label: "Hidratación" },
  { id: "luminosidad", label: "Luminosidad" },
  { id: "textura", label: "Textura" },
  { id: "poros", label: "Poros visibles" },
  { id: "sensibilidad", label: "Sensibilidad" },
  { id: "marcas", label: "Marcas" },
  { id: "lineas", label: "Líneas" },
  { id: "brillo", label: "Brillo" },
  { id: "nada", label: "Nada en particular" },
];

export const skinQuizQuestions: QuizQuestion[] = [
  {
    id: "prioridad",
    category: "Lo que buscás",
    visualGroup: "observar",
    question: "¿Qué te gustaría mejorar hoy en tu piel?",
    type: "single",
    options: PRIORITIES,
    explanation:
      "Es el punto de partida de tu lectura. Nos dice desde dónde mirar todo lo demás.",
    required: true,
  },
  {
    id: "prioridad-secundaria",
    category: "Lo que buscás",
    visualGroup: "observar",
    question: "¿Hay algo más que quieras acompañar?",
    type: "single",
    inheritOptionsFrom: "prioridad",
    extraOptions: [{ id: "solo-eso", label: "No, eso es lo principal" }],
    explanation:
      "A veces una sola cosa alcanza. Si hay una segunda, ayuda a ordenar el ritual.",
    required: true,
  },
  {
    id: "sensacion",
    category: "Cómo se siente",
    visualGroup: "sentir",
    question: "Al final del día, ¿cómo suele sentirse tu piel?",
    type: "single",
    options: [
      { id: "tirante", label: "Tirante o seca" },
      { id: "comoda", label: "Cómoda" },
      { id: "brillo", label: "Con brillo" },
      { id: "mixta", label: "Seca en algunas zonas y con brillo en otras" },
      { id: "variable", label: "Cambia mucho según el día" },
    ],
    explanation:
      "Lo que sentís al final del día suele decir más que lo que se ve a la mañana.",
    required: true,
  },
  {
    id: "incomodidad",
    category: "Cómo se siente",
    visualGroup: "sentir",
    question: "Cuando tu piel está incómoda, ¿cómo lo notás?",
    helper: "Podés elegir hasta dos.",
    type: "multi",
    maxSelections: 2,
    options: [
      { id: "tirantez", label: "Tirantez" },
      { id: "enrojecimiento", label: "Enrojecimiento" },
      { id: "ardor", label: "Ardor o picazón" },
      { id: "descamacion", label: "Descamación" },
      { id: "brotes", label: "Brotes" },
      { id: "sin-incomodidad", label: "No suele sentirse incómoda" },
    ],
    explanation:
      "Cada piel avisa de una manera distinta. Saber cómo avisa la tuya nos ayuda a no forzarla.",
    required: true,
  },
  {
    id: "reactividad",
    category: "Cómo responde",
    visualGroup: "sentir",
    question: "¿Cómo suele reaccionar cuando probás algo nuevo?",
    type: "single",
    options: [
      { id: "estable", label: "Casi nunca reacciona" },
      { id: "adapta", label: "A veces necesita adaptarse" },
      { id: "irrita", label: "Se irrita con facilidad" },
      { id: "depende", label: "Depende mucho del producto" },
    ],
    explanation:
      "Nos ayuda a entender cuánto cuidado necesita tu piel al incorporar una fórmula nueva.",
    required: true,
  },
  {
    id: "observacion",
    category: "Cómo responde",
    visualGroup: "sentir",
    question: "Cuando la observás de cerca, ¿qué suele llamar tu atención?",
    helper: "Podés elegir hasta dos.",
    type: "multi",
    maxSelections: 2,
    options: [
      { id: "textura", label: "Textura" },
      { id: "poros", label: "Poros" },
      { id: "marcas", label: "Marcas" },
      { id: "tono", label: "Tono apagado" },
      { id: "lineas", label: "Líneas" },
      { id: "brillo", label: "Brillo" },
      { id: "sequedad", label: "Sequedad" },
      { id: "nada", label: "Nada en particular" },
    ],
    explanation:
      "Mirar de cerca es parte del ritual. Lo que notás vos importa tanto como lo que se mide.",
    required: true,
  },
  {
    id: "cambio",
    category: "Cómo cambia",
    visualGroup: "cambio",
    question: "¿Sentís que tu piel cambia en distintos momentos del mes?",
    helper: "Información complementaria: no condiciona lo que podés usar.",
    type: "single",
    options: [
      { id: "bastante", label: "Sí, bastante" },
      { id: "poco", label: "Sí, un poco" },
      { id: "muy-poco", label: "Muy poco" },
      { id: "no", label: "No" },
      { id: "no-se", label: "No lo sé" },
      { id: "no-aplica", label: "No aplica en mi caso" },
    ],
    explanation:
      "Algunas pieles cambian más que otras. Queremos saber cuánto influye eso en la tuya.",
    required: true,
  },
  {
    id: "rutina",
    category: "Cómo cambia",
    visualGroup: "cambio",
    question: "Hoy, ¿cómo describirías tu rutina?",
    type: "single",
    options: [
      { id: "simple", label: "Muy simple" },
      { id: "funciona", label: "Tengo algunos productos que me funcionan" },
      { id: "pruebo", label: "Pruebo cosas nuevas con frecuencia" },
      { id: "dudas", label: "Me cuesta saber qué usar" },
      { id: "sin-rutina", label: "No tengo una rutina definida" },
    ],
    explanation:
      "Un ritual sirve si entra en tu vida. Saber desde dónde partís lo hace más realista.",
    required: true,
  },
];

/**
 * Panel visual persistente. Cambia una vez por bloque, no por pregunta.
 *
 * Solo el bloque de cambio tiene un asset real; los demás son placeholders
 * tonales a la espera de la producción fotográfica. Reemplazarlos es cambiar
 * `media` acá, sin tocar ningún componente.
 */
export interface VisualScene {
  id: VisualGroup;
  label: string;
  caption: string;
  tone: string;
  /** Asset real, o `null` mientras el material no exista. */
  media: { kind: "video"; src: string } | { kind: "image"; src: string } | null;
  /** Recorte del asset dentro del panel vertical. */
  objectPosition?: string;
  /**
   * `contain` para ilustraciones que no admiten recorte: se muestran enteras
   * sobre `tone`, que debe coincidir con el fondo de la imagen.
   */
  fit?: "cover" | "contain";
  /**
   * Velo mínimo al pie, para la leyenda en ivory sobre fotos claras
   * (rostros). Opcional; sin él no se agrega nada.
   */
  captionScrim?: string;
  /** Nota de producción, visible solo mientras no haya asset. */
  pending?: string;
}

/** Velo al pie compartido por las escenas de rostro. */
const FACE_CAPTION_SCRIM =
  "linear-gradient(0deg, rgba(20,14,10,0.42) 0%, rgba(20,14,10,0.16) 22%, rgba(20,14,10,0) 38%)";

export const skinQuizVisuals: Record<VisualGroup, VisualScene> = {
  observar: {
    id: "observar",
    label: "Observar",
    caption: "Mirar la piel antes de intervenirla.",
    // Producción real: la mirada en primer plano. Primer bloque del test.
    tone: "#8A7564",
    media: { kind: "image", src: productionMedia.skinProfile.quizIntro.src },
    objectPosition: productionMedia.skinProfile.quizIntro.objectPosition,
    captionScrim: FACE_CAPTION_SCRIM,
    pending: "Producción · macro de piel y luz",
  },
  sentir: {
    id: "sentir",
    label: "Sentir",
    caption: "Lo que la piel dice cuando no la forzamos.",
    tone: "#D3C6B2",
    // TEMPORAL · prueba visual de producción. Agrupa las preguntas de
    // sensación, incomodidad, reactividad y observación, así que la escena de
    // piel en contacto con el agua es la semánticamente correcta.
    media: { kind: "image", src: "/production-temp/web/03-model-water.jpg" },
    // El panel es más angosto que la foto: el recorte es horizontal. Se
    // desplaza a la izquierda para conservar entera a la persona y el punto
    // donde la piel toca el agua.
    objectPosition: "42% 50%",
    pending: "Producción · textura y manos",
  },
  cambio: {
    id: "cambio",
    label: "Cambio",
    caption: "Nada en la piel se queda quieto.",
    tone: "#6E736D",
    media: { kind: "video", src: "/ritual-water.mp4" },
  },
  resultado: {
    id: "resultado",
    label: "Tu lectura",
    caption: "Lo que aparece cuando se ordena lo observado.",
    // Producción real: retrato editorial de rostro y piel.
    tone: "#9A8A7C",
    media: { kind: "image", src: productionMedia.skinProfile.quizResult.src },
    objectPosition: productionMedia.skinProfile.quizResult.objectPosition,
    captionScrim: FACE_CAPTION_SCRIM,
    pending: "Producción · retrato editorial",
  },
};

export const skinQuizCopy = {
  brand: "Ormonia",
  close: "Cerrar",
  back: "Anterior",
  next: "Continuar",
  whyLabel: "¿Por qué te preguntamos esto?",
  requiredHint: "Elegí una opción para continuar.",
  email: {
    eyebrow: "Último paso",
    title: "Tu lectura está lista.",
    body: "Dejanos tu email para guardar tu resultado y enviarte tu ritual recomendado.",
    placeholder: "Tu email",
    cta: "Ver mi resultado",
    skip: "Continuar sin guardar",
  },
};

/**
 * Resultado provisional.
 *
 * Es contenido de demostración, no una lectura inferida. Los ejes y los
 * bloques existen para fijar la estructura de la vista; sus valores no salen
 * de las respuestas. Sprint 07B reemplaza esto desde `readSkin()`.
 */
export const skinReadingPlaceholder: SkinReading = {
  provisional: true,
  phenotype: {
    title: "Tu lectura Ormonia",
    summary:
      "Una síntesis de lo que observaste sobre tu piel, ordenada para que sea más fácil elegir cómo acompañarla.",
  },
  currentState: {
    axes: [
      {
        id: "confort",
        label: "Confort",
        value: 0.68,
        note: "Cómo se siente tu piel a lo largo del día.",
      },
      {
        id: "hidratacion",
        label: "Hidratación",
        value: 0.52,
        note: "Cuánta agua parece estar reteniendo.",
      },
      {
        id: "reactividad",
        label: "Reactividad",
        value: 0.34,
        note: "Con qué facilidad responde a algo nuevo.",
      },
    ],
    needs: [
      {
        title: "Sostener la barrera",
        body: "Acompañar antes que corregir, con fórmulas que no le pidan demasiado de una vez.",
      },
      {
        title: "Recuperar luz",
        body: "Devolver claridad de a poco, sin forzar la textura ni el tono.",
      },
      {
        title: "Construir constancia",
        body: "Menos pasos, sostenidos en el tiempo, antes que una rutina que no entra en tu día.",
      },
    ],
  },
  ritual: {
    primary: null,
    complement: null,
    complete: null,
  },
};

export const skinResultCopy = {
  eyebrow: "Tu piel hoy",
  provisionalBadge: "Resultado provisional",
  observedTitle: "Lo que observamos",
  needsTitle: "Lo que tu piel parece pedir ahora",
  ritualTitle: "Tu ritual Ormonia",
  ritualPending:
    "La recomendación se completa cuando conectemos el modelo de perfiles de piel.",
  ritualSlots: [
    { id: "primary", label: "Recomendación principal" },
    { id: "complement", label: "Complemento" },
    { id: "complete", label: "Ritual completo" },
  ],
  restart: "Volver a empezar",
  home: "Ir al inicio",
  shop: "Ver la tienda",
};
