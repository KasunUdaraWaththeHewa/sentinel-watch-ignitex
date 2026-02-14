import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Calendar,
  AlertTriangle,
  Eye,
  Plus,
  X,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Severity,
  Schedule,
  CustomIntervalUnit,
  CustomScheduleMode,
  RegretRisk,
  ItemStatus,
  type Reminder,
  type WatchedItem,
} from "@/types/sentinel";
import {
  DEFAULT_CATEGORIES,
  CATEGORY_ICONS,
  SCHEDULE_OPTIONS,
  SEVERITY_OPTIONS,
  SCHEDULE_FREQUENCY_LABELS,
  ADD_ITEM_STEPS,
  SENTINEL_EASE,
  getDefaultReminders,
} from "@/lib/constants";
import { SeverityBadge } from "./SeverityBadge";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useWatchedItems } from "@/context/WatchedItemsContext";
import { useToast } from "@/hooks/use-toast";

export function AddWatchedItem() {
  const navigate = useNavigate();
  const { addItem } = useWatchedItems();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [schedule, setSchedule] = useState<Schedule>(Schedule.Yearly);
  const [date, setDate] = useState("");
  const [severity, setSeverity] = useState<Severity>(Severity.Medium);
  const [notes, setNotes] = useState("");
  const [done, setDone] = useState(false);

  // Custom schedule state
  const [customIntervalValue, setCustomIntervalValue] = useState(2);
  const [customIntervalUnit, setCustomIntervalUnit] =
    useState<CustomIntervalUnit>(CustomIntervalUnit.Weeks);
  const [customMode, setCustomMode] = useState<CustomScheduleMode>(
    CustomScheduleMode.Interval,
  );
  const [customDates, setCustomDates] = useState<string[]>([]);
  const [newCustomDate, setNewCustomDate] = useState("");

  // Reminders state
  const [reminders, setReminders] = useState<Reminder[]>(
    getDefaultReminders(Severity.Medium),
  );

  const selectedCategory = DEFAULT_CATEGORIES.find((c) => c.id === categoryId);
  const canAdvance =
    step === 0
      ? title.trim() && categoryId
      : step === 1
        ? schedule === Schedule.Custom
          ? customMode === CustomScheduleMode.Interval || customDates.length > 0
          : !!date
        : true;

  const getSchedulePreview = (): string => {
    if (!selectedCategory) return "";
    if (schedule === Schedule.Custom) {
      if (customMode === CustomScheduleMode.Interval) {
        return `Sentinel will watch this every ${customIntervalValue} ${customIntervalUnit}${date ? ` starting ${new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric" })}` : ""}.`;
      }
      if (customDates.length > 0) {
        return `Sentinel will watch this on ${customDates.length} specific date${customDates.length > 1 ? "s" : ""} you've set.`;
      }
      return "";
    }
    const freqLabel = SCHEDULE_FREQUENCY_LABELS[schedule] || schedule;
    return `Sentinel will watch this ${freqLabel}${date ? ` starting ${new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric" })}` : ""}.`;
  };

  const handleSeverityChange = (s: Severity) => {
    setSeverity(s);
    setReminders(getDefaultReminders(s));
  };

  const addCustomDate = () => {
    if (newCustomDate && !customDates.includes(newCustomDate)) {
      setCustomDates([...customDates, newCustomDate].sort());
      setNewCustomDate("");
    }
  };

  const removeCustomDate = (d: string) => {
    setCustomDates(customDates.filter((cd) => cd !== d));
  };

  const toggleReminder = (index: number) => {
    setReminders(
      reminders.map((r, i) =>
        i === index ? { ...r, enabled: !r.enabled } : r,
      ),
    );
  };

  const removeReminder = (index: number) => {
    setReminders(reminders.filter((_, i) => i !== index));
  };

  const addReminder = () => {
    setReminders([...reminders, { enabled: true, days: 1 }]);
  };

  const updateReminderDays = (index: number, days: number) => {
    setReminders(reminders.map((r, i) => (i === index ? { ...r, days } : r)));
  };

  const getRegretRisk = (nextSeverity: Severity) => {
    if (nextSeverity === Severity.High) return RegretRisk.High;
    if (nextSeverity === Severity.Medium) return RegretRisk.Medium;
    return RegretRisk.Low;
  };

  const getActionWindow = (nextSeverity: Severity) => {
    if (nextSeverity === Severity.High) return "Best action window: 2–4 weeks before";
    if (nextSeverity === Severity.Medium)
      return "Best action window: 1–2 weeks before";
    return "Best action window: 5–10 days before";
  };

  const handleCreateItem = () => {
    if (!selectedCategory) return;

    const baseDate = date ? new Date(`${date}T09:00:00`) : new Date();
    const watchedItem: WatchedItem = {
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}`,
      title: title.trim(),
      category: selectedCategory,
      severity,
      nextDate: baseDate,
      schedule,
      regretRisk: getRegretRisk(severity),
      actionWindow: getActionWindow(severity),
      status: ItemStatus.Active,
      createdAt: new Date(),
      notes: notes.trim() || undefined,
      reminders,
      customInterval:
        schedule === Schedule.Custom &&
        customMode === CustomScheduleMode.Interval
          ? { value: customIntervalValue, unit: customIntervalUnit }
          : undefined,
      customDates:
        schedule === Schedule.Custom && customMode === CustomScheduleMode.Dates
          ? customDates
          : undefined,
    };

    addItem(watchedItem);
    toast({
      title: "Item added",
      description: "Sentinel is now tracking this deadline.",
    });
    setDone(true);
  };

  if (done) {
    return (
      <div className="py-20 flex flex-col items-center text-center space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: SENTINEL_EASE }}
          className="w-20 h-20 rounded-full bg-sentinel-accent-cyan/15 flex items-center justify-center animate-sentinel-glow-pulse"
        >
          <Eye className="h-8 w-8 text-sentinel-accent-cyan" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="space-y-2"
        >
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Sentinel is watching this now.
          </h2>
          <p className="text-muted-foreground text-sm">{title}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            variant="glass"
            onClick={() => navigate("/dashboard")}
            className="mt-4"
          >
            Back to Command Center
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Back button */}
      <button
        onClick={() => (step > 0 ? setStep(step - 1) : navigate("/dashboard"))}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
      >
        <ArrowLeft className="h-4 w-4" />
        {step > 0 ? "Back" : "Cancel"}
      </button>

      {/* Progress */}
      <div className="space-y-3">
        <div className="flex gap-2">
          {ADD_ITEM_STEPS.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1 flex-1 rounded-full transition-all duration-500",
                i <= step ? "bg-sentinel-accent-cyan" : "bg-sentinel-surface",
              )}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground uppercase tracking-widest">
          Step {step + 1} of {ADD_ITEM_STEPS.length}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.35, ease: SENTINEL_EASE }}
          className="space-y-6"
        >
          {/* Step 0: What to watch */}
          {step === 0 && (
            <>
              <div className="space-y-2">
                <h2 className="font-display text-xl sm:text-2xl font-semibold text-foreground">
                  What should Sentinel watch?
                </h2>
                <p className="text-sm text-muted-foreground">
                  Give it a name and pick a category.
                </p>
              </div>
              <div className="space-y-4">
                <Input
                  placeholder="e.g., Renew car insurance"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="glass-surface border-sentinel-border bg-transparent text-foreground placeholder:text-muted-foreground h-12 text-base"
                />
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {DEFAULT_CATEGORIES.map((cat) => {
                    const Icon = CATEGORY_ICONS[cat.icon];
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setCategoryId(cat.id)}
                        className={cn(
                          "glass-surface rounded-xl p-3 flex flex-col items-center gap-2 transition-all duration-300 text-center",
                          categoryId === cat.id
                            ? "border-sentinel-accent-cyan/40 bg-sentinel-accent-cyan/10"
                            : "hover:border-sentinel-border",
                        )}
                      >
                        <Icon className="h-5 w-5 text-sentinel-accent-cyan" />
                        <span className="text-xs font-medium text-foreground">
                          {cat.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* Step 1: When it matters */}
          {step === 1 && (
            <>
              <div className="space-y-2">
                <h2 className="font-display text-xl sm:text-2xl font-semibold text-foreground">
                  When does it matter?
                </h2>
                <p className="text-sm text-muted-foreground">
                  Set the schedule and next due date.
                </p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SCHEDULE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSchedule(opt.value)}
                      className={cn(
                        "glass-surface rounded-xl p-3 text-left transition-all duration-300",
                        schedule === opt.value
                          ? "border-sentinel-accent-cyan/40 bg-sentinel-accent-cyan/10"
                          : "",
                      )}
                    >
                      <Calendar className="h-4 w-4 text-sentinel-accent-cyan mb-1" />
                      <p className="text-sm font-medium text-foreground">
                        {opt.label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {opt.desc}
                      </p>
                    </button>
                  ))}
                </div>

                {/* Custom schedule options */}
                {schedule === Schedule.Custom && (
                  <div className="glass-surface rounded-xl p-4 space-y-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          setCustomMode(CustomScheduleMode.Interval)
                        }
                        className={cn(
                          "flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                          customMode === CustomScheduleMode.Interval
                            ? "bg-sentinel-accent-cyan/15 text-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        Repeat interval
                      </button>
                      <button
                        onClick={() => setCustomMode(CustomScheduleMode.Dates)}
                        className={cn(
                          "flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                          customMode === CustomScheduleMode.Dates
                            ? "bg-sentinel-accent-cyan/15 text-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        Specific dates
                      </button>
                    </div>

                    {customMode === CustomScheduleMode.Interval && (
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">
                          Every
                        </span>
                        <Input
                          type="number"
                          min={1}
                          max={365}
                          value={customIntervalValue}
                          onChange={(e) =>
                            setCustomIntervalValue(
                              Math.max(1, parseInt(e.target.value) || 1),
                            )
                          }
                          className="w-20 glass-surface border-sentinel-border bg-transparent text-foreground h-10 text-center"
                        />
                        <select
                          value={customIntervalUnit}
                          onChange={(e) =>
                            setCustomIntervalUnit(
                              e.target.value as CustomIntervalUnit,
                            )
                          }
                          className="glass-surface border-sentinel-border bg-transparent text-foreground text-sm rounded-lg px-3 py-2 appearance-none"
                        >
                          <option
                            value={CustomIntervalUnit.Days}
                            className="bg-background"
                          >
                            days
                          </option>
                          <option
                            value={CustomIntervalUnit.Weeks}
                            className="bg-background"
                          >
                            weeks
                          </option>
                          <option
                            value={CustomIntervalUnit.Months}
                            className="bg-background"
                          >
                            months
                          </option>
                        </select>
                      </div>
                    )}

                    {customMode === CustomScheduleMode.Dates && (
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Input
                            type="date"
                            value={newCustomDate}
                            onChange={(e) => setNewCustomDate(e.target.value)}
                            className="flex-1 glass-surface border-sentinel-border bg-transparent text-foreground h-10"
                          />
                          <Button
                            variant="glass"
                            size="sm"
                            onClick={addCustomDate}
                            disabled={!newCustomDate}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        {customDates.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {customDates.map((d) => (
                              <span
                                key={d}
                                className="inline-flex items-center gap-1.5 glass-surface rounded-full px-3 py-1 text-xs text-foreground"
                              >
                                {new Date(d + "T00:00").toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  },
                                )}
                                <button
                                  onClick={() => removeCustomDate(d)}
                                  className="text-muted-foreground hover:text-destructive transition-colors"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                        {customDates.length === 0 && (
                          <p className="text-xs text-muted-foreground text-center py-2">
                            Add specific dates when this should be due.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {schedule !== Schedule.Custom && (
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">
                      Next due date
                    </label>
                    <Input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="glass-surface border-sentinel-border bg-transparent text-foreground h-12"
                    />
                  </div>
                )}

                {schedule === Schedule.Custom &&
                  customMode === CustomScheduleMode.Interval && (
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">
                        Starting from
                      </label>
                      <Input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="glass-surface border-sentinel-border bg-transparent text-foreground h-12"
                      />
                    </div>
                  )}

                {getSchedulePreview() && (
                  <div className="glass-surface rounded-xl p-4">
                    <p className="text-sm text-foreground italic">
                      {getSchedulePreview()}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Step 2: What's the risk */}
          {step === 2 && (
            <>
              <div className="space-y-2">
                <h2 className="font-display text-xl sm:text-2xl font-semibold text-foreground">
                  What's the risk?
                </h2>
                <p className="text-sm text-muted-foreground">
                  How bad is it if you forget this?
                </p>
              </div>
              <div className="space-y-3">
                {SEVERITY_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleSeverityChange(opt.value)}
                    className={cn(
                      "glass-surface w-full rounded-xl p-4 text-left flex items-center gap-4 transition-all duration-300",
                      severity === opt.value
                        ? "border-sentinel-accent-cyan/40 bg-sentinel-accent-cyan/10"
                        : "",
                    )}
                  >
                    <SeverityBadge severity={opt.value} />
                    <span className="text-sm text-foreground">{opt.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Step 3: Reminders */}
          {step === 3 && (
            <>
              <div className="space-y-2">
                <h2 className="font-display text-xl sm:text-2xl font-semibold text-foreground">
                  Customize reminders
                </h2>
                <p className="text-sm text-muted-foreground">
                  Adjust when Sentinel should nudge you, or remove reminders you
                  don't need.
                </p>
              </div>

              <div className="space-y-3">
                {reminders.map((reminder, i) => (
                  <div
                    key={i}
                    className="glass-surface rounded-xl p-4 flex items-center gap-3"
                  >
                    <Switch
                      checked={reminder.enabled}
                      onCheckedChange={() => toggleReminder(i)}
                    />
                    <div className="flex-1 flex items-center gap-2">
                      <Input
                        type="number"
                        min={1}
                        max={365}
                        value={reminder.days}
                        onChange={(e) =>
                          updateReminderDays(
                            i,
                            Math.max(1, parseInt(e.target.value) || 1),
                          )
                        }
                        className="w-20 glass-surface border-sentinel-border bg-transparent text-foreground h-9 text-center text-sm"
                        disabled={!reminder.enabled}
                      />
                      <span
                        className={cn(
                          "text-sm",
                          reminder.enabled
                            ? "text-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        days before
                      </span>
                    </div>
                    <button
                      onClick={() => removeReminder(i)}
                      className="text-muted-foreground hover:text-destructive transition-colors p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}

                <button
                  onClick={addReminder}
                  className="glass-surface w-full rounded-xl p-3 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  <Plus className="h-4 w-4" />
                  Add reminder
                </button>
              </div>

              {reminders.length === 0 && (
                <div className="glass-surface rounded-xl p-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    No reminders set. Sentinel will still track this item
                    silently.
                  </p>
                </div>
              )}

              {reminders.filter((r) => r.enabled).length > 0 && (
                <div className="glass-surface rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-sentinel-accent-cyan" />
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">
                      Reminder plan
                    </span>
                  </div>
                  <p className="text-sm text-foreground">
                    {reminders.filter((r) => r.enabled).length} reminder
                    {reminders.filter((r) => r.enabled).length !== 1 ? "s" : ""}
                    :{" "}
                    {reminders
                      .filter((r) => r.enabled)
                      .sort((a, b) => b.days - a.days)
                      .map(
                        (r) => `${r.days} day${r.days !== 1 ? "s" : ""} before`,
                      )
                      .join(", ")}
                    .
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Notes (optional)</label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add context, account details, or anything your future self should know."
                  className="glass-surface border-sentinel-border bg-transparent text-foreground min-h-24"
                />
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-end pt-4">
        {step < ADD_ITEM_STEPS.length - 1 ? (
          <Button
            variant="glass-primary"
            onClick={() => setStep(step + 1)}
            disabled={!canAdvance}
            className="gap-2"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            variant="glass-primary"
            onClick={handleCreateItem}
            className="gap-2"
          >
            <Check className="h-4 w-4" />
            Start Watching
          </Button>
        )}
      </div>
    </div>
  );
}
