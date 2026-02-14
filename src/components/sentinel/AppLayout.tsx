import { TopNav, BottomNav } from "@/components/sentinel/Navigation";
import { motion } from "framer-motion";
import { SENTINEL_EASE } from "@/lib/constants";
import { formatDate } from "@/lib/date-utils";

interface AppLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  headerRight?: React.ReactNode;
  showDate?: boolean;
}

export function AppLayout({
  title,
  subtitle,
  children,
  headerRight,
  showDate = true,
}: AppLayoutProps) {
  const now = new Date();

  return (
    <div className="min-h-screen bg-background bg-noise">
      <TopNav />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28 md:pb-12 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: SENTINEL_EASE }}
          className="space-y-3 rounded-2xl glass-surface p-5 sm:p-6"
        >
          {showDate && (
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {formatDate(now)}
            </p>
          )}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-display font-semibold text-foreground tracking-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
            {headerRight && <div className="flex-shrink-0">{headerRight}</div>}
          </div>
        </motion.div>
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
