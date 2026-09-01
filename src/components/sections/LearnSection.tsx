import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { NarrativeText } from "@/components/ui/NarrativeText";
import { LearnCard } from "@/components/ui/LearnCard";
import { CTAButton } from "@/components/ui/CTAButton";
import { learnCopy } from "@/data/content";

/**
 * Grid de tarjetas de artículo/teaser para /learn.
 */
export function LearnSection() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <SectionWrapper id="aprender">
      <div ref={ref} className="flex flex-col gap-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <EditorialHeading eyebrow={learnCopy.eyebrow} size="xl" as="h2">
            {learnCopy.title}
          </EditorialHeading>
          <CTAButton to="/learn">Ver todo</CTAButton>
        </div>
        <NarrativeText tone="muted" measure="wide">
          {learnCopy.body}
        </NarrativeText>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {learnCopy.cards.map((card) => (
            <LearnCard
              key={card.title}
              label={card.label}
              title={card.title}
              teaser={card.teaser}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
