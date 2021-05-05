import { ColProps, FormItemProps } from "antd";

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

export interface WithFormItemProps<P> extends FormItemProps {
	/** 组件宽度 可被覆盖 */
	width?: ProFormItemSize;
	/** 传入组件内部的属性 例如 placeholder */
	field?: P;
}
