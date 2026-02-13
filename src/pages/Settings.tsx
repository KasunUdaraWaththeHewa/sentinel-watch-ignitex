import { useState } from "react";
import { AppLayout } from "@/components/sentinel/AppLayout";
import { motion } from "framer-motion";
import { Moon, Sun, Monitor, Bell, Clock, Mail, Globe } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const themeOptions = [
  { value: "dark", label: "Dark", icon: Moon, desc: "Deep graphite" },
  { value: "light", label: "Light", icon: Sun, desc: "Warm off-white" },
  { value: "system", label: "System", icon: Monitor, desc: "Match device" },
];

const timezones = [
  "America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles",
  "Europe/London", "Europe/Paris", "Asia/Tokyo", "Asia/Kolkata", "Australia/Sydney",
];

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [emailReminders, setEmailReminders] = useState(true);
  const [pushReminders, setPushReminders] = useState(false);
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(true);
  const [quietStart, setQuietStart] = useState("22:00");
  const [quietEnd, setQuietEnd] = useState("08:00");
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [timezone, setTimezone] = useState("America/New_York");

  return (
    <AppLayout title="Settings" subtitle="Configure how Sentinel works for you.">
      {/* Theme */}
      <SettingsSection title="Appearance" icon={<Sun className="h-4 w-4" />} delay={0}>
        <div className="grid grid-cols-3 gap-2">
          {themeOptions.map((opt) => {
            const Icon = opt.icon;
            return (
              <button
                key={opt.value}
                onClick={() => setTheme(opt.value)}
                className={cn(
                  "glass-surface rounded-xl p-4 flex flex-col items-center gap-2 transition-all duration-300 text-center",
                  theme === opt.value
                    ? "border-sentinel-accent-cyan/40 bg-sentinel-accent-cyan/10"
                    : "hover:border-sentinel-border"
                )}
              >
                <Icon className="h-5 w-5 text-sentinel-accent-cyan" />
                <span className="text-sm font-medium text-foreground">{opt.label}</span>
                <span className="text-[10px] text-muted-foreground">{opt.desc}</span>
              </button>
            );
          })}
        </div>
      </SettingsSection>

      {/* Notifications */}
      <SettingsSection title="Notifications" icon={<Bell className="h-4 w-4" />} delay={0.05}>
        <div className="space-y-4">
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
        <div className="space-y-4">
          <SettingsRow label="Enable quiet hours" desc="No notifications during this window" icon={<Moon className="h-4 w-4 text-sentinel-accent-cyan" />}>
            <Switch checked={quietHoursEnabled} onCheckedChange={setQuietHoursEnabled} />
          </SettingsRow>
          {quietHoursEnabled && (
            <div className="flex items-center gap-3 pl-10">
              <input type="time" value={quietStart} onChange={(e) => setQuietStart(e.target.value)} className="glass-surface border-sentinel-border bg-transparent text-foreground text-sm rounded-lg px-3 py-2" />
              <span className="text-xs text-muted-foreground">to</span>
              <input type="time" value={quietEnd} onChange={(e) => setQuietEnd(e.target.value)} className="glass-surface border-sentinel-border bg-transparent text-foreground text-sm rounded-lg px-3 py-2" />
            </div>
          )}
        </div>
      </SettingsSection>

      {/* Timezone */}
      <SettingsSection title="Timezone" icon={<Globe className="h-4 w-4" />} delay={0.15}>
        <select value={timezone} onChange={(e) => setTimezone(e.target.value)} className="w-full glass-surface border-sentinel-border bg-transparent text-foreground text-sm rounded-lg px-3 py-3 appearance-none cursor-pointer">
          {timezones.map((tz) => (
            <option key={tz} value={tz} className="bg-background text-foreground">
              {tz.replace(/_/g, " ")}
            </option>
          ))}
        </select>
      </SettingsSection>
    </AppLayout>
  );
};

function SettingsSection({ title, icon, delay, children }: { title: string; icon: React.ReactNode; delay: number; children: React.ReactNode }) {
  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }} className="glass-surface rounded-2xl p-5 sm:p-6 space-y-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <h2 className="font-display font-semibold text-sm text-foreground uppercase tracking-widest">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}

function SettingsRow({ label, desc, icon, children }: { label: string; desc: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      {children}
    </div>
  );
}

export default Settings;
