import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/sentinel/AppLayout";
import { mockWatchedItems } from "@/lib/mock-data";
import { CATEGORY_ICONS, SCHEDULE_LABELS, SCHEDULE_INTERVAL_DAYS } from "@/lib/constants";
import { getTimeRemaining, formatFullDate, getDaysUntil } from "@/lib/date-utils";
import { Schedule, RegretRisk } from "@/types/sentinel";
import { SeverityBadge } from "@/components/sentinel/SeverityBadge";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Shield, Repeat, Bell, CheckCircle2, Pause, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MS_PER_DAY } from "@/lib/constants";

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = mockWatchedItems.find((i) => i.id === id);

  if (!item) {
    return (
      <AppLayout title="Item not found" subtitle="The item you're looking for doesn't exist." showDate={false}>
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-muted/50 mx-auto flex items-center justify-center mb-6">
            <Clock className="h-7 w-7 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-sm mb-6">This watched item may have been removed or doesn't exist.</p>
          <Button variant="glass-primary" onClick={() => navigate("/dashboard")}>Back to Command Center</Button>
        </div>
      </AppLayout>
    );
  }

  const Icon = CATEGORY_ICONS[item.category.icon] || Clock;
  const timeRemaining = getTimeRemaining(item.nextDate);
  const daysLeft = getDaysUntil(item.nextDate);
  const isUrgent = daysLeft <= 7;

  const nextOccurrences: Date[] = [];
  if (item.schedule !== Schedule.OneTime) {
    const intervalDays = SCHEDULE_INTERVAL_DAYS[item.schedule] || 30;
    for (let i = 0; i < 3; i++) {
      nextOccurrences.push(new Date(item.nextDate.getTime() + i * intervalDays * MS_PER_DAY));
    }
  } else {
    nextOccurrences.push(item.nextDate);
  }

  const timeline = [
    { date: item.createdAt, label: "Created", icon: FileText, active: true },
    ...(daysLeft <= 14 ? [{ date: new Date(item.nextDate.getTime() - 7 * MS_PER_DAY), label: "Reminder sent", icon: Bell, active: true }] : []),
    { date: item.nextDate, label: "Due date", icon: Calendar, active: daysLeft <= 0 },
  ];

  return (
    <AppLayout title={item.title} subtitle={item.category.name} showDate={false}>
      <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group">
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" /> Back to Command Center
      </button>

      {/* Hero Card */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className={cn("glass-surface rounded-2xl p-6 sm:p-8 space-y-5", isUrgent && "ring-1 ring-sentinel-severity-high/15")}>
        <div className="flex items-start gap-4">
          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0", isUrgent ? "bg-sentinel-severity-high/10" : "bg-sentinel-accent-cyan/10")}>
            <Icon className={cn("h-6 w-6", isUrgent ? "text-sentinel-severity-high" : "text-sentinel-accent-cyan")} />
          </div>
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">{item.category.name}</span>
              <SeverityBadge severity={item.severity} />
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground tracking-tight">{item.title}</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <InfoBlock icon={<Clock className="h-4 w-4" />} label="Time Left" value={timeRemaining} highlight={isUrgent} accent={isUrgent ? "high" : "cyan"} />
          <InfoBlock icon={<Calendar className="h-4 w-4" />} label="Due Date" value={formatFullDate(item.nextDate)} accent="cyan" />
          <InfoBlock icon={<Shield className="h-4 w-4" />} label="Regret Risk" value={item.regretRisk} highlight={item.regretRisk === RegretRisk.High} accent={item.regretRisk === RegretRisk.High ? "high" : "cyan"} />
        </div>

        <div className="bg-muted/30 rounded-xl p-4">
          <p className="text-sm text-muted-foreground">{item.actionWindow}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="glass-primary" className="flex-1 gap-2 h-11"><CheckCircle2 className="h-4 w-4" /> Mark as Handled</Button>
          <Button variant="glass" className="flex-1 gap-2 h-11"><Pause className="h-4 w-4" /> Snooze</Button>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Schedule */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="glass-surface rounded-2xl p-6 space-y-4">
          <SectionHeader icon={<Repeat className="h-4 w-4" />} title="Schedule" />
          <p className="text-sm text-foreground font-medium">{SCHEDULE_LABELS[item.schedule] || item.schedule}</p>
          <div className="space-y-0">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2">Next Occurrences</p>
            {nextOccurrences.map((d, i) => (
              <div key={i} className="flex items-center gap-3 py-2.5 border-b border-sentinel-border/50 last:border-0">
                <div className={cn("w-2 h-2 rounded-full flex-shrink-0", i === 0 ? "bg-sentinel-accent-cyan" : "bg-muted")} />
                <span className="text-sm text-foreground">{formatFullDate(d)}</span>
                {i === 0 && <span className="text-[10px] text-sentinel-accent-cyan font-medium ml-auto uppercase tracking-wider">Next</span>}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="glass-surface rounded-2xl p-6 space-y-4">
          <SectionHeader icon={<Clock className="h-4 w-4" />} title="Timeline" />
          <div className="space-y-0">
            {timeline.map((event, i) => {
              const EventIcon = event.icon;
              return (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0", event.active ? "bg-sentinel-accent-cyan/15" : "bg-muted/50")}>
                      <EventIcon className={cn("h-4 w-4", event.active ? "text-sentinel-accent-cyan" : "text-muted-foreground")} />
                    </div>
                    {i < timeline.length - 1 && <div className="w-px h-8 bg-sentinel-border/50" />}
                  </div>
                  <div className="pb-6">
                    <p className="text-sm font-medium text-foreground">{event.label}</p>
                    <p className="text-xs text-muted-foreground">{formatFullDate(event.date)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Notes */}
      {item.notes && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="glass-surface rounded-2xl p-6 space-y-3">
          <SectionHeader icon={<FileText className="h-4 w-4" />} title="Notes" />
          <p className="text-sm text-muted-foreground leading-relaxed">{item.notes}</p>
        </motion.div>
      )}
    </AppLayout>
  );
};

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground">{icon}</span>
      <h2 className="font-display font-semibold text-sm text-foreground uppercase tracking-widest">{title}</h2>
    </div>
  );
}

function InfoBlock({ icon, label, value, highlight, accent = "cyan" }: { icon: React.ReactNode; label: string; value: string; highlight?: boolean; accent?: "cyan" | "high" }) {
  return (
    <div className={cn("rounded-xl p-3.5 space-y-1.5 ring-1", accent === "high" && highlight ? "bg-sentinel-severity-high/5 ring-sentinel-severity-high/10" : "bg-muted/30 ring-transparent")}>
      <div className="flex items-center gap-1.5">
        <span className={cn(accent === "high" && highlight ? "text-sentinel-severity-high" : "text-sentinel-accent-cyan")}>{icon}</span>
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">{label}</span>
      </div>
      <p className={cn("text-sm font-semibold", highlight ? "text-sentinel-severity-high" : "text-foreground")}>{value}</p>
    </div>
  );
}

export default ItemDetail;
