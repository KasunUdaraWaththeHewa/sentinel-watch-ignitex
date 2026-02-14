import { useState, useMemo } from "react";
import { mockWatchedItems } from "@/lib/mock-data";
import { SENTINEL_EASE } from "@/lib/constants";
import { formatDate, getDaysUntil } from "@/lib/date-utils";
import { Severity, ItemStatus, type SeverityFilter, type StatusTab } from "@/types/sentinel";
import { DashboardStats } from "./DashboardStats";
import { DashboardFilters } from "./DashboardFilters";
import { DashboardSection } from "./DashboardSection";
import { DashboardEmpty } from "./DashboardEmpty";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export function CommandCenter() {
  const navigate = useNavigate();
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const [statusTab, setStatusTab] = useState<StatusTab>("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const allActive = mockWatchedItems.filter((i) => i.status === ItemStatus.Active);
  const allHandled = mockWatchedItems.filter((i) => i.status === ItemStatus.Handled || i.status === ItemStatus.Snoozed);
  const urgentCount = allActive.filter((i) => getDaysUntil(i.nextDate) <= 7 && i.severity === Severity.High).length;
  const thisWeekCount = allActive.filter((i) => getDaysUntil(i.nextDate) <= 7).length;

  const filteredItems = useMemo(() => {
    let items = mockWatchedItems.filter(
      (i) => i.status === statusTab || (statusTab === "handled" && i.status === ItemStatus.Snoozed)
    );
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter((i) => i.title.toLowerCase().includes(q) || i.category.name.toLowerCase().includes(q));
    }
    if (severityFilter !== "all") items = items.filter((i) => i.severity === severityFilter);
    if (categoryFilter !== "all") items = items.filter((i) => i.category.id === categoryFilter);
    return items;
  }, [statusTab, searchQuery, severityFilter, categoryFilter]);

  const activeItems = filteredItems.filter(() => statusTab === "active");
  const nextUp = activeItems.filter((i) => getDaysUntil(i.nextDate) <= 7);
  const upcoming = activeItems.filter((i) => {
    const d = getDaysUntil(i.nextDate);
    return d > 7 && d <= 30;
  });
  const onWatch = activeItems.filter((i) => getDaysUntil(i.nextDate) > 30);

  const hasUrgent = nextUp.some((i) => i.severity === Severity.High);
  const activeFilters = (severityFilter !== "all" ? 1 : 0) + (categoryFilter !== "all" ? 1 : 0);

  const statusMessage =
    statusTab === "handled"
      ? "Here's what you've already taken care of."
      : hasUrgent
        ? "Some items need your attention soon."
        : "Everything looks good — Sentinel is watching.";

  const goToItem = (id: string) => navigate(`/item/${id}`);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28 md:pb-12 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: SENTINEL_EASE }}
        className="space-y-2 rounded-2xl glass-surface p-5 sm:p-6"
      >
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{formatDate(now)}</p>
        <h1 className="text-2xl sm:text-3xl font-display font-semibold text-foreground tracking-tight">{greeting}.</h1>
        <p className="text-sm text-muted-foreground">{statusMessage}</p>
      </motion.div>

      <DashboardStats watching={allActive.length} urgent={urgentCount} thisWeek={thisWeekCount} handled={allHandled.length} />

      <DashboardFilters
        statusTab={statusTab}
        onStatusTabChange={setStatusTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        severityFilter={severityFilter}
        onSeverityFilterChange={setSeverityFilter}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
      />

      {statusTab === "active" && (
        <div className="space-y-6">
          {nextUp.length > 0 && (
            <DashboardSection title="Next Up" subtitle="Within 7 days" items={nextUp} startIndex={0} onItemClick={goToItem} accent="high" />
          )}
          {upcoming.length > 0 && (
            <DashboardSection title="Upcoming" subtitle="Within 30 days" items={upcoming} startIndex={nextUp.length} onItemClick={goToItem} accent="medium" />
          )}
          {onWatch.length > 0 && (
            <DashboardSection title="On Watch" subtitle="30+ days away" items={onWatch} startIndex={nextUp.length + upcoming.length} onItemClick={goToItem} />
          )}
        </div>
      )}

      {statusTab === "handled" && filteredItems.length > 0 && (
        <DashboardSection title="Completed" subtitle="Previously handled" items={filteredItems} startIndex={0} onItemClick={goToItem} />
      )}

      {filteredItems.length === 0 && <DashboardEmpty statusTab={statusTab} hasFilters={!!searchQuery || activeFilters > 0} />}
    </div>
  );
}
