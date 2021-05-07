import Constant, { ValueEnum } from "./utils";

interface RequestType extends ValueEnum {
	value: "get" | "post" | "put" | "delete";
}

export const REQUEST_TYPE_CONST = new Constant<RequestType>(
	{ label: "GET", value: "get", color: "#2ecc71" },
	{ label: "POST", value: "post", color: "#e67e22" },
	{ label: "PUT", value: "put", color: "#8e44ad" },
	{ label: "DELETE", value: "delete", color: "#e74c3c" }
).toArray(([k, v]) => v);
