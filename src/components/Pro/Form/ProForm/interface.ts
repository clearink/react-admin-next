import { ReactElement, ReactNode } from "react";
import { FormProps, Form, FormInstance, ButtonProps } from "antd";
export interface ProFormProps<Values = any> extends FormProps<Values> {
	children?: React.ReactNode;
	onSubmit?: () => void;
	onReset?: () => void;
	renderSubmitter?: (dom: ReactElement<ButtonProps>[], form: FormInstance) => ReactNode;
	/** 时间格式化字符串 */
	timeFormat?: string;
	loading?: ButtonProps["loading"]; // 外部的loading状态
}

type InternalFormType = <V = any>(props: ProFormProps<V>) => ReactElement;
export interface ProFormType extends InternalFormType {
	Item: typeof Form.Item;
}

export interface SubmitterProps {
	onSubmit?: () => void;
	onReset?: () => void;
	/** TODO: 优化下 props */
	render?: (dom: ReactElement<ButtonProps>[], form: FormInstance, props?: any) => ReactNode;
}
