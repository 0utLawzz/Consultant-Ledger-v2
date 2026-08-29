export function formatPkr(n: number, opts?: { sign?: boolean }): string {
  const abs = Math.abs(Math.round(n));
  const body = abs.toLocaleString("en-US");
  if (n < 0) return `-PKR ${body}`;
  if (opts?.sign && n > 0) return `+PKR ${body}`;
  return `PKR ${body}`;
}

export function formatPkrCompact(n: number): string {
  const abs = Math.abs(n);
  const sign = n < 0 ? "-" : "";
  if (abs >= 1_000_000) return `${sign}${(abs / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `${sign}${(abs / 1_000).toFixed(abs >= 10_000 ? 0 : 1)}k`;
  return `${sign}${abs.toLocaleString("en-US")}`;
}

export function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const mi = Number(m) - 1;
  return `${d.padStart(2, "0")}-${months[mi] ?? m}-${y}`;
}

export function todayIso(): string {
  const t = new Date();
  const y = t.getFullYear();
  const m = String(t.getMonth() + 1).padStart(2, "0");
  const d = String(t.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function parseAmount(raw: string): number {
  const cleaned = raw.replace(/[^\d.-]/g, "");
  if (!cleaned) return 0;
  const n = Number(cleaned);
  return Number.isFinite(n) ? Math.round(n) : 0;
}
