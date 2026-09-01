import { cn } from "@/lib/utils";
import { CTAButton } from "./CTAButton";

interface QuizEntryCardProps {
  title: string;
  body: string;
  cta: string;
  className?: string;
}

/**
 * Tarjeta editorial de invitación al quiz de ritmo. Enlaza a /discover.
 */
export function QuizEntryCard({ title, body, cta, className }: QuizEntryCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-6 border border-border bg-secondary p-8 md:p-12",
        className
      )}
    >
      <span className="font-sans text-[11px] uppercase tracking-editorial text-accent">
        Quiz
      </span>
      <div className="flex flex-col gap-4">
        <h3 className="font-display text-2xl text-foreground md:text-3xl">
          {title}
        </h3>
        <p className="max-w-md font-sans text-base text-muted-foreground">
          {body}
        </p>
      </div>
      <CTAButton to="/discover">{cta}</CTAButton>
    </div>
  );
}
