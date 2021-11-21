import Constant from "./utils";

export const LEVEL_CONST = new Constant([
	{ value: "generalNurse", label: "普通护工", key: 'common', color: "#1abc9c" },
	{ value: "seniorNurse", label: "高级护工", key: 'pro', color: "#e67e62" },
] as const);
