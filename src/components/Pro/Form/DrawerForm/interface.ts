import { DrawerProps, FormInstance } from "antd";
import { TitleTipProps } from "../../TitleTip";
import { ProFormProps } from "../ProForm";

export interface DrawerFormProps<Values = any> extends DrawerProps, Omit<ProFormProps<Values>, "title"> {
	title?: TitleTipProps["title"];
	trigger?: React.ReactNode;
	/** form实例 off:关闭函数 */
	renderFooter?: (form: FormInstance, off: () => void) => JSX.Element;
	onFinish?: (values: Values) => Promise<boolean> | boolean;
}
export interface DrawerFormRef {
	form: FormInstance;
	toggle: () => void;
	on: () => void;
	off: () => void;
}
