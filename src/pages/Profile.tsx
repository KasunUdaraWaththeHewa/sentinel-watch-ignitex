import { useState } from "react";
import { AppLayout } from "@/components/sentinel/AppLayout";
import { motion } from "framer-motion";
import { User, Mail, Camera, LogOut, Shield, Calendar, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockWatchedItems } from "@/lib/mock-data";

const Profile = () => {
  const [name, setName] = useState("Alex Morgan");
  const [email] = useState("alex@example.com");

  const totalItems = mockWatchedItems.length;
  const activeItems = mockWatchedItems.filter((i) => i.status === "active").length;
  const memberSince = "January 2025";

  return (
    <AppLayout title="Profile" subtitle="Manage your account">
      {/* Avatar & Info */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-surface rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group">
            <div className="w-20 h-20 rounded-2xl bg-sentinel-accent-cyan/15 flex items-center justify-center sentinel-glow">
              <User className="h-10 w-10 text-sentinel-accent-cyan" />
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-sentinel-accent-cyan flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="h-3.5 w-3.5 text-background" />
            </button>
          </div>
          <div className="text-center sm:text-left space-y-1 flex-1">
            <h2 className="text-lg font-display font-semibold text-foreground">{name}</h2>
            <p className="text-sm text-muted-foreground">{email}</p>
            <p className="text-xs text-muted-foreground">Member since {memberSince}</p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-surface text-xs font-medium text-sentinel-accent-cyan">
            <Shield className="h-3.5 w-3.5" /> Free Plan
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="grid grid-cols-3 gap-3">
        <div className="glass-surface rounded-xl p-4 text-center">
          <Eye className="h-4 w-4 text-sentinel-accent-cyan mx-auto mb-1" />
          <p className="text-xl font-display font-bold text-foreground">{activeItems}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Active</p>
        </div>
        <div className="glass-surface rounded-xl p-4 text-center">
          <Calendar className="h-4 w-4 text-sentinel-accent-cyan mx-auto mb-1" />
          <p className="text-xl font-display font-bold text-foreground">{totalItems}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Total</p>
        </div>
        <div className="glass-surface rounded-xl p-4 text-center">
          <Shield className="h-4 w-4 text-sentinel-accent-cyan mx-auto mb-1" />
          <p className="text-xl font-display font-bold text-foreground">10</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Limit</p>
        </div>
      </motion.div>

      {/* Edit */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-surface rounded-2xl p-6 space-y-4">
        <h2 className="font-display font-semibold text-sm text-foreground uppercase tracking-widest">Account Details</h2>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">Display Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="h-11 glass-surface border-sentinel-border bg-transparent text-foreground" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">Email</label>
            <Input value={email} disabled className="h-11 glass-surface border-sentinel-border bg-transparent text-muted-foreground opacity-60" />
          </div>
        </div>
        <Button variant="glass-primary" size="sm">Save Changes</Button>
      </motion.div>

      {/* Danger Zone */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-surface rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-foreground">Sign out</p>
            <p className="text-xs text-muted-foreground">Sign out of your Sentinel account</p>
          </div>
          <Button variant="glass" size="sm" className="gap-2 text-sentinel-severity-high border-sentinel-severity-high/20">
            <LogOut className="h-4 w-4" /> Sign Out
          </Button>
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default Profile;
