import { useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search as SearchIcon } from "lucide-react";
import { Shell } from "@/components/shell";
import { Input } from "@/components/ui/input";
import { StageChip } from "@/components/status-badge";
import { useLedger } from "@/lib/store";
import { searchEntries } from "@/lib/ledger";
import { formatDate, formatPkr } from "@/lib/format";

export const Route = createFileRoute("/search")({ component: SearchPage });

function SearchPage() {
  const consultants = useLedger((s) => s.consultants);
  const query = useLedger((s) => s.query);
  const setQuery = useLedger((s) => s.setQuery);

  const hits = useMemo(() => searchEntries(consultants, query), [consultants, query]);

  return (
    <Shell>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="font-display text-3xl tracking-tight">Search the book</h1>
          <p className="mt-1 text-sm text-muted">Marks, TM numbers, folders, and consultant names.</p>
        </div>
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. NAPCO, 628319, Noor Baaf"
            className="h-12 pl-9 text-base"
            autoFocus
            aria-label="Search ledgers"
          />
        </div>

        {!query.trim() ? (
          <p className="rounded-xl border border-dashed border-rule bg-ivory px-4 py-10 text-center text-sm text-muted">
            Type a mark, TM number, or consultant to scan every ledger.
          </p>
        ) : (
          <ul className="divide-y divide-rule overflow-hidden rounded-xl border border-rule bg-ivory">
            {hits.map(({ consultant, entry }) => (
              <li key={`${consultant.id}-${entry.id}`}>
                <Link
                  to="/ledger/$id"
                  params={{ id: consultant.id }}
                  className="flex flex-col gap-1 px-4 py-3 hover:bg-paper-2 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="min-w-0">
                    <span className="block font-mono text-[11px] text-muted">
                      {consultant.id} · {consultant.name}
                    </span>
                    <span className="mt-0.5 flex flex-wrap items-center gap-2 text-sm text-ink">
                      {entry.details || "—"}
                      <StageChip stage={entry.stage} />
                    </span>
                    <span className="mt-0.5 text-xs text-muted">
                      {formatDate(entry.date)}
                      {entry.folderNo ? ` · ${entry.folderNo}` : ""}
                      {entry.tmNo ? ` · TM ${entry.tmNo}` : ""}
                    </span>
                  </span>
                  <span className="tabular text-sm font-medium">
                    {entry.received
                      ? <span className="text-recv">{formatPkr(entry.received)}</span>
                      : entry.due
                        ? <span className="text-due">{formatPkr(entry.due)}</span>
                        : null}
                  </span>
                </Link>
              </li>
            ))}
            {hits.length === 0 ? (
              <li className="px-4 py-12 text-center text-sm text-muted">Nothing matched “{query}”.</li>
            ) : (
              <li className="px-4 py-2 text-center text-[11px] text-muted">
                {hits.length === 200 ? "Showing first 200 hits" : `${hits.length} hits`}
              </li>
            )}
          </ul>
        )}
      </div>
    </Shell>
  );
}
