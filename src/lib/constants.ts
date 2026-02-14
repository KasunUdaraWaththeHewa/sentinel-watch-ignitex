// ============================================
// Sentinel – Constants & Configuration
// ============================================

import {
  Shield,
  FileText,
  Home as HomeIcon,
  Car,
  Heart,
  CreditCard,
  Briefcase,
  Scale,
  Zap,
  Eye,
  Bell,
  Calendar,
  Target,
  TrendingUp,
  Users,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Severity,
  Schedule,
  type Category,
  type Feature,
  type HowItWorksStep,
  type Stat,
  type Testimonial,
  type PricingPlan,
  type PricingPreview,
  type ScheduleOption,
  type SeverityOption,
  type Reminder,
} from "@/types/sentinel";

// ---- Category Icons ----

export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  insurance: Shield,
  medical: Heart,
  home: HomeIcon,
  auto: Car,
  finance: CreditCard,
  legal: Scale,
  documents: FileText,
  work: Briefcase,
  utilities: Zap,
};

// ---- Default Categories ----

export const DEFAULT_CATEGORIES: Category[] = [
  {
    id: "insurance",
    name: "Insurance",
    icon: "insurance",
    color: "cyan",
    count: 3,
  },
  {
    id: "medical",
    name: "Medical",
    icon: "medical",
    color: "violet",
    count: 2,
  },
  { id: "home", name: "Home", icon: "home", color: "cyan", count: 1 },
  { id: "auto", name: "Auto", icon: "auto", color: "cyan", count: 2 },
  {
    id: "finance",
    name: "Finance",
    icon: "finance",
    color: "violet",
    count: 1,
  },
  { id: "legal", name: "Legal", icon: "legal", color: "cyan", count: 1 },
  {
    id: "documents",
    name: "Documents",
    icon: "documents",
    color: "violet",
    count: 2,
  },
];

export const DEFAULT_CATEGORY_IDS = new Set(
  DEFAULT_CATEGORIES.map((c) => c.id),
);

// ---- Schedule Options ----

export const SCHEDULE_OPTIONS: ScheduleOption[] = [
  { value: Schedule.OneTime, label: "One-time", desc: "Just once" },
  { value: Schedule.Daily, label: "Daily", desc: "Every day" },
  { value: Schedule.Monthly, label: "Monthly", desc: "Every month" },
  { value: Schedule.Quarterly, label: "Quarterly", desc: "Every 3 months" },
  { value: Schedule.Yearly, label: "Yearly", desc: "Every year" },
  { value: Schedule.Custom, label: "Custom", desc: "Your interval" },
];

export const SCHEDULE_LABELS: Record<Schedule, string> = {
  [Schedule.OneTime]: "One-time event",
  [Schedule.Daily]: "Repeats daily",
  [Schedule.Monthly]: "Repeats monthly",
  [Schedule.Quarterly]: "Repeats quarterly",
  [Schedule.Yearly]: "Repeats yearly",
  [Schedule.Custom]: "Custom schedule",
};

export const SCHEDULE_INTERVAL_DAYS: Record<Schedule, number> = {
  [Schedule.OneTime]: 0,
  [Schedule.Daily]: 1,
  [Schedule.Monthly]: 30,
  [Schedule.Quarterly]: 90,
  [Schedule.Yearly]: 365,
  [Schedule.Custom]: 30,
};

export const SCHEDULE_FREQUENCY_LABELS: Record<Schedule, string> = {
  [Schedule.OneTime]: "once",
  [Schedule.Daily]: "every day",
  [Schedule.Monthly]: "every month",
  [Schedule.Quarterly]: "every quarter",
  [Schedule.Yearly]: "every year",
  [Schedule.Custom]: "on a custom schedule",
};

// ---- Severity Options ----

export const SEVERITY_OPTIONS: SeverityOption[] = [
  { value: Severity.Low, label: "Low — easy to recover" },
  { value: Severity.Medium, label: "Medium — inconvenient if missed" },
  { value: Severity.High, label: "High — costly or irreversible" },
];

// ---- Category Colors ----

export const AVAILABLE_COLORS = [
  { name: "cyan", class: "bg-sentinel-accent-cyan" },
  { name: "violet", class: "bg-sentinel-accent-violet" },
  { name: "amber", class: "bg-sentinel-severity-medium" },
  { name: "red", class: "bg-sentinel-severity-high" },
  { name: "blue", class: "bg-sentinel-severity-low" },
] as const;

// ---- Reminders ----

