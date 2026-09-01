import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
}

/**
 * Contenedor de sección editorial: padding vertical generoso, ancho máximo
 * controlado y reenvío de ref. Reenvía props arbitrarias (className, etc.).
 */
export const SectionWrapper = React.forwardRef<
  HTMLElement,
  SectionWrapperProps
>(({ className, children, id, ...props }, ref) => {
  return (
    <section
      id={id}
      ref={ref}
      className={cn("w-full px-6 py-24 md:px-8 lg:py-32", className)}
      {...props}
    >
      <div className="mx-auto w-full max-w-[1200px]">{children}</div>
    </section>
  );
});
SectionWrapper.displayName = "SectionWrapper";
