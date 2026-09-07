import { outstanding, statusOf, totals, withRunning } from "./ledger";
import { formatDate } from "./format";
import type { Consultant } from "./types";

function cell(v: string | number | null | undefined): string {
  const s = v == null ? "" : String(v);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function csv(rows: Array<Array<string | number>>): string {
  return rows.map((row) => row.map(cell).join(",")).join("\n") + "\n";
}

export function downloadText(filename: string, text: string, mime = "text/csv;charset=utf-8") {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function indexCsv(consultants: Consultant[]): string {
  const rows: Array<Array<string | number>> = [
    ["Ledger", "Name", "Entries", "Due", "Received", "Balance", "Status"],
  ];
  for (const c of consultants) {
    const t = totals(c.entries);
    const bal = outstanding(c);
    rows.push([c.id, c.name, c.entries.length, t.due, t.received, bal, statusOf(bal)]);
  }
  return csv(rows);
}

export function ledgerCsv(c: Consultant): string {
  const rows: Array<Array<string | number>> = [
    ["Date", "Folder", "Stage", "TM", "Details", "Due", "Received", "Balance"],
  ];
  for (const e of withRunning(c.entries)) {
    rows.push([
      formatDate(e.date),
      e.folderNo,
      e.stage,
      e.tmNo,
      e.details,
      e.due || "",
      e.received || "",
      e.running,
    ]);
  }
  const t = totals(c.entries);
  rows.push(["", "", "", "", "TOTAL", t.due, t.received, outstanding(c)]);
  return csv(rows);
}

export function bookCsv(consultants: Consultant[]): string {
  const rows: Array<Array<string | number>> = [
    ["Ledger", "Name", "Date", "Folder", "Stage", "TM", "Details", "Due", "Received"],
  ];
  for (const c of consultants) {
    for (const e of c.entries) {
      rows.push([
        c.id,
        c.name,
        formatDate(e.date),
        e.folderNo,
        e.stage,
        e.tmNo,
        e.details,
        e.due || "",
        e.received || "",
      ]);
    }
  }
  return csv(rows);
}
