import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Calendar, AlertTriangle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { defaultCategories, CATEGORY_ICONS, type Severity, type Schedule } from "@/lib/mock-data";
import { SeverityBadge } from "./SeverityBadge";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const scheduleOptions: { value: Schedule; label: string; desc: string }[] = [
  { value: "one-time", label: "One-time", desc: "Just once" },
  { value: "monthly", label: "Monthly", desc: "Every month" },
  { value: "yearly", label: "Yearly", desc: "Every year" },
  { value: "custom", label: "Custom", desc: "Set interval" },
];

const severityOptions: { value: Severity; label: string }[] = [
  { value: "low", label: "Low — easy to recover" },
  { value: "medium", label: "Medium — inconvenient if missed" },
  { value: "high", label: "High — costly or irreversible" },
];

const steps = ["What to watch", "When it matters", "What's the risk"];

export function AddWatchedItem() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [schedule, setSchedule] = useState<Schedule>("yearly");
  const [date, setDate] = useState("");
  const [severity, setSeverity] = useState<Severity>("medium");
  const [done, setDone] = useState(false);

  const selectedCategory = defaultCategories.find((c) => c.id === categoryId);
  const canAdvance = step === 0 ? title.trim() && categoryId : step === 1 ? date : true;

  const schedulePreview = selectedCategory
    ? `Sentinel will watch this ${schedule === "one-time" ? "once" : `every ${schedule === "monthly" ? "month" : "year"}`}${date ? ` starting ${new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric" })}` : ""}.`
    : "";

  if (done) {
    return (
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-20 flex flex-col items-center text-center space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
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
          <h2 className="font-display text-2xl font-semibold text-foreground">Sentinel is watching this now.</h2>
          <p className="text-muted-foreground text-sm">{title}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button variant="glass" onClick={() => navigate("/")} className="mt-4">
            Back to Command Center
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-8 pb-28 md:pb-12 space-y-8">
      {/* Back button */}
      <button onClick={() => (step > 0 ? setStep(step - 1) : navigate("/"))} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
        <ArrowLeft className="h-4 w-4" />
        {step > 0 ? "Back" : "Cancel"}
      </button>

      {/* Progress */}
      <div className="space-y-3">
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1 flex-1 rounded-full transition-all duration-500",
                i <= step ? "bg-sentinel-accent-cyan" : "bg-sentinel-surface"
              )}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground uppercase tracking-widest">
          Step {step + 1} of {steps.length}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="space-y-6"
        >
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
                  {defaultCategories.map((cat) => {
                    const Icon = CATEGORY_ICONS[cat.icon];
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setCategoryId(cat.id)}
                        className={cn(
                          "glass-surface rounded-xl p-3 flex flex-col items-center gap-2 transition-all duration-300 text-center",
                          categoryId === cat.id
                            ? "border-sentinel-accent-cyan/40 bg-sentinel-accent-cyan/10"
                            : "hover:border-sentinel-border"
                        )}
                      >
                        <Icon className="h-5 w-5 text-sentinel-accent-cyan" />
                        <span className="text-xs font-medium text-foreground">{cat.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

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
                <div className="grid grid-cols-2 gap-2">
                  {scheduleOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSchedule(opt.value)}
                      className={cn(
                        "glass-surface rounded-xl p-3 text-left transition-all duration-300",
                        schedule === opt.value
                          ? "border-sentinel-accent-cyan/40 bg-sentinel-accent-cyan/10"
                          : ""
                      )}
                    >
                      <Calendar className="h-4 w-4 text-sentinel-accent-cyan mb-1" />
                      <p className="text-sm font-medium text-foreground">{opt.label}</p>
                      <p className="text-xs text-muted-foreground">{opt.desc}</p>
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Next due date</label>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="glass-surface border-sentinel-border bg-transparent text-foreground h-12"
                  />
                </div>

                {schedulePreview && (
                  <div className="glass-surface rounded-xl p-4">
                    <p className="text-sm text-foreground italic">{schedulePreview}</p>
                  </div>
                )}
              </div>
            </>
          )}

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
                {severityOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSeverity(opt.value)}
                    className={cn(
                      "glass-surface w-full rounded-xl p-4 text-left flex items-center gap-4 transition-all duration-300",
                      severity === opt.value
                        ? "border-sentinel-accent-cyan/40 bg-sentinel-accent-cyan/10"
                        : ""
                    )}
                  >
                    <SeverityBadge severity={opt.value} />
                    <span className="text-sm text-foreground">{opt.label}</span>
                  </button>
                ))}
              </div>

              <div className="glass-surface rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-sentinel-accent-cyan" />
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">Reminder plan</span>
                </div>
                <p className="text-sm text-foreground">
                  {severity === "high"
                    ? "3 reminders: 30 days, 7 days, and 1 day before."
                    : severity === "medium"
                    ? "2 reminders: 14 days and 3 days before."
                    : "1 reminder: 7 days before."}
                </p>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-end pt-4">
        {step < 2 ? (
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
            onClick={() => setDone(true)}
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