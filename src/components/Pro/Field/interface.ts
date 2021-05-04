export interface ProFieldProps<T = any> {
	text?: any;
	render?: (dom: JSX.Element, props: T) => JSX.Element;
}
