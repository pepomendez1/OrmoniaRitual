import { announcementCopy } from "@/data/content";

/**
 * Franja de envío.
 *
 * Vive en el flujo del documento, al comienzo de la página: no es sticky ni
 * fixed, no sigue al usuario y no reaparece al scrollear hacia arriba. Queda
 * atrás naturalmente, como el primer material de la página.
 *
 * Crema cálido sobre ink: se separa de la fotografía del hero sin caer en
 * blanco puro ni en marrón oscuro, y mantiene el peso visual bajo.
 */
export function AnnouncementBar() {
  return (
    <div className="flex h-[34px] items-center justify-center border-b border-ink/[0.08] bg-[#E7DDCC] px-4 md:h-[38px]">
      <p className="text-center font-sans text-[11px] uppercase leading-none tracking-[0.2em] text-ink md:text-[12px] md:tracking-[0.22em]">
        {announcementCopy.message}
      </p>
    </div>
  );
}
