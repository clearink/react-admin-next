/** 组件渲染函数 */
export type ProComponentRender<T> = (
	dom: JSX.Element | JSX.Element[],
	props: Omit<T, "render">
) => JSX.Element;

export interface ValueEnum {
	label: string | number;
	value: string | number | boolean;

	key?: string;
	color?: string;
}
/** 组件数据请求函数 */
type ParamsKey = string | any[] | null;
export interface ProComponentRequest {
	valueEnum?: ValueEnum[];
	params?: ParamsKey | (() => ParamsKey);
	/** 一定要设置 params 哦 否则不会发起请求的 */
	request?: (...args: any) => Promise<ValueEnum[] | undefined>;
}
