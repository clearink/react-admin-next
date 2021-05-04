import { ColProps, FormItemProps } from "antd";

export interface ProFormItemProps<T> {
	render?: (dom: JSX.Element, props: Omit<T, "render">) => JSX.Element;
}
export type ProFormItemRender<T> = (dom: JSX.Element, props: Omit<T, "render">) => JSX.Element;
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
	/** 组件宽度 可被显示覆盖 */
	width?: ProFormItemSize;
	/** 传入组件内部的属性 例如 placeholder */
	field?: P;
}