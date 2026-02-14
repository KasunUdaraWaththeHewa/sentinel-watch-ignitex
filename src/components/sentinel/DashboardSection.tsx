import { WatchedItemCard } from "./WatchedItemCard";
import type { WatchedItem } from "@/types/sentinel";
import { cn } from "@/lib/utils";

interface DashboardSectionProps {
  title: string;
  subtitle: string;
  items: WatchedItem[];
  onItemClick?: (id: string) => void;
  accent?: "high" | "medium" | "default";
  onMarkHandled?: (id: string) => void;
  onSnooze?: (id: string) => void;
  onReactivate?: (id: string) => void;
}

export function DashboardSection({
  title,
  subtitle,
  items,
  onItemClick,
  accent = "default",
  onMarkHandled,
  onSnooze,
  onReactivate,
}: DashboardSectionProps) {
  const dotColor = accent === "high"
    ? "bg-sentinel-severity-high"
    : accent === "medium"
      ? "bg-sentinel-severity-medium"
      : "bg-sentinel-accent-cyan";

  return (
    <section className="space-y-3 animate-sentinel-fade-in">
      <div className="flex items-center gap-3 px-1">
        <div className={cn("w-2 h-2 rounded-full", dotColor)} />
        <h2 className="font-display font-semibold text-sm sm:text-base text-foreground">{title}</h2>
        <span className="text-xs text-muted-foreground hidden sm:inline">— {subtitle}</span>
        <span className="ml-auto text-xs font-medium text-muted-foreground tabular-nums bg-muted/50 px-2 py-0.5 rounded-md">
          {items.length}
        </span>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <WatchedItemCard
            key={item.id}
            item={item}
            onClick={() => onItemClick?.(item.id)}
            onMarkHandled={() => onMarkHandled?.(item.id)}
            onSnooze={() => onSnooze?.(item.id)}
            onReactivate={() => onReactivate?.(item.id)}
          />
        ))}
      </div>
    </section>
  );
}
