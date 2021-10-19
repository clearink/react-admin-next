import Constant from "./utils";

const LEVEL_LIST = [
	{ value: "generalNurse", label: "普通护工", color: "#1abc9c" },
	{ value: "seniorNurse", label: "高级护工", color: "#e67e62" },
] as const;
export const LEVEL_CONST = new Constant(LEVEL_LIST);
