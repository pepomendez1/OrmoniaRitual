import { useEffect, useMemo, useRef } from "react";
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

const phaseWash: Record<CyclePhase, string> = {
  Menstrual: "#bda58d",
  Follicular: "#aaa98c",
  Ovulatory: "#c7a77f",
  Luteal: "#9f876f",
};

type CarouselSlot = {
  x: number;
  y: number;
  scale: number;
  rotation: number;
  opacity: number;
  zIndex: number;
  blur: number;
};

// Spatial order from left edge → hero → right edge. Advancing one slot to
// the right brings the next serum to the centre and wraps the rightmost bottle
// back to the far left, creating a continuous ritual instead of a slideshow.
const slots: CarouselSlot[] = [
  { x: -350, y: 46, scale: 0.57, rotation: -3.2, opacity: 0.36, zIndex: 8, blur: 0.7 },
  { x: -182, y: 22, scale: 0.76, rotation: -1.5, opacity: 0.66, zIndex: 18, blur: 0.2 },
  { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1, zIndex: 40, blur: 0 },
  { x: 220, y: 28, scale: 0.72, rotation: 1.8, opacity: 0.58, zIndex: 16, blur: 0.3 },
];

// CLARITY begins at centre. BLOOM sits immediately to its left so moving all
// bottles one position to the right makes BLOOM the next protagonist.
const initialSlotByProduct = [2, 1, 0, 3];

/**
 * El Ciclo — Sprint 03.8
 * Four bottles remain visible at all times. Scroll rotates the complete set
 * one place to the right; the bottle at centre becomes the active phase.
 */
