import React, {
	cloneElement,
	forwardRef,
	isValidElement,
	Ref,
	useEffect,
	useImperativeHandle,
	useMemo,
	useState,
} from "react";
import { createPortal } from "react-dom";
import { Drawer, FormProps, DrawerProps, Form, Button, FormInstance } from "antd";
import { useSwitch } from "@/hooks/state/use-boolean";
import { FilterValue, GetValue } from "@/utils/Value";
import withDefaultProps from "@/hocs/withDefaultProps";
import useRefCallback from "@/hooks/state/use-ref-callback";
import TitleTip, { TitleTipProps } from "../TitleTip";
import { antdFormProps as __FormProps } from "../utils/constant";
import { formatFormValue } from "../utils/format-form-value";
import styles from "./style.module.scss";

export interface DrawerFormProps<Values = any> extends DrawerProps, Omit<FormProps<Values>, "title"> {
	title?: TitleTipProps["title"];
	trigger?: React.ReactNode;
	children?: React.ReactNode;
	/** 格式化时间戳 */
	timeFormat?: string;
	/** form实例 off:关闭函数 */
	renderFooter?: (form: FormInstance, off: () => void) => JSX.Element;
	onFinish?: (values: Values) => Promise<boolean>;
}
export interface DrawerFormRef {
	form: FormInstance;
	toggle: () => void;
	on: () => void;
	off: () => void;
}
function DrawerForm<Values = any>(props: DrawerFormProps<Values>, ref: Ref<DrawerFormRef>) {
	const { title, trigger, children, renderFooter, form: __form, onFinish, timeFormat, ...rest } = props;
	const { visible, on, off, toggle } = useSwitch(false);
	const [form] = Form.useForm(__form);
	const [loading, setLoading] = useState(false);

	useImperativeHandle(ref, () => ({ form, on, off, toggle }), [form, off, on, toggle]); // 暴露的方法
	
	useEffect(() => {
		const body = document.querySelector("body")!;
		if (visible) body.classList.add("ant-drawer-body-effect");
		else body.classList.remove("ant-drawer-body-effect");
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

	// 从props中分离出 drawerProps 和 formProps
	const [formProps, drawerProps] = useMemo(() => {
		const antdFormProps: Array<
			keyof Omit<FormProps, "children" | "title" | "form" | "onFinish">
		> = __FormProps as any[];
		const formProps = GetValue(rest, antdFormProps, false);
		const drawerProps = FilterValue(rest, antdFormProps);
		return [formProps, drawerProps];
	}, [rest]);

	const footer = (
		<div className='text-right'>
			<Button onClick={off}>取消</Button>
			<Button type='primary' className='ml-2' htmlType='submit' loading={loading}>
				确认
			</Button>
		</div>
	);
	const handleClose = useRefCallback((e: any) => {
		drawerProps.onClose?.(e);
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
			<Drawer
				visible={visible}
				title={title && <TitleTip title={title} />}
				footer={renderFooter?.(form, off) ?? footer}
				{...drawerProps}
				getContainer={false}
				onClose={handleClose}
			>
				{children}
			</Drawer>
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
export default withDefaultProps(forwardRef(DrawerForm), { width: 600 });
