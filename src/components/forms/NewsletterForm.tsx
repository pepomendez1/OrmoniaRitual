import { useId, useState, type FormEvent } from "react";
import { registerCopy } from "@/data/content";
import { cn } from "@/lib/utils";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface NewsletterFormProps {
  tone?: "light" | "dark";
  className?: string;
}

/**
 * El Registro — formulario compacto.
 *
 * Herramienta CRM secundaria: una línea, sin bloque propio. No hay proveedor
 * conectado, así que al enviar no se simula una suscripción: se responde con
 * `registerCopy.pendingNotice`. El punto de integración futuro es `onSubmit`
 * (Klaviyo / Shopify Email / el proveedor que se decida).
 *
 * Estados: vacío, inválido (mensaje asociado al campo) y enviado.
 */
export function NewsletterForm({ tone = "light", className }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "invalid" | "sent">("idle");
  const id = useId();
  const light = tone === "light";

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!EMAIL.test(email.trim())) {
      setState("invalid");
      return;
    }
    // INTEGRACIÓN PENDIENTE: enviar `email` al proveedor de newsletter.
    setState("sent");
  };

  return (
    <form noValidate onSubmit={onSubmit} className={cn("w-full max-w-[460px]", className)}>
      <p
        className={cn(
          "font-sans text-[10px] uppercase tracking-[0.24em]",
          light ? "text-ivory/62" : "text-ink/62"
        )}
      >
        {registerCopy.title}
      </p>
      <p className={cn("mt-2 font-sans text-[13px] leading-relaxed", light ? "text-ivory/72" : "text-ink/66")}>
        {registerCopy.body}
      </p>
      <div
        className={cn(
          "mt-5 flex items-center gap-3 border-b pb-2 transition-colors duration-300",
          state === "invalid"
            ? "border-terracotta"
            : light
              ? "border-ivory/40 focus-within:border-ivory"
              : "border-ink/30 focus-within:border-ink"
        )}
      >
        <label htmlFor={`${id}-email`} className="sr-only">
          {registerCopy.placeholder}
        </label>
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state !== "idle") setState("idle");
          }}
          placeholder={registerCopy.placeholder}
          aria-invalid={state === "invalid" || undefined}
          aria-describedby={`${id}-status`}
          className={cn(
            "h-10 min-w-0 flex-1 bg-transparent font-sans text-[14px] outline-none",
            light ? "text-ivory placeholder:text-ivory/45" : "text-ink placeholder:text-ink/45"
          )}
        />
        <button
          type="submit"
          className={cn(
            "shrink-0 font-sans text-[11px] uppercase tracking-[0.18em] transition-opacity hover:opacity-70",
            light ? "text-ivory" : "text-ink"
          )}
        >
          {registerCopy.cta}
        </button>
      </div>
      <p
        id={`${id}-status`}
        aria-live="polite"
        className={cn("mt-3 min-h-[1.2em] font-sans text-[12px]", light ? "text-ivory/72" : "text-ink/66")}
      >
        {state === "invalid" && "Revisá el email: parece incompleto."}
        {state === "sent" && registerCopy.pendingNotice}
      </p>
    </form>
  );
}
