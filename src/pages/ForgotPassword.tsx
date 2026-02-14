import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Mail, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SENTINEL_EASE } from "@/lib/constants";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  return (
    <div className="min-h-screen bg-background bg-noise flex items-center justify-center px-4 py-12">
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[250px] rounded-full bg-sentinel-accent-cyan/5 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: SENTINEL_EASE }}
        className="w-full max-w-sm space-y-8 relative z-10"
      >
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-sentinel-accent-cyan/15 flex items-center justify-center sentinel-glow transition-transform duration-300 group-hover:scale-105">
              <Eye className="h-5 w-5 text-sentinel-accent-cyan" />
            </div>
            <span className="font-display font-semibold text-lg text-foreground tracking-tight">Sentinel</span>
          </Link>

          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div key="sent" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-sentinel-accent-cyan/10 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-sentinel-accent-cyan" />
                </div>
                <h1 className="text-2xl font-display font-semibold text-foreground tracking-tight">Check your inbox</h1>
                <p className="text-sm text-muted-foreground">
                  We've sent a password reset link to <span className="text-foreground font-medium">{email}</span>
                </p>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1 className="text-2xl font-display font-semibold text-foreground tracking-tight">Reset password</h1>
                <p className="text-sm text-muted-foreground mt-1">Enter your email and we'll send a reset link</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!sent && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="glass-surface rounded-2xl p-5">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 border-sentinel-border bg-transparent text-foreground placeholder:text-muted-foreground rounded-xl focus:ring-1 focus:ring-sentinel-accent-cyan/40"
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-sentinel-accent-cyan text-background font-medium rounded-xl hover:opacity-90 transition-all gap-2 shadow-lg shadow-sentinel-accent-cyan/15"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
              ) : (
                <>Send Reset Link <ArrowRight className="h-4 w-4" /></>
              )}
            </Button>
          </form>
        )}

        <Link to="/login" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to sign in
        </Link>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
