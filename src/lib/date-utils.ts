// ============================================
// Sentinel – Date & Formatting Utilities
// ============================================

import { MS_PER_DAY } from "./constants";

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatFullDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatShortDate(dateStr: string): string {
  return new Date(dateStr + "T00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getTimeRemaining(date: Date): string {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const days = Math.ceil(diff / MS_PER_DAY);
  if (days <= 0) return "Today";
  if (days === 1) return "Tomorrow";
  return `in ${days} days`;
}

export function getDaysUntil(date: Date): number {
  return Math.ceil((date.getTime() - new Date().getTime()) / MS_PER_DAY);
}

export function daysFromNow(d: number): Date {
  return new Date(Date.now() + d * MS_PER_DAY);
}
