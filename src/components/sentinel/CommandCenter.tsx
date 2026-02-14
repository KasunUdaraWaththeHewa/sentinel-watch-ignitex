import { useState, useMemo, useDeferredValue } from "react";
import { SENTINEL_EASE } from "@/lib/constants";
import { formatDate, getDaysUntil } from "@/lib/date-utils";
import {
  Severity,
  ItemStatus,
  type SeverityFilter,
  type StatusTab,
  type WatchedItem,
} from "@/types/sentinel";
import { DashboardStats } from "./DashboardStats";
import { DashboardFilters } from "./DashboardFilters";
import { DashboardSection } from "./DashboardSection";
import { DashboardEmpty } from "./DashboardEmpty";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useWatchedItems } from "@/context/WatchedItemsContext";
import { sortItems, type SortOption, filterItems } from "@/lib/item-utils";

export function CommandCenter() {
  const navigate = useNavigate();
  const { items, markHandled, snoozeItem, reactivateItem } = useWatchedItems();

  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const [statusTab, setStatusTab] = useState<StatusTab>("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("dueSoon");

  const deferredSearchQuery = useDeferredValue(searchQuery);

  const allActive = items.filter((item) => item.status === ItemStatus.Active);
  const allHandled = items.filter(
    (item) =>
      item.status === ItemStatus.Handled || item.status === ItemStatus.Snoozed,
  );
  const urgentCount = allActive.filter(
    (item) =>
      getDaysUntil(item.nextDate) <= 7 && item.severity === Severity.High,
  ).length;
  const thisWeekCount = allActive.filter(
    (item) => getDaysUntil(item.nextDate) <= 7,
  ).length;

  const filteredItems = useMemo(() => {
    const visible = filterItems(items, {
      statusTab,
      searchQuery: deferredSearchQuery,
      severityFilter,
      categoryFilter,
    });

    return sortItems(visible, sortBy);
  }, [
    items,
    statusTab,
    deferredSearchQuery,
    severityFilter,
    categoryFilter,
    sortBy,
  ]);

  const activeItems = filteredItems.filter(() => statusTab === "active");
  const nextUp = activeItems.filter((item) => getDaysUntil(item.nextDate) <= 7);
  const upcoming = activeItems.filter((item) => {
    const daysUntil = getDaysUntil(item.nextDate);
    return daysUntil > 7 && daysUntil <= 30;
  });
  const onWatch = activeItems.filter(
    (item) => getDaysUntil(item.nextDate) > 30,
  );

  const highPriorityItems = useMemo(
    () =>
      allActive
        .filter((item) => item.severity === Severity.High)
        .sort((a, b) => a.nextDate.getTime() - b.nextDate.getTime())
        .slice(0, 3),
    [allActive],
  );

  const hasUrgent = nextUp.some((item) => item.severity === Severity.High);
  const activeFilters =
    (severityFilter !== "all" ? 1 : 0) + (categoryFilter !== "all" ? 1 : 0);

  const statusMessage =
    statusTab === "handled"
      ? "Here's what you've already taken care of."
      : hasUrgent
        ? "Some items need your attention soon."
        : "Everything looks good — Sentinel is watching.";

  const goToItem = (id: string) => navigate(`/item/${id}`);

  const quickActionLabel = (item: WatchedItem) => {
    const daysUntil = getDaysUntil(item.nextDate);
    return daysUntil <= 0 ? "Due today" : `Due in ${daysUntil}d`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28 md:pb-12 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: SENTINEL_EASE }}
        className="space-y-2 rounded-2xl glass-surface p-5 sm:p-6"
      >
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {formatDate(now)}
        </p>
        <h1 className="text-2xl sm:text-3xl font-display font-semibold text-foreground tracking-tight">
          {greeting}.
        </h1>
        <p className="text-sm text-muted-foreground">{statusMessage}</p>
      </motion.div>

      <DashboardStats
        watching={allActive.length}
        urgent={urgentCount}
        thisWeek={thisWeekCount}
        handled={allHandled.length}
      />

      {statusTab === "active" && highPriorityItems.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: SENTINEL_EASE }}
          className="glass-surface rounded-2xl p-4 sm:p-5 space-y-3"
        >
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Priority queue
            </h2>
            <p className="text-xs text-muted-foreground">
              Fast actions for high-severity items.
            </p>
          </div>
          <div className="grid gap-2.5">
            {highPriorityItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.06,
                  ease: SENTINEL_EASE,
                }}
                className="rounded-xl bg-muted/30 p-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 transition-all duration-300 hover:bg-muted/45 hover:shadow-[0_12px_30px_-20px_hsl(var(--sentinel-glow))]"
              >
                <button
                  onClick={() => goToItem(item.id)}
                  className="text-left flex-1 min-w-0"
                >
                  <p className="text-sm text-foreground truncate">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {quickActionLabel(item)}
                  </p>
                </button>
                <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => markHandled(item.id)}
                    className="text-xs px-2.5 py-1.5 rounded-md bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 transition-colors min-w-[92px]"
                  >
                    Mark done
                  </button>
                  <button
                    onClick={() => snoozeItem(item.id)}
                    className="text-xs px-2.5 py-1.5 rounded-md bg-background/60 text-muted-foreground hover:text-foreground transition-colors min-w-[92px]"
                  >
                    Snooze
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      <DashboardFilters
        statusTab={statusTab}
        onStatusTabChange={setStatusTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        severityFilter={severityFilter}
        onSeverityFilterChange={setSeverityFilter}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {statusTab === "active" && (
        <div className="space-y-6">
          {nextUp.length > 0 && (
            <DashboardSection
              title="Next Up"
              subtitle="Within 7 days"
              items={nextUp}
              onItemClick={goToItem}
              accent="high"
              onMarkHandled={markHandled}
              onSnooze={snoozeItem}
            />
          )}
          {upcoming.length > 0 && (
            <DashboardSection
              title="Upcoming"
              subtitle="Within 30 days"
              items={upcoming}
              onItemClick={goToItem}
              accent="medium"
              onMarkHandled={markHandled}
              onSnooze={snoozeItem}
            />
          )}
          {onWatch.length > 0 && (
            <DashboardSection
              title="On Watch"
              subtitle="30+ days away"
              items={onWatch}
              onItemClick={goToItem}
              onMarkHandled={markHandled}
              onSnooze={snoozeItem}
            />
          )}
        </div>
      )}

      {statusTab === "handled" && filteredItems.length > 0 && (
        <DashboardSection
          title="Completed"
          subtitle="Previously handled"
          items={filteredItems}
          onItemClick={goToItem}
          onReactivate={reactivateItem}
        />
      )}

      {filteredItems.length === 0 && (
        <DashboardEmpty
          statusTab={statusTab}
          hasFilters={!!searchQuery || activeFilters > 0}
        />
      )}
    </div>
  );
}
