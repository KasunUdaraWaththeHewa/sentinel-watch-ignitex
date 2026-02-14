import { useState } from "react";
import { AppLayout } from "@/components/sentinel/AppLayout";
import { FloatingActionButton } from "@/components/sentinel/FloatingActionButton";
import { mockWatchedItems } from "@/lib/mock-data";
import { DEFAULT_CATEGORIES, CATEGORY_ICONS, DEFAULT_CATEGORY_IDS, AVAILABLE_COLORS } from "@/lib/constants";
import { type Category } from "@/types/sentinel";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Palette, AlertTriangle, Trash2, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newColor, setNewColor] = useState("cyan");
  const [deleteConfirm, setDeleteConfirm] = useState<Category | null>(null);

  const handleAdd = () => {
    if (!newName.trim()) return;
    const id = newName.toLowerCase().replace(/\s+/g, "-");
    setCategories([...categories, { id, name: newName.trim(), icon: "documents", color: newColor, count: 0 }]);
    setNewName("");
    setNewColor("cyan");
    setShowAdd(false);
  };

  const getItemsForCategory = (categoryId: string) =>
    mockWatchedItems.filter((item) => item.category.id === categoryId);

  const handleConfirmRemove = () => {
    if (!deleteConfirm) return;
    setCategories(categories.filter((c) => c.id !== deleteConfirm.id));
    setDeleteConfirm(null);
  };

  const isDefault = (id: string) => DEFAULT_CATEGORY_IDS.has(id);

  return (
    <AppLayout
      title="Categories"
      subtitle="Organize what Sentinel watches."
      headerRight={
        <Button variant="glass-primary" size="sm" onClick={() => setShowAdd(!showAdd)} className="gap-2">
          {showAdd ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          <span className="hidden sm:inline">{showAdd ? "Cancel" : "New Category"}</span>
        </Button>
      }
    >
      {/* Add Form */}
      <AnimatePresence>
        {showAdd && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <div className="glass-surface rounded-2xl p-5 sm:p-6 space-y-4">
              <h3 className="font-display font-semibold text-sm text-foreground uppercase tracking-widest">Create Category</h3>
              <Input
                placeholder="Category name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="h-11 border-sentinel-border bg-transparent text-foreground placeholder:text-muted-foreground rounded-xl focus:ring-1 focus:ring-sentinel-accent-cyan/40"
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              />
              <div className="space-y-2">
                <label className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium flex items-center gap-1.5"><Palette className="h-3 w-3" /> Color</label>
                <div className="flex gap-2.5">
                  {AVAILABLE_COLORS.map((c) => (
                    <button key={c.name} onClick={() => setNewColor(c.name)} className={cn("w-9 h-9 rounded-full transition-all duration-300", c.class, newColor === c.name ? "ring-2 ring-foreground ring-offset-2 ring-offset-background scale-110" : "opacity-50 hover:opacity-80")} />
                  ))}
                </div>
              </div>
              <Button onClick={handleAdd} disabled={!newName.trim()} className="bg-sentinel-accent-cyan text-background hover:opacity-90 rounded-xl" size="sm">Create Category</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {categories.map((cat, i) => {
          const Icon = CATEGORY_ICONS[cat.icon] || CATEGORY_ICONS.documents;
          const isDefaultCat = isDefault(cat.id);
          const itemCount = getItemsForCategory(cat.id).length || cat.count;
          return (
            <motion.div key={cat.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.03 }} className="glass-surface-hover rounded-2xl p-5 space-y-3 group relative">
              {!isDefaultCat && (
                <button onClick={() => setDeleteConfirm(cat)} className="absolute top-3 right-3 w-7 h-7 rounded-full bg-destructive/10 text-destructive flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110" title="Remove category">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", cat.color === "violet" ? "bg-sentinel-accent-violet/10" : "bg-sentinel-accent-cyan/10")}>
                <Icon className={cn("h-5 w-5", cat.color === "violet" ? "text-sentinel-accent-violet" : "text-sentinel-accent-cyan")} />
              </div>
              <div>
                <h3 className="font-medium text-sm text-foreground">{cat.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{itemCount} {itemCount === 1 ? "item" : "items"}</p>
              </div>
              {isDefaultCat && (
                <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-widest text-muted-foreground/50">
                  <Lock className="h-2.5 w-2.5" /> Default
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Delete Dialog */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/60 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} transition={{ duration: 0.2 }} onClick={(e) => e.stopPropagation()} className="glass-surface rounded-2xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display font-semibold text-foreground">Remove "{deleteConfirm.name}"?</h3>
                  {(() => {
                    const items = getItemsForCategory(deleteConfirm.id);
                    if (items.length > 0) {
                      return (
                        <div className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            This category has <strong className="text-foreground">{items.length} watched {items.length === 1 ? "item" : "items"}</strong>. Remove or reassign them first.
                          </p>
                          <div className="rounded-xl bg-muted/30 p-3 space-y-2 max-h-40 overflow-y-auto">
                            {items.map((item) => (
                              <div key={item.id} className="flex items-center gap-2 text-sm">
                                <div className={cn("w-2 h-2 rounded-full flex-shrink-0", item.severity === "high" ? "bg-sentinel-severity-high" : item.severity === "medium" ? "bg-sentinel-severity-medium" : "bg-sentinel-severity-low")} />
                                <span className="text-foreground truncate">{item.title}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return <p className="text-sm text-muted-foreground">No watched items in this category. It can be safely removed.</p>;
                  })()}
                </div>
              </div>
              <div className="flex items-center justify-end gap-2">
                <Button variant="glass" size="sm" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
                {getItemsForCategory(deleteConfirm.id).length === 0 && (
                  <Button variant="destructive" size="sm" onClick={handleConfirmRemove}>Remove</Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <FloatingActionButton />
    </AppLayout>
  );
};

export default Categories;
