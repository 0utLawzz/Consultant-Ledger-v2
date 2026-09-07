import { d as useRouterState, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as BookOpen, i as Search, s as Plus, u as ChartColumn } from "../_libs/lucide-react.mjs";
import { i as cn } from "./router-XuVBQ_NX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/format-CXS34QTE.js
var import_jsx_runtime = require_jsx_runtime();
function BrandMark({ className, compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-2.5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex size-9 items-center justify-center rounded-md bg-plum text-ivory",
			"aria-hidden": true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 24 24",
				className: "size-5",
				fill: "none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "5",
					y: "4",
					width: "14",
					height: "16",
					rx: "1.2",
					stroke: "currentColor",
					strokeWidth: "1.6"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M8 9h8M8 12.5h8M8 16h5",
					stroke: "currentColor",
					strokeWidth: "1.6",
					strokeLinecap: "round"
				})]
			})
		}), compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-lg tracking-tight text-plum",
			children: "Brandex"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "leading-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block font-display text-lg tracking-tight text-plum",
				children: "Brandex"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-[10px] font-medium tracking-[0.18em] text-muted uppercase",
				children: "Consultant ledger"
			})]
		})]
	});
}
var nav = [
	{
		to: "/",
		label: "Ledgers",
		icon: BookOpen
	},
	{
		to: "/search",
		label: "Search",
		icon: Search
	},
	{
		to: "/reports",
		label: "Reports",
		icon: ChartColumn
	}
];
function Shell({ children, onNew }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-paper",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "no-print sticky top-0 z-30 border-b border-rule bg-paper/90 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "min-w-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, { compact: pathname !== "/" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "hidden items-center gap-1 sm:flex",
						children: [nav.map((item) => {
							const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-medium", active ? "bg-plum text-ivory" : "text-ink-soft hover:bg-paper-2 hover:text-ink"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4" }), item.label]
							}, item.to);
						}), onNew ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: onNew,
							className: "ml-1 inline-flex h-10 items-center gap-2 rounded-md bg-ink px-3 text-sm font-medium text-ivory hover:opacity-90",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "New"]
						}) : null]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto w-full max-w-6xl px-4 py-6 pb-24 sm:pb-10",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "no-print fixed inset-x-0 bottom-0 z-30 border-t border-rule bg-paper/95 backdrop-blur-sm sm:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("grid px-2 py-1.5", onNew ? "grid-cols-4" : "grid-cols-3"),
					children: [nav.map((item) => {
						const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex min-h-12 flex-col items-center justify-center gap-0.5 text-[11px] font-medium", active ? "text-plum" : "text-muted"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-5" }), item.label]
						}, item.to);
					}), onNew ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: onNew,
						className: "flex min-h-12 flex-col items-center justify-center gap-0.5 text-[11px] font-medium text-plum",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-5" }), "New"]
					}) : null]
				})
			})
		]
	});
}
function computedBalance(entries) {
	return entries.reduce((sum, e) => sum + (e.due || 0) - (e.received || 0), 0);
}
function outstanding(c) {
	if (c.live) return computedBalance(c.entries);
	if (c.statedBalance != null) return c.statedBalance;
	return computedBalance(c.entries);
}
function totals(entries) {
	let due = 0;
	let received = 0;
	for (const e of entries) {
		due += e.due || 0;
		received += e.received || 0;
	}
	return {
		due,
		received,
		balance: due - received
	};
}
function withRunning(entries) {
	let run = 0;
	return entries.map((e) => {
		run += (e.due || 0) - (e.received || 0);
		return {
			...e,
			running: run
		};
	});
}
function statusOf(balance) {
	if (balance > 0) return "outstanding";
	if (balance < 0) return "credit";
	return "settled";
}
function matchesQuery(c, q) {
	const s = q.trim().toLowerCase();
	if (!s) return true;
	if (c.id.toLowerCase().includes(s) || c.name.toLowerCase().includes(s)) return true;
	if (c.city?.toLowerCase().includes(s) || c.notes?.toLowerCase().includes(s)) return true;
	return c.entries.some((e) => e.details.toLowerCase().includes(s) || e.folderNo.toLowerCase().includes(s) || e.tmNo.toLowerCase().includes(s) || e.stage.toLowerCase().includes(s));
}
function searchEntries(consultants, q) {
	const s = q.trim().toLowerCase();
	if (!s) return [];
	const hits = [];
	for (const c of consultants) for (const e of c.entries) {
		if (`${c.id} ${c.name} ${e.details} ${e.folderNo} ${e.tmNo} ${e.stage}`.toLowerCase().includes(s)) hits.push({
			consultant: c,
			entry: e
		});
		if (hits.length >= 200) return hits;
	}
	return hits;
}
function yearBuckets(consultants) {
	const map = /* @__PURE__ */ new Map();
	for (const c of consultants) for (const e of c.entries) {
		const year = e.date ? e.date.slice(0, 4) : "Undated";
		const cur = map.get(year) ?? {
			year,
			due: 0,
			received: 0,
			n: 0
		};
		cur.due += e.due || 0;
		cur.received += e.received || 0;
		cur.n += 1;
		map.set(year, cur);
	}
	return [...map.values()].sort((a, b) => a.year.localeCompare(b.year));
}
function bookKpis(consultants) {
	const bals = consultants.map((c) => outstanding(c));
	const due = bals.filter((n) => n > 0).reduce((a, b) => a + b, 0);
	const credit = bals.filter((n) => n < 0).reduce((a, b) => a + b, 0);
	const openN = bals.filter((n) => n > 0).length;
	const settled = bals.filter((n) => n === 0).length;
	const creditN = bals.filter((n) => n < 0).length;
	const filings = consultants.reduce((a, c) => a + c.entries.length, 0);
	let billed = 0;
	let received = 0;
	for (const c of consultants) {
		const t = totals(c.entries);
		billed += t.due;
		received += t.received;
	}
	return {
		due,
		credit,
		openN,
		settled,
		creditN,
		filings,
		n: consultants.length,
		billed,
		received
	};
}
function StatusBadge({ balance, className }) {
	const s = statusOf(balance);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium tracking-wide", s === "outstanding" && "bg-due/10 text-due", s === "settled" && "bg-recv/10 text-recv", s === "credit" && "bg-credit/10 text-credit", className),
		children: s === "outstanding" ? "Due" : s === "credit" ? "Credit" : "Settled"
	});
}
function StageChip({ stage }) {
	if (!stage) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-flex rounded-sm bg-plum/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-wide text-plum",
		children: stage
	});
}
function formatPkr(n, opts) {
	const body = Math.abs(Math.round(n)).toLocaleString("en-US");
	if (n < 0) return `-PKR ${body}`;
	if (opts?.sign && n > 0) return `+PKR ${body}`;
	return `PKR ${body}`;
}
function formatPkrCompact(n) {
	const abs = Math.abs(n);
	const sign = n < 0 ? "-" : "";
	if (abs >= 1e6) return `${sign}${(abs / 1e6).toFixed(1)}M`;
	if (abs >= 1e3) return `${sign}${(abs / 1e3).toFixed(abs >= 1e4 ? 0 : 1)}k`;
	return `${sign}${abs.toLocaleString("en-US")}`;
}
function formatDate(iso) {
	if (!iso) return "—";
	const [y, m, d] = iso.split("-");
	if (!y || !m || !d) return iso;
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	];
	const mi = Number(m) - 1;
	return `${d.padStart(2, "0")}-${months[mi] ?? m}-${y}`;
}
function todayIso() {
	const t = /* @__PURE__ */ new Date();
	return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}
function parseAmount(raw) {
	const cleaned = raw.replace(/[^\d.-]/g, "");
	if (!cleaned) return 0;
	const n = Number(cleaned);
	return Number.isFinite(n) ? Math.round(n) : 0;
}
//#endregion
export { yearBuckets as _, computedBalance as a, formatPkrCompact as c, parseAmount as d, searchEntries as f, withRunning as g, totals as h, bookKpis as i, matchesQuery as l, todayIso as m, StageChip as n, formatDate as o, statusOf as p, StatusBadge as r, formatPkr as s, Shell as t, outstanding as u };
