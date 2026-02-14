import { getDaysUntil } from "@/lib/date-utils";
import {
  ItemStatus,
  Severity,
  type SeverityFilter,
  type WatchedItem,
} from "@/types/sentinel";

export type SortOption = "dueSoon" | "severity" | "alphabetical" | "newest";

const severityWeight: Record<Severity, number> = {
  [Severity.High]: 3,
  [Severity.Medium]: 2,
  [Severity.Low]: 1,
};

export function filterItems(
  items: WatchedItem[],
  params: {
    statusTab: "active" | "handled";
    searchQuery: string;
    severityFilter: SeverityFilter;
    categoryFilter: string;
  },
) {
  const { statusTab, searchQuery, severityFilter, categoryFilter } = params;

  let filtered = items.filter(
    (item) =>
      item.status === statusTab ||
      (statusTab === "handled" && item.status === ItemStatus.Snoozed),
  );

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.name.toLowerCase().includes(q),
    );
  }

  if (severityFilter !== "all") {
    filtered = filtered.filter((item) => item.severity === severityFilter);
  }

  if (categoryFilter !== "all") {
    filtered = filtered.filter((item) => item.category.id === categoryFilter);
  }

  return filtered;
}

export function sortItems(items: WatchedItem[], sortBy: SortOption) {
  const sorted = [...items];

  sorted.sort((a, b) => {
    if (sortBy === "newest") {
      return b.createdAt.getTime() - a.createdAt.getTime();
    }

    if (sortBy === "alphabetical") {
      return a.title.localeCompare(b.title);
    }

    if (sortBy === "severity") {
      return (
        severityWeight[b.severity] - severityWeight[a.severity] ||
        getDaysUntil(a.nextDate) - getDaysUntil(b.nextDate)
      );
    }

    return getDaysUntil(a.nextDate) - getDaysUntil(b.nextDate);
  });

  return sorted;
}
