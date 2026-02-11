import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Eye,
    title: "Always Watching",
    description:
      "Sentinel monitors your recurring responsibilities silently — renewals, deadlines, obligations — so nothing slips through.",
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    description:
      "Get nudged at the right time, not too early, not too late. Action windows tuned to each item's urgency.",
  },
  {
    icon: Shield,
    title: "Regret Prevention",
    description:
      "Every watched item carries a Regret Risk score. See the real cost of forgetting before it happens.",
  },
  {
    icon: Calendar,
    title: "Flexible Schedules",
    description:
      "One-time, daily, monthly, yearly, quarterly, or fully custom. Sentinel adapts to how life actually works.",
  },
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
    quote:
      "I forgot to renew my domain name twice. Sentinel made sure it never happened again.",
    name: "Alex K.",
    role: "Indie Maker",
  },
  {
    quote:
      "My team uses it to track compliance deadlines. The regret-risk feature is brilliant.",
    name: "Priya M.",
    role: "Operations Lead",
  },
  {
    quote:
      "Finally, something that watches the boring stuff so I can focus on building.",
    name: "Jordan T.",
    role: "Founder",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

const stagger = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.12 },
};

const Landing = () => {
  return (
    <div className="min-h-screen bg-background bg-noise overflow-hidden">
      {/* Nav */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/60 border-b border-sentinel-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-14 px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-sentinel-accent-cyan/15 flex items-center justify-center sentinel-glow">
              <Eye className="h-4 w-4 text-sentinel-accent-cyan" />
            </div>
            <span className="font-display font-semibold text-base tracking-tight text-foreground">
              Sentinel
            </span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5"
            >
              Sign in
            </Link>
            <Link to="/register">
              <Button className="h-9 px-4 bg-sentinel-accent-cyan text-background text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
                Get Started
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-20 sm:py-32 px-4">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-sentinel-accent-cyan/5 blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-surface text-xs sm:text-sm font-medium text-muted-foreground">
              <Zap className="h-3.5 w-3.5 text-sentinel-accent-cyan" />
              Your mental-load command center
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-foreground tracking-tight leading-[1.1]">
              Stop remembering.
              <br />
              <span className="text-sentinel-accent-cyan">Start watching.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Sentinel watches the things you can't afford to forget — renewals,
              deadlines, obligations — and alerts you before it's too late.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link to="/register">
                <Button className="h-12 px-8 bg-sentinel-accent-cyan text-background text-base font-medium rounded-xl hover:opacity-90 transition-opacity gap-2 w-full sm:w-auto">
                  Start Watching Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button
                  variant="glass"
                  className="h-12 px-8 text-base font-medium rounded-xl gap-2 w-full sm:w-auto"
                >
                  See Demo
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <p className="text-xs text-muted-foreground pt-2">
              Free plan · No credit card required · 10 watched items
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="px-4 pb-20 sm:pb-28">
        <motion.div
          {...fadeUp}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-surface rounded-2xl sm:rounded-3xl p-3 sm:p-4 sentinel-glow">
            <div className="rounded-xl sm:rounded-2xl bg-background/60 p-4 sm:p-8 space-y-4">
              {/* Mock top bar */}
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-sentinel-severity-high/60" />
                <div className="w-3 h-3 rounded-full bg-sentinel-severity-medium/60" />
                <div className="w-3 h-3 rounded-full bg-sentinel-accent-cyan/40" />
                <div className="flex-1" />
                <div className="h-2 w-20 rounded-full bg-muted/40" />
              </div>
              {/* Mock items */}
              <div className="space-y-2.5">
                {[
                  { label: "Domain Renewal", severity: "high", days: "3 days" },
                  { label: "Insurance Policy", severity: "medium", days: "12 days" },
                  { label: "License Renewal", severity: "low", days: "28 days" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="glass-surface rounded-xl px-4 py-3 flex items-center gap-3"
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        item.severity === "high"
                          ? "bg-sentinel-severity-high"
                          : item.severity === "medium"
                          ? "bg-sentinel-severity-medium"
                          : "bg-sentinel-severity-low"
                      }`}
                    />
                    <span className="text-sm font-medium text-foreground flex-1">
                      {item.label}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
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

      {/* Features */}
      <section className="px-4 py-20 sm:py-28">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground tracking-tight">
              Built to prevent regret
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Every feature is designed around one goal: make sure you never miss
              the things that matter.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94] as const,
                }}
                className="glass-surface-hover rounded-2xl p-6 sm:p-8 space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-sentinel-accent-cyan/10 flex items-center justify-center">
                  <feature.icon className="h-5 w-5 text-sentinel-accent-cyan" />
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits checklist */}
      <section className="px-4 py-20 sm:py-28">
        <div className="max-w-4xl mx-auto">
          <motion.div
            {...fadeUp}
            className="glass-surface rounded-2xl sm:rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row gap-8 md:gap-12 items-center"
          >
            <div className="flex-1 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground tracking-tight">
                Everything you need to stop worrying
              </h2>
              <ul className="space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-sentinel-accent-cyan flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-shrink-0">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-sentinel-accent-cyan/5 flex items-center justify-center relative">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-sentinel-accent-cyan/8 flex items-center justify-center animate-sentinel-glow-pulse">
                  <Eye className="h-12 w-12 sm:h-16 sm:w-16 text-sentinel-accent-cyan/60" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-20 sm:py-28">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
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
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94] as const,
                }}
                className="glass-surface rounded-2xl p-6 space-y-4"
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, si) => (
                    <Star
                      key={si}
                      className="h-3.5 w-3.5 text-sentinel-accent-cyan fill-sentinel-accent-cyan"
                    />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  "{t.quote}"
                </p>
                <div>
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 sm:py-28">
        <motion.div
          {...fadeUp}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-sentinel-accent-cyan/10 mx-auto flex items-center justify-center sentinel-glow animate-sentinel-glow-pulse">
            <Eye className="h-8 w-8 text-sentinel-accent-cyan" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground tracking-tight">
            Ready to stop carrying it all in your head?
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Join thousands who've offloaded their mental load to Sentinel. Free
            to start, no credit card required.
          </p>
          <Link to="/register">
            <Button className="h-12 px-10 bg-sentinel-accent-cyan text-background text-base font-medium rounded-xl hover:opacity-90 transition-opacity gap-2">
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-sentinel-border py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-sentinel-accent-cyan/15 flex items-center justify-center">
              <Eye className="h-3 w-3 text-sentinel-accent-cyan" />
            </div>
            <span className="text-sm font-display font-medium text-foreground">
              Sentinel
            </span>
          </div>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <Link to="/billing" className="hover:text-foreground transition-colors">
              Pricing
            </Link>
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Sentinel
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
