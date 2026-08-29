import { useEffect, useState, type FormEvent } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import type { Consultant } from "@/lib/types";

export function ConsultantDialog({
  open,
  onOpenChange,
  initial,
  onSave,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initial?: Consultant | null;
  onSave: (input: { id?: string; name: string; notes?: string }) => void;
}) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!open) return;
    setId(initial?.id ?? "");
    setName(initial?.name ?? "");
    setNotes(initial?.notes ?? "");
  }, [open, initial]);

  function submit(ev: FormEvent) {
    ev.preventDefault();
    if (!name.trim()) return;
    onSave({ id: initial ? initial.id : id, name, notes });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        title={initial ? "Edit consultant" : "New consultant"}
        description="Ledger numbers follow the book (A-001…). Leave blank to auto-assign."
      >
        <form onSubmit={submit} className="grid gap-3">
          {!initial ? (
            <label className="grid gap-1.5">
              <Label htmlFor="c-id">Ledger no</Label>
              <Input
                id="c-id"
                value={id}
                onChange={(e) => setId(e.target.value.toUpperCase())}
                placeholder="A-068"
              />
            </label>
          ) : null}
          <label className="grid gap-1.5">
            <Label htmlFor="c-name">Name</Label>
            <Input
              id="c-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Consultant or firm"
              required
            />
          </label>
          <label className="grid gap-1.5">
            <Label htmlFor="c-notes">Notes</Label>
            <Textarea
              id="c-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="City, referral, rates"
            />
          </label>
          <div className="mt-2 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{initial ? "Save" : "Create ledger"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
