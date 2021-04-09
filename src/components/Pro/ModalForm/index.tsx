import React, {
	cloneElement,
	forwardRef,
	isValidElement,
	Ref,
	useImperativeHandle,
	useLayoutEffect,
	useMemo,
	useState,
} from "react";
import { createPortal } from "react-dom";
import { Modal, FormProps, ModalProps, Form, FormInstance } from "antd";
import { useSwitch } from "@/hooks/state/use-boolean";
import TitleTip, { TitleTipProps } from "../TitleTip";
import { FilterValue, GetValue } from "@/utils/Value";
import { antdFormProps as __FormProps } from "../utils/constant";
import withDefaultProps from "@/hocs/withDefaultProps";
import useRefCallback from "@/hooks/state/use-ref-callback";
import { formatFormValue } from "../utils/format-form-value";

export interface ModalFormProps<Values = any> extends ModalProps, Omit<FormProps<Values>, "title"> {
	title?: TitleTipProps["title"];
	trigger?: React.ReactNode;
	children?: React.ReactNode;
	/** 格式化时间戳 */
	timeFormat?: string;
	/** form实例 off:关闭函数 */
	renderFooter?: (form: FormInstance, off: () => void) => JSX.Element;
	onFinish?: (values: Values) => Promise<boolean>;
}
export interface ModalFormRef {
	form: FormInstance;
	toggle: () => void;
	on: () => void;
	off: () => void;
}
function ModalForm<Values = any>(props: ModalFormProps<Values>, ref: Ref<ModalFormRef>) {
	const { title, trigger, children, renderFooter, form: __form, onFinish, timeFormat, ...rest } = props;
	const { visible, on, off, toggle } = useSwitch(false);
	const [form] = Form.useForm(__form);
	const [loading, setLoading] = useState(false);

	useImperativeHandle(ref, () => ({ form, on, off, toggle }), [form, off, on, toggle]); // 暴露的方法

	useLayoutEffect(() => {
		const timer = setTimeout(() => {
			const body = document.querySelector("body")!;
			if (visible) body.classList.add("ant-modal-body-effect");
			else body.classList.remove("ant-modal-body-effect");
		}, 50);
		return () => {
			clearTimeout(timer);
		};
	}, [visible]);

	const wrappedTrigger = useMemo(() => {
		if (!isValidElement(trigger)) return trigger;
		return cloneElement(trigger, {
			onClick: (e: MouseEvent) => {
				trigger.props.onClick?.(e);
				on();
			},
		});
	}, [trigger, on]);

	// 从props中分离出 ModalProps 和 formProps
	const [formProps, modalProps] = useMemo(() => {
		const antdFormProps: Array<
			keyof Omit<FormProps, "children" | "title" | "form" | "onFinish">
		> = __FormProps as any[];
		const formProps = GetValue(rest, antdFormProps, false);
		const ModalProps = FilterValue(rest, antdFormProps);
		return [formProps, ModalProps];
	}, [rest]);

	const handleClose = useRefCallback((e: any) => {
		modalProps.onCancel?.(e);
		off();
	});

	const handleFinish = useRefCallback(async (values: Values) => {
		try {
			setLoading(true);
			const close = await onFinish?.(formatFormValue(values, timeFormat));
			if (close) off();
		} catch (error) {
		} finally {
			setLoading(false);
		}
	});

	const DOM = (
		<Form form={form} {...formProps} onFinish={handleFinish}>
			<Modal
				visible={visible}
				title={title && <TitleTip title={title} />}
				{...modalProps}
				getContainer={false}
				onCancel={handleClose}
				confirmLoading={loading}
				footer={renderFooter?.(form, off)}
				onOk={() => form.submit()}
			>
				{children}
			</Modal>
			<button hidden type='submit'></button>
		</Form>
	);
	return (
		<>
			{wrappedTrigger}
			{createPortal(DOM, document.querySelector("body")!)}
		</>
	);
}
export default withDefaultProps(forwardRef(ModalForm), { width: 600 });
