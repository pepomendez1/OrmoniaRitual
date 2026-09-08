import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { rhythmCopy } from "@/data/content";

/**
 * El Ritmo / El agua — Sprint 02, reubicada en el Integration Pass 01–03.
 *
 * La sección ya no va inmediatamente después del Hero: ahora vive después de
 * la zona comercial, donde en HOME 05 se fusionará con El Registro. Por eso
 * la entrada ya no disuelve desde la pradera y la salida ya no lava hacia el
 * mineral de El Ciclo: entra desde el campo de tierra profunda que la precede
 * y sale hacia el campo claro del bloque de newsletter.
 *
 * El video es un fondo cinematográfico vivo, independiente del scroll: loop
 * autónomo lento, sin scrub de `currentTime`. El scroll solo orquesta el copy
 * y la entrada/salida de la escena.
 *
 * El componente y sus assets se conservan intactos para su ubicación final.
 */
export function RhythmSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const landscapeRef = useRef<HTMLDivElement>(null);
  const filmRef = useRef<HTMLDivElement>(null);
  const exitRef = useRef<HTMLDivElement>(null);
  const statementRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const video = videoRef.current;
    if (!section || !stage || !video) return;

    const statements = statementRefs.current.filter(
      (el): el is HTMLParagraphElement => el !== null
    );

    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.playbackRate = 0.32;

    const startVideo = () => {
      video.play().catch(() => {
        // Muted autoplay is supported by modern browsers; if a browser still
        // blocks it, the static first frame remains as a graceful fallback.
      });
    };

    if (video.readyState >= 2) startVideo();
    else video.addEventListener("canplay", startVideo, { once: true });

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.set(filmRef.current, { opacity: 0 });
          gsap.set(exitRef.current, { opacity: 0 });
          gsap.set(statements, { autoAlpha: 0, y: 28 });
          gsap.set(statements[0], { autoAlpha: 1, y: 0 });
          gsap.set(video, {
            scale: 1.08,
            xPercent: 0,
            yPercent: 0,
            filter: "brightness(0.58) saturate(0.74) sepia(0.18)",
          });

          // Very slow autonomous drift: the water stays alive even if the
          // user stops scrolling. It is deliberately not tied to ScrollTrigger.
          const drift = gsap.timeline({ repeat: -1, yoyo: true });
          drift.to(video, {
            scale: 1.13,
            xPercent: 1.25,
            yPercent: -0.8,
            duration: 9,
            ease: "sine.inOut",
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              pin: stage,
              scrub: 0.75,
              anticipatePin: 1,
            },
          });

          // Keep the transition photographic and gradual. Scroll reveals the
          // water, but never controls the video's own motion.
          tl.to(landscapeRef.current, { opacity: 0, duration: 0.21, ease: "none" }, 0);
          tl.to(filmRef.current, { opacity: 1, duration: 0.22, ease: "none" }, 0.015);

          tl.to(statements[0], { autoAlpha: 0, y: -18, duration: 0.075 }, 0.29);
          tl.fromTo(
            statements[1],
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.1, ease: "power2.out" },
            0.33
          );
          tl.to(statements[1], { autoAlpha: 0, y: -18, duration: 0.075 }, 0.5);
          tl.fromTo(
            statements[2],
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.11, ease: "power2.out" },
            0.545
          );

          // Un velo claro aparece solo al final: entrega suave hacia el bloque
          // de El Registro en vez de un corte seco.
          tl.to(exitRef.current, { opacity: 0.9, duration: 0.25, ease: "none" }, 0.75);
          tl.to(statements[2], { autoAlpha: 0, y: -12, duration: 0.1 }, 0.89);
          tl.to([labelRef.current, hintRef.current], { autoAlpha: 0, duration: 0.08 }, 0.92);

          return () => drift.kill();
        }
      );

      mm.add("(prefers-reduced-motion: reduce)", () => {
        video.pause();
        gsap.set(filmRef.current, { opacity: 1 });
        gsap.set(exitRef.current, { opacity: 0.3 });
      });

      return () => mm.revert();
    }, section);

    return () => {
      video.removeEventListener("canplay", startVideo);
      video.pause();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="ritmo"
      ref={sectionRef}
      className="relative bg-[#171713] md:h-[330vh]"
      aria-labelledby="rhythm-heading"
    >
      {/* Zona de contraste del header: termina antes del velo claro de salida. */}
      <div
        aria-hidden="true"
        data-header-tone="light"
        className="pointer-events-none absolute inset-x-0 top-0 h-[76%]"
      />
      <div ref={stageRef} className="relative hidden h-screen overflow-hidden bg-[#171713] md:block">
        {/* Entrada: continúa el campo de tierra profunda de la escena anterior
            y se disuelve en el agua. Conserva la materia de marca al fondo. */}
        <div ref={landscapeRef} className="absolute inset-0 bg-[#342115]" aria-hidden="true">
          <div className="absolute inset-0 bg-[url('/pradera-y-caballo.png')] bg-cover bg-[position:68%_38%] opacity-[0.14] blur-[14px] saturate-[0.4]" />
          <div className="absolute inset-0 bg-[#191511]/58" />
        </div>

        <div ref={filmRef} className="absolute inset-0 opacity-0" aria-hidden="true">
          <video
            ref={videoRef}
            src="/ritual-water.mp4"
            preload="auto"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover [will-change:transform,filter]"
          />
          <div className="absolute inset-0 bg-[#171713]/20" />
          <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(19,15,12,0.72)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(23,19,16,0.80)_0%,rgba(23,19,16,0.48)_36%,rgba(23,19,16,0.08)_72%)]" />
        </div>

        <div
          ref={exitRef}
          className="pointer-events-none absolute inset-0 bg-[#e3d7c2] opacity-0"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_48%,transparent_0%,transparent_25%,rgba(25,21,17,0.22)_72%,rgba(25,21,17,0.42)_100%)]"
          aria-hidden="true"
        />

        <p
          ref={labelRef}
          className="absolute left-[5vw] top-[7vh] z-30 font-sans text-[10px] uppercase tracking-[0.26em] text-[#f2ebdd]/58"
        >
          {rhythmCopy.eyebrow}
        </p>

        <div className="absolute inset-0 z-20 flex items-center">
          <div className="relative ml-[5vw] h-[42vh] w-[46vw] max-w-[760px]">
            {rhythmCopy.statements.map((statement, index) => (
              <p
                key={statement}
                id={index === 0 ? "rhythm-heading" : undefined}
                ref={(el) => {
                  statementRefs.current[index] = el;
                }}
                className="absolute left-0 top-1/2 w-full -translate-y-1/2 font-display text-[clamp(3.2rem,5.75vw,6.9rem)] leading-[0.96] tracking-[-0.038em] text-[#f2ebdd] [text-shadow:0_2px_30px_rgba(0,0,0,0.28)]"
                style={{ opacity: index === 0 ? 1 : 0 }}
              >
                {statement}
              </p>
            ))}
          </div>
        </div>

        <p
          ref={hintRef}
          className="absolute bottom-[5vh] left-[5vw] z-30 font-sans text-[9px] uppercase tracking-[0.22em] text-[#f2ebdd]/38"
        >
          El ritmo se revela al avanzar
        </p>
      </div>

      <div className="relative min-h-[100svh] overflow-hidden bg-[#191511] md:hidden">
        <video
          src="/ritual-water.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-[#191511]/45" />
        <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-6 pb-16 pt-28 text-[#f2ebdd]">
          <p className="mb-10 font-sans text-[10px] uppercase tracking-[0.24em] text-[#f2ebdd]/55">
            {rhythmCopy.eyebrow}
          </p>
          <div className="space-y-10">
            {rhythmCopy.statements.map((statement, index) => (
              <p
                key={statement}
                id={index === 0 ? "rhythm-heading" : undefined}
                className="font-display text-[clamp(2.8rem,12vw,5rem)] leading-[0.96] tracking-[-0.035em]"
              >
                {statement}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
