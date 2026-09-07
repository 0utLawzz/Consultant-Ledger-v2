import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as Pencil, f as ArrowLeft, l as Download, o as Printer, r as Trash2, s as Plus } from "../_libs/lucide-react.mjs";
import { i as cn, n as Route, r as useLedger } from "./router-XuVBQ_NX.mjs";
import { a as computedBalance, d as parseAmount, g as withRunning, h as totals, m as todayIso, n as StageChip, o as formatDate, r as StatusBadge, s as formatPkr, t as Shell, u as outstanding } from "./format-CXS34QTE.mjs";
import { a as ledgerCsv, r as downloadText, t as Button } from "./export-PK2pbfUR.mjs";
import { i as Textarea, n as Label, r as NativeSelect, t as Input } from "./input-Cl-R8Dsi.mjs";
import { n as Dialog, r as DialogContent, t as ConsultantDialog } from "./consultant-dialog-B_wqtFJ3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ledger._id-CrTaD7ri.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var empty = () => ({
	date: todayIso(),
	folderNo: "",
	stage: "",
	tmNo: "",
	details: "",
	kind: "due",
	amount: ""
});
function fromEntry(e) {
	return {
		date: e.date || todayIso(),
		folderNo: e.folderNo,
		stage: e.stage,
		tmNo: e.tmNo,
		details: e.details,
		kind: e.kind === "payment" ? "payment" : e.kind === "note" ? "note" : "due",
		amount: String(e.kind === "payment" ? e.received : e.due || "")
	};
}
function EntryDialog({ open, onOpenChange, initial, onSave }) {
	const [draft, setDraft] = (0, import_react.useState)(empty);
	(0, import_react.useEffect)(() => {
		if (open) setDraft(initial ? fromEntry(initial) : empty());
	}, [open, initial]);
	function submit(ev) {
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
			received: kind === "payment" ? amount : 0
		});
		onOpenChange(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			title: initial ? "Edit entry" : "New entry",
			description: "Due is billed to the consultant. Payment reduces the running balance.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "e-date",
								children: "Date"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "e-date",
								type: "date",
								value: draft.date,
								onChange: (e) => setDraft({
									...draft,
									date: e.target.value
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "e-kind",
								children: "Type"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
								id: "e-kind",
								value: draft.kind,
								onChange: (e) => setDraft({
									...draft,
									kind: e.target.value
								}),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "due",
										children: "Due / filing"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "payment",
										children: "Payment received"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "note",
										children: "Note"
									})
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "e-folder",
									children: "Folder"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "e-folder",
									value: draft.folderNo,
									onChange: (e) => setDraft({
										...draft,
										folderNo: e.target.value
									}),
									placeholder: "A01-012"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "e-stage",
									children: "Stage"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
									id: "e-stage",
									value: draft.stage,
									onChange: (e) => setDraft({
										...draft,
										stage: e.target.value
									}),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "S1",
											children: "S1"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "S2",
											children: "S2"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "S3",
											children: "S3"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "S4",
											children: "S4"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "S1,S2",
											children: "S1 + S2"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "e-tm",
									children: "TM No"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "e-tm",
									value: draft.tmNo,
									onChange: (e) => setDraft({
										...draft,
										tmNo: e.target.value
									}),
									placeholder: "628319"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "e-details",
							children: "Details"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "e-details",
							value: draft.details,
							onChange: (e) => setDraft({
								...draft,
								details: e.target.value
							}),
							placeholder: "Mark name, class, notes"
						})]
					}),
					draft.kind !== "note" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "e-amt",
							children: "Amount (PKR)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "e-amt",
							inputMode: "numeric",
							value: draft.amount,
							onChange: (e) => setDraft({
								...draft,
								amount: e.target.value
							}),
							placeholder: "5000",
							required: true
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex justify-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							onClick: () => onOpenChange(false),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							children: initial ? "Save" : "Add entry"
						})]
					})
				]
			})
		})
	});
}
function LedgerPage() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const consultant = useLedger((s) => s.consultants.find((c) => c.id === id));
	const company = useLedger((s) => s.company);
	const addEntry = useLedger((s) => s.addEntry);
	const updateEntry = useLedger((s) => s.updateEntry);
	const removeEntry = useLedger((s) => s.removeEntry);
	const updateConsultant = useLedger((s) => s.updateConsultant);
	const removeConsultant = useLedger((s) => s.removeConsultant);
	const [entryOpen, setEntryOpen] = (0, import_react.useState)(false);
	const [editOpen, setEditOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [q, setQ] = (0, import_react.useState)("");
	const rows = (0, import_react.useMemo)(() => {
		if (!consultant) return [];
		const run = withRunning(consultant.entries);
		const s = q.trim().toLowerCase();
		if (!s) return run;
		return run.filter((e) => `${e.details} ${e.folderNo} ${e.tmNo} ${e.stage}`.toLowerCase().includes(s));
	}, [consultant, q]);
	if (!consultant) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-rule bg-ivory p-10 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-xl",
			children: "Ledger not found"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "mt-3 inline-block text-sm text-plum",
			children: "Back to index"
		})]
	}) });
	const book = outstanding(consultant);
	const live = computedBalance(consultant.entries);
	const t = totals(consultant.entries);
	function openNew() {
		setEditing(null);
		setEntryOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		onNew: openNew,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "no-print flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "inline-flex h-10 items-center gap-2 text-sm text-ink-soft hover:text-ink",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "All ledgers"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => setEditOpen(true),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" }), "Edit"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => window.print(),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "size-3.5" }), "Print"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => downloadText(`${consultant.id.toLowerCase()}-ledger.csv`, ledgerCsv(consultant)),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), "CSV"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									onClick: openNew,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "Entry"]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "overflow-hidden rounded-xl border border-rule bg-ivory shadow-sheet",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
								className: "bg-plum px-4 py-4 text-ivory sm:px-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-2xl tracking-tight sm:text-3xl",
										children: "Ledger-Balance Sheet"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-[11px] tracking-[0.14em] text-ivory/70 uppercase",
										children: company.office
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-right",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display text-2xl tabular",
											children: formatPkr(book)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 font-mono text-sm tracking-wide",
											children: [
												consultant.id,
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "mx-2 text-ivory/40",
													children: "·"
												}),
												consultant.name
											]
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 border-t border-ivory/15 pt-3 text-[11px] text-ivory/70",
									children: [
										company.bank,
										" · ",
										company.accountTitle,
										" ",
										company.accountNo,
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "hidden sm:inline",
											children: [" · IBAN ", company.iban]
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "no-print flex flex-wrap items-center gap-2 border-b border-rule px-4 py-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: q,
										onChange: (e) => setQ(e.target.value),
										placeholder: "Filter this ledger…",
										className: "h-9 min-w-0 flex-1 rounded-md border border-rule bg-paper px-3 text-sm",
										"aria-label": "Filter entries"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { balance: book }),
									consultant.live && book !== live ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-muted",
										children: ["Running ", formatPkr(live)]
									}) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "w-full min-w-[52rem] text-left text-[13px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
											className: "bg-paper-2 text-[10px] font-semibold tracking-[0.14em] text-ink-soft uppercase",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "px-3 py-2",
													children: "Date"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "px-3 py-2",
													children: "Folder"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "px-3 py-2",
													children: "Stage"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "px-3 py-2",
													children: "TM"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "px-3 py-2",
													children: "Details"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "px-3 py-2 text-right",
													children: "Due"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "px-3 py-2 text-right",
													children: "Received"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "px-3 py-2 text-right",
													children: "Balance"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "no-print px-2 py-2" })
											] })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [rows.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: cn("border-b border-rule/80", e.kind === "payment" && "bg-plum/[0.06]", e.kind === "note" && "bg-paper-2/50"),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-3 py-1.5 whitespace-nowrap tabular text-ink-soft",
													children: formatDate(e.date)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-3 py-1.5 font-mono text-[12px]",
													children: e.folderNo || "—"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-3 py-1.5",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageChip, { stage: e.stage })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-3 py-1.5 font-mono text-[12px] text-muted",
													children: e.tmNo || ""
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "max-w-[22rem] px-3 py-1.5 text-ink",
													children: e.kind === "payment" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-medium text-plum",
														children: e.details || "Payment received"
													}) : e.details
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-3 py-1.5 text-right tabular",
													children: e.due ? formatPkr(e.due) : ""
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-3 py-1.5 text-right tabular text-recv",
													children: e.received ? formatPkr(e.received) : ""
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: cn("px-3 py-1.5 text-right tabular font-medium", e.running > 0 ? "text-due" : e.running < 0 ? "text-credit" : "text-recv"),
													children: formatPkr(e.running)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "no-print px-2 py-1.5",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-end gap-0.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															type: "button",
															className: "inline-flex size-8 items-center justify-center rounded-sm text-muted hover:bg-paper-2 hover:text-ink",
															onClick: () => {
																setEditing(e);
																setEntryOpen(true);
															},
															"aria-label": "Edit entry",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" })
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															type: "button",
															className: "inline-flex size-8 items-center justify-center rounded-sm text-muted hover:bg-due/10 hover:text-due",
															onClick: () => {
																if (confirm("Delete this entry?")) removeEntry(consultant.id, e.id);
															},
															"aria-label": "Delete entry",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
														})]
													})
												})
											]
										}, e.id)), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											colSpan: 9,
											className: "px-4 py-16 text-center text-sm text-muted",
											children: "No entries yet. Add a filing or a payment to open this ledger."
										}) }) : null] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tfoot", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "bg-plum text-ivory",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													colSpan: 5,
													className: "px-3 py-2.5 text-xs font-medium tracking-[0.14em] uppercase",
													children: "Total"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-3 py-2.5 text-right tabular text-sm",
													children: formatPkr(t.due)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-3 py-2.5 text-right tabular text-sm",
													children: formatPkr(t.received)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-3 py-2.5 text-right tabular text-sm font-semibold",
													children: formatPkr(book)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "no-print" })
											]
										}) })
									]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "no-print text-xs text-muted",
						children: [
							"Outstanding on the sheet follows the printed book until you edit this ledger, then it follows live entries.",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "text-due underline-offset-2 hover:underline",
								onClick: () => {
									if (confirm(`Remove ${consultant.id} ${consultant.name}?`)) {
										removeConsultant(consultant.id);
										navigate({ to: "/" });
									}
								},
								children: "Delete consultant"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntryDialog, {
				open: entryOpen,
				onOpenChange: setEntryOpen,
				initial: editing,
				onSave: (entry) => {
					if (entry.id) updateEntry(consultant.id, {
						id: entry.id,
						date: entry.date,
						folderNo: entry.folderNo,
						stage: entry.stage,
						tmNo: entry.tmNo,
						details: entry.details,
						due: entry.due,
						received: entry.received,
						kind: entry.kind
					});
					else addEntry(consultant.id, entry);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsultantDialog, {
				open: editOpen,
				onOpenChange: setEditOpen,
				initial: consultant,
				onSave: (input) => updateConsultant(consultant.id, {
					name: input.name,
					notes: input.notes
				})
			})
		]
	});
}
//#endregion
export { LedgerPage as component };
