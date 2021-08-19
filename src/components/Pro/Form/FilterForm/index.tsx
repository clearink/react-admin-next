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
		ghost,
		submitConfig: _submitConfig,
		colSpan,
		submitConfig,
		...rest
	} = props;

	const [__collapsed, setCollapsed] = useState(!!defaultCollapsed);

	// 元素占比 防止 返回 0
	const span = useBreakpoint(colSpan) || FULL_SCREEN_SPAN;

	// 为了与外部同步
	const useProp = props.hasOwnProperty("collapsed");
	const collapsed = useProp ? $collapsed : __collapsed;

	const handleCollapsed = useRefCallback(() => {
		if (!useProp) setCollapsed(!collapsed);
		onCollapse?.(!collapsed);
	});

	const [children, otherSpan] = useMemo(() => {
		const childCount = Children.count($children);
		const col = ~~(FULL_SCREEN_SPAN / span); // 多少列
		let count = childCount;
		// -1 是为了保留 submitter 的位置
		if (collapsed) count = valueRange(count, 0, col - 1);
		const otherSpan = (col - (count % col)) * span;
		let max = Infinity; // 最多显示的数目
		if (collapsed && span) max = Math.max(col - 1, 1);
		const children = Children.map($children, (child, index) => {
			const className = classNames(styles.filter_form__item, { [styles.hidden]: index >= max });
			return (
				<Col span={span} className={className}>
					{child}
				</Col>
			);
		});
		return [children, otherSpan];
	}, [$children, collapsed, span]);

	return (
		<ProForm
			{...rest}
			className={classNames(rest.className, styles.filter_form)}
			submitConfig={{
				...submitConfig,
				render: (dom, form) => {
					let submitter: ReactNode = [dom[0], cloneElement(dom[1], { children: "查询" })];
					if (submitConfig === false) submitter = null;
					else if (submitConfig?.render) submitter = submitConfig.render(dom, form);
					return (
						<>
							{children}
							<Col span={otherSpan} className={styles.filter_form__submitter}>
								{submitter}
								{/* TODO: submitConfig 可以自定义以下内容 */}
								<span className={styles.collapsed_trigger} onClick={handleCollapsed}>
									{collapsed ? "展开" : "收起"}
									<UpOutlined
										className={classNames(styles.trigger_icon, { [styles.collapsed]: collapsed })}
									/>
								</span>
							</Col>
						</>
					);
				},
			}}
		/>
	);
}
FilterForm.Item = Form.Item;
export default withDefaultProps(FilterForm, { defaultCollapsed: true }) as FilerFormType;
