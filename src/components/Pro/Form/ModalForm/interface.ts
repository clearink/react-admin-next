import { Form, FormInstance, ModalProps } from "antd";
import { ReactElement, Ref } from "react";
import { TitleTipProps } from "../../TitleTip";
import { ProFormProps } from "../ProForm/interface";

export interface ModalFormProps<Values = any>
	extends ModalProps,
		Omit<ProFormProps<Values>, "title"> {
	title?: TitleTipProps["title"];
	trigger?: React.ReactNode;
	/** form实例 off:关闭函数 */
	renderFooter?: (form: FormInstance, off: () => void) => JSX.Element;
	onFinish?: (values: Values) => Promise<boolean> | boolean;

	// fix 泛型问题
	ref?: Ref<ModalFormRef>;
}
export interface ModalFormRef {
	form: FormInstance;
	toggle: () => void;
	on: () => void;
	off: () => void;
}

type InternalModalFormType = <V = any>(props: ModalFormProps<V>) => ReactElement;
export interface ModalFormType extends InternalModalFormType {
	Item: typeof Form.Item;
}
