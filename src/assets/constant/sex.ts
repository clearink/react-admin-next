import { StatusEnumItem } from "@/components/Pro/Field/FieldStatus/interface";
import Constant, { ConstantItem } from "./utils";

interface SexItem extends ConstantItem {
	value: "male" | "female";
}

export const SEX_CONST = new Constant<SexItem>(
	{ value: "male", label: "男", color: "red" },
	{ value: "female", label: "女", color: "blue" }
).toArray(([k, v]) => v as StatusEnumItem);
