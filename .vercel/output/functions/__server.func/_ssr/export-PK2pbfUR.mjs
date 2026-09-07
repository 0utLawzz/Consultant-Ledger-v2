import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { i as cn } from "./router-XuVBQ_NX.mjs";
import { g as withRunning, h as totals, o as formatDate, p as statusOf, u as outstanding } from "./format-CXS34QTE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/export-PK2pbfUR.js
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[opacity,transform,background-color,color,border-color] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum/40 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98] [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			primary: "bg-plum text-ivory hover:bg-plum-deep",
			ink: "bg-ink text-ivory hover:opacity-90",
			outline: "border border-rule bg-ivory text-ink hover:bg-paper-2",
			ghost: "text-ink-soft hover:bg-paper-2 hover:text-ink",
			danger: "bg-due text-ivory hover:opacity-90"
		},
		size: {
			sm: "h-8 rounded-sm px-3 text-xs",
			md: "h-10 rounded-md px-4 text-sm",
			lg: "h-12 rounded-md px-5 text-sm",
			icon: "size-10 rounded-md",
			"icon-sm": "size-8 rounded-sm"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, type = "button", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function cell(v) {
	const s = v == null ? "" : String(v);
	if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, "\"\"")}"`;
	return s;
}
function csv(rows) {
	return rows.map((row) => row.map(cell).join(",")).join("\n") + "\n";
}
function downloadText(filename, text, mime = "text/csv;charset=utf-8") {
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
function indexCsv(consultants) {
	const rows = [[
		"Ledger",
		"Name",
		"Entries",
		"Due",
		"Received",
		"Balance",
		"Status"
	]];
	for (const c of consultants) {
		const t = totals(c.entries);
		const bal = outstanding(c);
		rows.push([
			c.id,
			c.name,
			c.entries.length,
			t.due,
			t.received,
			bal,
			statusOf(bal)
		]);
	}
	return csv(rows);
}
function ledgerCsv(c) {
	const rows = [[
		"Date",
		"Folder",
		"Stage",
		"TM",
		"Details",
		"Due",
		"Received",
		"Balance"
	]];
	for (const e of withRunning(c.entries)) rows.push([
		formatDate(e.date),
		e.folderNo,
		e.stage,
		e.tmNo,
		e.details,
		e.due || "",
		e.received || "",
		e.running
	]);
	const t = totals(c.entries);
	rows.push([
		"",
		"",
		"",
		"",
		"TOTAL",
		t.due,
		t.received,
		outstanding(c)
	]);
	return csv(rows);
}
function bookCsv(consultants) {
	const rows = [[
		"Ledger",
		"Name",
		"Date",
		"Folder",
		"Stage",
		"TM",
		"Details",
		"Due",
		"Received"
	]];
	for (const c of consultants) for (const e of c.entries) rows.push([
		c.id,
		c.name,
		formatDate(e.date),
		e.folderNo,
		e.stage,
		e.tmNo,
		e.details,
		e.due || "",
		e.received || ""
	]);
	return csv(rows);
}
//#endregion
export { ledgerCsv as a, indexCsv as i, bookCsv as n, downloadText as r, Button as t };
