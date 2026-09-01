import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SplitConceptSection } from "@/components/ui/SplitConceptSection";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { NarrativeText } from "@/components/ui/NarrativeText";
import { insideOutsideCopy } from "@/data/content";

/**
 * Concepto adentro/afuera sobre un layout de dos columnas (visual + texto).
 */
export function InsideOutsideSection() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <SplitConceptSection
      id="adentro-afuera"
      visualLabel="Inside-outside concept placeholder"
      reverse
    >
      <div ref={ref} className="flex flex-col gap-6">
        <EditorialHeading eyebrow={insideOutsideCopy.eyebrow} size="xl" as="h2">
          {insideOutsideCopy.title}
        </EditorialHeading>
        <NarrativeText size="lg" tone="muted" measure="normal">
          {insideOutsideCopy.body}
        </NarrativeText>
        <p className="font-sans text-[11px] uppercase tracking-editorial text-muted-foreground">
          {insideOutsideCopy.caption}
        </p>
      </div>
    </SplitConceptSection>
  );
}
