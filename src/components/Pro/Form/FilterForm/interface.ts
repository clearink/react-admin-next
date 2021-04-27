import { ProFormProps } from "../ProForm/interface";

export interface FilterFormProps<Values = any> extends ProFormProps<Values> {
	/**  默认是否收起 = true */
	defaultCollapsed?: boolean;

	/**  是否收起 传入则由外部控制 */
	collapsed?: boolean;

	/** 收起/打开时的回调 */
	onCollapse?: (collapsed: boolean) => void;

	/** @deprecated 背景色是否透明 无需求 暂不实现  */
	ghost?: boolean;

	/** 布局依据 eg: { "(max-width:575x)": 24 } */
	colSpan?: ColSpan;
}
// TODO: 支持 height
export type ColSpan = {
	/** match type 默认min */
	type?: "min" | "max";
	/** 占比 默认24 */
	span?: number;
	size: number;
}[];
