import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { NarrativeText } from "@/components/ui/NarrativeText";
import { InstagramPlaceholderCard } from "@/components/ui/InstagramPlaceholderCard";
import { instagramCopy } from "@/data/content";

/**
 * Grid de tiles placeholder del universo Instagram, con nota "Próximamente".
 */
export function InstagramUniverseSection() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <SectionWrapper id="instagram">
      <div ref={ref} className="flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          <EditorialHeading eyebrow={instagramCopy.eyebrow} size="xl" as="h2">
            {instagramCopy.title}
          </EditorialHeading>
          <div className="flex flex-col gap-3">
            <span className="font-sans text-[11px] uppercase tracking-editorial text-accent">
              {instagramCopy.note}
            </span>
            <NarrativeText tone="muted" measure="wide">
              {instagramCopy.body}
            </NarrativeText>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <InstagramPlaceholderCard key={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
