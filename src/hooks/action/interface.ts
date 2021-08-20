import { TitleTipProps } from "@/components/Pro/TitleTip";
import { FormInstance, FormProps, ModalProps } from "antd";

export interface UseModalActionProps {
	resetOnClose?: boolean;
	form?: FormInstance;
	// 加载中是如何做的呢
}

export interface WrapperProps<P = {}> extends Omit<ModalProps, "onOk" | "onCancel"> {
	"field-props"?: Partial<P>;
	title?: TitleTipProps["title"];
	onOpen?: (props?: Partial<P>) => Promise<boolean | Partial<P>>;
	onOk?: (props?: Partial<P>) => Promise<boolean>;
	onCancel?: (props?: Partial<P>) => Promise<boolean>;
	"form-props"?: FormProps;
}
