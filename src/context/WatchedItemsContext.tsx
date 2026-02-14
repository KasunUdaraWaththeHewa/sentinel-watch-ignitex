import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { mockWatchedItems } from "@/lib/mock-data";
import { ItemStatus, type WatchedItem } from "@/types/sentinel";

const STORAGE_KEY = "sentinel.watched-items.v1";

interface WatchedItemsContextValue {
  items: WatchedItem[];
  markHandled: (id: string) => void;
  snoozeItem: (id: string) => void;
  reactivateItem: (id: string) => void;
}

const WatchedItemsContext = createContext<WatchedItemsContextValue | undefined>(undefined);

const reviveItems = (serialized: string): WatchedItem[] => {
  const parsed = JSON.parse(serialized) as Array<Omit<WatchedItem, "nextDate" | "createdAt"> & { nextDate: string; createdAt: string }>;

  return parsed.map((item) => ({
    ...item,
    nextDate: new Date(item.nextDate),
    createdAt: new Date(item.createdAt),
  }));
};

const sortByDateAsc = (items: WatchedItem[]) => [...items].sort((a, b) => a.nextDate.getTime() - b.nextDate.getTime());

export function WatchedItemsProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WatchedItem[]>(() => sortByDateAsc(mockWatchedItems));

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    try {
      setItems(sortByDateAsc(reviveItems(stored)));
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const updateStatus = (id: string, status: ItemStatus) => {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const value = useMemo<WatchedItemsContextValue>(
    () => ({
      items,
      markHandled: (id: string) => updateStatus(id, ItemStatus.Handled),
      snoozeItem: (id: string) => updateStatus(id, ItemStatus.Snoozed),
      reactivateItem: (id: string) => updateStatus(id, ItemStatus.Active),
    }),
    [items]
  );

  return <WatchedItemsContext.Provider value={value}>{children}</WatchedItemsContext.Provider>;
}

export function useWatchedItems() {
  const context = useContext(WatchedItemsContext);
  if (!context) {
    throw new Error("useWatchedItems must be used within WatchedItemsProvider");
  }

  return context;
}