export const getDefaultReminders = (severity: Severity): Reminder[] => {
  switch (severity) {
    case Severity.High:
      return [
        { enabled: true, days: 30 },
        { enabled: true, days: 7 },
        { enabled: true, days: 1 },
      ];
    case Severity.Medium:
      return [
        { enabled: true, days: 14 },
        { enabled: true, days: 3 },
      ];
    case Severity.Low:
    default:
      return [{ enabled: true, days: 7 }];
  }
};

// ---- Timezones ----

export const TIMEZONES = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Asia/Tokyo",
  "Asia/Kolkata",
  "Australia/Sydney",
] as const;

// ---- Add Item Steps ----

export const ADD_ITEM_STEPS = [
  "What to watch",
  "When it matters",
  "What's the risk",
  "Reminders",
] as const;

// ---- Theme Options ----

import { Moon, Sun, Monitor } from "lucide-react";

export const THEME_OPTIONS = [
  { value: "dark", label: "Dark", icon: Moon, desc: "Deep graphite" },
  { value: "light", label: "Light", icon: Sun, desc: "Warm off-white" },
  { value: "system", label: "System", icon: Monitor, desc: "Match device" },
] as const;

// ---- Landing Page Data ----

export const LANDING_FEATURES: Feature[] = [
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

export const LANDING_HOW_IT_WORKS: HowItWorksStep[] = [
  {
    step: "01",
    title: "Add what matters",
    description:
      "Insurance, licenses, subscriptions — anything you can't afford to forget.",
    icon: Target,
  },
  {
    step: "02",
    title: "Set your schedule",
    description:
      "Choose from preset intervals or create fully custom recurring patterns.",
    icon: Calendar,
  },
  {
    step: "03",
    title: "Sentinel watches",
    description:
      "Get intelligent reminders with regret-risk scoring before each deadline.",
    icon: Eye,
  },
];

export const LANDING_STATS: Stat[] = [
  { value: 12000, suffix: "+", label: "Items Watched", icon: Eye },
  { value: 98, suffix: "%", label: "On-Time Rate", icon: TrendingUp },
  { value: 3500, suffix: "+", label: "Happy Users", icon: Users },
  { value: 0, suffix: "$", label: "To Start", icon: Sparkles, prefix: true },
];

export const LANDING_BENEFITS = [
  "Track unlimited recurring responsibilities",
  "Custom categories for your life & business",
  "Severity & regret-risk scoring",
  "Multi-device — works beautifully on mobile",
  "Dark & light mode support",
  "Weekly Sentinel Briefing digest",
] as const;

export const LANDING_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I forgot to renew my domain name twice. Sentinel made sure it never happened again.",
    name: "Alex K.",
    role: "Indie Maker",
    avatar: "AK",
  },
  {
    quote:
      "My team uses it to track compliance deadlines. The regret-risk feature is brilliant.",
    name: "Priya M.",
    role: "Operations Lead",
    avatar: "PM",
  },
  {
    quote:
      "Finally, something that watches the boring stuff so I can focus on building.",
    name: "Jordan T.",
    role: "Founder",
    avatar: "JT",
  },
];

export const LANDING_PRICING_PREVIEW: PricingPreview[] = [
  { name: "Free", price: "$0", desc: "10 items · Basic reminders" },
  {
    name: "Plus",
    price: "$5",
    desc: "50 items · Custom schedules",
    popular: false,
  },
  {
    name: "Pro",
    price: "$12",
    desc: "Unlimited · AI reminders",
    popular: true,
  },
];

// ---- Billing Plans ----

export const BILLING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    desc: "Get started with the basics.",
    monthly: 0,
    yearly: 0,
    features: [
      "Up to 10 watched items",
      "Default categories",
      "Basic reminders (email)",
      "Dark & light mode",
    ],
    cta: "Current Plan",
    popular: false,
  },
  {
    id: "plus",
    name: "Plus",
    desc: "For individuals who need more.",
    monthly: 5,
    yearly: 48,
    features: [
      "Up to 50 watched items",
      "Custom categories",
      "Advanced schedules",
      "Push notifications",
      "Quiet hours",
      "Attachments (5 per item)",
    ],
    cta: "Upgrade to Plus",
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    desc: "The full Sentinel experience.",
    monthly: 12,
    yearly: 108,
    features: [
      "Unlimited watched items",
      "Unlimited categories",
      "Custom schedules & intervals",
      "Smart AI reminders",
      "Weekly Sentinel Briefing",
      "Attachments (unlimited)",
      "Priority support",
      "API access",
    ],
    cta: "Upgrade to Pro",
    popular: true,
  },
];

// ---- Animation Presets ----

export const SENTINEL_EASE: [number, number, number, number] = [
  0.25, 0.46, 0.45, 0.94,
];

export const FADE_UP = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as string },
  transition: { duration: 0.7, ease: SENTINEL_EASE },
};

export const MS_PER_DAY = 86400000;
