import { useState } from "react";
import { Search, X, SlidersHorizontal, Archive, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Severity, type SeverityFilter, type StatusTab } from "@/types/sentinel";
import { DEFAULT_CATEGORIES } from "@/lib/constants";

interface DashboardFiltersProps {
  statusTab: StatusTab;
  onStatusTabChange: (tab: StatusTab) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  severityFilter: SeverityFilter;
  onSeverityFilterChange: (f: SeverityFilter) => void;
  categoryFilter: string;
  onCategoryFilterChange: (f: string) => void;
}

export function DashboardFilters({
  statusTab, onStatusTabChange,
  searchQuery, onSearchChange,
  severityFilter, onSeverityFilterChange,
  categoryFilter, onCategoryFilterChange,
}: DashboardFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);
  const activeFilters = (severityFilter !== "all" ? 1 : 0) + (categoryFilter !== "all" ? 1 : 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="space-y-3"
    >
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
        {/* Status Toggle */}
        <div className="glass-surface rounded-xl p-1 flex gap-1 flex-shrink-0">
          <TabButton active={statusTab === "active"} onClick={() => onStatusTabChange("active")} icon={Eye} label="Active" />
          <TabButton active={statusTab === "handled"} onClick={() => onStatusTabChange("handled")} icon={Archive} label="Past" />
        </div>

        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-11 pl-10 pr-10 rounded-xl glass-surface border-sentinel-border bg-transparent text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-1 focus:ring-sentinel-accent-cyan/40 transition-all duration-300"
          />
          {searchQuery && (
            <button onClick={() => onSearchChange("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "h-11 px-4 rounded-xl glass-surface border-sentinel-border flex items-center gap-2 text-sm font-medium transition-all duration-300 flex-shrink-0 justify-center",
            showFilters || activeFilters > 0
              ? "text-sentinel-accent-cyan ring-1 ring-sentinel-accent-cyan/20"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span className="hidden sm:inline">Filters</span>
          {activeFilters > 0 && (
            <span className="w-5 h-5 rounded-full bg-sentinel-accent-cyan/20 text-sentinel-accent-cyan text-[10px] font-bold flex items-center justify-center">
              {activeFilters}
            </span>
          )}
        </button>
      </div>

      {/* Expandable Filter Panel */}
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
                <div className="space-y-2">
                  <label className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Severity</label>
                  <div className="flex flex-wrap gap-1.5">
                    {(["all", Severity.Low, Severity.Medium, Severity.High] as const).map((s) => (
                      <FilterChip key={s} active={severityFilter === s} onClick={() => onSeverityFilterChange(s)} label={s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)} />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Category</label>
                  <div className="flex flex-wrap gap-1.5">
                    <FilterChip active={categoryFilter === "all"} onClick={() => onCategoryFilterChange("all")} label="All" />
                    {DEFAULT_CATEGORIES.map((cat) => (
                      <FilterChip key={cat.id} active={categoryFilter === cat.id} onClick={() => onCategoryFilterChange(cat.id)} label={cat.name} />
                    ))}
                  </div>
                </div>
              </div>
              {activeFilters > 0 && (
                <button
                  onClick={() => { onSeverityFilterChange("all"); onCategoryFilterChange("all"); }}
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
  );
}

function TabButton({ active, onClick, icon: Icon, label }: {
  active: boolean; onClick: () => void; icon: React.ComponentType<{ className?: string }>; label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex-1 sm:flex-initial justify-center",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {active && (
        <motion.div
          layoutId="statusTab"
          className="absolute inset-0 bg-sentinel-accent-cyan/10 rounded-lg"
          transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
        />
      )}
      <span className="relative flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </span>
    </button>
  );
}

function FilterChip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200",
        active
          ? "bg-sentinel-accent-cyan/15 border-sentinel-accent-cyan/30 text-foreground"
          : "border-transparent bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
      )}
    >
      {label}
    </button>
  );
}
