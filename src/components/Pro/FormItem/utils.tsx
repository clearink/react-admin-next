import { ReactNode } from "react";
import { Rule } from "antd/lib/form";
import { isArray, isNumber, isUndefined } from "@/utils/ValidateType";
import { ProFormItemSize } from "./interface";
import { WIDTH_SIZE_ENUM } from "../utils/constant";

// 跟 required 去得到相应的 rule[]
export function getRequiredRule(name?: ReactNode) {
	if (!name) return [{ required: true }];
	return [{ required: true, message: <>请输入{name}</> }] as Rule[];
}

// formItem 的宽度计算
export function getProFormItemStyle(width?: ProFormItemSize) {
	// 返回的是 props
	if (isArray(width)) return [{ labelCol: width[0], wrapperCol: width[1] }, undefined] as const;
	// 返回的是 style
	if (isUndefined(width)) return [undefined, undefined] as const;
	if (isNumber(width)) return [undefined, width] as const;
	const size = WIDTH_SIZE_ENUM[width] ?? WIDTH_SIZE_ENUM["m"];
	return [undefined, size] as const;
}
