import { mockWatchedItems } from "@/lib/mock-data";
import { WatchedItemCard } from "./WatchedItemCard";
import { motion } from "framer-motion";

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function CommandCenter() {
  const now = new Date();
  const items = mockWatchedItems.filter((i) => i.status === "active");

  const nextUp = items.filter((i) => {
    const days = Math.ceil((i.nextDate.getTime() - now.getTime()) / 86400000);
    return days <= 7;
  });

  const upcoming = items.filter((i) => {
    const days = Math.ceil((i.nextDate.getTime() - now.getTime()) / 86400000);
    return days > 7 && days <= 30;
  });

  const onWatch = items.filter((i) => {
    const days = Math.ceil((i.nextDate.getTime() - now.getTime()) / 86400000);
    return days > 30;
  });

  const hasUrgent = nextUp.some((i) => i.severity === "high");
  const statusMessage = hasUrgent
    ? "Heads up — some items need attention soon."
    : "All quiet — here's what Sentinel is watching next.";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 pb-28 md:pb-12 space-y-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="space-y-2"
      >
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {formatDate(now)}
        </p>
        <h1 className="text-2xl sm:text-3xl font-display font-semibold text-foreground tracking-tight">
          {statusMessage}
        </h1>
      </motion.div>

      {/* Next Up */}
      {nextUp.length > 0 && (
        <Section title="Next Up" subtitle="Within 7 days" items={nextUp} startIndex={0} />
      )}

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <Section title="Upcoming" subtitle="Within 30 days" items={upcoming} startIndex={nextUp.length} />
      )}

      {/* On Watch */}
      {onWatch.length > 0 && (
        <Section title="On Watch" subtitle="Later" items={onWatch} startIndex={nextUp.length + upcoming.length} />
      )}

      {items.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="glass-surface rounded-2xl p-12 text-center space-y-3"
        >
          <div className="w-16 h-16 rounded-full bg-sentinel-accent-cyan/10 mx-auto flex items-center justify-center animate-sentinel-glow-pulse">
            <div className="w-3 h-3 rounded-full bg-sentinel-accent-cyan/60" />
          </div>
          <p className="text-foreground font-display font-medium text-lg">Nothing urgent.</p>
          <p className="text-muted-foreground text-sm">Sentinel is standing by.</p>
        </motion.div>
      )}
    </div>
  );
}

function Section({
  title,
  subtitle,
  items,
  startIndex,
}: {
  title: string;
  subtitle: string;
  items: typeof mockWatchedItems;
  startIndex: number;
}) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: startIndex * 0.04 }}
      className="space-y-3"
    >
      <div className="flex items-baseline gap-3 px-1">
        <h2 className="font-display font-semibold text-base text-foreground">{title}</h2>
        <span className="text-xs text-muted-foreground">{subtitle}</span>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <WatchedItemCard key={item.id} item={item} index={startIndex + i} />
        ))}
      </div>
    </motion.section>
  );
}