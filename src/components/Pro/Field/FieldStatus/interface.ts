import { BadgeProps, TagProps } from "antd";
import { ProComponentRequest } from "../../interface";
import { ProFieldProps } from "../interface";

export interface StatusEnumItem {
	label: string;
	value: any;
	color?: BadgeProps["color"];
}
export interface FieldStatusProps
	extends BadgeProps,
		TagProps,
		ProComponentRequest,
		ProFieldProps<FieldStatusProps> {
	text?: string;
	/** 渲染方式 */
	type?: "tag" | "badge";
	/** 数据匹配数组 */
	color?: string;
	valueEnum?: StatusEnumItem[];
}
