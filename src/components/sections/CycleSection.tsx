import { useCallback, useEffect, useMemo, useRef, type CSSProperties } from "react";
import { gsap } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { products, phaseLabel, type CyclePhase } from "@/data/products";

const cycleActives: Record<CyclePhase, string[]> = {
  Menstrual: ["Jojoba", "Caléndula", "Rosa mosqueta", "Vitamina E"],
  Follicular: ["Niacinamida", "Glicerina", "Ácido hialurónico", "Péptidos"],
  Ovulatory: ["Vitamina C", "Glicerina", "Panthenol"],
  Luteal: ["Centella asiática", "Glicerina", "Pentapéptido-18"],
};

/** Opacidad del texto secundario. Verificada ≥4.5:1 contra las cuatro bases. */
const INK_BODY = 0.84;
const INK_LABEL = 0.76;

const IVORY = "#F2EBDD";

/**
 * Atmósfera por fase.
 *
 * El color base de cada escena viene del packaging del serum correspondiente:
 *
 *   CLARITY  → fase menstrual  → bordo / vino profundo
 *   BLOOM    → fase folicular  → verde muy claro / salvia cremosa
 *   RADIANCE → fase ovulatoria → verde oliva / lima suave
 *   RESTORE  → fase lútea      → marrón tierra profundo
 *
 * Sobre esa base, cada fase tiene además su propia temperatura, dirección de
 * luz, materia, textura y sombra. Son capas CSS declarativas, pensadas para
 * sustituirse una a una por fotografía de producción sin tocar la rotación.
 *
 * No se representan plantas identificables: solo campos de color, luz y grano.
 */
interface Atmosphere {
  /** Color base, tomado del packaging. */
  base: string;
  /** Texto — contraste verificado contra `base`. */
  ink: string;
  /** Luz de contacto detrás del protagonista. */
  keyLight: string;
  /** Ubicación de esa luz: cambia con la fase, así el frasco no se apoya igual. */
  keyLightAt: CSSProperties;
  /** `true` si la base es oscura: define el tono del header sobre la escena. */
  darkBase: boolean;
  /** Capas de la escena, de atrás hacia adelante. */
  layers: CSSProperties[];
}

