import { Dispatch, SetStateAction, useState, ComponentType, useMemo } from "react";
import { createPortal } from "react-dom";
import { ButtonProps, Form, Modal } from "antd";
import TitleTip from "@/components/Pro/TitleTip";
import useRefCallback from "@/hooks/state/use-ref-callback";
import merge from "lodash/merge";
import { isBoolean, isObject } from "@/utils/ValidateType";
import { formatFormValue } from "@/components/Pro/utils/format-form-value";
import { UseModalActionProps, WrapperModalFormProps } from "./interface";
import useDeepMemo from "../state/use-deep-memo";

export function CreateModalForm<P = {}, V = any>(
	WrappedComponent: ComponentType<P>,
	$config?: UseModalActionProps
) {
	// 基础配置
	const {
		resetOnClose,
		form: $form,
		timeFormat,
	} = merge({ resetOnClose: true, autoSubmit: true, timeFormat: "YYYY-MM-DD" }, $config);

	// 回调 or 数值
	let innerSetVisible: null | Dispatch<SetStateAction<boolean>> = null;
	let innerSetWrappedProps: null | Dispatch<SetStateAction<Partial<P> | undefined>> = null;
	let innerOnOpen: null | WrapperModalFormProps["onOpen"] = null;
	let innerField: WrapperModalFormProps["fieldProps"] = undefined;

	// 回调锁
	let handleLock = false;

	// 打开事件
	const handleOpenClick = async (openProps?: Partial<P>) => {
		if (handleLock) return;
		handleLock = true;
		const props = { ...innerField, ...openProps };
		const shouldOpen = (await innerOnOpen?.(props, innerSetWrappedProps)) ?? true;
		handleLock = false;
		if (isBoolean(shouldOpen) && shouldOpen) {
			innerSetWrappedProps?.(openProps);
			innerSetVisible?.(true);
		} else if (isObject(shouldOpen)) {
			// 返回的是对象 则设置其为 props
			innerSetWrappedProps?.(merge(openProps, shouldOpen));
			innerSetVisible?.(true);
		}
	};

	// 关闭事件
	const handleCloseClick = () => {
		if (resetOnClose) innerSetWrappedProps?.(undefined);
		innerSetVisible?.(false);
	};

	const WrapperModalComponent = (injectProps: WrapperModalFormProps<P, V>) => {
		const { fieldProps: field, title, formProps, onOpen, onOk, ...rest } = injectProps;

		// 外部传入的 form
		const [form] = Form.useForm<V>($form);
		const [visible, setVisible] = useState(false); // 显示与隐藏
		const [wrappedProps, setWrappedProps] = useState<Partial<P>>(); // 传入组件的值
		const [loading, setLoading] = useState<ButtonProps["loading"]>(false);

		/** 保存回调/数值供外部使用 */
		innerOnOpen = onOpen;
		innerField = field;
		innerSetVisible = setVisible;
		innerSetWrappedProps = setWrappedProps;
		/** ====================== */

		// 点击确定时触发
		// 同时触发 submit 表单的submit
		const handleOk = useRefCallback(async () => {
			if (handleLock) return;
			handleLock = true;
			try {
				await form.validateFields(); // 校验字段
				setLoading({ delay: 50 });
				const props = { ...field, ...wrappedProps };
				const values = formatFormValue(form.getFieldsValue(), timeFormat);
				const shouldOpen = (await onOk?.(props, form, values)) ?? true;
				// 返回 true 且 submit 成功 则关闭

				if (!!shouldOpen) {
					form.resetFields();
					handleCloseClick();
				}
			} finally {
				setLoading(false);
				handleLock = false;
			}
		});

		// 关闭时触发
		const handleCancel = useRefCallback(async () => {
			if (handleLock) return;
			handleLock = true;
			const onCancel = rest.onCancel;
			const shouldClose = (await onCancel?.({ ...field, ...wrappedProps })) ?? true;
			handleLock = false;
			shouldClose === true && handleCloseClick();
		});

		// 缓存值
		const okButtonProps = useMemo(
			() => merge(rest.okButtonProps, { loading }),
			[rest.okButtonProps, loading]
		);

		// 缓存组件
		const WrappedMemorized = useMemo(
			() => <WrappedComponent {...(field as P)} {...wrappedProps} />,
			[field, wrappedProps]
		);

		const DOM = (
			<Form name='modal-form' {...formProps} form={form} onFinish={handleOk}>
				<Modal
					{...rest}
					title={<TitleTip title={title} />}
					visible={visible}
					getContainer={false}
					onOk={handleOk}
					okButtonProps={okButtonProps}
					onCancel={handleCancel}
				>
					{WrappedMemorized}
				</Modal>
				<button key='submit-btn' type='submit' hidden></button>
			</Form>
		);

		return createPortal(DOM, document.querySelector("body")!);
	};

	return [WrapperModalComponent, handleOpenClick, handleCloseClick] as const;
}

export default function useModalForm<P = {}, V = any>(
	WrappedComponent: ComponentType<P>,
	$config?: UseModalActionProps
) {
	return useDeepMemo(() => CreateModalForm<P, V>(WrappedComponent, $config), [$config]);
}
