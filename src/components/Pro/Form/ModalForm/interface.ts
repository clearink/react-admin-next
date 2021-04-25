import { FormInstance, ModalProps } from "antd";
import { TitleTipProps } from "../../TitleTip";
import { ProFormProps } from "../ProForm/interface";

export interface ModalFormProps<Values = any> extends ModalProps, Omit<ProFormProps<Values>, "title"> {
	title?: TitleTipProps["title"];
	trigger?: React.ReactNode;
	/** form实例 off:关闭函数 */
	renderFooter?: (form: FormInstance, off: () => void) => JSX.Element;
	onFinish?: (values: Values) => Promise<boolean> | boolean;
}
export interface ModalFormRef {
	form: FormInstance;
	toggle: () => void;
	on: () => void;
	off: () => void;
}
