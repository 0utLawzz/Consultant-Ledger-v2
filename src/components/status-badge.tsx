import { cn } from "@/lib/utils";
import { statusOf } from "@/lib/ledger";

export function StatusBadge({ balance, className }: { balance: number; className?: string }) {
  const s = statusOf(balance);
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium tracking-wide",
        s === "outstanding" && "bg-due/10 text-due",
        s === "settled" && "bg-recv/10 text-recv",
        s === "credit" && "bg-credit/10 text-credit",
        className,
      )}
    >
      {s === "outstanding" ? "Due" : s === "credit" ? "Credit" : "Settled"}
    </span>
  );
}

export function StageChip({ stage }: { stage: string }) {
  if (!stage) return null;
  return (
    <span className="inline-flex rounded-sm bg-plum/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-wide text-plum">
      {stage}
    </span>
  );
}
