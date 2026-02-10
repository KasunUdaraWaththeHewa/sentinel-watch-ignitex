import { Shield, FileText, Home as HomeIcon, Car, Heart, CreditCard, Briefcase, Scale, Zap } from "lucide-react";

export type Severity = "low" | "medium" | "high";
export type Schedule = "one-time" | "daily" | "monthly" | "quarterly" | "yearly" | "custom";
export type RegretRisk = "Low" | "Medium" | "High";

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
}

export interface WatchedItem {
  id: string;
  title: string;
  category: Category;
  severity: Severity;
  nextDate: Date;
  schedule: Schedule;
  regretRisk: RegretRisk;
  actionWindow: string;
  status: "active" | "handled" | "snoozed";
  createdAt: Date;
  notes?: string;
  customInterval?: { value: number; unit: "days" | "weeks" | "months" };
  customDates?: string[];
  reminders?: { enabled: boolean; days: number }[];
}

export const CATEGORY_ICONS: Record<string, any> = {
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

export const defaultCategories: Category[] = [
  { id: "insurance", name: "Insurance", icon: "insurance", color: "cyan", count: 3 },
  { id: "medical", name: "Medical", icon: "medical", color: "violet", count: 2 },
  { id: "home", name: "Home", icon: "home", color: "cyan", count: 1 },
  { id: "auto", name: "Auto", icon: "auto", color: "cyan", count: 2 },
  { id: "finance", name: "Finance", icon: "finance", color: "violet", count: 1 },
  { id: "legal", name: "Legal", icon: "legal", color: "cyan", count: 1 },
  { id: "documents", name: "Documents", icon: "documents", color: "violet", count: 2 },
];

const now = new Date();
const daysFromNow = (d: number) => new Date(now.getTime() + d * 86400000);

export const mockWatchedItems: WatchedItem[] = [
  {
    id: "1",
    title: "Renew car insurance policy",
    category: defaultCategories[3],
    severity: "high",
    nextDate: daysFromNow(3),
    schedule: "yearly",
    regretRisk: "High",
    actionWindow: "Best action window: 2–4 weeks before",
    status: "active",
    createdAt: daysFromNow(-90),
  },
  {
    id: "2",
    title: "Annual dental checkup",
    category: defaultCategories[1],
    severity: "medium",
    nextDate: daysFromNow(8),
    schedule: "yearly",
    regretRisk: "Medium",
    actionWindow: "Best action window: 1–2 weeks before",
    status: "active",
    createdAt: daysFromNow(-180),
  },
  {
    id: "3",
    title: "Replace water filter cartridge",
    category: defaultCategories[2],
    severity: "low",
    nextDate: daysFromNow(12),
    schedule: "monthly",
    regretRisk: "Low",
    actionWindow: "Best action window: 5–10 days before",
    status: "active",
    createdAt: daysFromNow(-30),
  },
  {
    id: "4",
    title: "Passport renewal",
    category: defaultCategories[6],
    severity: "high",
    nextDate: daysFromNow(18),
    schedule: "one-time",
    regretRisk: "High",
    actionWindow: "Best action window: 3–6 months before",
    status: "active",
    createdAt: daysFromNow(-60),
  },
  {
    id: "5",
    title: "Property tax quarterly payment",
    category: defaultCategories[4],
    severity: "medium",
    nextDate: daysFromNow(25),
    schedule: "quarterly",
    regretRisk: "Medium",
    actionWindow: "Best action window: 1–2 weeks before",
    status: "active",
    createdAt: daysFromNow(-120),
  },
  {
    id: "6",
    title: "Update emergency contacts list",
    category: defaultCategories[6],
    severity: "low",
    nextDate: daysFromNow(35),
    schedule: "yearly",
    regretRisk: "Low",
    actionWindow: "Best action window: anytime this month",
    status: "active",
    createdAt: daysFromNow(-200),
  },
  {
    id: "7",
    title: "Home warranty expiration",
    category: defaultCategories[2],
    severity: "medium",
    nextDate: daysFromNow(45),
    schedule: "yearly",
    regretRisk: "Medium",
    actionWindow: "Best action window: 30 days before",
    status: "active",
    createdAt: daysFromNow(-300),
  },
  {
    id: "8",
    title: "Professional license renewal",
    category: defaultCategories[5],
    severity: "high",
    nextDate: daysFromNow(60),
    schedule: "yearly",
    regretRisk: "High",
    actionWindow: "Best action window: 60–90 days before",
    status: "active",
    createdAt: daysFromNow(-180),
  },
];
