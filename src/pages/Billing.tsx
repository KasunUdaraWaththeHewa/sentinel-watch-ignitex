import { useState } from "react";
import { AppLayout } from "@/components/sentinel/AppLayout";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BILLING_PLANS } from "@/lib/constants";

type BillingCycle = "monthly" | "yearly";

const Billing = () => {
  const [cycle, setCycle] = useState<BillingCycle>("yearly");

  return (
    <AppLayout title="Plans & Pricing" subtitle="Choose the plan that fits your needs. Upgrade or downgrade anytime.">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex justify-center">
        <div className="glass-surface rounded-full p-1 flex gap-1">
          <button onClick={() => setCycle("monthly")} className={cn("px-4 py-2 rounded-full text-sm font-medium transition-all duration-300", cycle === "monthly" ? "bg-sentinel-accent-cyan/15 text-foreground" : "text-muted-foreground hover:text-foreground")}>Monthly</button>
          <button onClick={() => setCycle("yearly")} className={cn("px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1.5", cycle === "yearly" ? "bg-sentinel-accent-cyan/15 text-foreground" : "text-muted-foreground hover:text-foreground")}>
            Yearly
            <span className="text-[10px] bg-sentinel-accent-cyan/20 text-sentinel-accent-cyan px-1.5 py-0.5 rounded-full">Save 25%</span>
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {BILLING_PLANS.map((plan, i) => (
          <motion.div key={plan.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }} className={cn("glass-surface rounded-2xl p-6 flex flex-col relative overflow-hidden", plan.popular && "border-sentinel-accent-cyan/30 sentinel-glow")}>
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-sentinel-accent-cyan/15 text-sentinel-accent-cyan text-[10px] font-medium uppercase tracking-widest px-3 py-1 rounded-bl-xl flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> Popular
              </div>
            )}
            <div className="space-y-1 mb-5">
              <h3 className="font-display font-semibold text-lg text-foreground">{plan.name}</h3>
              <p className="text-xs text-muted-foreground">{plan.desc}</p>
            </div>
            <div className="mb-6">
              <span className="text-3xl font-display font-bold text-foreground">${cycle === "monthly" ? plan.monthly : Math.round(plan.yearly / 12)}</span>
              <span className="text-sm text-muted-foreground">/mo</span>
              {cycle === "yearly" && plan.yearly > 0 && <p className="text-xs text-muted-foreground mt-1">${plan.yearly}/year billed annually</p>}
            </div>
            <ul className="space-y-2.5 flex-1 mb-6">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                  <Check className="h-4 w-4 text-sentinel-accent-cyan flex-shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button variant={plan.popular ? "glass-primary" : "glass"} className="w-full" disabled={plan.id === "free"}>{plan.cta}</Button>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center">
        <p className="text-xs text-muted-foreground max-w-sm mx-auto">All plans include a 14-day free trial of Pro features. Cancel anytime, no questions asked.</p>
      </motion.div>
    </AppLayout>
  );
};

export default Billing;
