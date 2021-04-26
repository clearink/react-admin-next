import React, { Children, useEffect, useMemo, useState } from "react";
import { Col, Grid } from "antd";
import { UpOutlined } from "@ant-design/icons";
import classNames from "classnames";
import useRefCallback from "@/hooks/state/use-ref-callback";
import { valueRange } from "@/utils/Value";
import ProForm from "../ProForm";
import { FilterFormProps } from "./interface";
import useBreakpoint from "./hooks/use-breakpoint";
import { FULL_SCREEN_SPAN } from "./constant";
import styles from "./style.module.scss";

// 筛选布局 children 是 array
export default function FilterForm(props: FilterFormProps) {
	const {
		children: _children,
		collapsed: _collapsed,
		onCollapse,
		ghost,
		submitConfig: _submitConfig,
		colSpan,
		...rest
	} = props;
	const [collapsed, setCollapsed] = useState(!!_collapsed);

	// TODO: // 与外部保持一致 collapsed

	// 元素占比
	const span = useBreakpoint(colSpan);

	const handleCollapsed = useRefCallback(() => {
		setCollapsed(!collapsed);
		onCollapse?.(!collapsed);
	});

	const [children, otherSpan] = useMemo(() => {
		const childCount = Children.count(_children);
		const col = ~~(FULL_SCREEN_SPAN / span); // 多少列
		let count = childCount;
		// -1 是为了保留 submitter 的位置
		if (collapsed) count = valueRange(count, 0, col - 1);
		const otherSpan = (col - (count % col)) * span;
		let max = Infinity;
		if (collapsed && span) max = Math.max(~~(FULL_SCREEN_SPAN / span) - 1, 1);
		const children = Children.map(_children, (child, index) => (
			<Col
				span={span}
				className={classNames(styles.filter_form__item, {
					[styles["filter_form__item--hidden"]]: index >= max,
				})}
			>
				{child}
			</Col>
		));
		return [children, otherSpan];
	}, [_children, collapsed, span]);
	return (
		<ProForm
			{...rest}
			className={classNames(rest.className, styles.filter_form)}
			submitConfig={{
				render: (dom) => (
					<>
						{children}
						<Col span={otherSpan} className={styles.filter_form__submitter}>
							{dom}
							<span className={styles.collapsed_trigger} onClick={handleCollapsed}>
								{collapsed ? "展开" : "收起"}
								<UpOutlined
									className={classNames(styles.trigger_icon, {
										[styles.collapsed]: collapsed,
									})}
								/>
							</span>
						</Col>
					</>
				),
			}}
		/>
	);
}
