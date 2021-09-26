import { ColProps, FormItemProps } from "antd";
import { ProComponentRequest } from "../interface";

export type ProFormItemSize =
	| number
	| "xs"
	| "s"
	| "m"
	| "l"
	| "lg"
	| "xl"
	| [ColProps, ColProps]
	| [ColProps];

export interface WithFormItemProps<P> extends FormItemProps, ProComponentRequest {
	/** 组件宽度 可被覆盖 */
	width?: ProFormItemSize;
	/** 传入组件内部的属性 例如 placeholder */
	field?: P;
	/** 透传placeholder */
	placeholder?: string;
}
