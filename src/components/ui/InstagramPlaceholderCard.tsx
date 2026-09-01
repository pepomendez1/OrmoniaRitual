import { cn } from "@/lib/utils";
import { PlaceholderBlock } from "./PlaceholderBlock";

interface InstagramPlaceholderCardProps {
  className?: string;
}

/**
 * Tile placeholder para el grid de Instagram.
 * PlaceholderBlock neutro con label "Instagram placeholder".
 */
export function InstagramPlaceholderCard({
  className,
}: InstagramPlaceholderCardProps) {
  return (
    <PlaceholderBlock
      label="Instagram placeholder"
      aspectRatio="1 / 1"
      className={className}
    />
  );
}
