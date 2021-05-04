import { StatusEnumItem } from "@/components/Pro/Field/FieldStatus/interface";
import Constant, { ConstantItem } from "./utils";

interface SexItem extends ConstantItem {
	value: "generalNurse" | "seniorNurse";
}

export const LEVEL_CONST = new Constant<SexItem>(
	{ value: "generalNurse", label: "普通护工", color: "#1abc9c" },
	{ value: "seniorNurse", label: "高级护工", color: '#e67e62' }
).toArray(([k, v]) => v as StatusEnumItem);
