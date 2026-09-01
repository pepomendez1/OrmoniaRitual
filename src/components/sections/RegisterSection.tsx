import { useScrollReveal } from "@/hooks/useScrollReveal";
import { NewsletterBlock } from "@/components/ui/NewsletterBlock";
import { registerCopy } from "@/data/content";

/**
 * "El registro": bloque de newsletter placeholder sobre una banda sand.
 */
export function RegisterSection() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="registro"
      className="w-full bg-secondary px-6 py-24 md:px-8 lg:py-32"
    >
      <div ref={ref} className="mx-auto w-full max-w-[1200px]">
        <NewsletterBlock
          eyebrow={registerCopy.eyebrow}
          title={registerCopy.title}
          body={registerCopy.body}
          placeholder={registerCopy.placeholder}
          cta={registerCopy.cta}
          disclaimer={registerCopy.disclaimer}
        />
      </div>
    </section>
  );
}
