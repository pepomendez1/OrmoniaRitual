import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textStyles = cva("font-sans", {
  variants: {
    size: {
      sm: "text-sm leading-relaxed",
      md: "text-base leading-relaxed",
      lg: "text-lg leading-relaxed",
    },
    measure: {
      narrow: "max-w-md",
      normal: "max-w-xl",
      wide: "max-w-2xl",
    },
    tone: {
      default: "text-foreground",
      muted: "text-muted-foreground",
    },
  },
  defaultVariants: { size: "md", measure: "normal", tone: "default" },
});

interface NarrativeTextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textStyles> {}

/**
 * Párrafo de cuerpo editorial con medida de lectura controlada y variantes.
 */
export function NarrativeText({
  size,
  measure,
  tone,
  className,
  children,
  ...props
}: NarrativeTextProps) {
  return (
    <p className={cn(textStyles({ size, measure, tone }), className)} {...props}>
      {children}
    </p>
  );
}
