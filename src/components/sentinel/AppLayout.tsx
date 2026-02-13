import { TopNav, BottomNav } from "@/components/sentinel/Navigation";
import { motion } from "framer-motion";

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

interface AppLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  headerRight?: React.ReactNode;
  showDate?: boolean;
}

export function AppLayout({ title, subtitle, children, headerRight, showDate = true }: AppLayoutProps) {
  const now = new Date();

  return (
    <div className="min-h-screen bg-background bg-noise">
      <TopNav />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28 md:pb-12 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="space-y-2"
        >
          {showDate && (
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {formatDate(now)}
            </p>
          )}
          <div className="flex items-center justify-between gap-4">
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
