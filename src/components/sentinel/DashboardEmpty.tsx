import { motion } from "framer-motion";
import { Eye, Search, Archive } from "lucide-react";
import type { StatusTab } from "@/types/sentinel";

interface DashboardEmptyProps {
  statusTab: StatusTab;
  hasFilters: boolean;
}

export function DashboardEmpty({ statusTab, hasFilters }: DashboardEmptyProps) {
  const config = statusTab === "handled"
    ? { icon: Archive, title: "No past items yet", desc: "Items you mark as handled will appear here." }
    : hasFilters
      ? { icon: Search, title: "No matching items", desc: "Try adjusting your search or filters." }
      : { icon: Eye, title: "All clear", desc: "Sentinel is standing by — nothing needs your attention." };

  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="glass-surface rounded-2xl p-12 sm:p-16 text-center space-y-5"
    >
      <div className="w-16 h-16 rounded-2xl bg-sentinel-accent-cyan/10 mx-auto flex items-center justify-center animate-sentinel-glow-pulse">
        <Icon className="h-6 w-6 text-sentinel-accent-cyan" />
      </div>
      <div className="space-y-2">
        <p className="text-foreground font-display font-semibold text-lg">{config.title}</p>
        <p className="text-muted-foreground text-sm max-w-xs mx-auto">{config.desc}</p>
      </div>
    </motion.div>
  );
}
