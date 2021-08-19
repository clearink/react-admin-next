import { ModalProps } from "antd";
import { TitleTipProps } from "@/components/Pro/TitleTip";
export interface UseModalActionProps {
	// 关闭时重置 props
	resetOnClose?: boolean;
}

export interface WrapperProps<P = {}> extends Omit<ModalProps, "onCancel" | "onOk"> {
	title?: TitleTipProps["title"];
	"field-props"?: Partial<P>;
	onCancel?: (props?: Partial<P>) => Promise<boolean>;
	onOk?: (props?: Partial<P>) => Promise<boolean>;
	/** 打开前的回调 */
	onOpen?: (props?: Partial<P>) => Promise<boolean | Partial<P>>;
}
