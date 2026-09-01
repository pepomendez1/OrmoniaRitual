import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface NewsletterBlockProps {
  eyebrow?: string;
  title: string;
  body: string;
  placeholder: string;
  cta: string;
  disclaimer?: string;
  className?: string;
}

/**
 * Bloque "El registro": formulario de newsletter placeholder.
 * `preventDefault` sin envío real. Listo para conectar a backend en el futuro.
 */
export function NewsletterBlock({
  eyebrow,
  title,
  body,
  placeholder,
  cta,
  disclaimer,
  className,
}: NewsletterBlockProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {eyebrow && (
        <span className="font-sans text-[11px] uppercase tracking-editorial text-accent">
          {eyebrow}
        </span>
      )}
      <h3 className="font-display text-3xl text-foreground md:text-4xl">
        {title}
      </h3>
      <p className="max-w-md font-sans text-base text-muted-foreground">
        {body}
      </p>
      <form
        onSubmit={(e: React.FormEvent) => e.preventDefault()}
        className="mt-2 flex w-full max-w-md flex-col gap-4 sm:flex-row sm:items-center"
      >
        <Input
          type="email"
          required
          aria-label={placeholder}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button type="submit" variant="editorial" className="justify-center">
          <span className="relative inline-block pb-1.5">
            {cta}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-px bg-border"
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-px w-0 bg-foreground transition-all duration-500 ease-out group-hover:w-full"
            />
          </span>
        </Button>
      </form>
      {disclaimer && (
        <p className="max-w-md font-sans text-[11px] text-muted-foreground">
          {disclaimer}
        </p>
      )}
    </div>
  );
}
