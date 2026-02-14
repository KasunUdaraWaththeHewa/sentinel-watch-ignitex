import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SENTINEL_EASE } from "@/lib/constants";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background bg-noise flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: SENTINEL_EASE }}
        className="text-center space-y-8 max-w-md"
      >
        <div className="space-y-6">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-sentinel-accent-cyan/15 flex items-center justify-center sentinel-glow">
              <Eye className="h-5 w-5 text-sentinel-accent-cyan" />
            </div>
          </Link>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: SENTINEL_EASE }}
            className="w-24 h-24 rounded-2xl bg-sentinel-accent-cyan/10 mx-auto flex items-center justify-center"
          >
            <Search className="h-10 w-10 text-sentinel-accent-cyan/60" />
          </motion.div>

          <div className="space-y-2">
            <h1 className="text-5xl sm:text-6xl font-display font-bold text-foreground tracking-tight">404</h1>
            <p className="text-lg font-display font-medium text-foreground">Page not found</p>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Sentinel couldn't find what you're looking for. The page may have moved or doesn't exist.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/dashboard">
            <Button className="h-11 px-6 bg-sentinel-accent-cyan text-background font-medium rounded-xl hover:opacity-90 transition-opacity gap-2">
              <ArrowLeft className="h-4 w-4" /> Go to Dashboard
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" className="h-11 px-6 rounded-xl border-sentinel-border hover:bg-sentinel-surface">
              Landing Page
            </Button>
          </Link>
        </div>

        <p className="text-xs text-muted-foreground">
          Tried to access: <code className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground text-[11px]">{location.pathname}</code>
        </p>
      </motion.div>
    </div>
  );
};

export default NotFound;
