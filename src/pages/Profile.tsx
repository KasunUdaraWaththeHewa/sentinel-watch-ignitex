import { useState } from "react";
import { AppLayout } from "@/components/sentinel/AppLayout";
import { motion } from "framer-motion";
import { User, Mail, Camera, LogOut, Shield, Calendar, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockWatchedItems } from "@/lib/mock-data";
import { ItemStatus } from "@/types/sentinel";

const Profile = () => {
  const [name, setName] = useState("Alex Morgan");
  const [email] = useState("alex@example.com");

  const totalItems = mockWatchedItems.length;
  const activeItems = mockWatchedItems.filter((i) => i.status === ItemStatus.Active).length;
  const memberSince = "January 2025";

  return (
    <AppLayout title="Profile" subtitle="Manage your account">
      {/* Avatar & Info */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass-surface rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group">
            <div className="w-20 h-20 rounded-2xl bg-sentinel-accent-cyan/15 flex items-center justify-center sentinel-glow">
              <User className="h-10 w-10 text-sentinel-accent-cyan" />
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-sentinel-accent-cyan flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 shadow-lg">
              <Camera className="h-3.5 w-3.5 text-background" />
            </button>
          </div>
          <div className="text-center sm:text-left space-y-1 flex-1">
            <h2 className="text-lg font-display font-semibold text-foreground">{name}</h2>
            <p className="text-sm text-muted-foreground">{email}</p>
            <p className="text-xs text-muted-foreground">Member since {memberSince}</p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sentinel-accent-cyan/10 ring-1 ring-sentinel-accent-cyan/20 text-xs font-medium text-sentinel-accent-cyan">
            <Shield className="h-3.5 w-3.5" /> Free Plan
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-3 gap-3">
        <ProfileStat icon={Eye} value={activeItems} label="Active" />
        <ProfileStat icon={Calendar} value={totalItems} label="Total" />
        <ProfileStat icon={Shield} value={10} label="Limit" />
      </motion.div>

      {/* Edit */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-surface rounded-2xl p-6 space-y-4">
        <h2 className="font-display font-semibold text-sm text-foreground uppercase tracking-widest">Account Details</h2>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Display Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="h-11 border-sentinel-border bg-transparent text-foreground rounded-xl focus:ring-1 focus:ring-sentinel-accent-cyan/40" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Email</label>
            <Input value={email} disabled className="h-11 border-sentinel-border bg-transparent text-muted-foreground opacity-60 rounded-xl" />
          </div>
        </div>
        <Button variant="glass-primary" size="sm" className="rounded-xl">Save Changes</Button>
      </motion.div>

      {/* Sign Out */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-surface rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-foreground">Sign out</p>
            <p className="text-xs text-muted-foreground">Sign out of your Sentinel account</p>
          </div>
          <Button variant="glass" size="sm" className="gap-2 text-sentinel-severity-high border-sentinel-severity-high/20 hover:bg-sentinel-severity-high/5 rounded-xl">
            <LogOut className="h-4 w-4" /> Sign Out
          </Button>
        </div>
      </motion.div>
    </AppLayout>
  );
};

function ProfileStat({ icon: Icon, value, label }: { icon: React.ComponentType<{ className?: string }>; value: number; label: string }) {
  return (
    <div className="glass-surface rounded-xl p-4 text-center space-y-1">
      <Icon className="h-4 w-4 text-sentinel-accent-cyan mx-auto" />
      <p className="text-xl font-display font-bold text-foreground">{value}</p>
      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
    </div>
  );
}

export default Profile;
