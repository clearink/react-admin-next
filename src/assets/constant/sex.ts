import Constant, { ValueEnum } from "./utils";

interface SexItem extends ValueEnum {
	value: "male" | "female";
}

export const SEX_CONST = new Constant<SexItem>(
	{ value: "male", label: "男", color: "red" },
	{ value: "female", label: "女", color: "blue" }
).toArray(([k, v]) => v);
