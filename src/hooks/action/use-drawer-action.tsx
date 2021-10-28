import { Dispatch, SetStateAction, useState, ComponentType, useEffect, useMemo } from "react";
import { Button, Drawer } from "antd";
import merge from "lodash/merge";
import TitleTip from "@/components/Pro/TitleTip";
import useRefCallback from "@/hooks/state/use-ref-callback";
import { isBoolean, isObject } from "@/utils/ValidateType";
import withDefaultProps from "@/hocs/withDefaultProps";
import { UseDrawerActionProps, WrapperDrawerActionProps } from "./interface";
import styles from "./style.module.scss";

export function CreateDrawerAction<P = {}>(
	WrappedComponent: ComponentType<P>,
	$config?: Pick<UseDrawerActionProps, "resetOnClose">
) {
	// 基础配置
	const { resetOnClose } = merge({ resetOnClose: true }, $config);

	// 回调 or 数值
	let innerSetVisible: null | Dispatch<SetStateAction<boolean>> = null;
	let innerSetWrappedProps: null | Dispatch<SetStateAction<Partial<P> | undefined>> = null;
	let innerOnOpen: null | WrapperDrawerActionProps["onOpen"] = null;
	let innerField: WrapperDrawerActionProps["fieldProps"] = undefined;

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

	const WrapperDrawerComponent = (injectProps: WrapperDrawerActionProps<P>) => {
		const { fieldProps: field, title, onOpen, onOk, ...rest } = injectProps;

		// 外部传入的 form
		const [visible, setVisible] = useState(false); // 显示与隐藏
		const [wrappedProps, setWrappedProps] = useState<Partial<P>>(); // 传入组件的值

		/** 保存回调/数值供外部使用 */
		innerOnOpen = onOpen;
		innerField = field;
		innerSetVisible = setVisible;
		innerSetWrappedProps = setWrappedProps;
		/** =================== */

		// 点击确定时触发
		const handleOk = useRefCallback(async () => {
			if (handleLock) return;
			handleLock = true;
			const shouldOpen = (await onOk?.({ ...field, ...wrappedProps })) ?? true;
			handleLock = false;
			shouldOpen === true && handleCloseClick();
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

		// 渲染 footer
		const renderFooter = useMemo(() => {
			return (
				<div className={styles.drawer_action__footer}>
					<Button onClick={handleCancel}>取消</Button>
					<Button type='primary' onClick={handleOk}>
						确定
					</Button>
				</div>
			);
		}, [handleCancel, handleOk]);
		// 缓存组件
		const WrappedMemorized = useMemo(
			() => <WrappedComponent {...(field as P)} {...wrappedProps} />,
			[field, wrappedProps]
		);
		return (
			<Drawer
				{...rest}
				title={<TitleTip title={title} />}
				visible={visible}
				footer={renderFooter}
				onClose={handleCancel}
			>
				{WrappedMemorized}
			</Drawer>
		);
	};

	return [
		withDefaultProps(WrapperDrawerComponent, { width: 720 }),
		handleOpenClick,
		handleCloseClick,
	] as const;
}

export default function useDrawerAction<P = {}>(
	WrappedComponent: ComponentType<P>,
	$config?: Pick<UseDrawerActionProps, "resetOnClose">
) {
	const { resetOnClose } = $config ?? {};
	return useMemo(
		() => CreateDrawerAction(WrappedComponent, { resetOnClose }),
		[resetOnClose, WrappedComponent]
	);
}
