import { useCallback, useLayoutEffect, useMemo, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { products, phaseLabel, type CyclePhase, type CycleScene, type Product } from "@/data/products";

const cycleActives: Record<CyclePhase, string[]> = {
  Menstrual: ["Jojoba", "Caléndula", "Rosa mosqueta", "Vitamina E"],
  Follicular: ["Niacinamida", "Glicerina", "Ácido hialurónico", "Péptidos"],
  Ovulatory: ["Vitamina C", "Glicerina", "Panthenol"],
  Luteal: ["Centella asiática", "Glicerina", "Pentapéptido-18"],
};

/** Opacidad del texto secundario sobre la tinta de cada escena. */
const INK_BODY = 0.84;
const INK_LABEL = 0.76;

/**
 * Escena fotográfica de cada fase.
 *
 * Cada sérum vive dentro de su propia fotografía de campaña. Imagen, recortes,
 * tono y tinta se declaran en `data/products.ts` (`cycleScene`): cambiar una
 * foto o un crop no toca nada de este archivo.
 */
function sceneOf(product: Product): CycleScene {
  const scene = product.cycleScene;
  if (!scene) throw new Error(`El Ciclo: falta cycleScene en ${product.slug}`);
  return scene;
}

/**
 * Duración del crossfade entre fotografías (s). Dentro del rango 0.6–1.0:
 * lo bastante largo para leerse como la misma campaña cambiando de momento,
 * lo bastante corto para acompañar el scrub sin quedar atrás.
 */
const SCENE_FADE = 0.8;

/**
 * Histéresis del cambio de fase, en unidades de `t` (una fase = 1).
 *
 * La fase activa cambia al cruzar el punto medio entre dos protagonistas, pero
 * solo si se lo pasa por este margen: oscilar sobre el borde con la rueda o
 * el trackpad no dispara crossfades de ida y vuelta.
 */
const PHASE_HYSTERESIS = 0.06;

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
 * `data-header-tone`. Las fotografías oscuras (`cycleScene.tone === "dark"`)
 * declaran su tramo para que la navegación pase a ivory si el usuario vuelve
 * hacia arriba sobre El Ciclo; sobre las claras queda el ink por defecto. Se derivan de las mismas
 * constantes del timeline, así no se desfasan si se ajustan los tiempos.
 */
function darkScenePercent(dark: boolean[]): Array<{ top: number; height: number }> {
  const pinShare = PIN_VH / SECTION_VH;
  // Frontera perceptiva entre fases: el punto medio entre dos protagonistas.
  const edges = [0];
  for (let k = 0; k < TRANSITIONS; k += 1) {
    edges.push(progressOfPhase(k + 0.5) * pinShare * 100);
  }
  edges.push(100);

  return dark
    .map((isDark, index) => ({
      dark: isDark,
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
  const railLabelRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const railHighlightRef = useRef<HTMLSpanElement>(null);
  const railTrackRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const entryVeilRef = useRef<HTMLDivElement>(null);
  const exitVeilRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  /** Solo con reduced motion: muestra una fase sin scroll ni animación. */
  const showPhaseRef = useRef<((index: number) => void) | null>(null);

  const phases = useMemo(
    () => products.filter((product) => product.phase !== null),
    []
  );

  const darkRanges = useMemo(
    () => darkScenePercent(phases.map((product) => sceneOf(product).tone === "dark")),
    [phases]
  );

  /**
   * Lleva el scroll al punto del recorrido donde la fase pedida es
   * protagonista. No cambia el estado a mano: mueve el scroll y deja que el
   * mismo `render` continuo resuelva la escena, así la llegada se anima igual
   * que si el usuario hubiese scrolleado.
   */
  const goToPhase = useCallback((index: number) => {
    const trigger = triggerRef.current;
    if (!trigger) {
      // Reduced motion: no hay recorrido que scrollear; se cambia la escena.
      showPhaseRef.current?.(index);
      return;
    }

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

  /*
   * Layout effect, no `useEffect`: al desmontar, React suelta los refs y saca
   * el DOM en la fase de commit, pero la limpieza de un `useEffect` corre más
   * tarde (asíncrona en navegaciones con transición). En ese hueco el ticker
   * de GSAP seguía avanzando el scrub y `render` escribía sobre refs ya en
   * `null`. La limpieza de un layout effect corre en el mismo commit que
   * suelta los refs, así timeline y ScrollTrigger mueren antes que su DOM.
   */
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const railHighlight = railHighlightRef.current;
    const railTrack = railTrackRef.current;
    const entryVeil = entryVeilRef.current;
    const exitVeil = exitVeilRef.current;
    const eyebrow = eyebrowRef.current;
    const heading = headingRef.current;
    if (
      !section ||
      !stage ||
      !railHighlight ||
      !railTrack ||
      !entryVeil ||
      !exitVeil ||
      !eyebrow ||
      !heading
    ) {
      return;
    }

    /** Corta cualquier callback que GSAP dispare durante o después del revert. */
    let disposed = false;

    const bottles = bottleRefs.current.filter((el): el is HTMLDivElement => el !== null);
    const copies = copyRefs.current.filter((el): el is HTMLDivElement => el !== null);
    const scenes = sceneRefs.current.filter((el): el is HTMLDivElement => el !== null);
    const railLabels = railLabelRefs.current.filter(
      (el): el is HTMLSpanElement => el !== null
    );

    const phaseInk = phases.map((product) => toRgb(sceneOf(product).ink));
    const tinted = [eyebrow, heading, ...railLabels];

    /*
     * Fondo: la fotografía sigue a la FASE ACTIVA, no a cada píxel de scroll.
     *
     * `paint` sigue siendo continuo para frascos, copy e indicador, pero el
     * fondo solo reacciona cuando cambia la fase activa (con histéresis). En
     * ese momento la foto nueva sube al frente y entra con un crossfade de
     * duración fija; recién cuando terminó, las demás pasan a 0. Así nunca
     * hay dos fotos a medias que dejen ver la base, ni un fade que tiemble
     * con microcambios de scroll.
     *
     * La tinta del titular y del indicador viaja con la foto, en el mismo
     * tween, para que el contraste cambie junto con el fondo.
     */
    let activeScene = -1;
    let sceneZ = 1;
    const ink = { r: phaseInk[0][0], g: phaseInk[0][1], b: phaseInk[0][2] };

    const applyInk = () => {
      if (disposed) return;
      const inkCss = `rgb(${Math.round(ink.r)},${Math.round(ink.g)},${Math.round(ink.b)})`;
      gsap.set(tinted, { color: inkCss });
      gsap.set([railHighlight, railTrack], { backgroundColor: inkCss });
    };

    const activateScene = (index: number, instant: boolean) => {
      if (disposed || index === activeScene) return;
      activeScene = index;

      const incoming = scenes[index];
      const others = scenes.filter((_, k) => k !== index);
      const [r, g, b] = phaseInk[index];

      // Lo que estuviera entrando se congela debajo: la foto nueva lo cubre.
      gsap.killTweensOf(others);
      sceneZ += 1;
      gsap.set(incoming, { zIndex: sceneZ });

      if (instant) {
        gsap.set(incoming, { opacity: 1 });
        gsap.set(others, { opacity: 0 });
        gsap.killTweensOf(ink);
        Object.assign(ink, { r, g, b });
        applyInk();
        return;
      }

      gsap.to(incoming, {
        opacity: 1,
        duration: SCENE_FADE,
        ease: "power1.inOut",
        overwrite: "auto",
        onComplete: () => {
          if (disposed || activeScene !== index) return;
          gsap.set(others, { opacity: 0 });
        },
      });
      gsap.to(ink, {
        r,
        g,
        b,
        duration: SCENE_FADE,
        ease: "power1.inOut",
        overwrite: "auto",
        onUpdate: applyInk,
      });
    };

    /** Fase activa a partir de `t`, con histéresis alrededor del punto medio. */
    const resolveActive = (t: number) => {
      const nearest = Math.max(0, Math.min(scenes.length - 1, Math.round(t)));
      if (activeScene < 0) return nearest;
      return Math.abs(t - activeScene) > 0.5 + PHASE_HYSTERESIS ? nearest : activeScene;
    };

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /**
       * Único punto de escritura de la escena.
       *
       * Frascos, copy e indicador se derivan de forma continua del mismo
       * escalar `t` (0 = CLARITY … 3 = RESTORE): cualquier posición de scroll
       * produce un estado válido y scrollear hacia atrás es simétrico. El
       * fondo y la tinta resuelven la fase activa desde ese mismo `t`. El modo
       * reduced motion usa la misma función con valores enteros e `instant`.
       */
      const paint = (slots: ReturnType<typeof makeSlots>, instant = false) => (t: number) => {
        if (disposed) return;

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

        // 2. Fondo y tinta: siguen a la fase activa (ver `activateScene`).
        activateScene(resolveActive(t), instant);

        // 3. Copy: relevo limpio, sin dos textos legibles a la vez.
        copies.forEach((copy, k) => {
          const d = t - k;
          gsap.set(copy, {
            autoAlpha: 1 - smoothstep(0.3, 0.48, Math.abs(d)),
            y: Math.max(-16, Math.min(16, -d * 22)),
          });
        });

        // 4. Indicador: deriva del mismo `t`, no puede desfasarse.
        gsap.set(railHighlight, { xPercent: 100 * t });
        railLabels.forEach((label, k) => {
          gsap.set(label, {
            opacity: 0.35 + 0.65 * Math.max(0, 1 - Math.abs(t - k)),
          });
        });
      };

      const build = (spread: [number, number, number]) => () => {
        const slots = makeSlots(spread);
        const renderAt = paint(slots);
        const render = (progress: number) => renderAt(phaseAt(progress));

        gsap.set(bottles, { transformOrigin: "50% 100%" });
        /*
         * Los velos de entrada y salida empataban con el tinte mineral del
         * Hero y con el agua. Con el nuevo orden (Calendario → El Ciclo →
         * Descubrí tu piel) ambos bordes son cortes limpios: quedan en 0.
         */
        gsap.set(entryVeil, { autoAlpha: 0 });
        gsap.set(exitVeil, { autoAlpha: 0 });

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
          entryVeil,
          { autoAlpha: 0, duration: LEAD_IN, ease: "none" },
          0
        );
        /*
         * El velo de salida oscurecía la última fase hacia la escena de agua,
         * que ya no sigue a El Ciclo. Ahora entrega a Descubrí tu piel con un
         * corte limpio: el velo queda en 0 (montado, por si se retoma).
         */

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

      /*
       * Reduced motion: escena estática, sin pin ni rotación. La sección deja
       * de medir 280vh (ver `motion-reduce:md:h-auto`) y los indicadores
       * cambian de fase al instante, así las cuatro fórmulas siguen siendo
       * alcanzables sin depender del scroll.
       */
      mm.add("(min-width: 768px) and (prefers-reduced-motion: reduce)", () => {
        // Cambio directo de fotografía: sin crossfade.
        const renderAt = paint(makeSlots([-228, -120, 148]), true);
        gsap.set(bottles, { transformOrigin: "50% 100%" });
        gsap.set(entryVeil, { autoAlpha: 0 });
        gsap.set(exitVeil, { autoAlpha: 0 });
        renderAt(0);
        showPhaseRef.current = renderAt;
        return () => {
          showPhaseRef.current = null;
        };
      });

      return () => mm.revert();
    }, section);

    return () => {
      disposed = true;
      // Los crossfades se crean desde callbacks, fuera del contexto: se matan
      // explícitamente, solo los de esta sección (nada global).
      gsap.killTweensOf(scenes);
      gsap.killTweensOf(ink);
      ctx.revert();
    };
  }, [phases]);

  return (
    <section
      id="ciclo"
      ref={sectionRef}
      className="relative md:h-[280vh] motion-reduce:md:h-auto"
      style={{ backgroundColor: sceneOf(phases[0]).base }}
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
        {/*
          Una fotografía por fase. Van dentro de su propio contexto de
          apilado (`isolate`): el z-index con el que cada foto sube al frente
          crece en cada cambio y no debe competir con el copy ni los frascos.

          Las cuatro se montan juntas y con `loading="lazy"`: como comparten
          posición, el navegador las pide a la vez al acercarse la sección —
          antes de necesitarlas, sin pesar en la carga inicial—. Mientras
          llegan se ve `base`, el color promedio de cada foto, no un blanco.
        */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 isolate">
          {phases.map((product, index) => {
            const scene = sceneOf(product);
            return (
              <div
                key={`scene-${product.slug}`}
                ref={(el) => {
                  sceneRefs.current[index] = el;
                }}
                className="absolute inset-0 overflow-hidden"
                style={{
                  backgroundColor: scene.base,
                  opacity: index === 0 ? 1 : 0,
                  zIndex: index === 0 ? 1 : 0,
                }}
              >
                <img
                  src={scene.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: scene.objectPosition }}
                />
                {scene.textScrim && (
                  <div className="absolute inset-0" style={{ backgroundImage: scene.textScrim }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Velos de entrada y salida: continuidad con el Hero y con el bloque
            comercial. No alteran el color propio de ninguna fase. */}
        <div
          ref={entryVeilRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[4] bg-[#a4907f] opacity-0"
        />
        <div
          ref={exitVeilRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[4] bg-[#6f5644] opacity-0"
        />

        <div className="absolute left-[5vw] top-[8vh] z-20">
          <p
            ref={eyebrowRef}
            style={{ color: sceneOf(phases[0]).ink, opacity: INK_LABEL }}
            className="font-sans text-[10px] uppercase tracking-[0.26em]"
          >
            El ciclo
          </p>
        </div>

        <div className="absolute left-[5vw] top-1/2 z-20 w-[36vw] max-w-[560px] -translate-y-1/2">
          <h2
            ref={headingRef}
            id="cycle-heading"
            style={{ color: sceneOf(phases[0]).ink }}
            className="mb-12 font-display text-[clamp(3rem,5.6vw,6.6rem)] leading-[0.91] tracking-[-0.04em]"
          >
            Tu piel cambia.<br />Tu ritual también.
          </h2>

          <div className="relative min-h-[235px]">
            {phases.map((product, index) => {
              const phase = product.phase as CyclePhase;
              const scene = sceneOf(product);
              return (
                <div
                  key={product.slug}
                  ref={(el) => {
                    copyRefs.current[index] = el;
                  }}
                  className="absolute inset-x-0 top-0"
                  style={{ color: scene.ink, opacity: index === 0 ? 1 : 0 }}
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
              style={{ backgroundColor: sceneOf(phases[0]).ink }}
            />
            <span
              ref={railHighlightRef}
              aria-hidden="true"
              className="absolute inset-y-0 left-0 block w-1/4"
              style={{ backgroundColor: sceneOf(phases[0]).ink }}
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
                  style={{ color: sceneOf(phases[0]).ink }}
                  className="block font-sans text-[9px] uppercase tracking-[0.16em] transition-opacity duration-300 group-hover/rail:!opacity-100"
                >
                  {phaseLabel[product.phase as CyclePhase]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/*
        Mobile: misma jerarquía conceptual, versión estable sin pin ni
        carrusel. Cada fase es su propio plano con su fotografía, recortada
        con `objectPositionMobile` para dejar el frasco sobre una zona calma.
        La apertura queda sobre el campo claro de la Home: el primer plano
        fotográfico es CLARITY.
      */}
      <div className="md:hidden">
        <div className="relative bg-[#F2EBDD] px-6 pb-12 pt-24 text-ink">
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
        {phases.map((product) => {
          const phase = product.phase as CyclePhase;
          const scene = sceneOf(product);
          return (
            <article
              key={product.slug}
              data-header-tone={scene.tone === "dark" ? "light" : "dark"}
              className="relative min-h-[92svh] overflow-hidden px-6 py-16"
              style={{ backgroundColor: scene.base, color: scene.ink }}
            >
              <img
                src={scene.src}
                alt=""
                loading="lazy"
                decoding="async"
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: scene.objectPositionMobile }}
              />
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