const atmospheres: Record<CyclePhase, Atmosphere> = {
  // CLARITY — bordo profundo. Luz baja y lateral, sombra alta, quietud.
  Menstrual: {
    base: "#5A2A32",
    ink: IVORY,
    darkBase: true,
    keyLight:
      "radial-gradient(closest-side, rgba(232,196,186,0.30), rgba(232,196,186,0))",
    keyLightAt: { left: "66vw", top: "70vh", width: "36vw", height: "44vh" },
    layers: [
      {
        backgroundImage: "url('/pradera-y-caballo.png')",
        backgroundSize: "cover",
        backgroundPosition: "34% 72%",
        opacity: 0.07,
        filter: "blur(30px) saturate(0.25) brightness(0.6)",
      },
      {
        backgroundImage:
          "radial-gradient(58% 62% at 16% 88%, rgba(226,182,172,0.26) 0%, rgba(226,182,172,0) 66%)",
      },
      {
        backgroundImage:
          "radial-gradient(88% 60% at 52% -12%, rgba(28,10,14,0.62) 0%, rgba(28,10,14,0) 62%)",
      },
      {
        backgroundImage:
          "radial-gradient(rgba(242,235,221,0.09) 0.6px, transparent 0.7px)",
        backgroundSize: "3px 3px",
      },
      {
        backgroundImage:
          "radial-gradient(80% 82% at 50% 52%, rgba(24,8,12,0) 30%, rgba(24,8,12,0.46) 100%)",
      },
    ],
  },
  // BLOOM — salvia cremosa. Luz de mañana alta a la izquierda, aire, lino.
  Follicular: {
    base: "#D7DDC8",
    ink: "#26291C",
    darkBase: false,
    keyLight:
      "radial-gradient(closest-side, rgba(252,250,240,0.62), rgba(252,250,240,0))",
    keyLightAt: { left: "66vw", top: "28vh", width: "40vw", height: "50vh" },
    layers: [
      {
        backgroundImage: "url('/pradera-y-caballo.png')",
        backgroundSize: "cover",
        backgroundPosition: "48% 52%",
        opacity: 0.12,
        filter: "blur(12px) saturate(0.9) brightness(1.16)",
      },
      {
        backgroundImage:
          "radial-gradient(66% 70% at 12% 4%, rgba(253,251,242,0.86) 0%, rgba(253,251,242,0) 60%)",
      },
      {
        backgroundImage:
          "radial-gradient(60% 58% at 92% 98%, rgba(126,142,92,0.30) 0%, rgba(126,142,92,0) 70%)",
      },
      {
        backgroundImage:
          "repeating-linear-gradient(102deg, rgba(255,255,255,0.16) 0 1px, rgba(255,255,255,0) 1px 5px)",
      },
      {
        backgroundImage:
          "linear-gradient(0deg, rgba(58,66,40,0.20) 0%, rgba(58,66,40,0) 28%)",
      },
    ],
  },
  // RADIANCE — oliva / lima suave. Sol alto y duro desde la derecha, contraste.
  Ovulatory: {
    base: "#B4BC78",
    ink: "#23260F",
    darkBase: false,
    keyLight:
      "radial-gradient(closest-side, rgba(255,250,214,0.58), rgba(255,250,214,0))",
    keyLightAt: { left: "80vw", top: "18vh", width: "38vw", height: "46vh" },
    layers: [
      {
        backgroundImage: "url('/pradera-y-caballo.png')",
        backgroundSize: "cover",
        backgroundPosition: "72% 34%",
        opacity: 0.1,
        filter: "blur(20px) saturate(1.4) brightness(1.05)",
      },
      {
        backgroundImage:
          "radial-gradient(44% 48% at 88% 2%, rgba(255,252,224,0.9) 0%, rgba(246,244,186,0.30) 40%, rgba(246,244,186,0) 74%)",
      },
      {
        backgroundImage:
          "radial-gradient(72% 64% at 4% 100%, rgba(94,104,44,0.44) 0%, rgba(94,104,44,0) 70%)",
      },
      {
        backgroundImage:
          "repeating-linear-gradient(108deg, rgba(255,252,224,0.14) 0 2px, rgba(255,252,224,0) 2px 26px)",
      },
      {
        backgroundImage:
          "radial-gradient(120% 104% at 14% 112%, rgba(44,50,16,0.34) 0%, rgba(44,50,16,0) 54%)",
      },
    ],
  },
  // RESTORE — tierra profunda. Crepúsculo, luz cálida baja, sombra envolvente.
  Luteal: {
    base: "#4A3325",
    ink: IVORY,
    darkBase: true,
    keyLight:
      "radial-gradient(closest-side, rgba(226,172,116,0.32), rgba(226,172,116,0))",
    keyLightAt: { left: "72vw", top: "78vh", width: "42vw", height: "42vh" },
    layers: [
      {
        backgroundImage: "url('/pradera-y-caballo.png')",
        backgroundSize: "cover",
        backgroundPosition: "38% 62%",
        opacity: 0.09,
        filter: "blur(34px) saturate(0.4) brightness(0.5)",
      },
      {
        backgroundImage:
          "radial-gradient(52% 44% at 68% 96%, rgba(224,168,110,0.32) 0%, rgba(224,168,110,0) 66%)",
      },
      {
        backgroundImage:
          "radial-gradient(94% 62% at 42% -12%, rgba(18,10,6,0.6) 0%, rgba(18,10,6,0) 64%)",
      },
      {
        backgroundImage:
          "radial-gradient(rgba(242,235,221,0.1) 0.7px, transparent 0.8px)",
        backgroundSize: "4px 4px",
      },
      {
        backgroundImage:
          "radial-gradient(76% 78% at 50% 50%, rgba(14,8,4,0) 24%, rgba(14,8,4,0.54) 100%)",
      },
    ],
  },
};

