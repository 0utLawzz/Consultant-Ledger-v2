import { cn } from "@/lib/utils";

export function BrandMark({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="flex size-9 items-center justify-center rounded-md bg-plum text-ivory" aria-hidden>
        <svg viewBox="0 0 24 24" className="size-5" fill="none">
          <rect x="5" y="4" width="14" height="16" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 9h8M8 12.5h8M8 16h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </span>
      {compact ? (
        <span className="font-display text-lg tracking-tight text-plum">Brandex</span>
      ) : (
        <span className="leading-tight">
          <span className="block font-display text-lg tracking-tight text-plum">Brandex</span>
          <span className="block text-[10px] font-medium tracking-[0.18em] text-muted uppercase">
            Consultant ledger
          </span>
        </span>
      )}
    </span>
  );
}