export function CycleSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const bottleRefs = useRef<Array<HTMLDivElement | null>>([]);
  const copyRefs = useRef<Array<HTMLDivElement | null>>([]);
  const washRefs = useRef<Array<HTMLDivElement | null>>([]);
  const markerRefs = useRef<Array<HTMLSpanElement | null>>([]);

  const phases = useMemo(() => products.filter((product) => product.phase !== null), []);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const bottles = bottleRefs.current.filter((el): el is HTMLDivElement => el !== null);
    const copies = copyRefs.current.filter((el): el is HTMLDivElement => el !== null);
    const washes = washRefs.current.filter((el): el is HTMLDivElement => el !== null);
    const markers = markerRefs.current.filter((el): el is HTMLSpanElement => el !== null);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        bottles.forEach((bottle, productIndex) => {
          const slot = slots[initialSlotByProduct[productIndex]];
          gsap.set(bottle, {
            x: slot.x,
            y: slot.y,
            scale: slot.scale,
            rotation: slot.rotation,
            opacity: slot.opacity,
            zIndex: slot.zIndex,
            filter: `blur(${slot.blur}px)`,
          });
        });

        gsap.set(copies, { autoAlpha: 0, y: 18 });
        gsap.set(copies[0], { autoAlpha: 1, y: 0 });
        gsap.set(washes, { autoAlpha: 0 });
        gsap.set(washes[0], { autoAlpha: 1 });
        gsap.set(markers, { scaleX: 0.28, opacity: 0.24, transformOrigin: "left center" });
        gsap.set(markers[0], { scaleX: 1, opacity: 0.86 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            pin: stage,
            scrub: 0.85,
            anticipatePin: 1,
          },
        });

        // Give the scene a short settling moment before the first rotation.
        tl.fromTo(
          bottles,
          { yPercent: 2.5 },
          { yPercent: 0, duration: 0.08, ease: "power2.out", stagger: 0.008 },
          0.015
        );

        const starts = [0.25, 0.49, 0.73];

        starts.forEach((start, transitionIndex) => {
          const nextActive = transitionIndex + 1;

          bottles.forEach((bottle, productIndex) => {
            const currentSlotIndex = (initialSlotByProduct[productIndex] + transitionIndex) % slots.length;
            const nextSlotIndex = (currentSlotIndex + 1) % slots.length;
            const slot = slots[nextSlotIndex];
            const wrapping = currentSlotIndex === slots.length - 1 && nextSlotIndex === 0;

            if (wrapping) {
              // The rightmost serum slips behind the group and re-enters from
              // the far left. Lower opacity through the wrap avoids a visual
              // teleport while keeping the cycle continuous.
              tl.to(
                bottle,
                {
                  x: slots[currentSlotIndex].x + 90,
                  y: slots[currentSlotIndex].y + 12,
                  scale: slots[currentSlotIndex].scale * 0.92,
                  opacity: 0.18,
                  duration: 0.075,
                  ease: "power1.in",
                },
                start - 0.045
              );
              tl.set(
                bottle,
                {
                  x: slot.x - 70,
                  y: slot.y + 12,
                  scale: slot.scale * 0.9,
                  rotation: slot.rotation,
                  zIndex: slot.zIndex,
                  filter: `blur(${slot.blur + 0.6}px)`,
                },
                start + 0.032
              );
              tl.to(
                bottle,
                {
                  x: slot.x,
                  y: slot.y,
                  scale: slot.scale,
                  rotation: slot.rotation,
                  opacity: slot.opacity,
                  filter: `blur(${slot.blur}px)`,
                  duration: 0.14,
                  ease: "power2.out",
                },
                start + 0.035
              );
            } else {
              tl.to(
                bottle,
                {
                  x: slot.x,
                  y: slot.y,
                  scale: slot.scale,
                  rotation: slot.rotation,
                  opacity: slot.opacity,
                  zIndex: slot.zIndex,
                  filter: `blur(${slot.blur}px)`,
                  duration: 0.18,
                  ease: "power2.inOut",
                },
                start - 0.045
              );
            }
          });

          tl.to(copies[nextActive - 1], { autoAlpha: 0, y: -10, duration: 0.08 }, start - 0.03);
          tl.fromTo(
            copies[nextActive],
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.13, ease: "power2.out" },
            start + 0.025
          );

          tl.to(washes[nextActive - 1], { autoAlpha: 0, duration: 0.2 }, start - 0.06);
          tl.to(washes[nextActive], { autoAlpha: 1, duration: 0.22 }, start - 0.055);

          tl.to(markers[nextActive - 1], { scaleX: 0.28, opacity: 0.24, duration: 0.08 }, start);
          tl.to(markers[nextActive], { scaleX: 1, opacity: 0.86, duration: 0.1 }, start + 0.02);
        });

        tl.to(bottles, { yPercent: 1.2, duration: 0.08, ease: "power1.out" }, 0.92);
      });

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, [phases]);

  return (
    <section
      id="ciclo"
      ref={sectionRef}
      className="relative bg-[#bda58d] md:h-[420vh]"
      aria-labelledby="cycle-heading"
    >
      <div ref={stageRef} className="relative hidden h-screen w-full overflow-hidden md:block">
        {phases.map((product, index) => (
          <div
            key={`wash-${product.slug}`}
            ref={(el) => {
              washRefs.current[index] = el;
            }}
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundColor: phaseWash[product.phase as CyclePhase],
              opacity: index === 0 ? 1 : 0,
            }}
            aria-hidden="true"
          />
        ))}

        {/* Soft Ormonia atmosphere: prairie, linen-like warmth and blurred
            botanical colour fields. No diagonal graphic lines / orbit. */}
        <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
          <div className="absolute -inset-[10%] bg-[url('/pradera-y-caballo.png')] bg-cover bg-[position:62%_58%] opacity-[0.16] blur-[18px] saturate-[0.72] sepia-[0.2]" />
          <div className="absolute inset-0 bg-[#d8c7b0]/48" />
          <div className="absolute -bottom-[24vh] right-[-4vw] h-[66vh] w-[56vw] rounded-[50%] bg-[#6b6a4b]/14 blur-3xl" />
          <div className="absolute -left-[10vw] top-[6vh] h-[46vh] w-[42vw] rounded-[48%] bg-[#f2ebdd]/22 blur-3xl" />
          <div className="absolute right-[8vw] top-[8vh] h-[38vh] w-[36vw] rounded-[52%_48%_46%_54%] bg-[#6a4a35]/8 blur-3xl" />
        </div>

        <div className="absolute left-[5vw] top-[7vh] z-20">
          <p className="font-sans text-[10px] uppercase tracking-[0.26em] text-[#342115]/52">El ciclo</p>
        </div>

        <div className="absolute left-[5vw] top-1/2 z-20 w-[35vw] max-w-[560px] -translate-y-1/2">
          <h2
            id="cycle-heading"
            className="mb-12 font-display text-[clamp(3rem,5.6vw,6.6rem)] leading-[0.91] tracking-[-0.04em] text-[#342115]"
          >
            Cuatro fases.<br />Un mismo ritual.
          </h2>

          <div className="relative min-h-[235px]">
            {phases.map((product, index) => {
              const phase = product.phase as CyclePhase;
              return (
                <div
                  key={product.slug}
                  ref={(el) => {
                    copyRefs.current[index] = el;
                  }}
                  className="absolute inset-x-0 top-0"
                  style={{ opacity: index === 0 ? 1 : 0 }}
                >
                  <div className="mb-4 flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.22em] text-[#342115]/58">
                    <span>{phaseLabel[phase]}</span>
                    <span className="h-px w-8 bg-[#342115]/18" />
                    <span>{product.name}</span>
                  </div>
                  <p className="font-display text-[clamp(2.1rem,3.35vw,4.1rem)] leading-[0.98] tracking-[-0.025em] text-[#342115]">
                    {product.tagline}
                  </p>
                  <p className="mt-4 max-w-md font-sans text-[13px] leading-relaxed text-[#342115]/66">
                    {phaseBenefits[phase]}
                  </p>
                  <div className="mt-6 flex max-w-lg flex-wrap gap-x-4 gap-y-2 font-sans text-[9px] uppercase tracking-[0.15em] text-[#342115]/58">
                    {cycleActives[phase].map((active) => (
                      <span key={active}>{active}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="pointer-events-none absolute left-[73vw] top-[57vh] z-[7] h-[48vh] w-[38vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#f2ebdd]/20 blur-3xl"
          aria-hidden="true"
        />

        {/* Four-serum cyclic carousel. All products remain visible. */}
        <div className="absolute left-[72vw] top-[54vh] z-30 h-[64vh] w-[30vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2">
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
                alt={`${product.name}, serum para la fase ${phaseLabel[product.phase as CyclePhase].toLowerCase()}`}
                className="h-full w-full object-contain drop-shadow-[0_30px_28px_rgba(52,33,21,0.18)]"
              />
            </div>
          ))}
        </div>

        <div className="absolute bottom-[5vh] right-[5vw] z-20 grid w-[31vw] grid-cols-4 gap-3">
          {phases.map((product, index) => (
            <div key={`marker-${product.slug}`}>
              <span
                ref={(el) => {
                  markerRefs.current[index] = el;
                }}
                className="mb-2 block h-px w-full bg-[#342115]"
              />
              <span className="font-sans text-[8px] uppercase tracking-[0.14em] text-[#342115]/44">
                {phaseLabel[product.phase as CyclePhase]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile keeps the same conceptual hierarchy without a pinned carousel. */}
      <div className="md:hidden">
        <div className="relative overflow-hidden bg-[#bda58d] px-6 pb-12 pt-24">
          <div className="pointer-events-none absolute inset-0 bg-[url('/pradera-y-caballo.png')] bg-cover bg-center opacity-[0.08] blur-sm" />
          <div className="relative z-10">
            <p className="mb-5 font-sans text-[10px] uppercase tracking-[0.22em] text-[#342115]/55">El ciclo</p>
            <h2 className="font-display text-[clamp(3rem,14vw,5rem)] leading-[0.93] tracking-[-0.035em] text-[#342115]">
              Cuatro fases.<br />Un mismo ritual.
            </h2>
          </div>
        </div>
        {phases.map((product) => {
          const phase = product.phase as CyclePhase;
          return (
            <article
              key={product.slug}
              className="relative min-h-[92svh] overflow-hidden px-6 py-16"
              style={{ backgroundColor: phaseWash[phase] }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[url('/pradera-y-caballo.png')] bg-cover bg-center opacity-[0.055] blur-sm" />
              <div className="relative z-10 flex min-h-[80svh] flex-col justify-between">
                <div>
                  <div className="mb-4 flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.2em] text-[#342115]/55">
                    <span>{phaseLabel[phase]}</span>
                    <span className="h-px w-8 bg-[#342115]/20" />
                    <span>{product.name}</span>
                  </div>
                  <h3 className="font-display text-5xl leading-none text-[#342115]">{product.tagline}</h3>
                </div>
                <img
                  src={product.imageSrc}
                  alt={`${product.name}, serum para la fase ${phaseLabel[phase].toLowerCase()}`}
                  className="mx-auto my-5 h-[52svh] w-auto object-contain drop-shadow-[0_22px_30px_rgba(52,33,21,0.18)]"
                />
                <div>
                  <p className="font-sans text-sm leading-relaxed text-[#342115]/68">{phaseBenefits[phase]}</p>
                  <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 font-sans text-[10px] uppercase tracking-[0.15em] text-[#342115]/65">
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
