import { useEffect, useRef, useState } from "react";
import { AppLayout } from "@/components/sentinel/AppLayout";
import { motion } from "framer-motion";
import {
  Bell,
  Clock,
  Mail,
  Globe,
  ShieldCheck,
  Zap,
  Smartphone,
  Download,
  Upload,
  Trash2,
  Database,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { THEME_OPTIONS, TIMEZONES } from "@/lib/constants";
import {
  parseWatchedItems,
  serializeWatchedItems,
  useWatchedItems,
} from "@/context/WatchedItemsContext";
import { useToast } from "@/hooks/use-toast";
import { mockWatchedItems } from "@/lib/mock-data";

const SETTINGS_KEY = "sentinel.settings.v1";

interface UserSettings {
  emailReminders: boolean;
  pushReminders: boolean;
  quietHoursEnabled: boolean;
  quietStart: string;
  quietEnd: string;
  weeklyDigest: boolean;
  timezone: string;
  deadlineBuffer: string;
  autoEscalation: boolean;
  mobileSummary: boolean;
  securityDigest: boolean;
  riskVisibility: string;
}

const defaultSettings: UserSettings = {
  emailReminders: true,
  pushReminders: false,
  quietHoursEnabled: true,
  quietStart: "22:00",
  quietEnd: "08:00",
  weeklyDigest: true,
  timezone: "America/New_York",
  deadlineBuffer: "24",
  autoEscalation: true,
  mobileSummary: true,
  securityDigest: false,
  riskVisibility: "team",
};

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { items, replaceAllItems } = useWatchedItems();
  const { toast } = useToast();
  const importRef = useRef<HTMLInputElement>(null);
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(SETTINGS_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as Partial<UserSettings>;
      setSettings({ ...defaultSettings, ...parsed });
    } catch {
      window.localStorage.removeItem(SETTINGS_KEY);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  const setField = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleExport = () => {
    const payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      settings,
      watchedItems: serializeWatchedItems(items),
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "sentinel-backup.json";
    anchor.click();
    URL.revokeObjectURL(url);
    toast({ title: "Backup exported", description: "Your data has been downloaded." });
  };

  const handleImport = async (file: File) => {
    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as {
        settings?: Partial<UserSettings>;
        watchedItems?: string;
      };

      if (parsed.settings) {
        setSettings((prev) => ({ ...prev, ...parsed.settings }));
      }

      if (parsed.watchedItems) {
        replaceAllItems(parseWatchedItems(parsed.watchedItems));
      }

      toast({ title: "Backup imported", description: "Your workspace was restored." });
    } catch {
      toast({
        title: "Import failed",
        description: "This backup file is invalid or unsupported.",
        variant: "destructive",
      });
    }
  };

  const handleResetData = () => {
    replaceAllItems(mockWatchedItems);
    toast({ title: "Sample data restored", description: "Your watchlist has been reset." });
  };

  return (
    <AppLayout title="Settings" subtitle="Configure how Sentinel works for you.">
      <div className="grid gap-5">
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
                      : "bg-muted/30 ring-transparent hover:ring-sentinel-border",
                  )}
                >
                  <Icon className={cn("h-5 w-5", active ? "text-sentinel-accent-cyan" : "text-muted-foreground")} />
                  <div>
                    <span className={cn("text-sm font-medium block", active ? "text-foreground" : "text-muted-foreground")}>
                      {opt.label}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{opt.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </SettingsSection>

        <SettingsSection title="Notifications" icon={<Bell className="h-4 w-4" />} delay={0.05}>
          <div className="space-y-1">
            <SettingsRow label="Email reminders" desc="Get notified via email before deadlines" icon={<Mail className="h-4 w-4 text-sentinel-accent-cyan" />}>
              <Switch checked={settings.emailReminders} onCheckedChange={(value) => setField("emailReminders", value)} />
            </SettingsRow>
            <SettingsRow label="Push notifications" desc="Browser push notifications" icon={<Bell className="h-4 w-4 text-sentinel-accent-cyan" />}>
              <Switch checked={settings.pushReminders} onCheckedChange={(value) => setField("pushReminders", value)} />
            </SettingsRow>
            <SettingsRow label="Weekly Sentinel Briefing" desc="Summary of upcoming items every Monday" icon={<Mail className="h-4 w-4 text-sentinel-accent-cyan" />}>
              <Switch checked={settings.weeklyDigest} onCheckedChange={(value) => setField("weeklyDigest", value)} />
            </SettingsRow>
          </div>
        </SettingsSection>

        <SettingsSection title="Quiet Hours" icon={<Clock className="h-4 w-4" />} delay={0.1}>
          <div className="space-y-3">
            <SettingsRow label="Enable quiet hours" desc="No notifications during this window" icon={<Clock className="h-4 w-4 text-sentinel-accent-cyan" />}>
              <Switch checked={settings.quietHoursEnabled} onCheckedChange={(value) => setField("quietHoursEnabled", value)} />
            </SettingsRow>
            {settings.quietHoursEnabled && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="grid gap-2 pl-0 sm:grid-cols-[auto_auto_auto] sm:items-center sm:pl-10">
                <input type="time" value={settings.quietStart} onChange={(e) => setField("quietStart", e.target.value)} className="w-full rounded-lg border border-sentinel-border bg-transparent text-foreground text-sm px-3 py-2 focus:ring-1 focus:ring-sentinel-accent-cyan/40 focus:outline-none" />
                <span className="text-xs text-muted-foreground">to</span>
                <input type="time" value={settings.quietEnd} onChange={(e) => setField("quietEnd", e.target.value)} className="w-full rounded-lg border border-sentinel-border bg-transparent text-foreground text-sm px-3 py-2 focus:ring-1 focus:ring-sentinel-accent-cyan/40 focus:outline-none" />
              </motion.div>
            )}
          </div>
        </SettingsSection>

        <SettingsSection title="Automation" icon={<Zap className="h-4 w-4" />} delay={0.13}>
          <div className="space-y-1">
            <SettingsRow label="Escalate overdue critical items" desc="Increase urgency when critical renewals become overdue" icon={<Zap className="h-4 w-4 text-sentinel-accent-cyan" />}>
              <Switch checked={settings.autoEscalation} onCheckedChange={(value) => setField("autoEscalation", value)} />
            </SettingsRow>
            <SettingsRow label="Mobile-friendly summary card" desc="Prioritize compact cards for quick scans on mobile" icon={<Smartphone className="h-4 w-4 text-sentinel-accent-cyan" />}>
              <Switch checked={settings.mobileSummary} onCheckedChange={(value) => setField("mobileSummary", value)} />
            </SettingsRow>
            <div className="grid gap-2 rounded-xl bg-muted/25 px-3 py-3 sm:grid-cols-[minmax(0,1fr)_180px] sm:items-center sm:gap-3">
              <div>
                <p className="text-sm font-medium text-foreground">Reminder lead time</p>
                <p className="text-xs text-muted-foreground">Trigger alerts before high-risk deadlines</p>
              </div>
              <select value={settings.deadlineBuffer} onChange={(e) => setField("deadlineBuffer", e.target.value)} className="w-full rounded-lg border border-sentinel-border bg-transparent px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-sentinel-accent-cyan/40">
                <option value="12" className="bg-background text-foreground">12 hours</option>
                <option value="24" className="bg-background text-foreground">24 hours</option>
                <option value="48" className="bg-background text-foreground">48 hours</option>
                <option value="72" className="bg-background text-foreground">72 hours</option>
              </select>
            </div>
          </div>
        </SettingsSection>

        <SettingsSection title="Timezone" icon={<Globe className="h-4 w-4" />} delay={0.15}>
          <select value={settings.timezone} onChange={(e) => setField("timezone", e.target.value)} className="w-full rounded-xl border border-sentinel-border bg-transparent text-foreground text-sm px-3 py-3 appearance-none cursor-pointer focus:ring-1 focus:ring-sentinel-accent-cyan/40 focus:outline-none">
            {TIMEZONES.map((tz) => (
              <option key={tz} value={tz} className="bg-background text-foreground">
                {tz.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </SettingsSection>

        <SettingsSection title="Privacy & Sharing" icon={<ShieldCheck className="h-4 w-4" />} delay={0.2}>
          <div className="space-y-1">
            <SettingsRow label="Security digest" desc="Receive a monthly account and activity digest" icon={<ShieldCheck className="h-4 w-4 text-sentinel-accent-cyan" />}>
              <Switch checked={settings.securityDigest} onCheckedChange={(value) => setField("securityDigest", value)} />
            </SettingsRow>
            <div className="grid gap-2 rounded-xl bg-muted/25 px-3 py-3 sm:grid-cols-[minmax(0,1fr)_220px] sm:items-center sm:gap-3">
              <div>
                <p className="text-sm font-medium text-foreground">Default risk visibility</p>
                <p className="text-xs text-muted-foreground">Choose who can view risk scores in your workspace</p>
              </div>
              <select value={settings.riskVisibility} onChange={(e) => setField("riskVisibility", e.target.value)} className="w-full rounded-lg border border-sentinel-border bg-transparent px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-sentinel-accent-cyan/40">
                <option value="private" className="bg-background text-foreground">Only me</option>
                <option value="team" className="bg-background text-foreground">My team</option>
                <option value="org" className="bg-background text-foreground">Entire organization</option>
              </select>
            </div>
          </div>
        </SettingsSection>

        <SettingsSection title="Data Management" icon={<Database className="h-4 w-4" />} delay={0.23}>
          <div className="grid gap-2 sm:grid-cols-3">
            <button onClick={handleExport} className="rounded-xl bg-muted/25 hover:bg-muted/35 transition-colors px-3 py-3 text-left">
              <Download className="h-4 w-4 text-sentinel-accent-cyan mb-2" />
              <p className="text-sm font-medium text-foreground">Export backup</p>
              <p className="text-xs text-muted-foreground">Download settings + watchlist as JSON</p>
            </button>
            <button onClick={() => importRef.current?.click()} className="rounded-xl bg-muted/25 hover:bg-muted/35 transition-colors px-3 py-3 text-left">
              <Upload className="h-4 w-4 text-sentinel-accent-cyan mb-2" />
              <p className="text-sm font-medium text-foreground">Import backup</p>
              <p className="text-xs text-muted-foreground">Restore from a previous export file</p>
            </button>
            <button onClick={handleResetData} className="rounded-xl bg-muted/25 hover:bg-muted/35 transition-colors px-3 py-3 text-left">
              <Trash2 className="h-4 w-4 text-sentinel-severity-high mb-2" />
              <p className="text-sm font-medium text-foreground">Reset watchlist</p>
              <p className="text-xs text-muted-foreground">Load default sample items instantly</p>
            </button>
          </div>
          <input
            ref={importRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleImport(file);
              e.currentTarget.value = "";
            }}
          />
        </SettingsSection>
      </div>
    </AppLayout>
  );
};

function SettingsSection({
  title,
  icon,
  delay,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass-surface rounded-2xl p-5 sm:p-6 space-y-4"
    >
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">{icon}</span>
        <h2 className="font-display font-semibold text-sm text-foreground uppercase tracking-widest">
          {title}
        </h2>
      </div>
      {children}
    </motion.section>
  );
}

function SettingsRow({
  label,
  desc,
  icon,
  children,
}: {
  label: string;
  desc: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 py-3 px-3 rounded-xl bg-muted/20 sm:flex-row sm:items-center transition-colors duration-300 hover:bg-muted/30">
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
