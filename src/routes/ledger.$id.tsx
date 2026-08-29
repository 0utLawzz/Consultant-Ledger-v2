import { useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Pencil, Plus, Printer, Trash2 } from "lucide-react";
import { Shell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { EntryDialog } from "@/components/entry-dialog";
import { ConsultantDialog } from "@/components/consultant-dialog";
import { StageChip, StatusBadge } from "@/components/status-badge";
import { useLedger } from "@/lib/store";
import { computedBalance, outstanding, totals, withRunning } from "@/lib/ledger";
import { formatDate, formatPkr } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { LedgerEntry } from "@/lib/types";

export const Route = createFileRoute("/ledger/$id")({ component: LedgerPage });

function LedgerPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const consultant = useLedger((s) => s.consultants.find((c) => c.id === id));
  const company = useLedger((s) => s.company);
  const addEntry = useLedger((s) => s.addEntry);
  const updateEntry = useLedger((s) => s.updateEntry);
  const removeEntry = useLedger((s) => s.removeEntry);
  const updateConsultant = useLedger((s) => s.updateConsultant);
  const removeConsultant = useLedger((s) => s.removeConsultant);

  const [entryOpen, setEntryOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<LedgerEntry | null>(null);
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    if (!consultant) return [];
    const run = withRunning(consultant.entries);
    const s = q.trim().toLowerCase();
    if (!s) return run;
    return run.filter((e) =>
      `${e.details} ${e.folderNo} ${e.tmNo} ${e.stage}`.toLowerCase().includes(s),
    );
  }, [consultant, q]);

  if (!consultant) {
    return (
      <Shell>
        <div className="rounded-xl border border-rule bg-ivory p-10 text-center">
          <p className="font-display text-xl">Ledger not found</p>
          <Link to="/" className="mt-3 inline-block text-sm text-plum">
            Back to index
          </Link>
        </div>
      </Shell>
    );
  }

  const book = outstanding(consultant);
  const live = computedBalance(consultant.entries);
  const t = totals(consultant.entries);

  function openNew() {
    setEditing(null);
    setEntryOpen(true);
  }

  return (
    <Shell onNew={openNew}>
      <div className="flex flex-col gap-4">
        <div className="no-print flex flex-wrap items-center justify-between gap-2">
          <Link
            to="/"
            className="inline-flex h-10 items-center gap-2 text-sm text-ink-soft hover:text-ink"
          >
            <ArrowLeft className="size-4" />
            All ledgers
          </Link>
          <div className="flex flex-wrap gap-1.5">
            <Button variant="outline" size="sm" onClick={() => setEditOpen(true)}>
              <Pencil className="size-3.5" />
              Edit
            </Button>
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer className="size-3.5" />
              Print
            </Button>
            <Button size="sm" onClick={openNew}>
              <Plus className="size-3.5" />
              Entry
            </Button>
          </div>
        </div>

        <article className="overflow-hidden rounded-xl border border-rule bg-ivory shadow-sheet">
          <header className="bg-plum px-4 py-4 text-ivory sm:px-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-display text-2xl tracking-tight sm:text-3xl">Ledger-Balance Sheet</p>
                <p className="mt-1 text-[11px] tracking-[0.14em] text-ivory/70 uppercase">
                  {company.office}
                </p>
              </div>
              <div className="text-right">
                <p className="font-display text-2xl tabular">{formatPkr(book)}</p>
                <p className="mt-1 font-mono text-sm tracking-wide">
                  {consultant.id}
                  <span className="mx-2 text-ivory/40">·</span>
                  {consultant.name}
                </p>
              </div>
            </div>
            <p className="mt-3 border-t border-ivory/15 pt-3 text-[11px] text-ivory/70">
              {company.bank} · {company.accountTitle} {company.accountNo}
              <span className="hidden sm:inline"> · IBAN {company.iban}</span>
            </p>
          </header>

          <div className="no-print flex flex-wrap items-center gap-2 border-b border-rule px-4 py-3">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Filter this ledger…"
              className="h-9 min-w-0 flex-1 rounded-md border border-rule bg-paper px-3 text-sm"
              aria-label="Filter entries"
            />
            <StatusBadge balance={book} />
            {consultant.live && book !== live ? (
              <span className="text-xs text-muted">Running {formatPkr(live)}</span>
            ) : null}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[52rem] text-left text-[13px]">
              <thead className="bg-paper-2 text-[10px] font-semibold tracking-[0.14em] text-ink-soft uppercase">
                <tr>
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Folder</th>
                  <th className="px-3 py-2">Stage</th>
                  <th className="px-3 py-2">TM</th>
                  <th className="px-3 py-2">Details</th>
                  <th className="px-3 py-2 text-right">Due</th>
                  <th className="px-3 py-2 text-right">Received</th>
                  <th className="px-3 py-2 text-right">Balance</th>
                  <th className="no-print px-2 py-2" />
                </tr>
              </thead>
              <tbody>
                {rows.map((e) => (
                  <tr
                    key={e.id}
                    className={cn(
                      "border-b border-rule/80",
                      e.kind === "payment" && "bg-plum/[0.06]",
                      e.kind === "note" && "bg-paper-2/50",
                    )}
                  >
                    <td className="px-3 py-1.5 whitespace-nowrap tabular text-ink-soft">
                      {formatDate(e.date)}
                    </td>
                    <td className="px-3 py-1.5 font-mono text-[12px]">{e.folderNo || "—"}</td>
                    <td className="px-3 py-1.5">
                      <StageChip stage={e.stage} />
                    </td>
                    <td className="px-3 py-1.5 font-mono text-[12px] text-muted">{e.tmNo || ""}</td>
                    <td className="max-w-[22rem] px-3 py-1.5 text-ink">
                      {e.kind === "payment" ? (
                        <span className="font-medium text-plum">{e.details || "Payment received"}</span>
                      ) : (
                        e.details
                      )}
                    </td>
                    <td className="px-3 py-1.5 text-right tabular">
                      {e.due ? formatPkr(e.due) : ""}
                    </td>
                    <td className="px-3 py-1.5 text-right tabular text-recv">
                      {e.received ? formatPkr(e.received) : ""}
                    </td>
                    <td
                      className={cn(
                        "px-3 py-1.5 text-right tabular font-medium",
                        e.running > 0 ? "text-due" : e.running < 0 ? "text-credit" : "text-recv",
                      )}
                    >
                      {formatPkr(e.running)}
                    </td>
                    <td className="no-print px-2 py-1.5">
                      <div className="flex justify-end gap-0.5">
                        <button
                          type="button"
                          className="inline-flex size-8 items-center justify-center rounded-sm text-muted hover:bg-paper-2 hover:text-ink"
                          onClick={() => {
                            setEditing(e);
                            setEntryOpen(true);
                          }}
                          aria-label="Edit entry"
                        >
                          <Pencil className="size-3.5" />
                        </button>
                        <button
                          type="button"
                          className="inline-flex size-8 items-center justify-center rounded-sm text-muted hover:bg-due/10 hover:text-due"
                          onClick={() => {
                            if (confirm("Delete this entry?")) removeEntry(consultant.id, e.id);
                          }}
                          aria-label="Delete entry"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-16 text-center text-sm text-muted">
                      No entries yet. Add a filing or a payment to open this ledger.
                    </td>
                  </tr>
                ) : null}
              </tbody>
              <tfoot>
                <tr className="bg-plum text-ivory">
                  <td colSpan={5} className="px-3 py-2.5 text-xs font-medium tracking-[0.14em] uppercase">
                    Total
                  </td>
                  <td className="px-3 py-2.5 text-right tabular text-sm">{formatPkr(t.due)}</td>
                  <td className="px-3 py-2.5 text-right tabular text-sm">{formatPkr(t.received)}</td>
                  <td className="px-3 py-2.5 text-right tabular text-sm font-semibold">
                    {formatPkr(book)}
                  </td>
                  <td className="no-print" />
                </tr>
              </tfoot>
            </table>
          </div>
        </article>

        <p className="no-print text-xs text-muted">
          Outstanding on the sheet follows the printed book until you edit this ledger, then it
          follows live entries.{" "}
          <button
            type="button"
            className="text-due underline-offset-2 hover:underline"
            onClick={() => {
              if (confirm(`Remove ${consultant.id} ${consultant.name}?`)) {
                removeConsultant(consultant.id);
                void navigate({ to: "/" });
              }
            }}
          >
            Delete consultant
          </button>
        </p>
      </div>

      <EntryDialog
        open={entryOpen}
        onOpenChange={setEntryOpen}
        initial={editing}
        onSave={(entry) => {
          if (entry.id) {
            updateEntry(consultant.id, {
              id: entry.id,
              date: entry.date,
              folderNo: entry.folderNo,
              stage: entry.stage,
              tmNo: entry.tmNo,
              details: entry.details,
              due: entry.due,
              received: entry.received,
              kind: entry.kind,
            });
          } else {
            addEntry(consultant.id, entry);
          }
        }}
      />
      <ConsultantDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        initial={consultant}
        onSave={(input) => updateConsultant(consultant.id, { name: input.name, notes: input.notes })}
      />
    </Shell>
  );
}
