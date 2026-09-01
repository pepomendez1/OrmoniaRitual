import { cn } from "@/lib/utils";

interface IngredientListProps {
  ingredients: string[];
  className?: string;
}

/**
 * Lista de ingredientes en font-sans, tracking amplio y uppercase sutil.
 * Cada ingrediente se numera y separa con líneas finas.
 */
export function IngredientList({ ingredients, className }: IngredientListProps) {
  if (ingredients.length === 0) {
    return (
      <p className="font-sans text-sm text-muted-foreground">
        Fórmula en desarrollo. Próximamente.
      </p>
    );
  }

  return (
    <ul className={cn("flex flex-col", className)}>
      {ingredients.map((item, i) => (
        <li
          key={item}
          className={cn(
            "flex items-baseline gap-4 border-b border-border py-3 font-sans text-[11px] uppercase tracking-wide text-foreground",
            i === 0 && "border-t"
          )}
        >
          <span className="text-muted-foreground">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