interface CarouselSlot {
  x: number;
  scale: number;
  rotation: number;
  opacity: number;
  zIndex: number;
  blur: number;
  /** Elevación mínima: lo lejano se apoya un poco más arriba. */
  lift: number;
}

/**
 * Orden espacial: borde izquierdo → protagonista → borde derecho.
 *
 * Los cuatro puntos son puntos de control, no estados discretos: la posición
 * real de cada frasco se interpola de forma continua a lo largo de ellos.
 *
 * Todos usan `transformOrigin` en su base, así la escala no los deja flotando:
 * comparten línea de apoyo y la jerarquía se lee limpia.
 */
function makeSlots(spread: [number, number, number]): CarouselSlot[] {
  const [far, near, right] = spread;
  return [
    { x: far, scale: 0.5, rotation: -2.6, opacity: 0.3, zIndex: 8, blur: 1, lift: -20 },
    { x: near, scale: 0.68, rotation: -1.2, opacity: 0.54, zIndex: 18, blur: 0.35, lift: -9 },
    { x: 0, scale: 1.08, rotation: 0, opacity: 1, zIndex: 40, blur: 0, lift: 0 },
    { x: right, scale: 0.64, rotation: 1.3, opacity: 0.46, zIndex: 16, blur: 0.45, lift: -12 },
  ];
}

/** Cuánto se aleja el frasco que sale, y desde dónde entra el que vuelve. */
const WRAP_TRAVEL = 130;

const lerp = (a: number, b: number, f: number) => a + (b - a) * f;
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smoothstep = (edge0: number, edge1: number, x: number) => {
  const f = clamp01((x - edge0) / (edge1 - edge0));
  return f * f * (3 - 2 * f);
};

