import { useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { Shell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { useLedger } from "@/lib/store";
import { bookKpis, outstanding, yearBuckets } from "@/lib/ledger";
import { bookCsv, downloadText, indexCsv } from "@/lib/export";
import { formatPkr, formatPkrCompact } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/reports")({ component: ReportsPage });

function ReportsPage() {
  const consultants = useLedger((s) => s.consultants);
  const company = useLedger((s) => s.company);

  const kpis = useMemo(() => bookKpis(consultants), [consultants]);
  const years = useMemo(() => yearBuckets(consultants), [consultants]);
  const ranked = useMemo(() => {
    return consultants
      .map((c) => ({ id: c.id, name: c.name, bal: outstanding(c), n: c.entries.length }))
      .filter((x) => x.bal !== 0)
      .sort((a, b) => Math.abs(b.bal) - Math.abs(a.bal));
  }, [consultants]);

  const maxDue = Math.max(1, ...years.map((y) => y.due));
  const maxRecv = Math.max(1, ...years.map((y) => y.received));
  const maxAbs = Math.max(1, ...ranked.map((r) => Math.abs(r.bal)));
  const mixTotal = Math.max(1, kpis.n);

  return (
    <Shell>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-3xl tracking-tight">Reports</h1>
            <p className="mt-1 max-w-lg text-sm text-muted">
              Book outstanding for {company.name} — {kpis.n} consultants, {kpis.filings.toLocaleString("en-US")}{" "}
              entries.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => downloadText("brandex-index.csv", indexCsv(consultants))}
            >
              <Download className="size-3.5" />
              Index CSV
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => downloadText("brandex-book.csv", bookCsv(consultants))}
            >
              <Download className="size-3.5" />
              Full book
            </Button>
          </div>
        </div>

        <section className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-rule sm:grid-cols-4">
          <Stat label="Outstanding" value={formatPkr(kpis.due)} hint={`${kpis.openN} open`} />
          <Stat label="Billed" value={formatPkrCompact(kpis.billed)} hint="All filings" />
          <Stat label="Received" value={formatPkrCompact(kpis.received)} hint="All payments" />
          <Stat
            label="Settled"
            value={String(kpis.settled)}
            hint={kpis.creditN ? `${kpis.creditN} in credit` : "Ledgers at zero"}
          />
        </section>

        <section className="rounded-xl border border-rule bg-ivory p-4 sm:p-5">
          <h2 className="font-display text-lg text-ink">Ledger mix</h2>
          <p className="mt-1 text-xs text-muted">Share of consultants by printed outstanding.</p>
          <div className="mt-4 flex h-3 overflow-hidden rounded-full bg-paper-2">
            <span className="bg-due" style={{ width: `${(kpis.openN / mixTotal) * 100}%` }} />
            <span className="bg-recv" style={{ width: `${(kpis.settled / mixTotal) * 100}%` }} />
            <span className="bg-credit" style={{ width: `${(kpis.creditN / mixTotal) * 100}%` }} />
          </div>
          <ul className="mt-3 flex flex-wrap gap-4 text-xs text-ink-soft">
            <li className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-due" />
              Due {kpis.openN}
            </li>
            <li className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-recv" />
              Settled {kpis.settled}
            </li>
            <li className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-credit" />
              Credit {kpis.creditN}
            </li>
          </ul>
        </section>

        <section className="rounded-xl border border-rule bg-ivory p-4 sm:p-5">
          <h2 className="font-display text-lg text-ink">Activity by year</h2>
          <p className="mt-1 text-xs text-muted">Filings billed vs payments received.</p>
          <ul className="mt-4 grid gap-3">
            {years.map((y) => (
              <li key={y.year} className="grid grid-cols-[4.5rem_1fr_auto] items-center gap-3">
                <span className="font-mono text-xs text-muted">{y.year}</span>
                <span className="grid gap-1">
                  <span className="h-1.5 overflow-hidden rounded-full bg-paper-2">
                    <span
                      className="block h-full rounded-full bg-due"
                      style={{ width: `${Math.max(4, (y.due / maxDue) * 100)}%` }}
                    />
                  </span>
                  <span className="h-1.5 overflow-hidden rounded-full bg-paper-2">
                    <span
                      className="block h-full rounded-full bg-recv"
                      style={{ width: `${Math.max(4, (y.received / maxRecv) * 100)}%` }}
                    />
                  </span>
                </span>
                <span className="text-right text-xs tabular text-ink-soft">
                  <span className="block text-due">{formatPkrCompact(y.due)}</span>
                  <span className="block text-recv">{formatPkrCompact(y.received)}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-rule bg-ivory">
          <div className="flex items-baseline justify-between border-b border-rule px-4 py-3 sm:px-5">
            <h2 className="font-display text-lg text-ink">Open and credit ledgers</h2>
            <p className="text-xs text-muted">{ranked.length} of {kpis.n}</p>
          </div>
          <ul className="divide-y divide-rule">
            {ranked.map((row) => (
              <li key={row.id}>
                <Link
                  to="/ledger/$id"
                  params={{ id: row.id }}
                  className="grid grid-cols-[5.5rem_1fr_auto] items-center gap-3 px-4 py-2.5 hover:bg-paper-2 sm:px-5"
                >
                  <span className="font-mono text-xs text-muted">{row.id}</span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm text-ink">{row.name}</span>
                    <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-paper-2">
                      <span
                        className={cn(
                          "block h-full rounded-full",
                          row.bal > 0 ? "bg-due" : "bg-credit",
                        )}
                        style={{ width: `${Math.max(8, (Math.abs(row.bal) / maxAbs) * 100)}%` }}
                      />
                    </span>
                  </span>
                  <span className="text-right">
                    <span
                      className={cn(
                        "block tabular text-sm font-medium",
                        row.bal > 0 ? "text-due" : "text-credit",
                      )}
                    >
                      {formatPkr(row.bal)}
                    </span>
                    <StatusBadge balance={row.bal} className="mt-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Shell>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="bg-ivory px-4 py-4 sm:px-5">
      <p className="text-[10px] font-medium tracking-[0.16em] text-muted uppercase">{label}</p>
      <p className="mt-1 font-display text-xl tabular text-ink">{value}</p>
      <p className="mt-0.5 text-xs text-muted">{hint}</p>
    </div>
  );
}
