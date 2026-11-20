import { skinQuizVisuals } from "@/data/skinQuiz";
import type { VisualGroup } from "@/lib/skinQuiz";
import { cn } from "@/lib/utils";

interface DiscoverVisualProps {
  group: VisualGroup;
}

/**
 * Panel visual persistente de la experiencia.
 *
 * No cambia por pregunta sino por bloque: las escenas están siempre montadas y
 * solo se cruza su opacidad, así el cambio es un fundido lento y no un salto
 * de imagen.
 *
 * Mientras no exista el material de producción, cada escena es un campo tonal
 * limpio con su nota de producción a la vista. Cuando el asset exista, se
 * declara en `skinQuizVisuals` y esta vista no cambia.
 */
export function DiscoverVisual({ group }: DiscoverVisualProps) {
  const scenes = Object.values(skinQuizVisuals);

  return (
    <div
      aria-hidden="true"
      className="relative h-full w-full overflow-hidden bg-sand"
    >
      {scenes.map((scene) => {
        const active = scene.id === group;
        // Foto a sangre → leyenda ivory; campo tonal o ilustración clara → ink.
        const onPhoto = Boolean(scene.media) && scene.fit !== "contain";
        return (
          <div
            key={scene.id}
            className={cn(
              "absolute inset-0 motion-safe:transition-opacity motion-safe:duration-900 motion-safe:ease-out",
              active ? "opacity-100" : "opacity-0"
            )}
            style={{ backgroundColor: scene.tone }}
          >
            {scene.media?.kind === "video" && (
              <video
                src={scene.media.src}
                autoPlay
                loop
                muted
                playsInline
                tabIndex={-1}
                className="absolute inset-0 h-full w-full object-cover [filter:brightness(0.92)_saturate(0.82)]"
              />
            )}
            {scene.media?.kind === "image" && (
              <img
                src={scene.media.src}
                alt=""
                loading="lazy"
                decoding="async"
                style={{ objectPosition: scene.objectPosition ?? "center" }}
                className={cn(
                  "absolute inset-0 h-full w-full",
                  scene.fit === "contain"
                    ? "object-contain px-[10%] pb-[22%] pt-[8%]"
                    : "object-cover"
                )}
              />
            )}

            {scene.captionScrim && (
              <div className="absolute inset-0" style={{ backgroundImage: scene.captionScrim }} />
            )}

            {/* Grano muy leve: evita que el campo tonal se lea como un bloque
                de color plano mientras no haya fotografía. */}
            {!scene.media && (
              <div
                className="absolute inset-0 opacity-50"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(52,33,21,0.14) 0.6px, transparent 0.7px)",
                  backgroundSize: "3px 3px",
                }}
              />
            )}

            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-10 lg:p-12">
              <span
                className={cn(
                  "font-sans text-[10px] uppercase tracking-[0.28em]",
                  onPhoto ? "text-ivory/70" : "text-ink/55"
                )}
              >
                {scene.label}
              </span>
              <p
                className={cn(
                  "max-w-[320px] font-display text-[clamp(1.4rem,1.8vw,2rem)] leading-[1.12] tracking-[-0.025em]",
                  onPhoto ? "text-ivory" : "text-ink"
                )}
              >
                {scene.caption}
              </p>
              {!scene.media && scene.pending && (
                <span className="mt-3 font-sans text-[9px] uppercase tracking-[0.2em] text-ink/35">
                  {scene.pending}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
