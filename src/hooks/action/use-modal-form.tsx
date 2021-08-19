import { useState, useCallback, ComponentType } from "react";
import { Modal, ModalProps } from "antd";
import { TitleProps } from "antd/lib/typography/Title";
import TitleTip from "@/components/Pro/TitleTip";
import mergeValue from "@/components/Pro/utils/merge-value";
import { isUndefined } from "@/utils/ValidateType";
import useRefCallback from "@/hooks/state/use-ref-callback";
import { UseModalActionProps } from "./interface";

/**
 * @description 弹窗表单
 */

export default function useModalForm<P = {}>(
	WrappedComponent: ComponentType<P>,
	$config?: UseModalActionProps
) {
	const { resetOnClose } = mergeValue<UseModalActionProps>({ resetOnClose: true }, $config);

	const [visible, setVisible] = useState(false);
	const [props, setProps] = useState<Partial<P>>();

	// 打开事件
	const handleOpenClick = useCallback(async (injectProps?: Partial<P>) => {
		if (!isUndefined(injectProps)) setProps(injectProps);
		setVisible(true);
	}, []);

	// 关闭事件
	const handleCloseClick = useCallback(() => {
		if (resetOnClose) setProps(undefined);
		setVisible(false);
	}, [resetOnClose]);

	type WrapperProps = Omit<ModalProps, "onCancel"> & {
		title?: TitleProps["title"];
		"field-props"?: Partial<P>;
		onCancel?: (props?: Partial<P>) => Promise<boolean>;
		onOk?: (props?: Partial<P>) => Promise<boolean>;
	};

	const WrapperModalComponent = useRefCallback((injectProps: WrapperProps) => {
		const { "field-props": field, title, onCancel, onOk, ...rest } = injectProps;
		const handleCancel = async (e: React.MouseEvent<HTMLElement>) => {
			const shouldClose = (await onCancel?.(field)) ?? true;
			shouldClose === true && handleCloseClick();
		};
		const handleOk = async () => {
			console.log("123");
			const shouldOpen = (await onOk?.(field)) ?? true;
			console.log("123");
			shouldOpen === true && handleOpenClick();
		};
		return (
			<Modal
				{...rest}
				title={<TitleTip title={title} />}
				visible={visible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<WrappedComponent {...(field as P)} {...props} />
			</Modal>
		);
	});
	return [WrapperModalComponent, handleOpenClick, handleCloseClick] as const;
}
