import { useState, useMemo } from "react";
import { mockWatchedItems, defaultCategories, CATEGORY_ICONS, type Severity } from "@/lib/mock-data";
import { WatchedItemCard } from "./WatchedItemCard";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Archive, Eye, SlidersHorizontal, TrendingUp, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

type StatusTab = "active" | "handled";
type SeverityFilter = Severity | "all";

export function CommandCenter() {
  const navigate = useNavigate();
  const now = new Date();

  const [statusTab, setStatusTab] = useState<StatusTab>("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredItems = useMemo(() => {
    let items = mockWatchedItems.filter((i) => i.status === statusTab || (statusTab === "handled" && i.status === "snoozed"));

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.category.name.toLowerCase().includes(q)
      );
    }

    if (severityFilter !== "all") {
      items = items.filter((i) => i.severity === severityFilter);
    }

    if (categoryFilter !== "all") {
      items = items.filter((i) => i.category.id === categoryFilter);
    }

    return items;
  }, [statusTab, searchQuery, severityFilter, categoryFilter]);

  const activeItems = filteredItems.filter(() => statusTab === "active");

  const nextUp = activeItems.filter((i) => {
    const days = Math.ceil((i.nextDate.getTime() - now.getTime()) / 86400000);
    return days <= 7;
  });

  const upcoming = activeItems.filter((i) => {
    const days = Math.ceil((i.nextDate.getTime() - now.getTime()) / 86400000);
    return days > 7 && days <= 30;
  });

  const onWatch = activeItems.filter((i) => {
    const days = Math.ceil((i.nextDate.getTime() - now.getTime()) / 86400000);
    return days > 30;
  });

  const hasUrgent = nextUp.some((i) => i.severity === "high");

  const allActive = mockWatchedItems.filter((i) => i.status === "active");
  const urgentCount = allActive.filter((i) => {
    const days = Math.ceil((i.nextDate.getTime() - now.getTime()) / 86400000);
    return days <= 7 && i.severity === "high";
  }).length;

  const activeFilters = (severityFilter !== "all" ? 1 : 0) + (categoryFilter !== "all" ? 1 : 0);

  const statusMessage = statusTab === "handled"
    ? "Here's what you've already taken care of."
    : hasUrgent
      ? "Heads up — some items need attention soon."
      : "All quiet — here's what Sentinel is watching next.";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28 md:pb-12 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="space-y-2"
      >
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {formatDate(now)}
        </p>
        <h1 className="text-2xl sm:text-3xl font-display font-semibold text-foreground tracking-tight">
          {statusMessage}
        </h1>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-3 gap-3 sm:gap-4"
      >
        <div className="glass-surface rounded-2xl p-4 sm:p-5 text-center space-y-1">
          <Eye className="h-4 w-4 text-sentinel-accent-cyan mx-auto" />
          <p className="text-2xl sm:text-3xl font-display font-bold text-foreground">{allActive.length}</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">Watching</p>
        </div>
        <div className="glass-surface rounded-2xl p-4 sm:p-5 text-center space-y-1">
          <AlertTriangle className={cn("h-4 w-4 mx-auto", urgentCount > 0 ? "text-sentinel-severity-high" : "text-muted-foreground")} />
          <p className={cn("text-2xl sm:text-3xl font-display font-bold", urgentCount > 0 ? "text-sentinel-severity-high" : "text-foreground")}>{urgentCount}</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">Urgent</p>
        </div>
        <div className="glass-surface rounded-2xl p-4 sm:p-5 text-center space-y-1">
          <TrendingUp className="h-4 w-4 text-sentinel-accent-cyan mx-auto" />
          <p className="text-2xl sm:text-3xl font-display font-bold text-foreground">{nextUp.length}</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">This Week</p>
        </div>
      </motion.div>

      {/* Status Tabs + Search */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="space-y-3"
      >
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Tabs */}
          <div className="glass-surface rounded-xl p-1 flex gap-1 flex-shrink-0">
            <button
              onClick={() => setStatusTab("active")}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex-1 sm:flex-initial justify-center",
                statusTab === "active"
                  ? "bg-sentinel-accent-cyan/15 text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Eye className="h-3.5 w-3.5" />
              Active
            </button>
            <button
              onClick={() => setStatusTab("handled")}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex-1 sm:flex-initial justify-center",
                statusTab === "handled"
                  ? "bg-sentinel-accent-cyan/15 text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Archive className="h-3.5 w-3.5" />
              Past
            </button>
          </div>

          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search watched items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-10 rounded-xl glass-surface border-sentinel-border bg-transparent text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-sentinel-accent-cyan/40 transition-colors duration-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "h-11 px-4 rounded-xl glass-surface border-sentinel-border flex items-center gap-2 text-sm font-medium transition-all duration-300 flex-shrink-0 justify-center",
              showFilters || activeFilters > 0
                ? "text-sentinel-accent-cyan border-sentinel-accent-cyan/30"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
            {activeFilters > 0 && (
              <span className="w-5 h-5 rounded-full bg-sentinel-accent-cyan/20 text-sentinel-accent-cyan text-xs flex items-center justify-center">
                {activeFilters}
              </span>
            )}
          </button>
        </div>

        {/* Expandable Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="glass-surface rounded-xl p-4 sm:p-5 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Severity */}
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground uppercase tracking-widest">Severity</label>
                    <div className="flex flex-wrap gap-2">
                      {(["all", "low", "medium", "high"] as const).map((s) => (
                        <button
                          key={s}
                          onClick={() => setSeverityFilter(s)}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-300",
                            severityFilter === s
                              ? "bg-sentinel-accent-cyan/15 border-sentinel-accent-cyan/30 text-foreground"
                              : "border-sentinel-border text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground uppercase tracking-widest">Category</label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setCategoryFilter("all")}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-300",
                          categoryFilter === "all"
                            ? "bg-sentinel-accent-cyan/15 border-sentinel-accent-cyan/30 text-foreground"
                            : "border-sentinel-border text-muted-foreground hover:text-foreground"
                        )}
                      >
                        All
                      </button>
                      {defaultCategories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setCategoryFilter(cat.id)}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-300",
                            categoryFilter === cat.id
                              ? "bg-sentinel-accent-cyan/15 border-sentinel-accent-cyan/30 text-foreground"
                              : "border-sentinel-border text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {activeFilters > 0 && (
                  <button
                    onClick={() => { setSeverityFilter("all"); setCategoryFilter("all"); }}
                    className="text-xs text-sentinel-accent-cyan hover:underline"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Active Sections */}
      {statusTab === "active" && (
        <>
          {nextUp.length > 0 && (
            <Section title="Next Up" subtitle="Within 7 days" items={nextUp} startIndex={0} onItemClick={(id) => navigate(`/item/${id}`)} />
          )}
          {upcoming.length > 0 && (
            <Section title="Upcoming" subtitle="Within 30 days" items={upcoming} startIndex={nextUp.length} onItemClick={(id) => navigate(`/item/${id}`)} />
          )}
          {onWatch.length > 0 && (
            <Section title="On Watch" subtitle="Later" items={onWatch} startIndex={nextUp.length + upcoming.length} onItemClick={(id) => navigate(`/item/${id}`)} />
          )}
        </>
      )}

      {statusTab === "handled" && filteredItems.length > 0 && (
        <Section title="Completed" subtitle="Previously handled" items={filteredItems} startIndex={0} onItemClick={(id) => navigate(`/item/${id}`)} />
      )}

      {/* Empty */}
      {filteredItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="glass-surface rounded-2xl p-12 sm:p-16 text-center space-y-4"
        >
          <div className="w-16 h-16 rounded-full bg-sentinel-accent-cyan/10 mx-auto flex items-center justify-center animate-sentinel-glow-pulse">
            <div className="w-3 h-3 rounded-full bg-sentinel-accent-cyan/60" />
          </div>
          {statusTab === "handled" ? (
            <>
              <p className="text-foreground font-display font-medium text-lg">No past items yet.</p>
              <p className="text-muted-foreground text-sm">Items you mark as handled will appear here.</p>
            </>
          ) : searchQuery || activeFilters > 0 ? (
            <>
              <p className="text-foreground font-display font-medium text-lg">No matching items.</p>
              <p className="text-muted-foreground text-sm">Try adjusting your search or filters.</p>
            </>
          ) : (
            <>
              <p className="text-foreground font-display font-medium text-lg">Nothing urgent.</p>
              <p className="text-muted-foreground text-sm">Sentinel is standing by.</p>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
}

function Section({
  title,
  subtitle,
  items,
  startIndex,
  onItemClick,
}: {
  title: string;
  subtitle: string;
  items: typeof mockWatchedItems;
  startIndex: number;
  onItemClick?: (id: string) => void;
}) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: startIndex * 0.04 }}
      className="space-y-3"
    >
      <div className="flex items-baseline gap-3 px-1">
        <h2 className="font-display font-semibold text-base text-foreground">{title}</h2>
        <span className="text-xs text-muted-foreground">{subtitle}</span>
        <span className="text-xs text-muted-foreground ml-auto tabular-nums">{items.length}</span>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <WatchedItemCard
            key={item.id}
            item={item}
            index={startIndex + i}
            onClick={() => onItemClick?.(item.id)}
          />
        ))}
      </div>
    </motion.section>
  );
}
