import React, {
	cloneElement,
	forwardRef,
	isValidElement,
	Ref,
	useImperativeHandle,
	useMemo,
} from "react";
import { createPortal } from "react-dom";
import { Modal, FormProps, Form } from "antd";
import { useSwitch } from "@/hooks/state/use-boolean";
import TitleTip from "../../TitleTip";
import { FilterValue, GetValue } from "@/utils/Value";
import { antdFormProps as __FormProps } from "../../utils/constant";
import withDefaultProps from "@/hocs/withDefaultProps";
import useRefCallback from "@/hooks/state/use-ref-callback";
import useFixModalMask from "../hooks/use-fix-modal-mask";
import { ModalFormProps, ModalFormRef, ModalFormType } from "./interface";
import ProForm from "../ProForm";
import styles from "./style.module.scss";

function ModalForm<Values = any>(props: ModalFormProps<Values>, ref: Ref<ModalFormRef>) {
	const {
		title,
		trigger,
		children,
		renderFooter: $renderFooter,
		form: $form,
		onFinish,
		timeFormat,
		...rest
	} = props;
	const { visible, on, off, toggle } = useSwitch(false);
	const [form] = Form.useForm($form);

	useImperativeHandle(ref, () => ({ form, on, off, toggle }), [form, off, on, toggle]); // 暴露的方法

	useFixModalMask(visible);

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
		const formProps = GetValue(rest, antdFormProps);
		const ModalProps = FilterValue(rest, antdFormProps);
		return [formProps, ModalProps];
	}, [rest]);

	const handleClose = useRefCallback((e: any) => {
		modalProps.onCancel?.(e);
		off();
	});

	const renderFooter = useRefCallback((dom: JSX.Element[]) => {
		if ($renderFooter) return $renderFooter(form, off);
		return (
			<div className={styles.footer_wrap}>
				{cloneElement(dom[0], { children: "取消", onClick: off })}
				{cloneElement(dom[1], { className: styles.footer_submit_btn })}
			</div>
		);
	});

	const handleFinish = useRefCallback(async (values: Values) => {
		const close = await onFinish?.(values);
		if (close) off();
	});
	const DOM = (
		<ProForm
			form={form}
			{...formProps}
			timeFormat={timeFormat}
			onFinish={handleFinish}
			submitConfig={{
				render: (dom) => (
					<Modal
						visible={visible}
						title={<TitleTip title={title} />}
						{...modalProps}
						getContainer={false}
						onCancel={handleClose}
						footer={renderFooter(dom)}
						onOk={() => form.submit()}
					>
						{children}
					</Modal>
				),
			}}
		/>
	);
	return (
		<>
			{wrappedTrigger}
			{createPortal(DOM, document.querySelector("body")!)}
		</>
	);
}
ModalForm.Item = Form.Item;
export default withDefaultProps(forwardRef(ModalForm), { width: 600 }) as ModalFormType;
