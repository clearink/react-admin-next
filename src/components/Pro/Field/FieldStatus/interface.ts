import { BadgeProps, TagProps } from "antd";
import { ProComponentRequest, ValueEnum } from "../../interface";
import { ProFieldProps } from "../interface";

export interface StatusEnumItem extends ValueEnum {
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
	color?: BadgeProps['color'];
	/** 颜色渐变区间 */
	colorRange?: string[];
}
