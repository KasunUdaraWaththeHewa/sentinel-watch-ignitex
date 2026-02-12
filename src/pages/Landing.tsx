import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  Eye,
  Shield,
  Bell,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Zap,
  Clock,
  ChevronRight,
  Star,
  TrendingUp,
  Users,
  BarChart3,
  Layers,
  ArrowUpRight,
  Sparkles,
  Target,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useEffect, useState } from "react";

const features = [
  {
    icon: Eye,
    title: "Always Watching",
    description:
      "Sentinel monitors your recurring responsibilities silently — renewals, deadlines, obligations — so nothing slips through.",
    gradient: "from-sentinel-accent-cyan/20 to-sentinel-accent-cyan/5",
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    description:
      "Get nudged at the right time, not too early, not too late. Action windows tuned to each item's urgency.",
    gradient: "from-sentinel-accent-violet/20 to-sentinel-accent-violet/5",
  },
  {
    icon: Shield,
    title: "Regret Prevention",
    description:
      "Every watched item carries a Regret Risk score. See the real cost of forgetting before it happens.",
    gradient: "from-sentinel-severity-high/20 to-sentinel-severity-high/5",
  },
  {
    icon: Calendar,
    title: "Flexible Schedules",
    description:
      "One-time, daily, monthly, yearly, quarterly, or fully custom. Sentinel adapts to how life actually works.",
    gradient: "from-sentinel-severity-medium/20 to-sentinel-severity-medium/5",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Add what matters",
    description: "Insurance, licenses, subscriptions — anything you can't afford to forget.",
    icon: Target,
  },
  {
    step: "02",
    title: "Set your schedule",
    description: "Choose from preset intervals or create fully custom recurring patterns.",
    icon: Calendar,
  },
  {
    step: "03",
    title: "Sentinel watches",
    description: "Get intelligent reminders with regret-risk scoring before each deadline.",
    icon: Eye,
  },
];

const stats = [
  { value: 12000, suffix: "+", label: "Items Watched", icon: Eye },
  { value: 98, suffix: "%", label: "On-Time Rate", icon: TrendingUp },
  { value: 3500, suffix: "+", label: "Happy Users", icon: Users },
  { value: 0, suffix: "$", label: "To Start", icon: Sparkles, prefix: true },
];

const benefits = [
  "Track unlimited recurring responsibilities",
  "Custom categories for your life & business",
  "Severity & regret-risk scoring",
  "Multi-device — works beautifully on mobile",
  "Dark & light mode support",
  "Weekly Sentinel Briefing digest",
];

const testimonials = [
  {
    quote: "I forgot to renew my domain name twice. Sentinel made sure it never happened again.",
    name: "Alex K.",
    role: "Indie Maker",
    avatar: "AK",
  },
  {
    quote: "My team uses it to track compliance deadlines. The regret-risk feature is brilliant.",
    name: "Priya M.",
    role: "Operations Lead",
    avatar: "PM",
  },
  {
    quote: "Finally, something that watches the boring stuff so I can focus on building.",
    name: "Jordan T.",
    role: "Founder",
    avatar: "JT",
  },
];

const pricingPreview = [
  { name: "Free", price: "$0", desc: "10 items · Basic reminders" },
  { name: "Plus", price: "$5", desc: "50 items · Custom schedules", popular: false },
  { name: "Pro", price: "$12", desc: "Unlimited · AI reminders", popular: true },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

function AnimatedCounter({ value, suffix = "", prefix = false }: { value: number; suffix?: string; prefix?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix && suffix}{count.toLocaleString()}{!prefix && suffix}
    </span>
  );
}

