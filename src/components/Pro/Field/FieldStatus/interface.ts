import { BadgeProps, TagProps } from "antd";
import { ProFieldProps } from "../interface";

export interface StatusEnumItem {
	label: string;
	value: any;
	color?: BadgeProps["color"];
}
export interface FieldStatusProps extends BadgeProps, TagProps, ProFieldProps<FieldStatusProps> {
	text?: string;
	/** 渲染方式 */
	type?: "tag" | "badge";
	/** 数据匹配数组 */
	color?: string;
	valueEnum?: StatusEnumItem[];
	/** 格式为 [url,params] */
	params?: string | [string, any];
	/** 数据请求 可以设置自动获取 valueEnum */
	request?: (key: string, ...params: any[]) => Promise<StatusEnumItem[] | undefined>;
}
