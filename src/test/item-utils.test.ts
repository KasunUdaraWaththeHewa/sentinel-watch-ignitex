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
});
