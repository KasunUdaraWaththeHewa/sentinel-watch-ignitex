import { motion } from "framer-motion";
import { WatchedItemCard } from "./WatchedItemCard";
import type { WatchedItem } from "@/types/sentinel";
import { cn } from "@/lib/utils";

interface DashboardSectionProps {
  title: string;
  subtitle: string;
  items: WatchedItem[];
  startIndex: number;
  onItemClick?: (id: string) => void;
  accent?: "high" | "medium" | "default";
}

export function DashboardSection({ title, subtitle, items, startIndex, onItemClick, accent = "default" }: DashboardSectionProps) {
  const dotColor = accent === "high"
    ? "bg-sentinel-severity-high"
    : accent === "medium"
      ? "bg-sentinel-severity-medium"
      : "bg-sentinel-accent-cyan";

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + startIndex * 0.03 }}
      className="space-y-3"
    >
      <div className="flex items-center gap-3 px-1">
        <div className={cn("w-2 h-2 rounded-full", dotColor)} />
        <h2 className="font-display font-semibold text-sm sm:text-base text-foreground">{title}</h2>
        <span className="text-xs text-muted-foreground hidden sm:inline">— {subtitle}</span>
        <span className="ml-auto text-xs font-medium text-muted-foreground tabular-nums bg-muted/50 px-2 py-0.5 rounded-md">
          {items.length}
        </span>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <WatchedItemCard key={item.id} item={item} index={startIndex + i} onClick={() => onItemClick?.(item.id)} />
        ))}
      </div>
    </motion.section>
  );
}
