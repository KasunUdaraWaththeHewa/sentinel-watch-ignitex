// ============================================
// Sentinel – Centralised Type Definitions
// ============================================

// ---- Enums ----

export enum Severity {
  Low = "low",
  Medium = "medium",
  High = "high",
}

export enum Schedule {
  OneTime = "one-time",
  Daily = "daily",
  Monthly = "monthly",
  Quarterly = "quarterly",
  Yearly = "yearly",
  Custom = "custom",
}

export enum RegretRisk {
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

export enum ItemStatus {
  Active = "active",
  Handled = "handled",
  Snoozed = "snoozed",
}

export enum CustomIntervalUnit {
  Days = "days",
  Weeks = "weeks",
  Months = "months",
}

export enum CustomScheduleMode {
  Interval = "interval",
  Dates = "dates",
}

// ---- Interfaces ----

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
}

export interface Reminder {
  enabled: boolean;
  days: number;
}

export interface CustomInterval {
  value: number;
  unit: CustomIntervalUnit;
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
  status: ItemStatus;
  createdAt: Date;
  notes?: string;
  customInterval?: CustomInterval;
  customDates?: string[];
  reminders?: Reminder[];
}

// ---- Filter Types ----

export type SeverityFilter = Severity | "all";
export type StatusTab = "active" | "handled";

// ---- Landing Page Types ----

export interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gradient: string;
}

export interface HowItWorksStep {
  step: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  prefix?: boolean;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  desc: string;
  monthly: number;
  yearly: number;
  features: string[];
  cta: string;
  popular: boolean;
}

export interface PricingPreview {
  name: string;
  price: string;
  desc: string;
  popular?: boolean;
}

// ---- Schedule Options ----

export interface ScheduleOption {
  value: Schedule;
  label: string;
  desc: string;
}

export interface SeverityOption {
  value: Severity;
  label: string;
}
