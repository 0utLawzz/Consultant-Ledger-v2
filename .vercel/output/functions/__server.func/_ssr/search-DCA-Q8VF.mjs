import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as Search } from "../_libs/lucide-react.mjs";
import { a as StageChip, b as useLedger, d as formatPkr, g as searchEntries, i as Shell, t as Input, u as formatDate } from "./format-CasbLKEP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-DCA-Q8VF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SearchPage() {
	const consultants = useLedger((s) => s.consultants);
	const query = useLedger((s) => s.query);
	const setQuery = useLedger((s) => s.setQuery);
	const hits = (0, import_react.useMemo)(() => searchEntries(consultants, query), [consultants, query]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl tracking-tight",
				children: "Search the book"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Marks, TM numbers, folders, and consultant names."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: query,
					onChange: (e) => setQuery(e.target.value),
					placeholder: "e.g. NAPCO, 628319, Noor Baaf",
					className: "h-12 pl-9 text-base",
					autoFocus: true,
					"aria-label": "Search ledgers"
				})]
			}),
			!query.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl border border-dashed border-rule bg-ivory px-4 py-10 text-center text-sm text-muted",
				children: "Type a mark, TM number, or consultant to scan every ledger."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "divide-y divide-rule overflow-hidden rounded-xl border border-rule bg-ivory",
				children: [hits.map(({ consultant, entry }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/ledger/$id",
					params: { id: consultant.id },
					className: "flex flex-col gap-1 px-4 py-3 hover:bg-paper-2 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "block font-mono text-[11px] text-muted",
								children: [
									consultant.id,
									" · ",
									consultant.name
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-0.5 flex flex-wrap items-center gap-2 text-sm text-ink",
								children: [entry.details || "—", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageChip, { stage: entry.stage })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-0.5 text-xs text-muted",
								children: [
									formatDate(entry.date),
									entry.folderNo ? ` · ${entry.folderNo}` : "",
									entry.tmNo ? ` · TM ${entry.tmNo}` : ""
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular text-sm font-medium",
						children: entry.received ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-recv",
							children: formatPkr(entry.received)
						}) : entry.due ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-due",
							children: formatPkr(entry.due)
						}) : null
					})]
				}) }, `${consultant.id}-${entry.id}`)), hits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "px-4 py-12 text-center text-sm text-muted",
					children: [
						"Nothing matched “",
						query,
						"”."
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "px-4 py-2 text-center text-[11px] text-muted",
					children: hits.length === 200 ? "Showing first 200 hits" : `${hits.length} hits`
				})]
			})
		]
	}) });
}
//#endregion
export { SearchPage as component };
