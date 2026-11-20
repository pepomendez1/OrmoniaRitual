import { signInAvailable } from "@/commerce/account";
import { accountCopy } from "@/data/shopCopy";
import { brandButton, eyebrowClass, leadClass } from "@/lib/brandButton";

/**
 * Cuenta sin sesión.
 *
 * Pantalla limpia: marca, acceso y una explicación breve. El acceso será por
 * email sin contraseña (Shopify Customer Accounts), así que no hay campos de
 * usuario/clave que después habría que tirar. Mientras no exista, ACCEDER
 * queda deshabilitado con su motivo, y se ofrece recorrer el modo demo.
 */
export function SignedOut({ onDemo }: { onDemo: () => void }) {
  const c = accountCopy.signedOut;
  return (
    <div className="mx-auto flex min-h-[62vh] max-w-[520px] flex-col items-center justify-center py-16 text-center text-ink md:py-24">
      <p className={`${eyebrowClass} text-ink/62`}>{c.eyebrow}</p>
      <h1 className="mt-6 font-display text-[clamp(2.4rem,7vw,3.6rem)] leading-[1] tracking-[-0.04em]">
        {c.title}
      </h1>
      <p className={`mt-6 max-w-[400px] ${leadClass}`}>{c.body}</p>

      <div className="mt-10 flex w-full max-w-[360px] flex-col items-center gap-3">
        <button
          type="button"
          disabled={!signInAvailable}
          aria-describedby="signin-pending"
          className={brandButton({ size: "lg", block: true })}
        >
          {c.cta}
        </button>
        {!signInAvailable && (
          <p id="signin-pending" className="font-sans text-[12px] text-ink/62">
            {c.pending}
          </p>
        )}
      </div>

      <button type="button" onClick={onDemo} className={`mt-10 ${brandButton({ variant: "quiet" })}`}>
        {c.demoCta}
      </button>
    </div>
  );
}
