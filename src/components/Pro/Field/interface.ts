import { ProComponentRender } from "../interface";

export interface ProFieldProps<T = any> {
	text?: any;
	render?: ProComponentRender<T>;
}
