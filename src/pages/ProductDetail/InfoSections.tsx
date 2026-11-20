import { useId, useState, type ReactNode } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InfoSection {
  id: string;
  title: string;
  content: ReactNode;
}

/**
 * Secciones informativas de PDP como acordeón accesible (botón real con
 * `aria-expanded`/`aria-controls`). La primera abre por defecto.
 *
 * Recibe solo las secciones con contenido: `buildInfoSections` descarta las
 * vacías, así una PDP sin modo de uso o sin FAQ no muestra títulos huecos.
 */
export function InfoSections({ sections }: { sections: InfoSection[] }) {
  const [open, setOpen] = useState<string | null>(sections[0]?.id ?? null);
  const base = useId();
  if (sections.length === 0) return null;

  return (
    <div className="border-t border-ink/14">
      {sections.map((section) => {
        const expanded = open === section.id;
        const panelId = `${base}-${section.id}`;
        return (
          <div key={section.id} className="border-b border-ink/14">
            <h2>
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : section.id)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left font-sans text-[12px] uppercase tracking-[0.2em] text-ink md:py-6"
              >
                {section.title}
                <Plus
                  aria-hidden="true"
                  className={cn(
                    "h-4 w-4 shrink-0 text-ink/60 motion-safe:transition-transform motion-safe:duration-300",
                    expanded && "rotate-45"
                  )}
                />
              </button>
            </h2>
            <div
              id={panelId}
              hidden={!expanded}
              className="pb-7 font-sans text-[14px] leading-relaxed text-ink/75"
            >
              {section.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Lista con guion fino, para activos e "incluye". */
export const InfoList = ({ items }: { items: string[] }) => (
  <ul className="flex flex-col gap-2">
    {items.map((item) => (
      <li key={item} className="flex gap-3">
        <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-ink/40" />
        {item}
      </li>
    ))}
  </ul>
);
