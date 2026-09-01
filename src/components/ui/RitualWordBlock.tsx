import { cn } from "@/lib/utils";

interface RitualWordBlockProps {
  word: string;
  className?: string;
}

/**
 * Palabra o frase editorial grande, centrada, con espaciado generoso
 * y una pequeña regla de acento. Usada en la secuencia del ritual.
 */
export function RitualWordBlock({ word, className }: RitualWordBlockProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 py-10 text-center",
        className
      )}
    >
      <span className="font-display text-[clamp(2rem,8vw,5rem)] leading-none tracking-[-0.02em] text-foreground">
        {word}
      </span>
      <span aria-hidden="true" className="h-px w-10 bg-accent/60" />
    </div>
  );
}
