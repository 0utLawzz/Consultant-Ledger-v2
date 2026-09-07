import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as cn } from "./router-XuVBQ_NX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/input-Cl-R8Dsi.js
var import_jsx_runtime = require_jsx_runtime();
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-10 w-full rounded-md border border-rule bg-ivory px-3 text-sm text-ink", "placeholder:text-muted", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum/35", "disabled:opacity-50", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("min-h-24 w-full rounded-md border border-rule bg-ivory px-3 py-2 text-sm text-ink", "placeholder:text-muted", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum/35", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("text-xs font-medium tracking-wide text-ink-soft", className),
		...props
	});
}
function NativeSelect({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		className: cn("h-10 w-full rounded-md border border-rule bg-ivory px-3 text-sm text-ink", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum/35", className),
		...props
	});
}
//#endregion
export { Textarea as i, Label as n, NativeSelect as r, Input as t };
