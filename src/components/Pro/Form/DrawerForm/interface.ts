import { DrawerProps, Form, FormInstance } from "antd";
import { ReactElement, Ref } from "react";
import { TitleTipProps } from "../../TitleTip";
import { ProFormProps } from "../ProForm/interface";

export interface DrawerFormProps<Values = any>
	extends DrawerProps,
		Omit<ProFormProps<Values>, "title"> {
	title?: TitleTipProps["title"];
	trigger?: React.ReactNode;
	/** form实例 off:关闭函数 */
	renderFooter?: (form: FormInstance, off: () => void) => JSX.Element;
	onFinish?: (values: Values) => Promise<boolean> | boolean;

	// fix 泛型问题
	ref?: Ref<DrawerFormRef>;
}
export interface DrawerFormRef {
	form: FormInstance;
	toggle: () => void;
	on: () => void;
	off: () => void;
}

type InternalDrawerFormType = <V = any>(props: DrawerFormProps<V>) => ReactElement;
export interface DrawerFormType extends InternalDrawerFormType {
	Item: typeof Form.Item;
}
