import { Eye, Settings, CreditCard, LayoutGrid, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  {
    label: "Command Center",
    shortLabel: "Home",
    path: "/dashboard",
    icon: Eye,
  },
  {
    label: "Categories",
    shortLabel: "Categories",
    path: "/categories",
    icon: LayoutGrid,
  },
  {
    label: "Settings",
    shortLabel: "Settings",
    path: "/settings",
    icon: Settings,
  },
  {
    label: "Billing",
    shortLabel: "Billing",
    path: "/billing",
    icon: CreditCard,
  },
];

export function TopNav() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/70">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6 lg:px-8">
        <Link to="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-sentinel-accent-cyan/15 flex items-center justify-center sentinel-glow transition-transform duration-300 group-hover:scale-105">
            <Eye className="h-4 w-4 text-sentinel-accent-cyan" />
          </div>
          <span className="font-display font-semibold text-base tracking-tight text-foreground hidden sm:block">
            Sentinel
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-0.5">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "relative px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active && (
                  <motion.div
                    layoutId="topnav-active"
                    className="absolute inset-0 bg-sentinel-accent-cyan/10 rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
          <div className="ml-2 flex items-center gap-2">
            <ThemeToggle />
            <Link
              to="/profile"
              className={cn(
                "relative w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200",
                location.pathname === "/profile"
                  ? "bg-sentinel-accent-cyan/15 text-sentinel-accent-cyan"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              )}
            >
              <User className="h-4 w-4" />
            </Link>
          </div>
        </nav>

        <div className="md:hidden">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export function BottomNav() {
  const location = useLocation();

  const mobileNavItems = [
    ...navItems,
    { label: "Profile", shortLabel: "Profile", path: "/profile", icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/85 border-t border-sentinel-border safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-1">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors duration-200 min-w-0",
                active ? "text-sentinel-accent-cyan" : "text-muted-foreground",
              )}
            >
              {active && (
                <motion.div
                  layoutId="bottomnav-active"
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-sentinel-accent-cyan"
                  transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
                />
              )}
              <Icon
                className={cn(
                  "h-5 w-5",
                  active &&
                    "drop-shadow-[0_0_6px_hsl(var(--sentinel-accent-cyan))]",
                )}
              />
              <span className="text-[9px] sm:text-[10px] font-medium truncate">
                {item.shortLabel}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
