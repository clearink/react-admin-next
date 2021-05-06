import React, {
	cloneElement,
	forwardRef,
	isValidElement,
	Ref,
	useImperativeHandle,
	useMemo,
} from "react";
import { createPortal } from "react-dom";
import { Modal, Form } from "antd";
import { useSwitch } from "@/hooks/state/use-boolean";
import TitleTip from "../../TitleTip";
import withDefaultProps from "@/hocs/withDefaultProps";
import useRefCallback from "@/hooks/state/use-ref-callback";
import useFixModalMask from "../hooks/use-fix-modal-mask";
import { ModalFormProps, ModalFormRef, ModalFormType } from "./interface";
import ProForm from "../ProForm";
import styles from "./style.module.scss";

function $ModalForm<Values = any>(props: ModalFormProps<Values>, ref: Ref<ModalFormRef>) {
	const {
		title,
		trigger,
		children,
		renderFooter: $renderFooter,
		form: $form,
		onFinish,
		modal,
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

	const handleClose = useRefCallback((e: any) => {
		modal?.onCancel?.(e);
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
			{...rest}
			onFinish={handleFinish}
			submitConfig={{
				render: (dom) => (
					<Modal
						visible={visible}
						title={<TitleTip title={title} />}
						width={600}
						{...modal}
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
const ModalForm = forwardRef($ModalForm) as any;
ModalForm.Item = Form.Item;
export default withDefaultProps(ModalForm) as ModalFormType;
