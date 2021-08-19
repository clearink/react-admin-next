import { useState, useCallback, ComponentType } from "react";
import { ButtonProps, Modal } from "antd";
import TitleTip from "@/components/Pro/TitleTip";
import useRefCallback from "@/hooks/state/use-ref-callback";
import { WrapperProps } from "./interface";
import { useRef } from "react";
import { isBoolean, isObject } from "@/utils/ValidateType";
import mergeValue from "@/components/Pro/utils/merge-value";

/**
 * @description 弹窗表单
 */

export default function useModalForm<P = {}>(WrappedComponent: ComponentType<P>) {
	const [visible, setVisible] = useState(false);
	const [props, setProps] = useState<Partial<P>>();
	// loading 值
	const [loading, setLoading] = useState<ButtonProps["loading"]>(false);

	// 保存传入组件的值
	const fieldRef = useRef<Partial<P>>();
	// 保存回调函数
	const onOpenRef = useRef<(props?: Partial<P>) => Promise<boolean | Partial<P>>>();
	const onOkRef = useRef<(props?: Partial<P>) => Promise<boolean>>();
	const onCancelRef = useRef<(props?: Partial<P>) => Promise<boolean>>();

	// 打开事件
	const handleOpenClick = useRefCallback(async (openProps?: Partial<P>) => {
		const onOpen = onOpenRef.current;
		const field = fieldRef.current;
		const shouldOpen = (await onOpen?.({ ...field, ...openProps })) ?? true;
		if (isBoolean(shouldOpen) && shouldOpen) {
			setProps(openProps);
			setVisible(true);
		} else if (isObject(shouldOpen)) {
			// 返回的是对象 则设置其为 props
			setProps(mergeValue(openProps, shouldOpen));
			setVisible(true);
		}
	});

	// 独立的关闭事件
	const handleCloseClick = useCallback(() => {
		setProps(undefined);
		setVisible(false);
	}, []);

	// 关闭时触发
	// 传入 表单值 那么如何传入呢
	const handleCancel = useRefCallback(async () => {
		const onCancel = onCancelRef.current;
		const field = fieldRef.current;
		const shouldClose = (await onCancel?.({ ...field, ...props })) ?? true;
		shouldClose === true && handleCloseClick();
	});

	// 点击确定时触发
	const handleOk = useRefCallback(async () => {
		const onOk = onOkRef.current;
		const field = fieldRef.current;
		const shouldOpen = (await onOk?.({ ...field, ...props })) ?? true;
		shouldOpen === true && handleCloseClick();
	});

	const WrapperModalComponent = useRefCallback((injectProps: WrapperProps<P>) => {
		const { "field-props": field, title, ...rest } = injectProps;
		fieldRef.current = field;
		onOpenRef.current = rest.onOpen;
		onOkRef.current = rest.onOk;
		onCancelRef.current = rest.onCancel;
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
