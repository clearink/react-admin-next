import React, {
	cloneElement,
	forwardRef,
	isValidElement,
	Ref,
	useImperativeHandle,
	useMemo,
} from "react";
import { createPortal } from "react-dom";
import { Drawer, Form } from "antd";
import { useSwitch } from "@/hooks/state/use-boolean";
import withDefaultProps from "@/hocs/withDefaultProps";
import useRefCallback from "@/hooks/state/use-ref-callback";
import TitleTip from "../../TitleTip";
import ProForm from "../ProForm";
import { DrawerFormProps, DrawerFormRef, DrawerFormType } from "./interface";
import styles from "./style.module.scss";
import useFixModalMask from "../hooks/use-fix-modal-mask";

function $DrawerForm<Values = any>(props: DrawerFormProps<Values>, ref: Ref<DrawerFormRef>) {
	const {
		title,
		trigger,
		children,
		renderFooter: $renderFooter,
		form: $form,
		onFinish,
		drawer,
		...rest
	} = props;
	const { visible, on, off, toggle } = useSwitch(false);
	const [form] = Form.useForm($form);

	useImperativeHandle(ref, () => ({ form, on, off, toggle }), [form, off, on, toggle]); // 暴露的方法

	// fix: 使用 createPortal 造成的样式闪动
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

	const renderFooter = useRefCallback((dom: JSX.Element[]) => {
		if ($renderFooter) return $renderFooter(form, off);
		return (
			<div className={styles.footer_wrap}>
				{cloneElement(dom[0], { children: "取消", onClick: off })}
				{cloneElement(dom[1], { className: styles.footer_submit_btn })}
			</div>
		);
	});
	const handleClose = useRefCallback((e: any) => {
		drawer?.onClose?.(e);
		off();
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
			renderSubmitter={(dom) => (
				<Drawer
					visible={visible}
					title={<TitleTip title={title} />}
					footer={renderFooter(dom)}
					width={600}
					{...drawer}
					getContainer={false}
					onClose={handleClose}
				>
					{children}
				</Drawer>
			)}
		/>
	);
	return (
		<>
			{wrappedTrigger}
			{createPortal(DOM, document.querySelector("body")!)}
		</>
	);
}
const DrawerForm = forwardRef($DrawerForm) as any;
DrawerForm.Item = Form.Item;
export default withDefaultProps(DrawerForm) as DrawerFormType;