const Landing = () => {
  return (
    <div className="min-h-screen bg-background bg-noise overflow-hidden">
      {/* Nav */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/60 border-b border-sentinel-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-sentinel-accent-cyan/15 flex items-center justify-center sentinel-glow">
              <Eye className="h-4 w-4 text-sentinel-accent-cyan" />
            </div>
            <span className="font-display font-semibold text-lg tracking-tight text-foreground">
              Sentinel
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How it works</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          </nav>
          <nav className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5"
            >
              Sign in
            </Link>
            <Link to="/register">
              <Button className="h-9 px-5 bg-sentinel-accent-cyan text-background text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
                Get Started
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-20 sm:py-28 lg:py-36 px-4">
        {/* Ambient glows */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-sentinel-accent-cyan/5 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-sentinel-accent-violet/5 blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-surface text-xs sm:text-sm font-medium text-muted-foreground">
              <Zap className="h-3.5 w-3.5 text-sentinel-accent-cyan" />
              Your mental-load command center
              <ArrowUpRight className="h-3 w-3 text-sentinel-accent-cyan" />
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-foreground tracking-tight leading-[1.08]">
              Stop remembering.
              <br />
              <span className="bg-gradient-to-r from-sentinel-accent-cyan to-sentinel-accent-violet bg-clip-text text-transparent">
                Start watching.
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Sentinel watches the things you can't afford to forget — renewals,
              deadlines, obligations — and alerts you before it's too late.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link to="/register">
                <Button className="h-12 sm:h-13 px-8 bg-sentinel-accent-cyan text-background text-base font-semibold rounded-xl hover:opacity-90 transition-all gap-2 w-full sm:w-auto shadow-lg shadow-sentinel-accent-cyan/20">
                  Start Watching Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button
                  variant="outline"
                  className="h-12 sm:h-13 px-8 text-base font-medium rounded-xl gap-2 w-full sm:w-auto border-sentinel-border hover:bg-sentinel-surface"
                >
                  See Demo
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <p className="text-xs text-muted-foreground pt-1">
              Free forever · No credit card · 10 watched items included
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="px-4 pb-16 sm:pb-24">
        <motion.div
          {...fadeUp}
          className="max-w-5xl mx-auto"
        >
          <div className="glass-surface rounded-2xl sm:rounded-3xl p-2 sm:p-3 sentinel-glow">
            <div className="rounded-xl sm:rounded-2xl bg-background/60 p-4 sm:p-8 space-y-4">
              {/* Mock top bar */}
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-sentinel-severity-high/60" />
                <div className="w-3 h-3 rounded-full bg-sentinel-severity-medium/60" />
                <div className="w-3 h-3 rounded-full bg-sentinel-accent-cyan/40" />
                <div className="flex-1" />
                <div className="h-2 w-16 rounded-full bg-muted/40" />
                <div className="h-2 w-24 rounded-full bg-muted/30" />
              </div>
              {/* Mock stats */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {[
                  { label: "Watching", value: "8", color: "text-foreground" },
                  { label: "Urgent", value: "2", color: "text-sentinel-severity-high" },
                  { label: "This Week", value: "3", color: "text-foreground" },
                ].map((s) => (
                  <div key={s.label} className="glass-surface rounded-lg p-2.5 sm:p-3 text-center">
                    <p className={`text-lg sm:text-xl font-display font-bold ${s.color}`}>{s.value}</p>
                    <p className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-wider">{s.label}</p>
                  </div>
                ))}
              </div>
              {/* Mock items */}
              <div className="space-y-2">
                {[
                  { label: "Domain Renewal", severity: "high", days: "3 days", cat: "Documents" },
                  { label: "Insurance Policy", severity: "medium", days: "12 days", cat: "Insurance" },
                  { label: "License Renewal", severity: "low", days: "28 days", cat: "Legal" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="glass-surface rounded-xl px-4 py-3 flex items-center gap-3"
                  >
                    <div
                      className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                        item.severity === "high"
                          ? "bg-sentinel-severity-high"
                          : item.severity === "medium"
                          ? "bg-sentinel-severity-medium"
                          : "bg-sentinel-severity-low"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium text-foreground block truncate">{item.label}</span>
                      <span className="text-[10px] text-muted-foreground">{item.cat}</span>
                    </div>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 flex-shrink-0">
                      <Clock className="h-3 w-3" />
                      {item.days}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="px-4 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-surface rounded-2xl p-5 sm:p-6 text-center space-y-2"
                >
                  <Icon className="h-5 w-5 text-sentinel-accent-cyan mx-auto" />
                  <p className="text-2xl sm:text-3xl font-display font-bold text-foreground">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                  </p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-4 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12 sm:mb-16">
            <p className="text-xs font-medium uppercase tracking-widest text-sentinel-accent-cyan mb-3">Features</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground tracking-tight">
              Built to prevent regret
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-base sm:text-lg">
              Every feature is designed around one goal: make sure you never miss the things that matter.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                className="glass-surface-hover rounded-2xl p-6 sm:p-8 space-y-4 group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center transition-transform duration-500 group-hover:scale-110`}>
                  <feature.icon className="h-6 w-6 text-sentinel-accent-cyan" />
                </div>
                <h3 className="text-lg sm:text-xl font-display font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-4 py-16 sm:py-24">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12 sm:mb-16">
            <p className="text-xs font-medium uppercase tracking-widest text-sentinel-accent-cyan mb-3">How It Works</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground tracking-tight">
              Three steps to peace of mind
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {howItWorks.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="relative"
                >
                  <div className="glass-surface rounded-2xl p-6 sm:p-8 space-y-4 h-full">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl sm:text-4xl font-display font-bold text-sentinel-accent-cyan/20">{step.step}</span>
                      <div className="w-10 h-10 rounded-xl bg-sentinel-accent-cyan/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-sentinel-accent-cyan" />
                      </div>
                    </div>
                    <h3 className="text-lg font-display font-semibold text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                  {i < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 text-center">
                      <ChevronRight className="h-5 w-5 text-muted-foreground/30" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-4 py-16 sm:py-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            {...fadeUp}
            className="glass-surface rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row gap-10 lg:gap-16 items-center"
          >
            <div className="flex-1 space-y-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-sentinel-accent-cyan mb-3">Why Sentinel</p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-foreground tracking-tight">
                  Everything you need to stop worrying
                </h2>
              </div>
              <ul className="space-y-3.5">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-sm sm:text-base text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-sentinel-accent-cyan flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-shrink-0">
              <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-sentinel-accent-cyan/5 flex items-center justify-center relative">
                <div className="absolute inset-4 rounded-full bg-sentinel-accent-cyan/8 animate-sentinel-glow-pulse" />
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-sentinel-accent-cyan/10 flex items-center justify-center relative z-10">
                  <Eye className="h-12 w-12 sm:h-16 sm:w-16 text-sentinel-accent-cyan/60" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-xs font-medium uppercase tracking-widest text-sentinel-accent-cyan mb-3">Testimonials</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground tracking-tight">
              Trusted by people who can't afford to forget
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                className="glass-surface rounded-2xl p-6 sm:p-7 space-y-5"
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, si) => (
                    <Star key={si} className="h-3.5 w-3.5 text-sentinel-accent-cyan fill-sentinel-accent-cyan" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-foreground leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-sentinel-accent-cyan/15 flex items-center justify-center text-xs font-semibold text-sentinel-accent-cyan">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section id="pricing" className="px-4 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-xs font-medium uppercase tracking-widest text-sentinel-accent-cyan mb-3">Pricing</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground tracking-tight">
              Simple, transparent pricing
            </h2>
            <p className="text-muted-foreground mt-3 max-w-md mx-auto">
              Start free. Upgrade when you need more power.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-4">
            {pricingPreview.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`glass-surface rounded-2xl p-6 text-center space-y-3 relative ${plan.popular ? "border-sentinel-accent-cyan/30 sentinel-glow" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sentinel-accent-cyan text-background text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    Popular
                  </div>
                )}
                <h3 className="font-display font-semibold text-lg text-foreground">{plan.name}</h3>
                <p className="text-3xl font-display font-bold text-foreground">{plan.price}<span className="text-sm text-muted-foreground font-normal">/mo</span></p>
                <p className="text-xs text-muted-foreground">{plan.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="text-center mt-8">
            <Link to="/billing">
              <Button variant="outline" className="gap-2 border-sentinel-border hover:bg-sentinel-surface">
                See full plan comparison
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 sm:py-24">
        <motion.div
          {...fadeUp}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-surface rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-sentinel-accent-cyan/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-sentinel-accent-cyan/10 mx-auto flex items-center justify-center sentinel-glow animate-sentinel-glow-pulse">
                <Eye className="h-8 w-8 text-sentinel-accent-cyan" />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground tracking-tight">
                Ready to stop carrying it all<br className="hidden sm:block" /> in your head?
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto text-base sm:text-lg">
                Join thousands who've offloaded their mental load to Sentinel. Free to start, no credit card required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link to="/register">
                  <Button className="h-12 px-10 bg-sentinel-accent-cyan text-background text-base font-semibold rounded-xl hover:opacity-90 transition-opacity gap-2 shadow-lg shadow-sentinel-accent-cyan/20">
                    Get Started Free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-sentinel-border py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-sentinel-accent-cyan/15 flex items-center justify-center">
              <Eye className="h-3.5 w-3.5 text-sentinel-accent-cyan" />
            </div>
            <span className="text-sm font-display font-semibold text-foreground">Sentinel</span>
          </div>
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <Link to="/billing" className="hover:text-foreground transition-colors">Pricing</Link>
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          </div>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Sentinel. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
