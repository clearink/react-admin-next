/** 组件渲染函数 */
export type ProComponentRender<T> = (
	dom: JSX.Element | JSX.Element[],
	props: Omit<T, "render">
) => JSX.Element;

export interface ValueEnum {
	key?: string;
	value: string | number;
	label: string;
}
/** 组件数据请求函数 */
export interface ProComponentRequest {
	valueEnum?: ValueEnum[];
	params?: string | any[];
	request?: (...args: any) => Promise<ValueEnum[] | undefined>;
}
