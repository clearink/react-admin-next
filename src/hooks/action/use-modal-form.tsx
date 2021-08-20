import { useState, useCallback, ComponentType } from "react";
import { ButtonProps, Modal, Form } from "antd";
import TitleTip from "@/components/Pro/TitleTip";
import useRefCallback from "@/hooks/state/use-ref-callback";
import { UseModalActionProps, WrapperProps } from "./interface";
import { useRef } from "react";
import { isBoolean, isObject } from "@/utils/ValidateType";
import mergeValue from "@/components/Pro/utils/merge-value";
import { ProForm } from "@/components/Pro/Form";
import { createPortal } from "react-dom";

/**
 * @description 弹窗表单
 */

export default function useModalForm<P = {}>(
	WrappedComponent: ComponentType<P>,
	$config?: UseModalActionProps
) {
	const { resetOnClose, form: $form } = mergeValue({ resetOnClose: true }, $config);

	// form
	const [form] = Form.useForm($form);
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
		if (resetOnClose) setProps(undefined);
		setVisible(false);
	}, [resetOnClose]);

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

	// 渲染底部
	const renderFooter = useRefCallback(()=>{
		
	})

	const WrapperModalComponent = useRefCallback((injectProps: WrapperProps<P>) => {
		const { "field-props": field, title, "form-props": formProps, ...rest } = injectProps;
		fieldRef.current = field;
		onOpenRef.current = rest.onOpen;
		onOkRef.current = rest.onOk;
		onCancelRef.current = rest.onCancel;
		const handleFinish = () => {};

		const DOM = (
			<ProForm
				{...formProps}
				form={form}
				onFinish={handleFinish}
				submitConfig={{
					render: (dom) => (
						<Modal
							{...rest}
							title={<TitleTip title={title} />}
							visible={visible}
							onOk={handleOk}
							footer={renderFooter(dom)}
							onCancel={handleCancel}
						>
							<WrappedComponent {...(field as P)} {...props} />
						</Modal>
					),
				}}
			/>
		);
		return createPortal(DOM, document.querySelector("body")!);
	});
	return [WrapperModalComponent, handleOpenClick, handleCloseClick] as const;
}
