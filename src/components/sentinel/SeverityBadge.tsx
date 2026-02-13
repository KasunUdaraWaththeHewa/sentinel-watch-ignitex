import { Severity } from "@/types/sentinel";
import { cn } from "@/lib/utils";
import { AlertTriangle, Shield, ShieldAlert } from "lucide-react";

interface SeverityBadgeProps {
  severity: Severity;
  className?: string;
}

const config: Record<Severity, { label: string; icon: typeof Shield; className: string }> = {
  [Severity.Low]: {
    label: "Low",
    icon: Shield,
    className: "text-sentinel-severity-low border-sentinel-severity-low/30 bg-sentinel-severity-low/10",
  },
  [Severity.Medium]: {
    label: "Medium",
    icon: AlertTriangle,
    className: "text-sentinel-severity-medium border-sentinel-severity-medium/30 bg-sentinel-severity-medium/10",
  },
  [Severity.High]: {
    label: "High",
    icon: ShieldAlert,
    className: "text-sentinel-severity-high border-sentinel-severity-high/30 bg-sentinel-severity-high/10",
  },
};

export function SeverityBadge({ severity, className }: SeverityBadgeProps) {
  const { label, icon: Icon, className: badgeClass } = config[severity];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide",
        badgeClass,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}
