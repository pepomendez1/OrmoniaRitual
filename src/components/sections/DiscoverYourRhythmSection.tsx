import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { QuizEntryCard } from "@/components/ui/QuizEntryCard";
import { discoverCopy } from "@/data/content";

/**
 * Invitación al quiz de ritmo. La tarjeta enlaza a /discover.
 */
export function DiscoverYourRhythmSection() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <SectionWrapper id="descubre">
      <div ref={ref} className="mx-auto max-w-2xl">
        <QuizEntryCard
          title={discoverCopy.title}
          body={discoverCopy.body}
          cta={discoverCopy.cta}
        />
      </div>
    </SectionWrapper>
  );
}
