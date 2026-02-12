import { useState } from "react";
import { TopNav, BottomNav } from "@/components/sentinel/Navigation";
import { FloatingActionButton } from "@/components/sentinel/FloatingActionButton";
import { defaultCategories, CATEGORY_ICONS, mockWatchedItems, type Category } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Palette, AlertTriangle, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const AVAILABLE_COLORS = [
  { name: "cyan", class: "bg-sentinel-accent-cyan" },
  { name: "violet", class: "bg-sentinel-accent-violet" },
  { name: "amber", class: "bg-sentinel-severity-medium" },
  { name: "red", class: "bg-sentinel-severity-high" },
  { name: "blue", class: "bg-sentinel-severity-low" },
];

const DEFAULT_CATEGORY_IDS = new Set(defaultCategories.map((c) => c.id));

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newColor, setNewColor] = useState("cyan");
  const [deleteConfirm, setDeleteConfirm] = useState<Category | null>(null);

  const handleAdd = () => {
    if (!newName.trim()) return;
    const id = newName.toLowerCase().replace(/\s+/g, "-");
    setCategories([
      ...categories,
      { id, name: newName.trim(), icon: "documents", color: newColor, count: 0 },
    ]);
    setNewName("");
    setNewColor("cyan");
    setShowAdd(false);
  };

  const getItemsForCategory = (categoryId: string) => {
    return mockWatchedItems.filter((item) => item.category.id === categoryId);
  };

  const handleRemoveRequest = (cat: Category) => {
    setDeleteConfirm(cat);
  };

  const handleConfirmRemove = () => {
    if (!deleteConfirm) return;
    setCategories(categories.filter((c) => c.id !== deleteConfirm.id));
    setDeleteConfirm(null);
  };

  const isDefault = (id: string) => DEFAULT_CATEGORY_IDS.has(id);

  return (
    <div className="min-h-screen bg-background bg-noise">
      <TopNav />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 md:pb-12 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-display font-semibold text-foreground tracking-tight">
              Categories
            </h1>
            <p className="text-sm text-muted-foreground">
              Organize what Sentinel watches. Default categories cannot be removed.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdd(!showAdd)}
            className="gap-2 border-sentinel-border hover:bg-sentinel-surface"
          >
            {showAdd ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            <span className="hidden sm:inline">{showAdd ? "Cancel" : "New"}</span>
          </Button>
        </motion.div>

        {/* Add form */}
        <AnimatePresence>
          {showAdd && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="glass-surface rounded-2xl p-5 sm:p-6 space-y-4">
                <h3 className="font-display font-medium text-foreground text-sm">Create Category</h3>
                <Input
                  placeholder="Category name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="glass-surface border-sentinel-border bg-transparent text-foreground placeholder:text-muted-foreground h-11"
                  onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                />
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Palette className="h-3 w-3" /> Color
                  </label>
                  <div className="flex gap-2.5">
                    {AVAILABLE_COLORS.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setNewColor(c.name)}
                        className={cn(
                          "w-9 h-9 rounded-full transition-all duration-300",
                          c.class,
                          newColor === c.name
                            ? "ring-2 ring-foreground ring-offset-2 ring-offset-background scale-110"
                            : "opacity-60 hover:opacity-100"
                        )}
                      />
                    ))}
                  </div>
                </div>
                <Button
                  onClick={handleAdd}
                  disabled={!newName.trim()}
                  className="bg-sentinel-accent-cyan text-background hover:opacity-90"
                  size="sm"
                >
                  Create Category
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {categories.map((cat, i) => {
            const Icon = CATEGORY_ICONS[cat.icon] || CATEGORY_ICONS.documents;
            const isDefaultCat = isDefault(cat.id);
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="glass-surface-hover rounded-2xl p-5 space-y-3 group relative"
              >
                {/* Remove button — only for custom categories */}
                {!isDefaultCat && (
                  <button
                    onClick={() => handleRemoveRequest(cat)}
                    className="absolute top-3 right-3 w-7 h-7 rounded-full bg-destructive/10 text-destructive flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove category"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
                <div className="w-10 h-10 rounded-xl bg-sentinel-accent-cyan/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-sentinel-accent-cyan" />
                </div>
                <div>
                  <h3 className="font-medium text-sm text-foreground">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {cat.count} {cat.count === 1 ? "item" : "items"} watched
                  </p>
                </div>
                {isDefaultCat && (
                  <span className="text-[9px] uppercase tracking-widest text-muted-foreground/60">Default</span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Delete confirmation dialog */}
        <AnimatePresence>
          {deleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/60 backdrop-blur-sm"
              onClick={() => setDeleteConfirm(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-surface rounded-2xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-semibold text-foreground">
                      Remove "{deleteConfirm.name}"?
                    </h3>
                    {(() => {
                      const items = getItemsForCategory(deleteConfirm.id);
                      if (items.length > 0) {
                        return (
                          <div className="space-y-3">
                            <p className="text-sm text-muted-foreground">
                              This category has <strong className="text-foreground">{items.length} watched {items.length === 1 ? "item" : "items"}</strong>. You need to remove or reassign them before deleting this category.
                            </p>
                            <div className="glass-surface rounded-xl p-3 space-y-2 max-h-40 overflow-y-auto">
                              {items.map((item) => (
                                <div key={item.id} className="flex items-center gap-2 text-sm">
                                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                                    item.severity === "high" ? "bg-sentinel-severity-high" :
                                    item.severity === "medium" ? "bg-sentinel-severity-medium" :
                                    "bg-sentinel-severity-low"
                                  }`} />
                                  <span className="text-foreground truncate">{item.title}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      return (
                        <p className="text-sm text-muted-foreground">
                          This category has no watched items and can be safely removed. This action cannot be undone.
                        </p>
                      );
                    })()}
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeleteConfirm(null)}
                    className="border-sentinel-border"
                  >
                    Cancel
                  </Button>
                  {getItemsForCategory(deleteConfirm.id).length === 0 && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleConfirmRemove}
                    >
                      Remove Category
                    </Button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <FloatingActionButton />
      <BottomNav />
    </div>
  );
};

export default Categories;
