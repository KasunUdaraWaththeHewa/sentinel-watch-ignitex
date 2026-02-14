import { motion } from "framer-motion";
import { Eye, AlertTriangle, TrendingUp, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { SENTINEL_EASE } from "@/lib/constants";

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  label: string;
  accent?: "cyan" | "high" | "medium" | "low";
  delay?: number;
}

function StatCard({
  icon: Icon,
  value,
  label,
  accent = "cyan",
  delay = 0,
}: StatCardProps) {
  const accentMap = {
    cyan: {
      iconBg: "bg-sentinel-accent-cyan/10",
      iconColor: "text-sentinel-accent-cyan",
      valueColor: "text-foreground",
      ring: "ring-sentinel-accent-cyan/10",
    },
    high: {
      iconBg: "bg-sentinel-severity-high/10",
      iconColor: "text-sentinel-severity-high",
      valueColor: "text-sentinel-severity-high",
      ring: "ring-sentinel-severity-high/10",
    },
    medium: {
      iconBg: "bg-sentinel-severity-medium/10",
      iconColor: "text-sentinel-severity-medium",
      valueColor: "text-foreground",
      ring: "ring-sentinel-severity-medium/10",
    },
    low: {
      iconBg: "bg-sentinel-severity-low/10",
      iconColor: "text-sentinel-severity-low",
      valueColor: "text-foreground",
      ring: "ring-sentinel-severity-low/10",
    },
  };

  const a = accentMap[accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: SENTINEL_EASE }}
      className={cn(
        "glass-surface rounded-2xl p-4 sm:p-5 flex flex-col gap-3 ring-1",
        a.ring,
      )}
    >
      <div
        className={cn(
          "w-9 h-9 rounded-xl flex items-center justify-center",
          a.iconBg,
        )}
      >
        <Icon className={cn("h-4.5 w-4.5", a.iconColor)} />
      </div>
      <div>
        <p
          className={cn(
            "text-2xl sm:text-3xl font-display font-bold tracking-tight",
            a.valueColor,
          )}
        >
          {value}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
      </div>
    </motion.div>
  );
}

interface DashboardStatsProps {
  watching: number;
  urgent: number;
  thisWeek: number;
  handled: number;
}

export function DashboardStats({
  watching,
  urgent,
  thisWeek,
  handled,
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <StatCard
        icon={Eye}
        value={watching}
        label="Watching"
        accent="cyan"
        delay={0.05}
      />
      <StatCard
        icon={AlertTriangle}
        value={urgent}
        label="Urgent"
        accent={urgent > 0 ? "high" : "cyan"}
        delay={0.1}
      />
      <StatCard
        icon={TrendingUp}
        value={thisWeek}
        label="This Week"
        accent="medium"
        delay={0.15}
      />
      <StatCard
        icon={CheckCircle2}
        value={handled}
        label="Handled"
        accent="low"
        delay={0.2}
      />
    </div>
  );
}
