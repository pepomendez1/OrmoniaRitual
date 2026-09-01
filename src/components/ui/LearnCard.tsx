import { cn } from "@/lib/utils";
import { PlaceholderBlock } from "./PlaceholderBlock";

interface LearnCardProps {
  label: string;
  title: string;
  teaser: string;
  className?: string;
}

/**
 * Tarjeta de artículo/teaser para /learn. Usa un placeholder de imagen
 * rotulado (se reemplazará por la imagen real del artículo).
 */
export function LearnCard({ label, title, teaser, className }: LearnCardProps) {
  return (
    <article className={cn("flex flex-col gap-5", className)}>
      <PlaceholderBlock
        label={`Article image placeholder — ${title}`}
        aspectRatio="4 / 3"
      />
      <div className="flex flex-col gap-3">
        <span className="font-sans text-[10px] uppercase tracking-editorial text-accent">
          {label}
        </span>
        <h3 className="font-display text-xl text-foreground">{title}</h3>
        <p className="font-sans text-sm text-muted-foreground">{teaser}</p>
      </div>
    </article>
  );
}
