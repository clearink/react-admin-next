import { useCallback, memo, ComponentType } from "react";
import { Modal, ModalProps } from "antd";
import mergeValue from "@/components/Pro/utils/merge-value";
import { isUndefined } from "@/utils/ValidateType";
import { useState } from "react";
import useRefCallback from "../state/use-ref-callback";
import { UseModalActionProps } from "./interface";

export default function useModalAction<P = {}>(
	WrappedComponent: ComponentType<P>,
	$config?: UseModalActionProps
) {
	const { resetOnClose } = mergeValue<UseModalActionProps>({ resetOnClose: true }, $config);

	const [visible, setVisible] = useState(false);
	const [props, setProps] = useState<Partial<P>>();

	const handleOpenClick = useCallback((injectProps?: Partial<P>) => {
		if (!isUndefined(injectProps)) setProps(injectProps);
		setVisible(true);
	}, []);

	const handleCloseClick = useCallback(() => {
		if (resetOnClose) setProps(undefined);
		setVisible(false);
	}, [resetOnClose]);

	type WrapperProps = ModalProps & { "field-props"?: Partial<P> };

	const WrapperModalComponent = useRefCallback((injectProps: WrapperProps) => {
		const { "field-props": field, ...rest } = injectProps;
		const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
			handleCloseClick();
			rest.onCancel?.(e);
		};
		return (
			<Modal {...rest} visible={visible} onCancel={handleCancel}>
				<WrappedComponent {...(field as P)} {...props} />
			</Modal>
		);
	});
	return [WrapperModalComponent, handleOpenClick, handleCloseClick] as const;
}
