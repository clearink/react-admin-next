import Constant from "./utils";

export const REQUEST_TYPE_CONST = new Constant([
	{ label: "GET", value: "get", color: "#2ecc71" },
	{ label: "POST", value: "post", color: "#e67e22" },
	{ label: "PUT", value: "put", color: "#8e44ad" },
	{ label: "DELETE", value: "delete", color: "#e74c3c" },
] as const);
