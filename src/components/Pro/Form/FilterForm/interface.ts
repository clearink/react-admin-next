import { CSSProperties } from "react";
import { ProFormProps } from "../ProForm/interface";

export interface FilterFormProps<Values = any> extends ProFormProps<Values> {
	/** 是否收起 默认 false */
	collapsed?: boolean;
	/** 收起/打开时的回调 */
	onCollapse?: (collapsed: boolean) => void;

	/** @deprecated 背景色是否透明 无需求 暂不实现  */
	ghost?: boolean;

}
/**
 * 
export interface QueryFilterProps extends BaseFormProps {
	collapsed: boolean
	defaultCollapsed?: boolean
	onCollapse?: (collapsed: boolean) => void
	layout?: "horizontal" | "horizontal"
	ghost: boolean
	className?: string
	style?: CSSProperties
}
 */
