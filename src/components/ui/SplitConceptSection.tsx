import * as React from "react";
import { cn } from "@/lib/utils";
import { PlaceholderBlock } from "./PlaceholderBlock";

interface SplitConceptSectionProps {
  visualLabel: string;
  children: React.ReactNode;
  reverse?: boolean;
  className?: string;
  aspectRatio?: string;
  id?: string;
}

/**
 * Layout editorial de dos columnas (visual + texto) reutilizable.
 * Con `reverse`, el lado visual se coloca a la derecha en pantallas medianas+.
 */
export function SplitConceptSection({
  visualLabel,
  children,
  reverse,
  className,
  aspectRatio,
  id,
}: SplitConceptSectionProps) {
  return (
    <section
      id={id}
      className={cn("w-full px-6 py-24 md:px-8 lg:py-32", className)}
    >
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-12 md:grid-cols-2 md:items-center md:gap-16">
        <div className={cn(reverse && "md:order-2")}>
          <PlaceholderBlock
            label={visualLabel}
            aspectRatio={aspectRatio ?? "4 / 5"}
          />
        </div>
        <div
          className={cn(
            "flex flex-col gap-6",
            reverse && "md:order-1"
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
