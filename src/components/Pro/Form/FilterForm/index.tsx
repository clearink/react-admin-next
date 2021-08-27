import React, { Children, cloneElement, ReactNode, useMemo, useState } from "react";
import { Col, Form } from "antd";
import { UpOutlined } from "@ant-design/icons";
import classNames from "classnames";
import useRefCallback from "@/hooks/state/use-ref-callback";
import { valueRange } from "@/utils/Value";
import ProForm from "../ProForm";
import { FilerFormType, FilterFormProps } from "./interface";
import useBreakpoint from "./hooks/use-breakpoint";
import { FULL_SCREEN_SPAN } from "./constant";
import styles from "./style.module.scss";
import withDefaultProps from "@/hocs/withDefaultProps";

/**
 *
 * @param props children is array
 * @returns
 */
function FilterForm<Values = any>(props: FilterFormProps<Values>) {
	const {
		children: $children,
		collapsed: $collapsed,
		defaultCollapsed,
		onCollapse,
		colSpan,
		renderSubmitter,
		...rest
	} = props;

	const [__collapsed, setCollapsed] = useState(!!defaultCollapsed);

	// 元素占比 防止 返回 0
	const rowSpan = useBreakpoint(colSpan) || FULL_SCREEN_SPAN;

	// 为了与外部同步
	const useProp = props.hasOwnProperty("collapsed");
	const collapsed = useProp ? $collapsed : __collapsed;

	const handleCollapsed = useRefCallback(() => {
		if (!useProp) setCollapsed(!collapsed);
		onCollapse?.(!collapsed);
	});

	const childCount = Children.count($children);

	const [singleRowMaxChildCount, triggerRowSpan] = useMemo(() => {
		const col = ~~(FULL_SCREEN_SPAN / rowSpan); // 多少列
		let count = childCount;
		// -1 是为了保留 submitter 的位置
		if (collapsed) count = valueRange(count, 0, col - 1);
		const triggerRowSpan = (col - (count % col)) * rowSpan; // 指示器占据多少个
		let singleRowMaxChildCount = Infinity; // 一行钟最多显示多少个组件
		if (collapsed && rowSpan) singleRowMaxChildCount = Math.max(col - 1, 1);

		return [singleRowMaxChildCount, triggerRowSpan];
	}, [childCount, collapsed, rowSpan]);

	const children = useMemo(() => {
		return Children.map($children, (child, index) => {
			const className = classNames(styles.filter_form__item, {
				[styles.hidden]: index >= singleRowMaxChildCount,
			});
			return (
				<Col span={rowSpan} className={className}>
					{child}
				</Col>
			);
		});
	}, [$children, singleRowMaxChildCount, rowSpan]);

	return (
		<ProForm
			{...rest}
			className={classNames(rest.className, styles.filter_form)}
			renderSubmitter={(dom, form) => {
				let submitter: ReactNode = [dom[0], cloneElement(dom[1], { children: "查询" })];
				if (renderSubmitter) submitter = renderSubmitter(dom, form);
				const className = classNames(styles.collapsed_trigger, {
					hidden: childCount <= singleRowMaxChildCount && collapsed,
				});
				const triggerClassName = classNames(styles.trigger_icon, { [styles.collapsed]: collapsed });
				/* TODO: 可以自定义以下内容 */
				/* 子组件的数量 小于等于 最大能够容纳的数量 且此时处于收起状态时将隐藏指示器 */
				return (
					<Col span={triggerRowSpan} className={styles.filter_form__submitter}>
						{submitter}
						<span className={className} onClick={handleCollapsed}>
							{collapsed ? "展开" : "收起"}
							<UpOutlined className={triggerClassName} />
						</span>
					</Col>
				);
			}}
		>
			{children}
		</ProForm>
	);
}
FilterForm.Item = Form.Item;
export default withDefaultProps(FilterForm, { defaultCollapsed: true }) as FilerFormType;
