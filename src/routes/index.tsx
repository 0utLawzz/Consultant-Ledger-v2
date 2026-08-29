import { useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Plus, RotateCcw, Search } from "lucide-react";
import { Shell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConsultantDialog } from "@/components/consultant-dialog";
import { StatusBadge } from "@/components/status-badge";
import { useLedger } from "@/lib/store";
import { matchesQuery, outstanding, statusOf, totals } from "@/lib/ledger";
import { formatPkr, formatPkrCompact } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Consultant } from "@/lib/types";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const navigate = useNavigate();
  const consultants = useLedger((s) => s.consultants);
  const company = useLedger((s) => s.company);
  const filter = useLedger((s) => s.filter);
  const query = useLedger((s) => s.query);
  const setFilter = useLedger((s) => s.setFilter);
  const setQuery = useLedger((s) => s.setQuery);
  const addConsultant = useLedger((s) => s.addConsultant);
  const resetBook = useLedger((s) => s.resetBook);
  const [open, setOpen] = useState(false);

  const rows = useMemo(() => {
    return consultants
      .map((c) => ({ c, bal: outstanding(c), n: c.entries.length }))
      .filter(({ c, bal }) => {
        if (!matchesQuery(c, query)) return false;
        const st = statusOf(bal);
        if (filter === "all") return true;
        return st === filter;
      });
  }, [consultants, filter, query]);

  const kpis = useMemo(() => {
    const all = consultants.map((c) => outstanding(c));
    const due = all.filter((n) => n > 0).reduce((a, b) => a + b, 0);
    const credit = all.filter((n) => n < 0).reduce((a, b) => a + b, 0);
    const openN = all.filter((n) => n > 0).length;
    const settled = all.filter((n) => n === 0).length;
    const filings = consultants.reduce((a, c) => a + c.entries.length, 0);
    return { due, credit, openN, settled, filings, n: consultants.length };
  }, [consultants]);

  const top = useMemo(() => {
    return consultants
      .map((c) => ({ id: c.id, name: c.name, bal: outstanding(c) }))
      .filter((x) => x.bal > 0)
      .sort((a, b) => b.bal - a.bal)
      .slice(0, 8);
  }, [consultants]);
  const maxTop = top[0]?.bal || 1;

  return (
    <Shell onNew={() => setOpen(true)}>
      <div className="flex flex-col gap-6">
        <section className="overflow-hidden rounded-xl bg-plum text-ivory shadow-sheet">
          <div className="flex flex-col gap-6 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-7">
            <div>
              <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-ivory/70">
                {company.legalName} · Islamabad
              </p>
              <h1 className="mt-2 font-display text-3xl tracking-tight sm:text-4xl">
                Consultant ledgers
              </h1>
              <p className="mt-2 max-w-md text-sm text-ivory/75">
                Outstanding billed to consultants, imported from the Brandex book. Add filings and
                payments — balances update as you go.
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-ivory/60">
                Total outstanding
              </p>
              <p className="mt-1 font-display text-4xl tabular tracking-tight">{formatPkr(kpis.due)}</p>
              <p className="mt-1 text-xs text-ivory/65">
                {kpis.openN} open · {kpis.settled} settled
                {kpis.credit ? ` · credit ${formatPkr(kpis.credit)}` : ""}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 border-t border-ivory/10 sm:grid-cols-4">
            <Kpi label="Consultants" value={String(kpis.n)} />
            <Kpi label="Open ledgers" value={String(kpis.openN)} />
            <Kpi label="Entries" value={kpis.filings.toLocaleString("en-US")} />
            <Kpi label="Credit" value={formatPkrCompact(kpis.credit)} />
          </div>
        </section>

        {top.length > 0 ? (
          <section className="rounded-xl border border-rule bg-ivory p-4 sm:p-5">
            <div className="mb-3 flex items-baseline justify-between">
              <h2 className="font-display text-lg text-ink">Largest dues</h2>
              <p className="text-xs text-muted">Book outstanding</p>
            </div>
            <ul className="grid gap-2">
              {top.map((row) => (
                <li key={row.id}>
                  <Link
                    to="/ledger/$id"
                    params={{ id: row.id }}
                    className="grid grid-cols-[7rem_1fr_auto] items-center gap-3 rounded-md px-1 py-1 hover:bg-paper-2"
                  >
                    <span className="font-mono text-xs text-muted">{row.id}</span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm text-ink">{row.name}</span>
                      <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-paper-2">
                        <span
                          className="block h-full rounded-full bg-plum"
                          style={{ width: `${Math.max(8, (row.bal / maxTop) * 100)}%` }}
                        />
                      </span>
                    </span>
                    <span className="tabular text-sm font-medium text-due">{formatPkr(row.bal)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="rounded-xl border border-rule bg-ivory">
          <div className="flex flex-col gap-3 border-b border-rule p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, ledger, mark, TM…"
                className="pl-9"
                aria-label="Search consultants"
              />
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {(["all", "outstanding", "settled", "credit"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={cn(
                    "h-8 rounded-full px-3 text-xs font-medium capitalize",
                    filter === f ? "bg-plum text-ivory" : "bg-paper-2 text-ink-soft hover:text-ink",
                  )}
                >
                  {f === "outstanding" ? "Due" : f}
                </button>
              ))}
              <Button size="sm" onClick={() => setOpen(true)} className="ml-1">
                <Plus className="size-3.5" />
                Consultant
              </Button>
            </div>
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <thead className="bg-plum text-[11px] font-medium tracking-[0.14em] text-ivory uppercase">
                <tr>
                  <th className="px-4 py-2.5">Ledger</th>
                  <th className="px-4 py-2.5">Name</th>
                  <th className="px-4 py-2.5 text-right">Entries</th>
                  <th className="px-4 py-2.5 text-right">Due</th>
                  <th className="px-4 py-2.5 text-right">Received</th>
                  <th className="px-4 py-2.5 text-right">Balance</th>
                  <th className="px-4 py-2.5">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ c, bal, n }) => (
                  <ConsultantRow key={c.id} c={c} bal={bal} n={n} />
                ))}
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-sm text-muted">
                      No ledgers match.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>

          <ul className="divide-y divide-rule md:hidden">
            {rows.map(({ c, bal, n }) => (
              <li key={c.id}>
                <Link
                  to="/ledger/$id"
                  params={{ id: c.id }}
                  className="flex items-start justify-between gap-3 px-4 py-3"
                >
                  <span>
                    <span className="block font-mono text-[11px] text-muted">{c.id}</span>
                    <span className="mt-0.5 block text-sm font-medium text-ink">{c.name}</span>
                    <span className="mt-1 text-xs text-muted">{n} entries</span>
                  </span>
                  <span className="text-right">
                    <span
                      className={cn(
                        "block tabular text-sm font-semibold",
                        bal > 0 ? "text-due" : bal < 0 ? "text-credit" : "text-recv",
                      )}
                    >
                      {formatPkr(bal)}
                    </span>
                    <StatusBadge balance={bal} className="mt-1" />
                  </span>
                </Link>
              </li>
            ))}
            {rows.length === 0 ? (
              <li className="px-4 py-12 text-center text-sm text-muted">No ledgers match.</li>
            ) : null}
          </ul>
        </section>

        <footer className="flex flex-col gap-3 border-t border-rule pt-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            {company.office}
            <br />
            {company.bank} · {company.accountTitle} {company.accountNo}
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (confirm("Restore the original Brandex book? Local edits will be cleared.")) {
                resetBook();
              }
            }}
          >
            <RotateCcw className="size-3.5" />
            Restore book
          </Button>
        </footer>
      </div>

      <ConsultantDialog
        open={open}
        onOpenChange={setOpen}
        onSave={(input) => {
          const id = addConsultant(input);
          void navigate({ to: "/ledger/$id", params: { id } });
        }}
      />
    </Shell>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-5 py-3">
      <p className="text-[10px] font-medium tracking-[0.16em] text-ivory/55 uppercase">{label}</p>
      <p className="mt-0.5 tabular text-lg font-medium">{value}</p>
    </div>
  );
}

function ConsultantRow({ c, bal, n }: { c: Consultant; bal: number; n: number }) {
  const t = totals(c.entries);
  return (
    <tr className="border-b border-rule last:border-0 hover:bg-paper-2/70">
      <td className="px-4 py-2.5 font-mono text-xs text-muted">{c.id}</td>
      <td className="px-4 py-2.5">
        <Link
          to="/ledger/$id"
          params={{ id: c.id }}
          className="font-medium text-ink hover:text-plum"
        >
          {c.name}
        </Link>
      </td>
      <td className="px-4 py-2.5 text-right tabular text-muted">{n}</td>
      <td className="px-4 py-2.5 text-right tabular">{formatPkr(t.due)}</td>
      <td className="px-4 py-2.5 text-right tabular text-recv">{formatPkr(t.received)}</td>
      <td
        className={cn(
          "px-4 py-2.5 text-right tabular font-semibold",
          bal > 0 ? "text-due" : bal < 0 ? "text-credit" : "text-recv",
        )}
      >
        {formatPkr(bal)}
      </td>
      <td className="px-4 py-2.5">
        <StatusBadge balance={bal} />
      </td>
    </tr>
  );
}
