import React, { cloneElement, forwardRef, isValidElement, Ref, useImperativeHandle, useMemo } from "react";
import { createPortal } from "react-dom";
import { Drawer, FormProps, Form } from "antd";
import { useSwitch } from "@/hooks/state/use-boolean";
import { FilterValue, GetValue } from "@/utils/Value";
import withDefaultProps from "@/hocs/withDefaultProps";
import useRefCallback from "@/hooks/state/use-ref-callback";
import TitleTip from "../../TitleTip";
import { antdFormProps as __FormProps } from "../../utils/constant";
import ProForm from "../ProForm";
import { DrawerFormProps, DrawerFormRef } from "./interface";
import styles from "./style.module.scss";
import useFixModalMask from "../hooks/use-fix-modal-mask";

function DrawerForm<Values = any>(props: DrawerFormProps<Values>, ref: Ref<DrawerFormRef>) {
	const { title, trigger, children, renderFooter: $renderFooter, form: $form, onFinish, timeFormat, ...rest } = props;
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

	// 从props中分离出 drawerProps 和 formProps
	const [formProps, drawerProps] = useMemo(() => {
		const antdFormProps: Array<
			keyof Omit<FormProps, "children" | "title" | "form" | "onFinish">
		> = __FormProps as any[];
		const formProps = GetValue(rest, antdFormProps);
		const drawerProps = FilterValue(rest, antdFormProps);
		return [formProps, drawerProps];
	}, [rest]);

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
		drawerProps.onClose?.(e);
		off();
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
					<Drawer
						visible={visible}
						title={<TitleTip title={title} />}
						footer={renderFooter(dom)}
						{...drawerProps}
						getContainer={false}
						onClose={handleClose}
					>
						{children}
					</Drawer>
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
export default withDefaultProps(forwardRef(DrawerForm), { width: 600 });
