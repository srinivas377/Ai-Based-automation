import { useEffect, useState, useCallback } from "react";

export type Status = "saved" | "applied" | "screening" | "interview" | "offer" | "rejected";

export type Application = {
  id: string;
  company: string;
  role: string;
  logo: string;
  match: number;
  date: string;
  next?: string;
  status: Status;
  location?: string;
  salary?: string;
  notes?: string;
  createdAt: number;
};

const STORAGE_KEY = "careeros.applications.v1";

const DEFAULTS: Application[] = [
  { id: "a1", status: "saved", company: "Linear", role: "Frontend Engineer", logo: "L", match: 92, date: "Today", createdAt: Date.now() - 1 * 864e5 },
  { id: "a2", status: "applied", company: "Stripe", role: "Full Stack Engineer", logo: "S", match: 89, date: "2d ago", createdAt: Date.now() - 2 * 864e5 },
  { id: "a3", status: "applied", company: "Notion", role: "Senior Engineer", logo: "N", match: 86, date: "3d ago", createdAt: Date.now() - 3 * 864e5 },
  { id: "a4", status: "screening", company: "Vercel", role: "Platform Engineer", logo: "V", match: 90, date: "5d ago", next: "Recruiter call · Fri", createdAt: Date.now() - 5 * 864e5 },
  { id: "a5", status: "interview", company: "TechCorp AI", role: "Senior SWE", logo: "T", match: 94, date: "1w ago", next: "Onsite · Tue 10am", createdAt: Date.now() - 7 * 864e5 },
  { id: "a6", status: "interview", company: "DataFlow", role: "Backend Engineer", logo: "D", match: 87, date: "1w ago", next: "Tech screen · Wed", createdAt: Date.now() - 8 * 864e5 },
  { id: "a7", status: "offer", company: "CloudScale", role: "Staff Engineer", logo: "C", match: 96, date: "2w ago", next: "$185k · review", createdAt: Date.now() - 14 * 864e5 },
  { id: "a8", status: "rejected", company: "BigCo", role: "Software Engineer", logo: "B", match: 71, date: "3w ago", createdAt: Date.now() - 21 * 864e5 },
];

export function useApplications() {
  const [items, setItems] = useState<Application[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return DEFAULTS;
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {}
  }, [items]);

  // cross-tab / cross-page realtime sync
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try { setItems(JSON.parse(e.newValue)); } catch {}
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const add = useCallback((a: Omit<Application, "id" | "createdAt" | "logo" | "date"> & { logo?: string; date?: string }) => {
    const now = Date.now();
    const item: Application = {
      id: crypto.randomUUID(),
      createdAt: now,
      date: a.date ?? "Just now",
      logo: (a.logo ?? a.company.charAt(0)).toUpperCase(),
      ...a,
    };
    setItems((p) => [item, ...p]);
    return item;
  }, []);

  const update = useCallback((id: string, patch: Partial<Application>) => {
    setItems((p) => p.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  }, []);

  const move = useCallback((id: string, status: Status) => {
    setItems((p) => p.map((x) => (x.id === id ? { ...x, status } : x)));
  }, []);

  const remove = useCallback((id: string) => {
    setItems((p) => p.filter((x) => x.id !== id));
  }, []);

  const reset = useCallback(() => setItems(DEFAULTS), []);

  return { items, setItems, add, update, move, remove, reset };
}
