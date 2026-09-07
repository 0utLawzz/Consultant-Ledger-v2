import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as Download } from "../_libs/lucide-react.mjs";
import { i as cn, r as useLedger } from "./router-XuVBQ_NX.mjs";
import { _ as yearBuckets, c as formatPkrCompact, i as bookKpis, r as StatusBadge, s as formatPkr, t as Shell, u as outstanding } from "./format-CXS34QTE.mjs";
import { i as indexCsv, n as bookCsv, r as downloadText, t as Button } from "./export-PK2pbfUR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports-DLKIcAPP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ReportsPage() {
	const consultants = useLedger((s) => s.consultants);
	const company = useLedger((s) => s.company);
	const kpis = (0, import_react.useMemo)(() => bookKpis(consultants), [consultants]);
	const years = (0, import_react.useMemo)(() => yearBuckets(consultants), [consultants]);
	const ranked = (0, import_react.useMemo)(() => {
		return consultants.map((c) => ({
			id: c.id,
			name: c.name,
			bal: outstanding(c),
			n: c.entries.length
		})).filter((x) => x.bal !== 0).sort((a, b) => Math.abs(b.bal) - Math.abs(a.bal));
	}, [consultants]);
	const maxDue = Math.max(1, ...years.map((y) => y.due));
	const maxRecv = Math.max(1, ...years.map((y) => y.received));
	const maxAbs = Math.max(1, ...ranked.map((r) => Math.abs(r.bal)));
	const mixTotal = Math.max(1, kpis.n);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl tracking-tight",
					children: "Reports"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 max-w-lg text-sm text-muted",
					children: [
						"Book outstanding for ",
						company.name,
						" — ",
						kpis.n,
						" consultants, ",
						kpis.filings.toLocaleString("en-US"),
						" ",
						"entries."
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => downloadText("brandex-index.csv", indexCsv(consultants)),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), "Index CSV"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => downloadText("brandex-book.csv", bookCsv(consultants)),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), "Full book"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-rule sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Outstanding",
						value: formatPkr(kpis.due),
						hint: `${kpis.openN} open`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Billed",
						value: formatPkrCompact(kpis.billed),
						hint: "All filings"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Received",
						value: formatPkrCompact(kpis.received),
						hint: "All payments"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Settled",
						value: String(kpis.settled),
						hint: kpis.creditN ? `${kpis.creditN} in credit` : "Ledgers at zero"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-rule bg-ivory p-4 sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg text-ink",
						children: "Ledger mix"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: "Share of consultants by printed outstanding."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex h-3 overflow-hidden rounded-full bg-paper-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "bg-due",
								style: { width: `${kpis.openN / mixTotal * 100}%` }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "bg-recv",
								style: { width: `${kpis.settled / mixTotal * 100}%` }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "bg-credit",
								style: { width: `${kpis.creditN / mixTotal * 100}%` }
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-3 flex flex-wrap gap-4 text-xs text-ink-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-due" }),
									"Due ",
									kpis.openN
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-recv" }),
									"Settled ",
									kpis.settled
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-credit" }),
									"Credit ",
									kpis.creditN
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-rule bg-ivory p-4 sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg text-ink",
						children: "Activity by year"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: "Filings billed vs payments received."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 grid gap-3",
						children: years.map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "grid grid-cols-[4.5rem_1fr_auto] items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs text-muted",
									children: y.year
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "grid gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "h-1.5 overflow-hidden rounded-full bg-paper-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block h-full rounded-full bg-due",
											style: { width: `${Math.max(4, y.due / maxDue * 100)}%` }
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "h-1.5 overflow-hidden rounded-full bg-paper-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block h-full rounded-full bg-recv",
											style: { width: `${Math.max(4, y.received / maxRecv * 100)}%` }
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-right text-xs tabular text-ink-soft",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-due",
										children: formatPkrCompact(y.due)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-recv",
										children: formatPkrCompact(y.received)
									})]
								})
							]
						}, y.year))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-rule bg-ivory",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between border-b border-rule px-4 py-3 sm:px-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg text-ink",
						children: "Open and credit ledgers"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [
							ranked.length,
							" of ",
							kpis.n
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-rule",
					children: ranked.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/ledger/$id",
						params: { id: row.id },
						className: "grid grid-cols-[5.5rem_1fr_auto] items-center gap-3 px-4 py-2.5 hover:bg-paper-2 sm:px-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-muted",
								children: row.id
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate text-sm text-ink",
									children: row.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block h-1.5 overflow-hidden rounded-full bg-paper-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("block h-full rounded-full", row.bal > 0 ? "bg-due" : "bg-credit"),
										style: { width: `${Math.max(8, Math.abs(row.bal) / maxAbs * 100)}%` }
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("block tabular text-sm font-medium", row.bal > 0 ? "text-due" : "text-credit"),
									children: formatPkr(row.bal)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
									balance: row.bal,
									className: "mt-1"
								})]
							})
						]
					}) }, row.id))
				})]
			})
		]
	}) });
}
function Stat({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-ivory px-4 py-4 sm:px-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] font-medium tracking-[0.16em] text-muted uppercase",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-display text-xl tabular text-ink",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 text-xs text-muted",
				children: hint
			})
		]
	});
}
//#endregion
export { ReportsPage as component };
