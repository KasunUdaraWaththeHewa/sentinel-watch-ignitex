import { Eye, Settings, CreditCard, LayoutGrid, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Command Center", shortLabel: "Home", path: "/", icon: Eye },
  { label: "Categories", shortLabel: "Categories", path: "/categories", icon: LayoutGrid },
  { label: "Settings", shortLabel: "Settings", path: "/settings", icon: Settings },
  { label: "Billing", shortLabel: "Billing", path: "/billing", icon: CreditCard },
];

export function TopNav() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/60 border-b border-sentinel-border">
      <div className="max-w-5xl mx-auto flex items-center justify-between h-14 px-4 sm:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-sentinel-accent-cyan/15 flex items-center justify-center sentinel-glow">
            <Eye className="h-4 w-4 text-sentinel-accent-cyan" />
          </div>
          <span className="font-display font-semibold text-base tracking-tight text-foreground">
            Sentinel
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300",
                location.pathname === item.path
                  ? "text-foreground bg-sentinel-surface"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/profile"
            className={cn(
              "ml-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
              location.pathname === "/profile"
                ? "bg-sentinel-accent-cyan/15 text-sentinel-accent-cyan"
                : "text-muted-foreground hover:text-foreground hover:bg-sentinel-surface"
            )}
          >
            <User className="h-4 w-4" />
          </Link>
        </nav>
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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-t border-sentinel-border safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-1">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all duration-300 min-w-0",
                active ? "text-sentinel-accent-cyan" : "text-muted-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[9px] sm:text-[10px] font-medium truncate">{item.shortLabel}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
