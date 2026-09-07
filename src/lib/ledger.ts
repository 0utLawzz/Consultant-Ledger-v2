import type { Consultant, LedgerEntry } from "./types";

export function computedBalance(entries: LedgerEntry[]): number {
  return entries.reduce((sum, e) => sum + (e.due || 0) - (e.received || 0), 0);
}

export function outstanding(c: Consultant): number {
  if (c.live) return computedBalance(c.entries);
  if (c.statedBalance != null) return c.statedBalance;
  return computedBalance(c.entries);
}

export function totals(entries: LedgerEntry[]) {
  let due = 0;
  let received = 0;
  for (const e of entries) {
    due += e.due || 0;
    received += e.received || 0;
  }
  return { due, received, balance: due - received };
}

export function withRunning(entries: LedgerEntry[]) {
  let run = 0;
  return entries.map((e) => {
    run += (e.due || 0) - (e.received || 0);
    return { ...e, running: run };
  });
}

export function statusOf(balance: number): "outstanding" | "settled" | "credit" {
  if (balance > 0) return "outstanding";
  if (balance < 0) return "credit";
  return "settled";
}

export function matchesQuery(c: Consultant, q: string): boolean {
  const s = q.trim().toLowerCase();
  if (!s) return true;
  if (c.id.toLowerCase().includes(s) || c.name.toLowerCase().includes(s)) return true;
  if (c.city?.toLowerCase().includes(s) || c.notes?.toLowerCase().includes(s)) return true;
  return c.entries.some(
    (e) =>
      e.details.toLowerCase().includes(s) ||
      e.folderNo.toLowerCase().includes(s) ||
      e.tmNo.toLowerCase().includes(s) ||
      e.stage.toLowerCase().includes(s),
  );
}

export type SearchHit = {
  consultant: Consultant;
  entry: LedgerEntry;
};

export function searchEntries(consultants: Consultant[], q: string): SearchHit[] {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  const hits: SearchHit[] = [];
  for (const c of consultants) {
    for (const e of c.entries) {
      const blob = `${c.id} ${c.name} ${e.details} ${e.folderNo} ${e.tmNo} ${e.stage}`.toLowerCase();
      if (blob.includes(s)) hits.push({ consultant: c, entry: e });
      if (hits.length >= 200) return hits;
    }
  }
  return hits;
}

export type YearBucket = {
  year: string;
  due: number;
  received: number;
  n: number;
};

export function yearBuckets(consultants: Consultant[]): YearBucket[] {
  const map = new Map<string, YearBucket>();
  for (const c of consultants) {
    for (const e of c.entries) {
      const year = e.date ? e.date.slice(0, 4) : "Undated";
      const cur = map.get(year) ?? { year, due: 0, received: 0, n: 0 };
      cur.due += e.due || 0;
      cur.received += e.received || 0;
      cur.n += 1;
      map.set(year, cur);
    }
  }
  return [...map.values()].sort((a, b) => a.year.localeCompare(b.year));
}

export function bookKpis(consultants: Consultant[]) {
  const bals = consultants.map((c) => outstanding(c));
  const due = bals.filter((n) => n > 0).reduce((a, b) => a + b, 0);
  const credit = bals.filter((n) => n < 0).reduce((a, b) => a + b, 0);
  const openN = bals.filter((n) => n > 0).length;
  const settled = bals.filter((n) => n === 0).length;
  const creditN = bals.filter((n) => n < 0).length;
  const filings = consultants.reduce((a, c) => a + c.entries.length, 0);
  let billed = 0;
  let received = 0;
  for (const c of consultants) {
    const t = totals(c.entries);
    billed += t.due;
    received += t.received;
  }
  return {
    due,
    credit,
    openN,
    settled,
    creditN,
    filings,
    n: consultants.length,
    billed,
    received,
  };
}
