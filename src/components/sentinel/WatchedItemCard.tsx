import { type WatchedItem, CATEGORY_ICONS } from "@/lib/mock-data";
import { SeverityBadge } from "./SeverityBadge";
import { Clock, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface WatchedItemCardProps {
  item: WatchedItem;
  index: number;
  onClick?: () => void;
}

function getTimeRemaining(date: Date): string {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const days = Math.ceil(diff / 86400000);
  if (days <= 0) return "Today";
  if (days === 1) return "Tomorrow";
  return `in ${days} days`;
}

export function WatchedItemCard({ item, index, onClick }: WatchedItemCardProps) {
  const Icon = CATEGORY_ICONS[item.category.icon] || Clock;
  const timeRemaining = getTimeRemaining(item.nextDate);

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={onClick}
      className="glass-surface-hover w-full text-left rounded-2xl px-5 py-4 flex items-center gap-4 group cursor-pointer"
    >
      {/* Category icon */}
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-sentinel-accent-cyan/10 flex items-center justify-center">
        <Icon className="h-5 w-5 text-sentinel-accent-cyan" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {item.category.name}
          </span>
          <SeverityBadge severity={item.severity} />
        </div>
        <h3 className="text-sm font-medium text-foreground truncate">{item.title}</h3>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {timeRemaining}
          </span>
          <span className="hidden sm:inline opacity-60">·</span>
          <span className="hidden sm:inline opacity-60">{item.actionWindow}</span>
        </div>
      </div>

      {/* Regret risk */}
      <div className="hidden md:flex flex-col items-end gap-1 flex-shrink-0">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Regret Risk</span>
        <span className={`text-xs font-medium ${
          item.regretRisk === "High" ? "text-sentinel-severity-high" :
          item.regretRisk === "Medium" ? "text-sentinel-severity-medium" :
          "text-sentinel-severity-low"
        }`}>
          {item.regretRisk}
        </span>
      </div>

      {/* Arrow */}
      <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex-shrink-0" />
    </motion.button>
  );
}