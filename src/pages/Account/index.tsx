import { Link, useParams, useSearchParams } from "react-router-dom";
import { Header, HEADER_CLEARANCE } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { accountCopy } from "@/data/shopCopy";
import { useAccount } from "@/hooks/useAccount";
import { usePageMeta } from "@/hooks/usePageMeta";
import { brandButton } from "@/lib/brandButton";
import { cn } from "@/lib/utils";
import { OrderDetail, Orders, Profile, Summary } from "./AccountViews";
import { SignedOut } from "./SignedOut";

const FIELD = "#F2EBDD";

type Section = "resumen" | "pedidos" | "perfil";

/**
 * /account y /account/pedidos/:orderId.
 *
 * - Cargando / error: estados mínimos, con reintento.
 * - Sin sesión: `SignedOut`.
 * - Con sesión: shell con Resumen, Pedidos (y detalle), Perfil y direcciones,
 *   Cerrar sesión. Hoy solo se llega en MODO DEMO, con un aviso permanente:
 *   ningún dato de esta vista es real hasta conectar Shopify.
 *
 * La sección activa vive en la URL (`?seccion=`), así atrás/adelante y los
 * links funcionan sin estado oculto.
 */
const Account = () => {
  usePageMeta("account");
  const { state, retry, startDemo, signOut } = useAccount();
  const { orderId } = useParams<{ orderId?: string }>();
  const [params] = useSearchParams();
  const section: Section = orderId
    ? "pedidos"
    : ((params.get("seccion") as Section | null) ?? "resumen");

  const tabs: Array<{ id: Section; label: string }> = [
    { id: "resumen", label: accountCopy.nav.summary },
    { id: "pedidos", label: accountCopy.nav.orders },
    { id: "perfil", label: accountCopy.nav.profile },
  ];

  let body: React.ReactNode;
  if (state.status === "loading") {
    body = (
      <p aria-live="polite" className="py-24 text-center font-sans text-[13px] text-ink/62">
        {accountCopy.loading}
      </p>
    );
  } else if (state.status === "error") {
    body = (
      <div role="alert" className="flex flex-col items-center gap-6 py-24 text-center">
        <p className="font-sans text-[14px] text-ink/72">{accountCopy.error}</p>
        <button type="button" onClick={retry} className={brandButton({ variant: "secondary" })}>
          {accountCopy.retry}
        </button>
      </div>
    );
  } else if (state.status === "signedOut") {
    body = <SignedOut onDemo={startDemo} />;
  } else {
    const { customer, demo } = state;
    body = (
      <>
        {demo && (
          <p
            role="note"
            className="mt-8 rounded-[12px] border border-dashed border-ink/30 px-4 py-3 font-sans text-[12px] leading-relaxed text-ink/72"
          >
            {accountCopy.demoBanner}
          </p>
        )}
        <h1 className="sr-only">{accountCopy.title}</h1>
        <div className="mt-10 grid grid-cols-1 gap-10 md:mt-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
          <nav aria-label={accountCopy.title} className="min-w-0">
            <ul className="flex gap-6 overflow-x-auto border-b border-ink/12 pb-3 lg:flex-col lg:gap-1 lg:border-b-0 lg:pb-0">
              {tabs.map((tab) => {
                const active = section === tab.id;
                return (
                  <li key={tab.id} className="shrink-0">
                    <Link
                      to={`/account?seccion=${tab.id}`}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block font-sans text-[12px] uppercase tracking-[0.16em] transition-colors lg:py-2",
                        active ? "text-ink underline underline-offset-[6px]" : "text-ink/62 hover:text-ink"
                      )}
                    >
                      {tab.label}
                    </Link>
                  </li>
                );
              })}
              <li className="shrink-0 lg:mt-6">
                <button
                  type="button"
                  onClick={signOut}
                  className="font-sans text-[12px] uppercase tracking-[0.16em] text-ink/62 transition-colors hover:text-ink lg:py-2"
                >
                  {accountCopy.nav.logout}
                </button>
              </li>
            </ul>
          </nav>
          <div className="min-w-0 text-ink">
            {orderId ? (
              <OrderDetail order={customer.orders.find((o) => o.id === orderId)} />
            ) : section === "pedidos" ? (
              <Orders orders={customer.orders} />
            ) : section === "perfil" ? (
              <Profile customer={customer} />
            ) : (
              <Summary customer={customer} />
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <main
        id="main"
        tabIndex={-1}
        className={`min-h-screen outline-none ${HEADER_CLEARANCE}`}
        style={{ backgroundColor: FIELD }}
      >
        <div className="mx-auto w-full max-w-[1320px] px-6 pb-24 pt-6 md:px-10">{body}</div>
      </main>
      <Footer />
    </>
  );
};

export default Account;
