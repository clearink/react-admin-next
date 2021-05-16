import { BadgeProps, TagProps } from "antd";
import { ProComponentRequest, ValueEnum } from "../../interface";
import { ProFieldProps } from "../interface";

export interface StatusEnumItem extends ValueEnum {
	color?: BadgeProps["color"];
}
export interface FieldStatusProps
	extends Omit<BadgeProps, "color">,
		Omit<TagProps, "color">,
		ProComponentRequest,
		ProFieldProps<FieldStatusProps> {
	text?: string;
	/** 渲染方式 */
	type?: "tag" | "badge";
	color?: BadgeProps["color"] | BadgeProps["color"][];
}
