import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as RotateCcw, i as Search, l as Download, s as Plus } from "../_libs/lucide-react.mjs";
import { i as cn, r as useLedger } from "./router-XuVBQ_NX.mjs";
import { c as formatPkrCompact, h as totals, i as bookKpis, l as matchesQuery, p as statusOf, r as StatusBadge, s as formatPkr, t as Shell, u as outstanding } from "./format-CXS34QTE.mjs";
import { i as indexCsv, r as downloadText, t as Button } from "./export-PK2pbfUR.mjs";
import { t as Input } from "./input-Cl-R8Dsi.mjs";
import { t as ConsultantDialog } from "./consultant-dialog-B_wqtFJ3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Cy5kC5Ud.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const navigate = useNavigate();
	const consultants = useLedger((s) => s.consultants);
	const company = useLedger((s) => s.company);
	const filter = useLedger((s) => s.filter);
	const query = useLedger((s) => s.query);
	const setFilter = useLedger((s) => s.setFilter);
	const setQuery = useLedger((s) => s.setQuery);
	const addConsultant = useLedger((s) => s.addConsultant);
	const resetBook = useLedger((s) => s.resetBook);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [sort, setSort] = (0, import_react.useState)("id");
	const [dir, setDir] = (0, import_react.useState)("asc");
	const rows = (0, import_react.useMemo)(() => {
		const list = consultants.map((c) => {
			const t = totals(c.entries);
			return {
				c,
				bal: outstanding(c),
				n: c.entries.length,
				due: t.due,
				received: t.received
			};
		}).filter(({ c, bal }) => {
			if (!matchesQuery(c, query)) return false;
			const st = statusOf(bal);
			if (filter === "all") return true;
			return st === filter;
		});
		const mul = dir === "asc" ? 1 : -1;
		list.sort((a, b) => {
			switch (sort) {
				case "name": return mul * a.c.name.localeCompare(b.c.name);
				case "entries": return mul * (a.n - b.n);
				case "due": return mul * (a.due - b.due);
				case "received": return mul * (a.received - b.received);
				case "balance": return mul * (a.bal - b.bal);
				default: return mul * a.c.id.localeCompare(b.c.id, void 0, { numeric: true });
			}
		});
		return list;
	}, [
		consultants,
		filter,
		query,
		sort,
		dir
	]);
	const kpis = (0, import_react.useMemo)(() => bookKpis(consultants), [consultants]);
	const top = (0, import_react.useMemo)(() => {
		return consultants.map((c) => ({
			id: c.id,
			name: c.name,
			bal: outstanding(c)
		})).filter((x) => x.bal > 0).sort((a, b) => b.bal - a.bal).slice(0, 8);
	}, [consultants]);
	const maxTop = top[0]?.bal || 1;
	function toggleSort(key) {
		if (sort === key) setDir((d) => d === "asc" ? "desc" : "asc");
		else {
			setSort(key);
			setDir(key === "balance" || key === "due" || key === "received" || key === "entries" ? "desc" : "asc");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		onNew: () => setOpen(true),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "overflow-hidden rounded-xl bg-plum text-ivory shadow-sheet",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-6 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-7",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] font-medium tracking-[0.2em] uppercase text-ivory/70",
								children: [company.legalName, " · Islamabad"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-2 font-display text-3xl tracking-tight sm:text-4xl",
								children: "Consultant ledgers"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-md text-sm text-ivory/75",
								children: "Outstanding billed to consultants, imported from the Brandex book. Add filings and payments — balances update as you go."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-left sm:text-right",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-medium tracking-[0.18em] uppercase text-ivory/60",
									children: "Total outstanding"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-display text-4xl tabular tracking-tight",
									children: formatPkr(kpis.due)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-ivory/65",
									children: [
										kpis.openN,
										" open · ",
										kpis.settled,
										" settled",
										kpis.credit ? ` · credit ${formatPkr(kpis.credit)}` : ""
									]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 border-t border-ivory/10 sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
								label: "Consultants",
								value: String(kpis.n)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
								label: "Open ledgers",
								value: String(kpis.openN)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
								label: "Entries",
								value: kpis.filings.toLocaleString("en-US")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
								label: "Credit",
								value: formatPkrCompact(kpis.credit)
							})
						]
					})]
				}),
				top.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-rule bg-ivory p-4 sm:p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-baseline justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg text-ink",
							children: "Largest dues"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/reports",
							className: "text-xs text-plum hover:underline",
							children: "Full report"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "grid gap-2",
						children: top.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/ledger/$id",
							params: { id: row.id },
							className: "grid grid-cols-[7rem_1fr_auto] items-center gap-3 rounded-md px-1 py-1 hover:bg-paper-2",
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
											className: "block h-full rounded-full bg-plum",
											style: { width: `${Math.max(8, row.bal / maxTop * 100)}%` }
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular text-sm font-medium text-due",
									children: formatPkr(row.bal)
								})
							]
						}) }, row.id))
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-rule bg-ivory",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3 border-b border-rule p-4 sm:flex-row sm:items-center sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: query,
									onChange: (e) => setQuery(e.target.value),
									placeholder: "Search name, ledger, mark, TM…",
									className: "pl-9",
									"aria-label": "Search consultants"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-1.5",
								children: [
									[
										"all",
										"outstanding",
										"settled",
										"credit"
									].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setFilter(f),
										className: cn("h-8 rounded-full px-3 text-xs font-medium capitalize", filter === f ? "bg-plum text-ivory" : "bg-paper-2 text-ink-soft hover:text-ink"),
										children: f === "outstanding" ? "Due" : f
									}, f)),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "outline",
										size: "sm",
										onClick: () => downloadText("brandex-index.csv", indexCsv(consultants)),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), "CSV"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										onClick: () => setOpen(true),
										className: "ml-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "Consultant"]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hidden overflow-x-auto md:block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full min-w-[40rem] text-left text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "bg-plum text-[11px] font-medium tracking-[0.14em] text-ivory uppercase",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
											k: "id",
											sort,
											dir,
											onClick: toggleSort,
											children: "Ledger"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
											k: "name",
											sort,
											dir,
											onClick: toggleSort,
											children: "Name"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
											k: "entries",
											sort,
											dir,
											onClick: toggleSort,
											className: "text-right",
											children: "Entries"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
											k: "due",
											sort,
											dir,
											onClick: toggleSort,
											className: "text-right",
											children: "Due"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
											k: "received",
											sort,
											dir,
											onClick: toggleSort,
											className: "text-right",
											children: "Received"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
											k: "balance",
											sort,
											dir,
											onClick: toggleSort,
											className: "text-right",
											children: "Balance"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-4 py-2.5",
											children: "Status"
										})
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [rows.map(({ c, bal, n }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsultantRow, {
									c,
									bal,
									n
								}, c.id)), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									colSpan: 7,
									className: "px-4 py-12 text-center text-sm text-muted",
									children: "No ledgers match."
								}) }) : null] })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "divide-y divide-rule md:hidden",
							children: [rows.map(({ c, bal, n }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/ledger/$id",
								params: { id: c.id },
								className: "flex items-start justify-between gap-3 px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block font-mono text-[11px] text-muted",
										children: c.id
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-0.5 block text-sm font-medium text-ink",
										children: c.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "mt-1 text-xs text-muted",
										children: [n, " entries"]
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("block tabular text-sm font-semibold", bal > 0 ? "text-due" : bal < 0 ? "text-credit" : "text-recv"),
										children: formatPkr(bal)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
										balance: bal,
										className: "mt-1"
									})]
								})]
							}) }, c.id)), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "px-4 py-12 text-center text-sm text-muted",
								children: "No ledgers match."
							}) : null]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
					className: "flex flex-col gap-3 border-t border-rule pt-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						company.office,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						company.bank,
						" · ",
						company.accountTitle,
						" ",
						company.accountNo
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => {
							if (confirm("Restore the original Brandex book? Local edits will be cleared.")) resetBook();
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), "Restore book"]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsultantDialog, {
			open,
			onOpenChange: setOpen,
			onSave: (input) => {
				const id = addConsultant(input);
				navigate({
					to: "/ledger/$id",
					params: { id }
				});
			}
		})]
	});
}
function Th({ k, sort, dir, onClick, children, className }) {
	const active = sort === k;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
		className: cn("px-4 py-2.5", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => onClick(k),
			className: "inline-flex items-center gap-1 tracking-[0.14em] uppercase",
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("text-[10px]", active ? "text-ivory" : "text-ivory/40"),
				children: active ? dir === "asc" ? "↑" : "↓" : "↕"
			})]
		})
	});
}
function Kpi({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[10px] font-medium tracking-[0.16em] text-ivory/55 uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-0.5 tabular text-lg font-medium",
			children: value
		})]
	});
}
function ConsultantRow({ c, bal, n }) {
	const t = totals(c.entries);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
		className: "border-b border-rule last:border-0 hover:bg-paper-2/70",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-4 py-2.5 font-mono text-xs text-muted",
				children: c.id
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-4 py-2.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/ledger/$id",
					params: { id: c.id },
					className: "font-medium text-ink hover:text-plum",
					children: c.name
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-4 py-2.5 text-right tabular text-muted",
				children: n
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-4 py-2.5 text-right tabular",
				children: formatPkr(t.due)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-4 py-2.5 text-right tabular text-recv",
				children: formatPkr(t.received)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: cn("px-4 py-2.5 text-right tabular font-semibold", bal > 0 ? "text-due" : bal < 0 ? "text-credit" : "text-recv"),
				children: formatPkr(bal)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-4 py-2.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { balance: bal })
			})
		]
	});
}
//#endregion
export { Home as component };
