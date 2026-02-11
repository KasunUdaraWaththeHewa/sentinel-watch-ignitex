import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, Mail, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background bg-noise flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full max-w-sm space-y-8"
      >
        <div className="text-center space-y-3">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-sentinel-accent-cyan/15 flex items-center justify-center sentinel-glow">
              <Eye className="h-5 w-5 text-sentinel-accent-cyan" />
            </div>
          </Link>
          {sent ? (
            <div className="space-y-2">
              <div className="w-16 h-16 rounded-full bg-sentinel-accent-cyan/10 mx-auto flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-sentinel-accent-cyan" />
              </div>
              <h1 className="text-2xl font-display font-semibold text-foreground tracking-tight">Check your inbox</h1>
              <p className="text-sm text-muted-foreground">
                We've sent a password reset link to <span className="text-foreground font-medium">{email}</span>
              </p>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-display font-semibold text-foreground tracking-tight">Reset password</h1>
              <p className="text-sm text-muted-foreground mt-1">Enter your email and we'll send a reset link</p>
            </div>
          )}
        </div>

        {!sent && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 glass-surface border-sentinel-border bg-transparent text-foreground placeholder:text-muted-foreground"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-sentinel-accent-cyan text-background font-medium rounded-xl hover:opacity-90 transition-opacity gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
              ) : (
                <>Send Reset Link<ArrowRight className="h-4 w-4" /></>
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
