"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type BagItem = { id: string; name: string; price: number; image: string; size?: string; quantity: number };
type BagContextValue = { items: BagItem[]; count: number; addItems: (items: Omit<BagItem, "quantity">[]) => void; remove: (id: string) => void; update: (id: string, quantity: number) => void; notice: string };
const BagContext = createContext<BagContextValue | null>(null);
const STORAGE_KEY = "orbit-storefront-bag";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BagItem[]>([]);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(saved)) setItems(saved.filter((item): item is BagItem =>
        !!item && typeof item.id === "string" && typeof item.name === "string" &&
        typeof item.price === "number" && Number.isFinite(item.price) && item.price >= 0 &&
        typeof item.image === "string" && typeof item.quantity === "number" &&
        Number.isInteger(item.quantity) && item.quantity > 0
      ));
    } catch { /* A blocked or invalid local store falls back to an empty bag. */ }
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch { /* Keep the session bag available. */ } }
  }, [items, ready]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 3500);
    return () => clearTimeout(timer);
  }, [notice]);
  function addItems(incoming: Omit<BagItem, "quantity">[]) {
    setItems((current) => {
      const next = current.map((item) => ({ ...item }));
      for (const item of incoming) {
        const found = next.find((entry) => entry.id === item.id);
        if (found) found.quantity += 1;
        else next.push({ ...item, quantity: 1 });
      }
      return next;
    });
    setNotice(`${incoming.length === 1 ? incoming[0].name : "Your complete look"} added to bag.`);
  }
  return <BagContext.Provider value={{ items, count: items.reduce((sum, item) => sum + item.quantity, 0), addItems, remove: (id) => setItems((current) => current.filter((item) => item.id !== id)), update: (id, quantity) => setItems((current) => current.map((item) => item.id === id ? { ...item, quantity: Math.max(1, Math.min(99, quantity)) } : item)), notice }}>
    {children}
    <div className={`bag-notice ${notice ? "visible" : ""}`} role="status">{notice}</div>
  </BagContext.Provider>;
}
export function useCart() {
  const value = useContext(BagContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}
