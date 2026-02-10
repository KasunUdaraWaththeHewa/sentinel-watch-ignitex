import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function FloatingActionButton() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed bottom-20 md:bottom-8 right-6 z-50"
    >
      <Link
        to="/add"
        className="flex items-center gap-2 h-12 px-5 rounded-full bg-sentinel-accent-cyan text-background font-medium text-sm shadow-lg shadow-sentinel-accent-cyan/20 hover:shadow-sentinel-accent-cyan/40 transition-all duration-500 hover:scale-105"
      >
        <Plus className="h-5 w-5" />
        <span className="hidden sm:inline">Watch item</span>
      </Link>
    </motion.div>
  );
}