/** Hex → [r,g,b], para poder componer la tinta de forma continua. */
function toRgb(hex: string): [number, number, number] {
  const v = parseInt(hex.replace("#", ""), 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

interface Placement {
  x: number;
  y: number;
  scale: number;
  rotation: number;
  opacity: number;
  zIndex: number;
  blur: number;
}

/**
 * Posición de un frasco para una coordenada continua `u ∈ [0,4)`.
 *
 * Entre 0 y 3 interpola a lo largo de los cuatro puntos de control. El tramo
 * 3 → 4 es el reciclado: el frasco se aleja por la derecha mientras se apaga y
 * vuelve a entrar por la izquierda encendiéndose. La opacidad vale exactamente
 * 0 en la mitad de ese tramo, así que el cambio de lado no puede verse por
 * mucho que se scrollee despacio — no es un teleport dependiente del timing.
 */
function placement(u: number, slots: CarouselSlot[]): Placement {
  if (u <= 3) {
    const i = Math.floor(u);
    const f = u - i;
    const a = slots[i];
    const b = slots[Math.min(i + 1, slots.length - 1)];
    return {
      x: lerp(a.x, b.x, f),
      y: lerp(a.lift, b.lift, f),
      scale: lerp(a.scale, b.scale, f),
      rotation: lerp(a.rotation, b.rotation, f),
      opacity: lerp(a.opacity, b.opacity, f),
      zIndex: lerp(a.zIndex, b.zIndex, f),
      blur: lerp(a.blur, b.blur, f),
    };
  }

  const last = slots[3];
  const first = slots[0];
  const f = u - 3;

  if (f < 0.5) {
    const g = f / 0.5;
    return {
      x: lerp(last.x, last.x + WRAP_TRAVEL, g),
      y: lerp(last.lift, last.lift + 10, g),
      scale: lerp(last.scale, last.scale * 0.88, g),
      rotation: last.rotation,
      opacity: last.opacity * Math.pow(1 - g, 2.2),
      zIndex: last.zIndex,
      blur: lerp(last.blur, last.blur + 0.8, g),
    };
  }

  const g = (f - 0.5) / 0.5;
  return {
    x: lerp(first.x - WRAP_TRAVEL, first.x, g),
    y: lerp(first.lift + 10, first.lift, g),
    scale: lerp(first.scale * 0.88, first.scale, g),
    rotation: first.rotation,
    opacity: first.opacity * Math.pow(g, 2.2),
    zIndex: first.zIndex,
    blur: lerp(first.blur + 0.8, first.blur, g),
  };
}

// CLARITY arranca en el centro. BLOOM queda inmediatamente a su izquierda para
// que un desplazamiento hacia la derecha lo convierta en el próximo protagonista.
const initialSlotByProduct = [2, 1, 0, 3];

/** Transiciones a recorrer: CLARITY → BLOOM → RADIANCE → RESTORE. */
const TRANSITIONS = 3;

/**
 * Alto de la sección y distancia real de pin, en vh. Deben coincidir con el CSS.
 * 180vh de pin = 1.8 viewports para recorrer las cuatro fases.
 */
const SECTION_VH = 280;
const PIN_VH = SECTION_VH - 100;

/**
 * Respiros mínimos al entrar y salir, en fracción del recorrido. Solo existen
 * para que los velos de continuidad resuelvan; no son pausas de la rotación.
 */
const LEAD_IN = 0.05;
const LEAD_OUT = 0.07;

/** Progreso del scroll → coordenada continua de fase `t ∈ [0, 3]`. */
function phaseAt(progress: number): number {
  const span = 1 - LEAD_IN - LEAD_OUT;
  return clamp01((progress - LEAD_IN) / span) * TRANSITIONS;
}

/** Inversa: dónde está el scroll cuando la fase `k` es protagonista. */
function progressOfPhase(index: number): number {
  const span = 1 - LEAD_IN - LEAD_OUT;
  return LEAD_IN + (index / TRANSITIONS) * span;
}

/**
 * Tramos verticales de la sección en los que la escena de fondo es oscura.
 *
 * El header flota sin fondo y solo invierte el color de su texto según
 * `data-header-tone`. Como dos de las cuatro fases son oscuras (bordo y
 * tierra), estos tramos se declaran para que la navegación siga siendo legible
 * si el usuario vuelve hacia arriba sobre El Ciclo. Se derivan de las mismas
 * constantes del timeline, así no se desfasan si se ajustan los tiempos.
 */
function darkScenePercent(): Array<{ top: number; height: number }> {
  const pinShare = PIN_VH / SECTION_VH;
  // Frontera perceptiva entre fases: el punto medio entre dos protagonistas.
  const edges = [0];
  for (let k = 0; k < TRANSITIONS; k += 1) {
    edges.push(progressOfPhase(k + 0.5) * pinShare * 100);
  }
  edges.push(100);

  const order: CyclePhase[] = ["Menstrual", "Follicular", "Ovulatory", "Luteal"];
  return order
    .map((phase, index) => ({
      dark: atmospheres[phase].darkBase,
      top: edges[index],
      height: edges[index + 1] - edges[index],
    }))
    .filter((range) => range.dark)
    .map(({ top, height }) => ({ top, height }));
}

/**
 * El Ciclo — cuatro fases, un serum protagonista.
 *
 * Los cuatro serums permanecen visibles siempre. El scroll rota el conjunto una
 * posición hacia la derecha y el frasco del centro se vuelve la fase activa.
 *
 * Cada cambio de fase ocurre dentro de una única sub-timeline: frasco, fondo,
 * luz, nombre, copy, label de fase e indicador inferior arrancan en el mismo
 * instante, con la misma duración y el mismo easing. No hay desfasajes.
 *
 * Sin números gigantes, diagonales, órbitas ni espirales.
 */
export function CycleSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const bottleRefs = useRef<Array<HTMLDivElement | null>>([]);
  const copyRefs = useRef<Array<HTMLDivElement | null>>([]);
  const sceneRefs = useRef<Array<HTMLDivElement | null>>([]);
  const lightRefs = useRef<Array<HTMLDivElement | null>>([]);
  const railLabelRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const railHighlightRef = useRef<HTMLSpanElement>(null);
  const railTrackRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const entryVeilRef = useRef<HTMLDivElement>(null);
  const exitVeilRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  const phases = useMemo(
    () => products.filter((product) => product.phase !== null),
    []
  );

  const darkRanges = useMemo(darkScenePercent, []);

  /**
   * Lleva el scroll al punto del recorrido donde la fase pedida es
   * protagonista. No cambia el estado a mano: mueve el scroll y deja que el
   * mismo `render` continuo resuelva la escena, así la llegada se anima igual
   * que si el usuario hubiese scrolleado.
   */
  const goToPhase = useCallback((index: number) => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const target =
      trigger.start + (trigger.end - trigger.start) * progressOfPhase(index);

    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.1 });
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: target, behavior: reduced ? "auto" : "smooth" });
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const bottles = bottleRefs.current.filter((el): el is HTMLDivElement => el !== null);
    const copies = copyRefs.current.filter((el): el is HTMLDivElement => el !== null);
    const scenes = sceneRefs.current.filter((el): el is HTMLDivElement => el !== null);
    const lights = lightRefs.current.filter((el): el is HTMLDivElement => el !== null);
    const railLabels = railLabelRefs.current.filter(
      (el): el is HTMLSpanElement => el !== null
    );

    const phaseInk = phases.map((product) =>
      toRgb(atmospheres[product.phase as CyclePhase].ink)
    );
    const tinted = [eyebrowRef.current, headingRef.current, ...railLabels];

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      const build = (spread: [number, number, number]) => () => {
        const slots = makeSlots(spread);

        gsap.set(bottles, { transformOrigin: "50% 100%" });
        gsap.set(entryVeilRef.current, { autoAlpha: 0.55 });
        gsap.set(exitVeilRef.current, { autoAlpha: 0 });

        /**
         * Único punto de escritura de la escena.
         *
         * Todo —frascos, fondo, luz, copy, tinta e indicador— se deriva del
         * mismo escalar `t`. No hay keyframes ni umbrales: cualquier posición
         * de scroll produce un estado válido, y scrollear hacia atrás es
         * exactamente simétrico.
         */
        const render = (progress: number) => {
          const t = phaseAt(progress);

          // 1. Frascos: rotación física continua.
          bottles.forEach((bottle, productIndex) => {
            const u = (initialSlotByProduct[productIndex] + t) % slots.length;
            const at = placement(u, slots);
            gsap.set(bottle, {
              x: at.x,
              y: at.y,
              scale: at.scale,
              rotation: at.rotation,
              opacity: at.opacity,
              zIndex: Math.round(at.zIndex),
              filter: `blur(${at.blur.toFixed(2)}px)`,
            });
          });

          /*
           * 2. Fondos: revelado acumulativo. Cada escena se monta sobre la
           * anterior y empieza a entrar mucho antes de que su fase llegue al
           * centro, así el color nuevo ya está presente durante la transición.
           */
          const sceneAlpha: number[] = [1];
          for (let k = 1; k < scenes.length; k += 1) {
            sceneAlpha[k] = smoothstep(k - 0.85, k - 0.05, t);
          }
          scenes.forEach((scene, k) => {
            gsap.set(scene, { opacity: sceneAlpha[k] });
          });

          // 3. Luz de contacto: peso por fase, para que no se acumulen.
          lights.forEach((light, k) => {
            gsap.set(light, { opacity: Math.max(0, 1 - Math.abs(t - k)) });
          });

          // 4. Copy: relevo limpio, sin dos textos legibles a la vez.
          copies.forEach((copy, k) => {
            const d = t - k;
            gsap.set(copy, {
              autoAlpha: 1 - smoothstep(0.3, 0.48, Math.abs(d)),
              y: Math.max(-16, Math.min(16, -d * 22)),
            });
          });

          /*
           * 5. Tinta compartida: se compone con los mismos pesos que los
           * fondos, así el contraste del titular acompaña la escena en vez de
           * cruzarla con su propio tiempo.
           */
          let ink: [number, number, number] = [...phaseInk[0]];
          for (let k = 1; k < phaseInk.length; k += 1) {
            const next = phaseInk[k];
            const a = sceneAlpha[k];
            ink = [
              lerp(ink[0], next[0], a),
              lerp(ink[1], next[1], a),
              lerp(ink[2], next[2], a),
            ];
          }
          const inkCss = `rgb(${ink.map((c) => Math.round(c)).join(",")})`;
          gsap.set(tinted, { color: inkCss });
          gsap.set([railHighlightRef.current, railTrackRef.current], {
            backgroundColor: inkCss,
          });

          // 6. Indicador: deriva del mismo `t`, no puede desfasarse.
          gsap.set(railHighlightRef.current, { xPercent: 100 * t });
          railLabels.forEach((label, k) => {
            gsap.set(label, {
              opacity: 0.35 + 0.65 * Math.max(0, 1 - Math.abs(t - k)),
            });
          });
        };

        render(0);

        const driver = { progress: 0 };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            pin: stage,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        tl.to(
          driver,
          {
            progress: 1,
            duration: 1,
            ease: "none",
            onUpdate: () => render(driver.progress),
          },
          0
        );
        tl.to(
          entryVeilRef.current,
          { autoAlpha: 0, duration: LEAD_IN, ease: "none" },
          0
        );
        tl.to(
          exitVeilRef.current,
          { autoAlpha: 0.8, duration: LEAD_OUT, ease: "none" },
          1 - LEAD_OUT
        );

        triggerRef.current = tl.scrollTrigger ?? null;
        return () => {
          triggerRef.current = null;
        };
      };

      mm.add(
        "(min-width: 1280px) and (prefers-reduced-motion: no-preference)",
        build([-318, -166, 206])
      );
      mm.add(
        "(min-width: 768px) and (max-width: 1279px) and (prefers-reduced-motion: no-preference)",
        build([-228, -120, 148])
      );

      // Reduced motion: escena estática legible, sin pin ni rotación.
      mm.add("(min-width: 768px) and (prefers-reduced-motion: reduce)", () => {
        const slots = makeSlots([-228, -120, 148]);
        gsap.set(bottles, { transformOrigin: "50% 100%" });
        bottles.forEach((bottle, productIndex) => {
          const at = placement(initialSlotByProduct[productIndex], slots);
          gsap.set(bottle, {
            x: at.x,
            y: at.y,
            scale: at.scale,
            rotation: at.rotation,
            opacity: at.opacity,
            zIndex: Math.round(at.zIndex),
          });
        });
        gsap.set(copies, { autoAlpha: 0 });
        gsap.set(copies[0], { autoAlpha: 1, y: 0 });
        gsap.set(scenes, { opacity: 0 });
        gsap.set(scenes[0], { opacity: 1 });
        gsap.set(lights, { opacity: 0 });
        gsap.set(lights[0], { opacity: 1 });
        gsap.set(entryVeilRef.current, { autoAlpha: 0 });
        gsap.set(exitVeilRef.current, { autoAlpha: 0 });
      });

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, [phases]);

  return (
    <section
      id="ciclo"
      ref={sectionRef}
      className="relative bg-[#5A2A32] md:h-[280vh]"
      aria-labelledby="cycle-heading"
    >
      {/* Tramos con escena oscura: el header invierte a texto ivory al pasar
          por encima. Solo declaran tono; no pintan nada. */}
      {darkRanges.map((range) => (
        <div
          key={`tone-${range.top}`}
          aria-hidden="true"
          data-header-tone="light"
          className="pointer-events-none absolute inset-x-0 hidden md:block"
          style={{ top: `${range.top}%`, height: `${range.height}%` }}
        />
      ))}

      <div
        ref={stageRef}
        className="relative hidden h-screen w-full overflow-hidden md:block"
      >
        {/* Una atmósfera completa por fase, con el color base del packaging. */}
        {phases.map((product, index) => {
          const phase = product.phase as CyclePhase;
          const atmosphere = atmospheres[phase];
          return (
            <div
              key={`scene-${product.slug}`}
              ref={(el) => {
                sceneRefs.current[index] = el;
              }}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden"
              style={{
                backgroundColor: atmosphere.base,
                opacity: index === 0 ? 1 : 0,
              }}
            >
              {atmosphere.layers.map((layer, layerIndex) => (
                <div key={layerIndex} className="absolute inset-0" style={layer} />
              ))}
            </div>
          );
        })}

        {/* Luz de contacto detrás del protagonista: cambia de posición y de
            temperatura con la fase. */}
        {phases.map((product, index) => {
          const phase = product.phase as CyclePhase;
          return (
            <div
              key={`light-${product.slug}`}
              ref={(el) => {
                lightRefs.current[index] = el;
              }}
              aria-hidden="true"
              className="pointer-events-none absolute z-[6] -translate-x-1/2 -translate-y-1/2 blur-3xl"
              style={{
                ...atmospheres[phase].keyLightAt,
                backgroundImage: atmospheres[phase].keyLight,
                opacity: index === 0 ? 1 : 0,
              }}
            />
          );
        })}

        {/* Velos de entrada y salida: continuidad con el Hero y con el bloque
            comercial. No alteran el color propio de ninguna fase. */}
        <div
          ref={entryVeilRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[4] bg-[#a4907f]"
        />
        <div
          ref={exitVeilRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[4] bg-[#6f5644] opacity-0"
        />

        <div className="absolute left-[5vw] top-[8vh] z-20">
          <p
            ref={eyebrowRef}
            style={{ color: atmospheres.Menstrual.ink, opacity: INK_LABEL }}
            className="font-sans text-[10px] uppercase tracking-[0.26em]"
          >
            El ciclo
          </p>
        </div>

        <div className="absolute left-[5vw] top-1/2 z-20 w-[36vw] max-w-[560px] -translate-y-1/2">
          <h2
            ref={headingRef}
            id="cycle-heading"
            style={{ color: atmospheres.Menstrual.ink }}
            className="mb-12 font-display text-[clamp(3rem,5.6vw,6.6rem)] leading-[0.91] tracking-[-0.04em]"
          >
            Tu piel cambia.<br />Tu ritual también.
          </h2>

          <div className="relative min-h-[235px]">
            {phases.map((product, index) => {
              const phase = product.phase as CyclePhase;
              const atmosphere = atmospheres[phase];
              return (
                <div
                  key={product.slug}
                  ref={(el) => {
                    copyRefs.current[index] = el;
                  }}
                  className="absolute inset-x-0 top-0"
                  style={{ color: atmosphere.ink, opacity: index === 0 ? 1 : 0 }}
                >
                  <p
                    className="mb-5 font-sans text-[10px] uppercase tracking-[0.22em]"
                    style={{ opacity: INK_LABEL }}
                  >
                    Fase {phaseLabel[phase]} · {product.name}
                  </p>
                  <p className="font-display text-[clamp(2.1rem,3.35vw,4.1rem)] leading-[0.98] tracking-[-0.025em]">
                    {product.tagline}
                  </p>
                  <p
                    className="mt-7 font-sans text-[9px] uppercase leading-relaxed tracking-[0.18em]"
                    style={{ opacity: INK_BODY }}
                  >
                    {cycleActives[phase].join(" · ")}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carrusel cíclico de los cuatro serums. Todos permanecen visibles. */}
        <div className="absolute left-[72vw] top-[50vh] z-30 h-[62vh] w-[30vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2">
          {phases.map((product, index) => (
            <div
              key={product.slug}
              ref={(el) => {
                bottleRefs.current[index] = el;
              }}
              className="absolute inset-0 [will-change:transform,opacity,filter]"
            >
              <img
                src={product.imageSrc}
                alt={`${product.name}, serum para la fase ${phaseLabel[
                  product.phase as CyclePhase
                ].toLowerCase()}`}
                className="h-full w-full object-contain drop-shadow-[0_34px_34px_rgba(20,10,6,0.28)]"
              />
            </div>
          ))}
        </div>

        {/*
          Indicador inferior, alineado al eje del carrusel.
          Una sola vía continua con un tramo activo que se desplaza hacia la
          derecha, en el mismo sentido y tiempo que los frascos. Las etiquetas
          no repiten "Fase": eso vive en la metadata principal.
        */}
        <div className="absolute bottom-[7vh] left-[72vw] z-20 w-[34vw] max-w-[540px] -translate-x-1/2">
          <div className="relative h-[2px] w-full">
            <div
              ref={railTrackRef}
              aria-hidden="true"
              className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 opacity-25"
              style={{ backgroundColor: atmospheres.Menstrual.ink }}
            />
            <span
              ref={railHighlightRef}
              aria-hidden="true"
              className="absolute inset-y-0 left-0 block w-1/4"
              style={{ backgroundColor: atmospheres.Menstrual.ink }}
            />
          </div>
          <div className="mt-3.5 grid grid-cols-4">
            {phases.map((product, index) => (
              <button
                key={`rail-${product.slug}`}
                type="button"
                onClick={() => goToPhase(index)}
                aria-label={`Ir a la fase ${phaseLabel[
                  product.phase as CyclePhase
                ].toLowerCase()}`}
                className="group/rail w-fit cursor-pointer bg-transparent p-0 text-left"
              >
                <span
                  ref={(el) => {
                    railLabelRefs.current[index] = el;
                  }}
                  style={{ color: atmospheres.Menstrual.ink }}
                  className="block font-sans text-[9px] uppercase tracking-[0.16em] transition-opacity duration-300 group-hover/rail:!opacity-100"
                >
                  {phaseLabel[product.phase as CyclePhase]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: misma jerarquía conceptual, versión diseñada y estable,
          sin pin ni carrusel. Cada fase conserva su atmósfera y su color. */}
      <div className="md:hidden">
        <div className="relative overflow-hidden bg-[#5A2A32] px-6 pb-12 pt-28">
          <div className="pointer-events-none absolute inset-0 bg-[url('/pradera-y-caballo.png')] bg-cover bg-center opacity-[0.07] blur-sm" />
          <div className="relative z-10" style={{ color: IVORY }}>
            <p
              className="mb-5 font-sans text-[10px] uppercase tracking-[0.22em]"
              style={{ opacity: INK_LABEL }}
            >
              El ciclo
            </p>
            <h2 className="font-display text-[clamp(3rem,14vw,5rem)] leading-[0.93] tracking-[-0.035em]">
              Tu piel cambia.<br />Tu ritual también.
            </h2>
          </div>
        </div>
        {phases.map((product) => {
          const phase = product.phase as CyclePhase;
          const atmosphere = atmospheres[phase];
          return (
            <article
              key={product.slug}
              data-header-tone={atmosphere.darkBase ? "light" : "dark"}
              className="relative min-h-[92svh] overflow-hidden px-6 py-16"
              style={{ backgroundColor: atmosphere.base, color: atmosphere.ink }}
            >
              {atmosphere.layers.map((layer, layerIndex) => (
                <div
                  key={layerIndex}
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={layer}
                />
              ))}
              <div className="relative z-10 flex min-h-[80svh] flex-col justify-between">
                <div>
                  <p
                    className="mb-5 font-sans text-[10px] uppercase tracking-[0.2em]"
                    style={{ opacity: INK_LABEL }}
                  >
                    Fase {phaseLabel[phase]} · {product.name}
                  </p>
                  <h3 className="font-display text-5xl leading-none">{product.tagline}</h3>
                </div>
                <img
                  src={product.imageSrc}
                  alt={`${product.name}, serum para la fase ${phaseLabel[phase].toLowerCase()}`}
                  className="mx-auto my-5 h-[50svh] w-auto object-contain drop-shadow-[0_24px_32px_rgba(20,10,6,0.3)]"
                />
                <p
                  className="font-sans text-[10px] uppercase leading-relaxed tracking-[0.18em]"
                  style={{ opacity: INK_BODY }}
                >
                  {cycleActives[phase].join(" · ")}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
