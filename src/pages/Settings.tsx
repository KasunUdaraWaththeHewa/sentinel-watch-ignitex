import { useState } from "react";
import { AppLayout } from "@/components/sentinel/AppLayout";
import { motion } from "framer-motion";
import { Bell, Clock, Mail, Globe, ShieldCheck, Zap, Smartphone } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { THEME_OPTIONS, TIMEZONES } from "@/lib/constants";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [emailReminders, setEmailReminders] = useState(true);
  const [pushReminders, setPushReminders] = useState(false);
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(true);
  const [quietStart, setQuietStart] = useState("22:00");
  const [quietEnd, setQuietEnd] = useState("08:00");
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [timezone, setTimezone] = useState("America/New_York");
  const [deadlineBuffer, setDeadlineBuffer] = useState("24");
  const [autoEscalation, setAutoEscalation] = useState(true);
  const [mobileSummary, setMobileSummary] = useState(true);
  const [securityDigest, setSecurityDigest] = useState(false);
  const [riskVisibility, setRiskVisibility] = useState("team");

  return (
    <AppLayout title="Settings" subtitle="Configure how Sentinel works for you.">
      <div className="grid gap-5">
        {/* Appearance */}
        <SettingsSection title="Appearance" icon={<Globe className="h-4 w-4" />} delay={0}>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            {THEME_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const active = theme === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => setTheme(opt.value)}
                  className={cn(
                    "relative rounded-xl p-4 flex min-h-[132px] flex-col items-center justify-center gap-2.5 transition-all duration-200 text-center ring-1",
                    active
                      ? "bg-sentinel-accent-cyan/10 ring-sentinel-accent-cyan/30"
                      : "bg-muted/30 ring-transparent hover:ring-sentinel-border"
                  )}
                >
                  <Icon className={cn("h-5 w-5", active ? "text-sentinel-accent-cyan" : "text-muted-foreground")} />
                  <div>
                    <span className={cn("text-sm font-medium block", active ? "text-foreground" : "text-muted-foreground")}>{opt.label}</span>
                    <span className="text-[10px] text-muted-foreground">{opt.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection title="Notifications" icon={<Bell className="h-4 w-4" />} delay={0.05}>
          <div className="space-y-1">
            <SettingsRow label="Email reminders" desc="Get notified via email before deadlines" icon={<Mail className="h-4 w-4 text-sentinel-accent-cyan" />}>
              <Switch checked={emailReminders} onCheckedChange={setEmailReminders} />
            </SettingsRow>
            <SettingsRow label="Push notifications" desc="Browser push notifications" icon={<Bell className="h-4 w-4 text-sentinel-accent-cyan" />}>
              <Switch checked={pushReminders} onCheckedChange={setPushReminders} />
            </SettingsRow>
            <SettingsRow label="Weekly Sentinel Briefing" desc="Summary of upcoming items every Monday" icon={<Mail className="h-4 w-4 text-sentinel-accent-cyan" />}>
              <Switch checked={weeklyDigest} onCheckedChange={setWeeklyDigest} />
            </SettingsRow>
          </div>
        </SettingsSection>

        {/* Quiet Hours */}
        <SettingsSection title="Quiet Hours" icon={<Clock className="h-4 w-4" />} delay={0.1}>
          <div className="space-y-3">
            <SettingsRow label="Enable quiet hours" desc="No notifications during this window" icon={<Clock className="h-4 w-4 text-sentinel-accent-cyan" />}>
              <Switch checked={quietHoursEnabled} onCheckedChange={setQuietHoursEnabled} />
            </SettingsRow>
            {quietHoursEnabled && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="grid gap-2 pl-0 sm:grid-cols-[auto_auto_auto] sm:items-center sm:pl-10">
                <input type="time" value={quietStart} onChange={(e) => setQuietStart(e.target.value)} className="w-full rounded-lg border border-sentinel-border bg-transparent text-foreground text-sm px-3 py-2 focus:ring-1 focus:ring-sentinel-accent-cyan/40 focus:outline-none" />
                <span className="text-xs text-muted-foreground">to</span>
                <input type="time" value={quietEnd} onChange={(e) => setQuietEnd(e.target.value)} className="w-full rounded-lg border border-sentinel-border bg-transparent text-foreground text-sm px-3 py-2 focus:ring-1 focus:ring-sentinel-accent-cyan/40 focus:outline-none" />
              </motion.div>
            )}
          </div>
        </SettingsSection>

        {/* Automation */}
        <SettingsSection title="Automation" icon={<Zap className="h-4 w-4" />} delay={0.13}>
          <div className="space-y-1">
            <SettingsRow label="Escalate overdue critical items" desc="Increase urgency when critical renewals become overdue" icon={<Zap className="h-4 w-4 text-sentinel-accent-cyan" />}>
              <Switch checked={autoEscalation} onCheckedChange={setAutoEscalation} />
            </SettingsRow>
            <SettingsRow label="Mobile-friendly summary card" desc="Prioritize compact cards for quick scans on mobile" icon={<Smartphone className="h-4 w-4 text-sentinel-accent-cyan" />}>
              <Switch checked={mobileSummary} onCheckedChange={setMobileSummary} />
            </SettingsRow>
            <div className="grid gap-2 border-b border-sentinel-border/30 px-0 py-3 last:border-0 sm:grid-cols-[minmax(0,1fr)_180px] sm:items-center sm:gap-3">
              <div>
                <p className="text-sm font-medium text-foreground">Reminder lead time</p>
                <p className="text-xs text-muted-foreground">Trigger alerts before high-risk deadlines</p>
              </div>
              <select
                value={deadlineBuffer}
                onChange={(e) => setDeadlineBuffer(e.target.value)}
                className="w-full rounded-lg border border-sentinel-border bg-transparent px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-sentinel-accent-cyan/40"
              >
                <option value="12" className="bg-background text-foreground">12 hours</option>
                <option value="24" className="bg-background text-foreground">24 hours</option>
                <option value="48" className="bg-background text-foreground">48 hours</option>
                <option value="72" className="bg-background text-foreground">72 hours</option>
              </select>
            </div>
          </div>
        </SettingsSection>

        {/* Timezone */}
        <SettingsSection title="Timezone" icon={<Globe className="h-4 w-4" />} delay={0.15}>
          <select value={timezone} onChange={(e) => setTimezone(e.target.value)} className="w-full rounded-xl border border-sentinel-border bg-transparent text-foreground text-sm px-3 py-3 appearance-none cursor-pointer focus:ring-1 focus:ring-sentinel-accent-cyan/40 focus:outline-none">
            {TIMEZONES.map((tz) => (
              <option key={tz} value={tz} className="bg-background text-foreground">{tz.replace(/_/g, " ")}</option>
            ))}
          </select>
        </SettingsSection>

        {/* Privacy */}
        <SettingsSection title="Privacy & Sharing" icon={<ShieldCheck className="h-4 w-4" />} delay={0.2}>
          <div className="space-y-1">
            <SettingsRow label="Security digest" desc="Receive a monthly account and activity digest" icon={<ShieldCheck className="h-4 w-4 text-sentinel-accent-cyan" />}>
              <Switch checked={securityDigest} onCheckedChange={setSecurityDigest} />
            </SettingsRow>
            <div className="grid gap-2 px-0 py-3 sm:grid-cols-[minmax(0,1fr)_220px] sm:items-center sm:gap-3">
              <div>
                <p className="text-sm font-medium text-foreground">Default risk visibility</p>
                <p className="text-xs text-muted-foreground">Choose who can view risk scores in your workspace</p>
              </div>
              <select
                value={riskVisibility}
                onChange={(e) => setRiskVisibility(e.target.value)}
                className="w-full rounded-lg border border-sentinel-border bg-transparent px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-sentinel-accent-cyan/40"
              >
                <option value="private" className="bg-background text-foreground">Only me</option>
                <option value="team" className="bg-background text-foreground">My team</option>
                <option value="org" className="bg-background text-foreground">Entire organization</option>
              </select>
            </div>
          </div>
        </SettingsSection>
      </div>
    </AppLayout>
  );
};

function SettingsSection({ title, icon, delay, children }: { title: string; icon: React.ReactNode; delay: number; children: React.ReactNode }) {
  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }} className="glass-surface rounded-2xl p-5 sm:p-6 space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">{icon}</span>
        <h2 className="font-display font-semibold text-sm text-foreground uppercase tracking-widest">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}

function SettingsRow({ label, desc, icon, children }: { label: string; desc: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 py-3 border-b border-sentinel-border/30 last:border-0 sm:flex-row sm:items-center">
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <div className="self-start sm:self-auto">{children}</div>
    </div>
  );
}

export default Settings;
