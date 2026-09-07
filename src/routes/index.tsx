import { useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Download, Plus, RotateCcw, Search } from "lucide-react";
import { Shell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConsultantDialog } from "@/components/consultant-dialog";
import { StatusBadge } from "@/components/status-badge";
import { useLedger } from "@/lib/store";
import { bookKpis, matchesQuery, outstanding, statusOf, totals } from "@/lib/ledger";
import { downloadText, indexCsv } from "@/lib/export";
import { formatPkr, formatPkrCompact } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Consultant } from "@/lib/types";

export const Route = createFileRoute("/")({ component: Home });

type SortKey = "id" | "name" | "entries" | "due" | "received" | "balance";

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
  const [sort, setSort] = useState<SortKey>("id");
  const [dir, setDir] = useState<"asc" | "desc">("asc");

  const rows = useMemo(() => {
    const list = consultants
      .map((c) => {
        const t = totals(c.entries);
        return { c, bal: outstanding(c), n: c.entries.length, due: t.due, received: t.received };
      })
      .filter(({ c, bal }) => {
        if (!matchesQuery(c, query)) return false;
        const st = statusOf(bal);
        if (filter === "all") return true;
        return st === filter;
      });

    const mul = dir === "asc" ? 1 : -1;
    list.sort((a, b) => {
      switch (sort) {
        case "name":
          return mul * a.c.name.localeCompare(b.c.name);
        case "entries":
          return mul * (a.n - b.n);
        case "due":
          return mul * (a.due - b.due);
        case "received":
          return mul * (a.received - b.received);
        case "balance":
          return mul * (a.bal - b.bal);
        default:
          return mul * a.c.id.localeCompare(b.c.id, undefined, { numeric: true });
      }
    });
    return list;
  }, [consultants, filter, query, sort, dir]);

  const kpis = useMemo(() => bookKpis(consultants), [consultants]);

  const top = useMemo(() => {
    return consultants
      .map((c) => ({ id: c.id, name: c.name, bal: outstanding(c) }))
      .filter((x) => x.bal > 0)
      .sort((a, b) => b.bal - a.bal)
      .slice(0, 8);
  }, [consultants]);
  const maxTop = top[0]?.bal || 1;

  function toggleSort(key: SortKey) {
    if (sort === key) setDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSort(key);
      setDir(key === "balance" || key === "due" || key === "received" || key === "entries" ? "desc" : "asc");
    }
  }

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
              <Link to="/reports" className="text-xs text-plum hover:underline">
                Full report
              </Link>
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
              <Button
                variant="outline"
                size="sm"
                onClick={() => downloadText("brandex-index.csv", indexCsv(consultants))}
              >
                <Download className="size-3.5" />
                CSV
              </Button>
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
                  <Th k="id" sort={sort} dir={dir} onClick={toggleSort}>
                    Ledger
                  </Th>
                  <Th k="name" sort={sort} dir={dir} onClick={toggleSort}>
                    Name
                  </Th>
                  <Th k="entries" sort={sort} dir={dir} onClick={toggleSort} className="text-right">
                    Entries
                  </Th>
                  <Th k="due" sort={sort} dir={dir} onClick={toggleSort} className="text-right">
                    Due
                  </Th>
                  <Th k="received" sort={sort} dir={dir} onClick={toggleSort} className="text-right">
                    Received
                  </Th>
                  <Th k="balance" sort={sort} dir={dir} onClick={toggleSort} className="text-right">
                    Balance
                  </Th>
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

function Th({
  k,
  sort,
  dir,
  onClick,
  children,
  className,
}: {
  k: SortKey;
  sort: SortKey;
  dir: "asc" | "desc";
  onClick: (k: SortKey) => void;
  children: string;
  className?: string;
}) {
  const active = sort === k;
  return (
    <th className={cn("px-4 py-2.5", className)}>
      <button
        type="button"
        onClick={() => onClick(k)}
        className="inline-flex items-center gap-1 tracking-[0.14em] uppercase"
      >
        {children}
        <span className={cn("text-[10px]", active ? "text-ivory" : "text-ivory/40")}>
          {active ? (dir === "asc" ? "↑" : "↓") : "↕"}
        </span>
      </button>
    </th>
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
