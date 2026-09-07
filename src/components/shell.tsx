import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Plus, Search, BarChart3 } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Ledgers", icon: BookOpen },
  { to: "/search", label: "Search", icon: Search },
  { to: "/reports", label: "Reports", icon: BarChart3 },
] as const;

export function Shell({
  children,
  onNew,
}: {
  children: ReactNode;
  onNew?: () => void;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-dvh bg-paper">
      <header className="no-print sticky top-0 z-30 border-b border-rule bg-paper/90 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4">
          <Link to="/" className="min-w-0">
            <BrandMark compact={pathname !== "/"} />
          </Link>
          <nav className="hidden items-center gap-1 sm:flex">
            {nav.map((item) => {
              const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-medium",
                    active ? "bg-plum text-ivory" : "text-ink-soft hover:bg-paper-2 hover:text-ink",
                  )}
                >
                  <item.icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
            {onNew ? (
              <button
                type="button"
                onClick={onNew}
                className="ml-1 inline-flex h-10 items-center gap-2 rounded-md bg-ink px-3 text-sm font-medium text-ivory hover:opacity-90"
              >
                <Plus className="size-4" />
                New
              </button>
            ) : null}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-6 pb-24 sm:pb-10">{children}</main>

      <nav className="no-print fixed inset-x-0 bottom-0 z-30 border-t border-rule bg-paper/95 backdrop-blur-sm sm:hidden">
        <div className={cn("grid px-2 py-1.5", onNew ? "grid-cols-4" : "grid-cols-3")}>
          {nav.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex min-h-12 flex-col items-center justify-center gap-0.5 text-[11px] font-medium",
                  active ? "text-plum" : "text-muted",
                )}
              >
                <item.icon className="size-5" />
                {item.label}
              </Link>
            );
          })}
          {onNew ? (
            <button
              type="button"
              onClick={onNew}
              className="flex min-h-12 flex-col items-center justify-center gap-0.5 text-[11px] font-medium text-plum"
            >
              <Plus className="size-5" />
              New
            </button>
          ) : null}
        </div>
      </nav>
    </div>
  );
}
