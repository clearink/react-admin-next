import Constant from "./utils";

const SEX_LIST = [
	{ value: "male", label: "男", color: "red" },
	{ value: "female", label: "女", color: "blue" },
] as const;
export const SEX_CONST = new Constant(SEX_LIST);
