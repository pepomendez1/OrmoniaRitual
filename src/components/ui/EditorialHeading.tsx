import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingSizes = cva("font-display text-foreground leading-[1.05]", {
  variants: {
    size: {
      hero: "text-[clamp(2.75rem,7vw,6rem)] tracking-[-0.02em]",
      xl: "text-[clamp(2.25rem,5vw,4rem)] tracking-[-0.02em]",
      lg: "text-[clamp(1.75rem,3.5vw,2.75rem)]",
      md: "text-[clamp(1.35rem,2.5vw,2rem)]",
    },
  },
  defaultVariants: { size: "lg" },
});

interface EditorialHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingSizes> {
  eyebrow?: string;
  as?: "h1" | "h2" | "h3" | "h4";
}

/**
 * Título editorial con tipografía display, variantes de tamaño y eyebrow opcional.
 */
export function EditorialHeading({
  eyebrow,
  size,
  as: Tag = "h2",
  className,
  children,
  ...props
}: EditorialHeadingProps) {
  return (
    <div className="flex flex-col gap-4">
      {eyebrow && (
        <span className="font-sans text-[11px] uppercase tracking-editorial text-accent">
          {eyebrow}
        </span>
      )}
      <Tag className={cn(headingSizes({ size }), className)} {...props}>
        {children}
      </Tag>
    </div>
  );
}
