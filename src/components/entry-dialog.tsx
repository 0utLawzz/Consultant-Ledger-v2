import { useEffect, useState, type FormEvent } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input, Label, NativeSelect, Textarea } from "@/components/ui/input";
import { parseAmount, todayIso } from "@/lib/format";
import type { EntryKind, LedgerEntry } from "@/lib/types";

type Draft = {
  date: string;
  folderNo: string;
  stage: string;
  tmNo: string;
  details: string;
  kind: EntryKind;
  amount: string;
};

const empty = (): Draft => ({
  date: todayIso(),
  folderNo: "",
  stage: "",
  tmNo: "",
  details: "",
  kind: "due",
  amount: "",
});

function fromEntry(e: LedgerEntry): Draft {
  return {
    date: e.date || todayIso(),
    folderNo: e.folderNo,
    stage: e.stage,
    tmNo: e.tmNo,
    details: e.details,
    kind: e.kind === "payment" ? "payment" : e.kind === "note" ? "note" : "due",
    amount: String(e.kind === "payment" ? e.received : e.due || ""),
  };
}

export function EntryDialog({
  open,
  onOpenChange,
  initial,
  onSave,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initial?: LedgerEntry | null;
  onSave: (entry: Omit<LedgerEntry, "id"> & { id?: string }) => void;
}) {
  const [draft, setDraft] = useState<Draft>(empty);

  useEffect(() => {
    if (open) setDraft(initial ? fromEntry(initial) : empty());
  }, [open, initial]);

  function submit(ev: FormEvent) {
    ev.preventDefault();
    const amount = parseAmount(draft.amount);
    const kind = draft.kind;
    onSave({
      id: initial?.id,
      date: draft.date || null,
      folderNo: draft.folderNo.trim(),
      stage: draft.stage,
      tmNo: draft.tmNo.trim(),
      details: draft.details.trim() || (kind === "payment" ? "Payment received" : ""),
      kind,
      due: kind === "due" ? amount : 0,
      received: kind === "payment" ? amount : 0,
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        title={initial ? "Edit entry" : "New entry"}
        description="Due is billed to the consultant. Payment reduces the running balance."
      >
        <form onSubmit={submit} className="grid gap-3">
          <div className="grid grid-cols-2 gap-3">
            <label className="grid gap-1.5">
              <Label htmlFor="e-date">Date</Label>
              <Input
                id="e-date"
                type="date"
                value={draft.date}
                onChange={(e) => setDraft({ ...draft, date: e.target.value })}
              />
            </label>
            <label className="grid gap-1.5">
              <Label htmlFor="e-kind">Type</Label>
              <NativeSelect
                id="e-kind"
                value={draft.kind}
                onChange={(e) => setDraft({ ...draft, kind: e.target.value as EntryKind })}
              >
                <option value="due">Due / filing</option>
                <option value="payment">Payment received</option>
                <option value="note">Note</option>
              </NativeSelect>
            </label>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <label className="grid gap-1.5">
              <Label htmlFor="e-folder">Folder</Label>
              <Input
                id="e-folder"
                value={draft.folderNo}
                onChange={(e) => setDraft({ ...draft, folderNo: e.target.value })}
                placeholder="A01-012"
              />
            </label>
            <label className="grid gap-1.5">
              <Label htmlFor="e-stage">Stage</Label>
              <NativeSelect
                id="e-stage"
                value={draft.stage}
                onChange={(e) => setDraft({ ...draft, stage: e.target.value })}
              >
                <option value="">—</option>
                <option value="S1">S1</option>
                <option value="S2">S2</option>
                <option value="S3">S3</option>
                <option value="S4">S4</option>
                <option value="S1,S2">S1 + S2</option>
              </NativeSelect>
            </label>
            <label className="grid gap-1.5">
              <Label htmlFor="e-tm">TM No</Label>
              <Input
                id="e-tm"
                value={draft.tmNo}
                onChange={(e) => setDraft({ ...draft, tmNo: e.target.value })}
                placeholder="628319"
              />
            </label>
          </div>
          <label className="grid gap-1.5">
            <Label htmlFor="e-details">Details</Label>
            <Textarea
              id="e-details"
              value={draft.details}
              onChange={(e) => setDraft({ ...draft, details: e.target.value })}
              placeholder="Mark name, class, notes"
            />
          </label>
          {draft.kind !== "note" ? (
            <label className="grid gap-1.5">
              <Label htmlFor="e-amt">Amount (PKR)</Label>
              <Input
                id="e-amt"
                inputMode="numeric"
                value={draft.amount}
                onChange={(e) => setDraft({ ...draft, amount: e.target.value })}
                placeholder="5000"
                required
              />
            </label>
          ) : null}
          <div className="mt-2 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{initial ? "Save" : "Add entry"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
