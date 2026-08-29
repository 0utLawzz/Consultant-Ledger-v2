import { create } from "zustand";
import { persist } from "zustand/middleware";
import seed from "@/data/seed.json";
import type { Company, Consultant, LedgerEntry } from "./types";
import { uid } from "./utils";

const SEED_VERSION = 1;

type Filter = "all" | "outstanding" | "settled" | "credit";

type LedgerState = {
  seedVersion: number;
  company: Company;
  consultants: Consultant[];
  filter: Filter;
  query: string;
  setFilter: (f: Filter) => void;
  setQuery: (q: string) => void;
  getConsultant: (id: string) => Consultant | undefined;
  addConsultant: (input: { id?: string; name: string; notes?: string }) => string;
  updateConsultant: (id: string, patch: Partial<Pick<Consultant, "name" | "city" | "phone" | "notes">>) => void;
  removeConsultant: (id: string) => void;
  addEntry: (consultantId: string, entry: Omit<LedgerEntry, "id">) => void;
  updateEntry: (consultantId: string, entry: LedgerEntry) => void;
  removeEntry: (consultantId: string, entryId: string) => void;
  resetBook: () => void;
};

function fromSeed(): Pick<LedgerState, "seedVersion" | "company" | "consultants"> {
  return {
    seedVersion: SEED_VERSION,
    company: seed.company as Company,
    consultants: (seed.consultants as Consultant[]).map((c) => ({
      ...c,
      live: false,
      entries: c.entries.map((e) => ({ ...e })),
    })),
  };
}

function markLive(c: Consultant): Consultant {
  return { ...c, live: true };
}

export const useLedger = create<LedgerState>()(
  persist(
    (set, get) => ({
      ...fromSeed(),
      filter: "all",
      query: "",
      setFilter: (filter) => set({ filter }),
      setQuery: (query) => set({ query }),
      getConsultant: (id) => get().consultants.find((c) => c.id === id),
      addConsultant: (input) => {
        const existing = get().consultants.map((c) => c.id);
        let id = (input.id || "").trim().toUpperCase();
        if (!id) {
          const nums = existing
            .map((x) => Number((x.match(/A-(\d+)/) || [])[1]))
            .filter((n) => Number.isFinite(n));
          const next = (nums.length ? Math.max(...nums) : 0) + 1;
          id = `A-${String(next).padStart(3, "0")}`;
        }
        if (existing.includes(id)) id = `${id}-${uid("x").slice(-4)}`;
        const row: Consultant = {
          id,
          name: input.name.trim() || "Untitled",
          notes: input.notes?.trim() || "",
          statedBalance: 0,
          live: true,
          entries: [],
        };
        set({ consultants: [...get().consultants, row] });
        return id;
      },
      updateConsultant: (id, patch) =>
        set({
          consultants: get().consultants.map((c) => (c.id === id ? { ...c, ...patch } : c)),
        }),
      removeConsultant: (id) =>
        set({ consultants: get().consultants.filter((c) => c.id !== id) }),
      addEntry: (consultantId, entry) =>
        set({
          consultants: get().consultants.map((c) => {
            if (c.id !== consultantId) return c;
            const row: LedgerEntry = { ...entry, id: uid("e") };
            return markLive({ ...c, entries: [...c.entries, row] });
          }),
        }),
      updateEntry: (consultantId, entry) =>
        set({
          consultants: get().consultants.map((c) => {
            if (c.id !== consultantId) return c;
            return markLive({
              ...c,
              entries: c.entries.map((e) => (e.id === entry.id ? entry : e)),
            });
          }),
        }),
      removeEntry: (consultantId, entryId) =>
        set({
          consultants: get().consultants.map((c) => {
            if (c.id !== consultantId) return c;
            return markLive({ ...c, entries: c.entries.filter((e) => e.id !== entryId) });
          }),
        }),
      resetBook: () => set({ ...fromSeed(), filter: "all", query: "" }),
    }),
    {
      name: "brandex-ledger-v1",
      skipHydration: true,
      partialize: (s) => ({
        seedVersion: s.seedVersion,
        company: s.company,
        consultants: s.consultants,
      }),
      merge: (persisted, current) => {
        const p = persisted as Partial<LedgerState> | undefined;
        if (!p || p.seedVersion !== SEED_VERSION || !p.consultants?.length) {
          return { ...current, ...fromSeed() };
        }
        return { ...current, ...p };
      },
    },
  ),
);
