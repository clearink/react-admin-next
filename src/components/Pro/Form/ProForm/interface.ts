import { FormProps, Form } from "antd";
import { ReactElement } from "react";
import { SubmitterProps } from "../Submitter";
export interface ProFormProps<Values = any> extends FormProps<Values> {
	children?: React.ReactNode;
	submitConfig?: SubmitterProps | false;
	/** 时间格式化字符串 */
	timeFormat?: string;
}

type InternalFormType = <V = any>(props: ProFormProps<V>) => ReactElement;
export interface ProFormType extends InternalFormType {
	Item: typeof Form.Item;
}
