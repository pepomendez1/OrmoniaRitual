import { useEffect, useMemo, useRef, type CSSProperties } from "react";
import { gsap } from "@/lib/gsap";
import { products, phaseLabel, type CyclePhase } from "@/data/products";

const cycleActives: Record<CyclePhase, string[]> = {
  Menstrual: ["Jojoba", "Caléndula", "Rosa mosqueta", "Vitamina E"],
  Follicular: ["Niacinamida", "Glicerina", "Ácido hialurónico", "Péptidos"],
  Ovulatory: ["Vitamina C", "Glicerina", "Panthenol"],
  Luteal: ["Centella asiática", "Glicerina", "Pentapéptido-18"],
};

const phaseBenefits: Record<CyclePhase, string> = {
  Menstrual: "Calma y acompaña la sensibilidad de los días de repliegue.",
  Follicular: "Hidrata y acompaña el regreso gradual de vitalidad.",
  Ovulatory: "Ilumina y acompaña el momento de mayor presencia de la piel.",
  Luteal: "Sostiene la barrera y acompaña la necesidad de restauración.",
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
 * Avanzar una posición hacia la derecha trae el siguiente serum al centro y
 * devuelve el del extremo derecho al extremo izquierdo, de modo que el ciclo
 * es continuo y no una sucesión de slides.
 *
 * Todos los frascos usan `transformOrigin` en su base, así la escala no los
 * deja flotando: comparten línea de apoyo y la jerarquía se lee limpia.
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

// CLARITY arranca en el centro. BLOOM queda inmediatamente a su izquierda para
// que un desplazamiento hacia la derecha lo convierta en el próximo protagonista.
const initialSlotByProduct = [2, 1, 0, 3];

/** Comienzo de cada transición y su duración, en unidades de timeline. */
const TRANSITION_STARTS = [0.24, 0.49, 0.74];
const TRANSITION_STEP = 0.17;

/** Alto de la sección y distancia real de pin, en vh. Deben coincidir con el CSS. */
const SECTION_VH = 420;
const PIN_VH = SECTION_VH - 100;

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
  // Punto medio de cada transición = frontera perceptiva entre fases.
  const boundaries = TRANSITION_STARTS.map(
    (start) => (start + TRANSITION_STEP / 2) * pinShare * 100
  );
  const edges = [0, ...boundaries, 100];

  const phases: CyclePhase[] = ["Menstrual", "Follicular", "Ovulatory", "Luteal"];
  return phases
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

  const phases = useMemo(
    () => products.filter((product) => product.phase !== null),
    []
  );

  const darkRanges = useMemo(darkScenePercent, []);

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

    const phaseInk = phases.map(
      (product) => atmospheres[product.phase as CyclePhase].ink
    );
    const tinted = [eyebrowRef.current, headingRef.current, ...railLabels];

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /** Coloca la escena en su estado inicial: CLARITY al centro. */
      const reset = (slots: CarouselSlot[]) => {
        bottles.forEach((bottle, productIndex) => {
          const slot = slots[initialSlotByProduct[productIndex]];
          gsap.set(bottle, {
            transformOrigin: "50% 100%",
            x: slot.x,
            y: slot.lift,
            scale: slot.scale,
            rotation: slot.rotation,
            opacity: slot.opacity,
            zIndex: slot.zIndex,
            filter: `blur(${slot.blur}px)`,
          });
        });

        gsap.set(copies, { autoAlpha: 0, y: 18 });
        gsap.set(copies[0], { autoAlpha: 1, y: 0 });
        gsap.set(scenes, { autoAlpha: 0 });
        gsap.set(scenes[0], { autoAlpha: 1 });
        gsap.set(lights, { autoAlpha: 0 });
        gsap.set(lights[0], { autoAlpha: 1 });
        gsap.set(railLabels, { opacity: 0.4 });
        gsap.set(railLabels[0], { opacity: 1 });
        gsap.set(railHighlightRef.current, { xPercent: 0 });
        gsap.set(tinted, { color: phaseInk[0] });
        gsap.set([railHighlightRef.current, railTrackRef.current], {
          backgroundColor: phaseInk[0],
        });
      };

      const build = (spread: [number, number, number]) => () => {
        const slots = makeSlots(spread);
        reset(slots);
        gsap.set(entryVeilRef.current, { autoAlpha: 0.55 });
        gsap.set(exitVeilRef.current, { autoAlpha: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            pin: stage,
            scrub: 0.9,
            anticipatePin: 1,
          },
        });

        // Entrada: continúa el mineral con el que cierra el Hero y se hunde en
        // el bordo de CLARITY, sin corte de color en el borde de la sección.
        tl.to(entryVeilRef.current, { autoAlpha: 0, duration: 0.08, ease: "none" }, 0);

        // Un instante de asentamiento antes de la primera rotación.
        tl.fromTo(
          bottles,
          { yPercent: 2 },
          { yPercent: 0, duration: 0.09, ease: "power2.out", stagger: 0.01 },
          0.02
        );

        TRANSITION_STARTS.forEach((start, transitionIndex) => {
          const active = transitionIndex + 1;
          const previous = transitionIndex;

          /*
           * Una sola sub-timeline por cambio de fase. Todo lo que define la
           * fase entra acá en la posición 0 y con la misma duración, así el
           * frasco, el fondo, el copy y el indicador se mueven juntos.
           */
          const step = gsap.timeline({
            defaults: { duration: TRANSITION_STEP, ease: "power2.inOut" },
          });

          bottles.forEach((bottle, productIndex) => {
            const currentSlotIndex =
              (initialSlotByProduct[productIndex] + transitionIndex) % slots.length;
            const nextSlotIndex = (currentSlotIndex + 1) % slots.length;
            const slot = slots[nextSlotIndex];
            const current = slots[currentSlotIndex];
            const wrapping =
              currentSlotIndex === slots.length - 1 && nextSlotIndex === 0;

            if (wrapping) {
              // El serum del extremo derecho se retira detrás del conjunto y
              // reaparece por la izquierda. La opacidad baja durante el salto
              // evita el teletransporte sin cortar la continuidad del ciclo.
              step.to(
                bottle,
                {
                  x: current.x + 110,
                  y: current.lift + 10,
                  scale: current.scale * 0.9,
                  opacity: 0.1,
                  duration: TRANSITION_STEP * 0.42,
                  ease: "power1.in",
                },
                0
              );
              step.set(
                bottle,
                {
                  x: slot.x - 80,
                  y: slot.lift + 10,
                  scale: slot.scale * 0.88,
                  rotation: slot.rotation,
                  zIndex: slot.zIndex,
                  filter: `blur(${slot.blur + 0.8}px)`,
                },
                TRANSITION_STEP * 0.46
              );
              step.to(
                bottle,
                {
                  x: slot.x,
                  y: slot.lift,
                  scale: slot.scale,
                  rotation: slot.rotation,
                  opacity: slot.opacity,
                  filter: `blur(${slot.blur}px)`,
                  duration: TRANSITION_STEP * 0.54,
                  ease: "power2.out",
                },
                TRANSITION_STEP * 0.46
              );
            } else {
              step.to(
                bottle,
                {
                  x: slot.x,
                  y: slot.lift,
                  scale: slot.scale,
                  rotation: slot.rotation,
                  opacity: slot.opacity,
                  zIndex: slot.zIndex,
                  filter: `blur(${slot.blur}px)`,
                },
                0
              );
            }
          });

          // Fondo y luz de contacto: mismo arranque y misma duración.
          step.to(scenes[previous], { autoAlpha: 0 }, 0);
          step.to(scenes[active], { autoAlpha: 1 }, 0);
          step.to(lights[previous], { autoAlpha: 0 }, 0);
          step.to(lights[active], { autoAlpha: 1 }, 0);

          // Copy: crossfade centrado en el mismo tramo, no desplazado.
          step.to(
            copies[previous],
            {
              autoAlpha: 0,
              y: -12,
              duration: TRANSITION_STEP * 0.46,
              ease: "power2.in",
            },
            0
          );
          step.fromTo(
            copies[active],
            { autoAlpha: 0, y: 14 },
            {
              autoAlpha: 1,
              y: 0,
              duration: TRANSITION_STEP * 0.6,
              ease: "power2.out",
            },
            TRANSITION_STEP * 0.4
          );

          // Color de los elementos compartidos (eyebrow, título, indicador).
          step.to(tinted, { color: phaseInk[active], ease: "none" }, 0);
          step.to(
            [railHighlightRef.current, railTrackRef.current],
            { backgroundColor: phaseInk[active], ease: "none" },
            0
          );

          // Indicador: el tramo activo viaja hacia la derecha, en el mismo
          // sentido, tiempo y easing con los que se desplazan los frascos.
          step.to(railHighlightRef.current, { xPercent: 100 * active }, 0);
          step.to(railLabels[previous], { opacity: 0.4 }, 0);
          step.to(railLabels[active], { opacity: 1 }, 0);

          tl.add(step, start);
        });

        // Salida: la tierra de RESTORE se abre hacia el campo con el que arranca
        // el bloque comercial, para entregar sin salto de color.
        tl.to(exitVeilRef.current, { autoAlpha: 0.8, duration: 0.07, ease: "none" }, 0.93);
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
        reset(makeSlots([-228, -120, 148]));
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
      className="relative bg-[#5A2A32] md:h-[420vh]"
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
            Cuatro fases.<br />Un mismo ritual.
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
                  <div
                    className="mb-4 flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.22em]"
                    style={{ opacity: INK_LABEL }}
                  >
                    <span>Fase {phaseLabel[phase]}</span>
                    <span
                      className="h-px w-8"
                      style={{ backgroundColor: "currentColor", opacity: 0.4 }}
                    />
                    <span>{product.name}</span>
                  </div>
                  <p className="font-display text-[clamp(2.1rem,3.35vw,4.1rem)] leading-[0.98] tracking-[-0.025em]">
                    {product.tagline}
                  </p>
                  <p
                    className="mt-4 max-w-md font-sans text-[13px] leading-relaxed"
                    style={{ opacity: INK_BODY }}
                  >
                    {phaseBenefits[phase]}
                  </p>
                  <div
                    className="mt-6 flex max-w-lg flex-wrap gap-x-4 gap-y-2 font-sans text-[9px] uppercase tracking-[0.15em]"
                    style={{ opacity: INK_LABEL }}
                  >
                    {cycleActives[phase].map((active) => (
                      <span key={active}>{active}</span>
                    ))}
                  </div>
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
              <span
                key={`rail-${product.slug}`}
                ref={(el) => {
                  railLabelRefs.current[index] = el;
                }}
                style={{ color: atmospheres.Menstrual.ink }}
                className="font-sans text-[9px] uppercase tracking-[0.16em]"
              >
                {phaseLabel[product.phase as CyclePhase]}
              </span>
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
              Cuatro fases.<br />Un mismo ritual.
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
                  <div
                    className="mb-4 flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.2em]"
                    style={{ opacity: INK_LABEL }}
                  >
                    <span>Fase {phaseLabel[phase]}</span>
                    <span
                      className="h-px w-8"
                      style={{ backgroundColor: "currentColor", opacity: 0.4 }}
                    />
                    <span>{product.name}</span>
                  </div>
                  <h3 className="font-display text-5xl leading-none">{product.tagline}</h3>
                </div>
                <img
                  src={product.imageSrc}
                  alt={`${product.name}, serum para la fase ${phaseLabel[phase].toLowerCase()}`}
                  className="mx-auto my-5 h-[50svh] w-auto object-contain drop-shadow-[0_24px_32px_rgba(20,10,6,0.3)]"
                />
                <div>
                  <p
                    className="font-sans text-sm leading-relaxed"
                    style={{ opacity: INK_BODY }}
                  >
                    {phaseBenefits[phase]}
                  </p>
                  <div
                    className="mt-5 flex flex-wrap gap-x-4 gap-y-2 font-sans text-[10px] uppercase tracking-[0.15em]"
                    style={{ opacity: INK_LABEL }}
                  >
                    {cycleActives[phase].map((active) => (
                      <span key={active}>{active}</span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
