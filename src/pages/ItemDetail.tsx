import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/sentinel/AppLayout";
import { mockWatchedItems, CATEGORY_ICONS } from "@/lib/mock-data";
import { SeverityBadge } from "@/components/sentinel/SeverityBadge";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Shield, Repeat, Bell, CheckCircle2, Pause, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function getTimeRemaining(date: Date): string {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const days = Math.ceil(diff / 86400000);
  if (days <= 0) return "Today";
  if (days === 1) return "Tomorrow";
  return `in ${days} days`;
}

function formatFullDate(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric", year: "numeric" });
}

const scheduleLabels: Record<string, string> = {
  "one-time": "One-time event", daily: "Repeats daily", monthly: "Repeats monthly",
  quarterly: "Repeats quarterly", yearly: "Repeats yearly", custom: "Custom schedule",
};

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = mockWatchedItems.find((i) => i.id === id);

  if (!item) {
    return (
      <AppLayout title="Item not found" subtitle="The item you're looking for doesn't exist." showDate={false}>
        <div className="text-center py-12">
          <Button variant="glass" onClick={() => navigate("/dashboard")}>Back to Command Center</Button>
        </div>
      </AppLayout>
    );
  }

  const Icon = CATEGORY_ICONS[item.category.icon] || Clock;
  const timeRemaining = getTimeRemaining(item.nextDate);
  const daysLeft = Math.ceil((item.nextDate.getTime() - new Date().getTime()) / 86400000);

  const nextOccurrences: Date[] = [];
  if (item.schedule !== "one-time") {
    const intervalDays = item.schedule === "daily" ? 1 : item.schedule === "monthly" ? 30 : item.schedule === "quarterly" ? 90 : item.schedule === "yearly" ? 365 : 30;
    for (let i = 0; i < 3; i++) {
      nextOccurrences.push(new Date(item.nextDate.getTime() + i * intervalDays * 86400000));
    }
  } else {
    nextOccurrences.push(item.nextDate);
  }

  const timeline = [
    { date: item.createdAt, label: "Created", icon: FileText, active: true },
    ...(daysLeft <= 14 ? [{ date: new Date(item.nextDate.getTime() - 7 * 86400000), label: "Reminder sent", icon: Bell, active: true }] : []),
    { date: item.nextDate, label: "Due date", icon: Calendar, active: daysLeft <= 0 },
  ];

  return (
    <AppLayout title={item.title} subtitle={item.category.name} showDate={false}>
      {/* Back */}
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Command Center
      </button>

      {/* Hero Card */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="glass-surface rounded-2xl p-6 sm:p-8 space-y-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-sentinel-accent-cyan/10 flex items-center justify-center flex-shrink-0">
            <Icon className="h-6 w-6 text-sentinel-accent-cyan" />
          </div>
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{item.category.name}</span>
              <SeverityBadge severity={item.severity} />
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground tracking-tight">{item.title}</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <InfoBlock icon={<Clock className="h-4 w-4 text-sentinel-accent-cyan" />} label="Time Left" value={timeRemaining} highlight={daysLeft <= 7} />
          <InfoBlock icon={<Calendar className="h-4 w-4 text-sentinel-accent-cyan" />} label="Due Date" value={formatFullDate(item.nextDate)} />
          <InfoBlock icon={<Shield className="h-4 w-4 text-sentinel-accent-cyan" />} label="Regret Risk" value={item.regretRisk} highlight={item.regretRisk === "High"} />
        </div>

        <div className="glass-surface rounded-xl p-4">
          <p className="text-sm text-muted-foreground">{item.actionWindow}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="glass-primary" className="flex-1 gap-2"><CheckCircle2 className="h-4 w-4" /> Mark as Handled</Button>
          <Button variant="glass" className="flex-1 gap-2"><Pause className="h-4 w-4" /> Snooze</Button>
        </div>
      </motion.div>

      {/* Schedule Clarity */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="glass-surface rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Repeat className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-display font-semibold text-sm text-foreground uppercase tracking-widest">Schedule</h2>
        </div>
        <p className="text-sm text-foreground">{scheduleLabels[item.schedule] || item.schedule}</p>
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-widest">Next Occurrences</p>
          {nextOccurrences.map((d, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-sentinel-border last:border-0">
              <div className={cn("w-2 h-2 rounded-full flex-shrink-0", i === 0 ? "bg-sentinel-accent-cyan" : "bg-sentinel-surface")} />
              <span className="text-sm text-foreground">{formatFullDate(d)}</span>
              {i === 0 && <span className="text-xs text-sentinel-accent-cyan ml-auto">Next</span>}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Timeline */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="glass-surface rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-display font-semibold text-sm text-foreground uppercase tracking-widest">Timeline</h2>
        </div>
        <div className="space-y-0">
          {timeline.map((event, i) => {
            const EventIcon = event.icon;
            return (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0", event.active ? "bg-sentinel-accent-cyan/15" : "bg-sentinel-surface")}>
                    <EventIcon className={cn("h-4 w-4", event.active ? "text-sentinel-accent-cyan" : "text-muted-foreground")} />
                  </div>
                  {i < timeline.length - 1 && <div className="w-px h-8 bg-sentinel-border" />}
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

      {/* Notes */}
      {item.notes && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="glass-surface rounded-2xl p-6 space-y-3">
          <h2 className="font-display font-semibold text-sm text-foreground uppercase tracking-widest">Notes</h2>
          <p className="text-sm text-muted-foreground">{item.notes}</p>
        </motion.div>
      )}
    </AppLayout>
  );
};

function InfoBlock({ icon, label, value, highlight }: { icon: React.ReactNode; label: string; value: string; highlight?: boolean }) {
  return (
    <div className="glass-surface rounded-xl p-3 space-y-1.5">
      <div className="flex items-center gap-1.5">
        {icon}
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      </div>
      <p className={cn("text-sm font-medium", highlight ? "text-sentinel-severity-high" : "text-foreground")}>{value}</p>
    </div>
  );
}

export default ItemDetail;
