import { type WatchedItem, RegretRisk, ItemStatus } from "@/types/sentinel";
import { CATEGORY_ICONS } from "@/lib/constants";
import { getTimeRemaining, getDaysUntil } from "@/lib/date-utils";
import { SeverityBadge } from "./SeverityBadge";
import { Clock, ChevronRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { SENTINEL_EASE } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface WatchedItemCardProps {
  item: WatchedItem;
  index: number;
  onClick?: () => void;
}

export function WatchedItemCard({ item, index, onClick }: WatchedItemCardProps) {
  const Icon = CATEGORY_ICONS[item.category.icon] || Clock;
  const timeRemaining = getTimeRemaining(item.nextDate);
  const daysLeft = getDaysUntil(item.nextDate);
  const isHandled = item.status === ItemStatus.Handled || item.status === ItemStatus.Snoozed;
  const isUrgent = daysLeft <= 3 && !isHandled;

  // Progress bar: how close to deadline (out of 30 days max context)
  const progressMax = 30;
  const progress = isHandled ? 100 : Math.max(0, Math.min(100, ((progressMax - daysLeft) / progressMax) * 100));

  const progressColor = isHandled
    ? "bg-sentinel-severity-low/60"
    : isUrgent
      ? "bg-sentinel-severity-high"
      : daysLeft <= 7
        ? "bg-sentinel-severity-medium"
        : "bg-sentinel-accent-cyan/60";

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: SENTINEL_EASE }}
      onClick={onClick}
      className={cn(
        "glass-surface-hover w-full text-left rounded-2xl p-4 sm:px-5 sm:py-4 flex items-start sm:items-center gap-3.5 sm:gap-4 group cursor-pointer",
        isUrgent && "ring-1 ring-sentinel-severity-high/20"
      )}
    >
      {/* Icon */}
      <div className={cn(
        "flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-colors duration-300",
        isHandled ? "bg-sentinel-severity-low/10" : "bg-sentinel-accent-cyan/10 group-hover:bg-sentinel-accent-cyan/15"
      )}>
        {isHandled ? (
          <CheckCircle2 className="h-5 w-5 text-sentinel-severity-low" />
        ) : (
          <Icon className="h-5 w-5 text-sentinel-accent-cyan" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
            {item.category.name}
          </span>
          <SeverityBadge severity={item.severity} className="scale-90 origin-left" />
        </div>

        <h3 className={cn(
          "text-sm font-medium truncate",
          isHandled ? "text-muted-foreground line-through" : "text-foreground"
        )}>
          {item.title}
        </h3>

        <div className="flex items-center gap-3">
          {/* Mini progress bar */}
          <div className="flex-1 max-w-[120px] h-1 rounded-full bg-muted/60 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, delay: index * 0.05 + 0.3, ease: SENTINEL_EASE }}
              className={cn("h-full rounded-full", progressColor)}
            />
          </div>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {timeRemaining}
          </span>
        </div>
      </div>

      {/* Right side — Regret Risk (desktop) */}
      <div className="hidden md:flex flex-col items-end gap-1.5 flex-shrink-0 min-w-[80px]">
        <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-medium">Regret Risk</span>
        <span className={cn("text-xs font-semibold",
          item.regretRisk === RegretRisk.High ? "text-sentinel-severity-high" :
          item.regretRisk === RegretRisk.Medium ? "text-sentinel-severity-medium" :
          "text-sentinel-severity-low"
        )}>
          {item.regretRisk}
        </span>
      </div>

      {/* Chevron */}
      <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0 mt-3 sm:mt-0" />
    </motion.button>
  );
}
