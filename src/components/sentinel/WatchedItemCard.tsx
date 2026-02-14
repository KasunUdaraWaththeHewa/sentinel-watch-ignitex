import { type WatchedItem, RegretRisk, ItemStatus } from "@/types/sentinel";
import { CATEGORY_ICONS } from "@/lib/constants";
import { getTimeRemaining, getDaysUntil } from "@/lib/date-utils";
import { SeverityBadge } from "./SeverityBadge";
import {
  Clock,
  ChevronRight,
  CheckCircle2,
  Pause,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WatchedItemCardProps {
  item: WatchedItem;
  onClick?: () => void;
  onMarkHandled?: () => void;
  onSnooze?: () => void;
  onReactivate?: () => void;
}

export function WatchedItemCard({
  item,
  onClick,
  onMarkHandled,
  onSnooze,
  onReactivate,
}: WatchedItemCardProps) {
  const Icon = CATEGORY_ICONS[item.category.icon] || Clock;
  const timeRemaining = getTimeRemaining(item.nextDate);
  const daysLeft = getDaysUntil(item.nextDate);
  const isHandled =
    item.status === ItemStatus.Handled || item.status === ItemStatus.Snoozed;
  const isUrgent = daysLeft <= 3 && !isHandled;

  const progressMax = 30;
  const progress = isHandled
    ? 100
    : Math.max(
        0,
        Math.min(100, ((progressMax - daysLeft) / progressMax) * 100),
      );

  const progressColor = isHandled
    ? "bg-sentinel-severity-low/60"
    : isUrgent
      ? "bg-sentinel-severity-high"
      : daysLeft <= 7
        ? "bg-sentinel-severity-medium"
        : "bg-sentinel-accent-cyan/60";

  return (
    <button
      onClick={onClick}
      className={cn(
        "glass-surface-hover w-full text-left rounded-2xl p-4 sm:px-5 sm:py-4 flex items-start sm:items-center gap-3.5 sm:gap-4 group cursor-pointer animate-sentinel-fade-in transition-transform duration-300 hover:-translate-y-0.5",
        isUrgent && "ring-1 ring-sentinel-severity-high/20",
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-colors duration-300",
          isHandled
            ? "bg-sentinel-severity-low/10"
            : "bg-sentinel-accent-cyan/10 group-hover:bg-sentinel-accent-cyan/15",
        )}
      >
        {isHandled ? (
          <CheckCircle2 className="h-5 w-5 text-sentinel-severity-low" />
        ) : (
          <Icon className="h-5 w-5 text-sentinel-accent-cyan" />
        )}
      </div>

      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
            {item.category.name}
          </span>
          <SeverityBadge
            severity={item.severity}
            className="scale-90 origin-left"
          />
        </div>

        <h3
          className={cn(
            "text-sm font-medium truncate",
            isHandled
              ? "text-muted-foreground line-through"
              : "text-foreground",
          )}
        >
          {item.title}
        </h3>

        <div className="flex items-center gap-3">
          <div className="flex-1 max-w-[120px] h-1 rounded-full bg-muted/60 overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-[width] duration-500 ease-out",
                progressColor,
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {timeRemaining}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {!isHandled && (
            <>
              <ActionPill
                icon={CheckCircle2}
                label="Handled"
                onClick={onMarkHandled}
              />
              <ActionPill icon={Pause} label="Snooze" onClick={onSnooze} />
            </>
          )}
          {isHandled && (
            <ActionPill
              icon={RotateCcw}
              label="Reactivate"
              onClick={onReactivate}
            />
          )}
        </div>
      </div>

      <div className="hidden md:flex flex-col items-end gap-1.5 flex-shrink-0 min-w-[80px]">
        <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-medium">
          Regret Risk
        </span>
        <span
          className={cn(
            "text-xs font-semibold",
            item.regretRisk === RegretRisk.High
              ? "text-sentinel-severity-high"
              : item.regretRisk === RegretRisk.Medium
                ? "text-sentinel-severity-medium"
                : "text-sentinel-severity-low",
          )}
        >
          {item.regretRisk}
        </span>
      </div>

      <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0 mt-3 sm:mt-0" />
    </button>
  );
}

function ActionPill({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick?: () => void;
}) {
  if (!onClick) return null;

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClick();
      }}
      className="text-[11px] h-7 px-2.5 rounded-md bg-muted/55 text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors inline-flex items-center gap-1"
    >
      <Icon className="h-3 w-3" />
      {label}
    </button>
  );
}
