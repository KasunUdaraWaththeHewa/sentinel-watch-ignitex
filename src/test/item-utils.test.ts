import { describe, expect, it } from "vitest";
import { filterItems, sortItems } from "@/lib/item-utils";
import { mockWatchedItems } from "@/lib/mock-data";
import { Severity } from "@/types/sentinel";

describe("item utils", () => {
  it("filters active items by search and severity", () => {
    const items = filterItems(mockWatchedItems, {
      statusTab: "active",
      searchQuery: "renew",
      severityFilter: Severity.High,
      categoryFilter: "all",
    });

    expect(items).toHaveLength(2);
    expect(items.every((item) => item.severity === Severity.High)).toBe(true);
  });

  it("sorts items by severity descending", () => {
    const sorted = sortItems(mockWatchedItems, "severity");

    expect(sorted[0].severity).toBe(Severity.High);
    expect(sorted.at(-1)?.severity).toBe(Severity.Low);
  });

  it("sorts items by newest created date", () => {
    const sorted = sortItems(mockWatchedItems, "newest");

    expect(sorted[0].createdAt.getTime()).toBeGreaterThanOrEqual(sorted[1].createdAt.getTime());
    expect(sorted.at(-1)?.createdAt.getTime()).toBeLessThanOrEqual(sorted.at(-2)?.createdAt.getTime() ?? Infinity);
  });
});
