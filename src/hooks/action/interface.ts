import { Dispatch, ReactNode, SetStateAction } from "react";
import { DrawerProps, FormInstance, ModalProps } from "antd";
import { TitleTipProps } from "@/components/Pro/TitleTip";
import { ProFormProps } from "@/components/Pro/Form/ProForm/interface";

// modal
export interface UseModalActionProps {
	// 关闭时重置 props
	resetOnClose?: boolean;
	form?: FormInstance;
	/** moment 格式化 */
	timeFormat?: string;
}

export interface WrapperModalFormProps<P = {}, V = any>
	extends Omit<ModalProps, "onOk" | "onCancel"> {
	children?: ReactNode;
	fieldProps?: Omit<Partial<P>, "form">;
	formProps?: Omit<ProFormProps<V>, "onFinish">;
	title?: TitleTipProps["title"];
	onOpen?: (
		props?: Partial<P>,
		setProps?: Dispatch<SetStateAction<Partial<P> | undefined>> | null
	) => Promise<boolean | Partial<P>>;
	onOk?: (props?: Partial<P>, form?: FormInstance<V>, values?: V) => Promise<boolean>;
	onCancel?: (props?: Partial<P>) => Promise<boolean>;
}
export interface WrapperModalActionProps<P = {}> extends Omit<ModalProps, "onOk" | "onCancel"> {
	fieldProps?: Partial<P>;
	title?: TitleTipProps["title"];
	onOpen?: (
		props?: Partial<P>,
		setProps?: Dispatch<SetStateAction<Partial<P> | undefined>> | null
	) => Promise<boolean | Partial<P>>;
	onOk?: (props?: Partial<P>) => Promise<boolean>;
	onCancel?: (props?: Partial<P>) => Promise<boolean>;
}

// drawer

export interface UseDrawerActionProps {
	// 关闭时重置 props
	resetOnClose?: boolean;
	form?: FormInstance;
	/** moment 格式化 */
	timeFormat?: string;
}

export interface WrapperDrawerFormProps<P = {}, V = any> extends Omit<DrawerProps, "onClose"> {
	children?: ReactNode;
	fieldProps?: Omit<Partial<P>, "form">;
	formProps?: Omit<ProFormProps<V>, "onFinish">;
	title?: TitleTipProps["title"];
	onOpen?: (
		props?: Partial<P>,
		setProps?: Dispatch<SetStateAction<Partial<P> | undefined>> | null
	) => Promise<boolean | Partial<P>>;
	onOk?: (props?: Partial<P>, form?: FormInstance<V>, values?: V) => Promise<boolean>;
	onCancel?: (props?: Partial<P>) => Promise<boolean>;
}
export interface WrapperDrawerActionProps<P = {}> extends Omit<DrawerProps, "onOk" | "onCancel"> {
	fieldProps?: Partial<P>;
	title?: TitleTipProps["title"];
	onOpen?: (
		props?: Partial<P>,
		setProps?: Dispatch<SetStateAction<Partial<P> | undefined>> | null
	) => Promise<boolean | Partial<P>>;
	onOk?: (props?: Partial<P>) => Promise<boolean>;
	onCancel?: (props?: Partial<P>) => Promise<boolean>;
}
