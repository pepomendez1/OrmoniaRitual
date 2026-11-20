import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useSearchOverlay } from "@/components/shop/searchContext";
import { announcementCopy, brandCopy, nav } from "@/data/content";
import { useCart } from "@/hooks/useCart";
import { useLenisLock } from "@/hooks/useLenisLock";
import { cn } from "@/lib/utils";
import { Wordmark } from "@/components/brand/Wordmark";

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Menú mobile.
 *
 * Panel completo desde la izquierda con todo lo navegable en una columna:
 * primero las secciones (en display, con peso editorial) y debajo las
 * utilidades —Buscar, Cuenta, Carrito con su cantidad—. Reemplaza al Sheet
 * genérico: mismo Radix Dialog (foco atrapado, Escape, retorno del foco),
 * con la piel de la marca.
 */
export function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  const { cart, setDrawerOpen } = useCart();
  const search = useSearchOverlay();
  useLenisLock(open);

  const close = () => onOpenChange(false);
  const utility =
    "flex w-full items-center justify-between border-b border-ink/12 py-4 text-left font-sans text-[13px] uppercase tracking-[0.16em] text-ink";

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-ink/25 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-y-0 left-0 z-[61] flex w-full max-w-[440px] flex-col bg-ivory text-ink outline-none data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=closed]:duration-300 data-[state=open]:animate-in data-[state=open]:slide-in-from-left data-[state=open]:duration-500"
        >
          <div className="flex h-[64px] shrink-0 items-center justify-between px-6">
            <Dialog.Title>
              <Wordmark title={brandCopy.wordmark} className="h-[19px]" />
            </Dialog.Title>
            <Dialog.Close
              aria-label="Cerrar menú"
              className="-mr-2 flex h-11 w-11 items-center justify-center text-ink/70 hover:text-ink"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </Dialog.Close>
          </div>

          <div data-lenis-prevent className="flex-1 overflow-y-auto px-6 pb-10">
            <nav aria-label="Navegación móvil" className="mt-6">
              <ul className="flex flex-col">
                {nav.primary.map((item) => (
                  <li key={item.href}>
                    <NavLink
                      to={item.href}
                      onClick={close}
                      className={({ isActive }) =>
                        cn(
                          "block py-2.5 font-display text-[2.1rem] leading-[1.05] tracking-[-0.03em] transition-colors",
                          isActive ? "italic text-ink" : "text-ink/85 hover:text-ink"
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <ul className="mt-10 border-t border-ink/12">
              <li>
                <button
                  type="button"
                  className={utility}
                  onClick={() => {
                    close();
                    search.setOpen(true);
                  }}
                >
                  {nav.utilities.search.label}
                </button>
              </li>
              <li>
                <NavLink to={nav.utilities.account.href} onClick={close} className={utility}>
                  {nav.utilities.account.label}
                </NavLink>
              </li>
              <li>
                <button
                  type="button"
                  className={utility}
                  onClick={() => {
                    close();
                    setDrawerOpen(true);
                  }}
                >
                  {nav.utilities.cart.label}
                  <span className="tabular-nums text-ink/62">{cart.totalQuantity}</span>
                </button>
              </li>
            </ul>

            <p className="mt-10 font-sans text-[10px] uppercase tracking-[0.2em] text-ink/62">
              {announcementCopy.message}
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
