import { useState } from "react";
import { TopNav, BottomNav } from "@/components/sentinel/Navigation";
import { FloatingActionButton } from "@/components/sentinel/FloatingActionButton";
import { defaultCategories, CATEGORY_ICONS, type Category } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Palette } from "lucide-react";
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

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newColor, setNewColor] = useState("cyan");

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

  const handleRemove = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-background bg-noise">
      <TopNav />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 pb-28 md:pb-12 space-y-8">
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
              Organize what Sentinel watches.
            </p>
          </div>
          <Button
            variant="glass"
            size="sm"
            onClick={() => setShowAdd(!showAdd)}
            className="gap-2"
          >
            {showAdd ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            <span className="hidden sm:inline">{showAdd ? "Cancel" : "New"}</span>
          </Button>
        </motion.div>

        {/* Add new category form */}
        <AnimatePresence>
          {showAdd && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="glass-surface rounded-2xl p-5 space-y-4">
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
                  <div className="flex gap-2">
                    {AVAILABLE_COLORS.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setNewColor(c.name)}
                        className={cn(
                          "w-8 h-8 rounded-full transition-all duration-300",
                          c.class,
                          newColor === c.name
                            ? "ring-2 ring-foreground ring-offset-2 ring-offset-background scale-110"
                            : "opacity-60 hover:opacity-100"
                        )}
                      />
                    ))}
                  </div>
                </div>
                <Button variant="glass-primary" size="sm" onClick={handleAdd} disabled={!newName.trim()}>
                  Create Category
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {categories.map((cat, i) => {
            const Icon = CATEGORY_ICONS[cat.icon] || CATEGORY_ICONS.documents;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glass-surface-hover rounded-2xl p-5 space-y-3 group relative"
              >
                {/* Remove button for custom categories */}
                {!defaultCategories.find((d) => d.id === cat.id) && (
                  <button
                    onClick={() => handleRemove(cat.id)}
                    className="absolute top-3 right-3 w-6 h-6 rounded-full bg-destructive/10 text-destructive flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
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
              </motion.div>
            );
          })}
        </div>
      </main>
      <FloatingActionButton />
      <BottomNav />
    </div>
  );
};

export default Categories;
