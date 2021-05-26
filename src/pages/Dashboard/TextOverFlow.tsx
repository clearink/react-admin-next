import classNames from "classnames";
import React from "react";
import styles from "./style.module.scss";
interface TextOverFlowProps {
	/** 是否使用滚动动画 */
	animate?: boolean;
	children?: string;
	/** 为了保持一致的背景颜色 默认 #fff */
	backgroundColor?: string;
}
// 单行省略
export default function TextOverFlow(props: TextOverFlowProps) {
	const { animate = false, backgroundColor = "#fff", children } = props;
	return (
		<div
			className={classNames(styles.overflow_wrap, {
				[styles.overflow__animate]: animate,
			})}
			style={{ backgroundColor }}
		>
			<span style={{ backgroundColor }} className={styles.overflow_wrap__text}>
				{children}
			</span>
			<span
				style={{ backgroundColor }}
				className={styles.overflow_wrap__title}
				title={animate ? undefined : children}
				data-title={animate ? children : undefined}
			>
				{children}
			</span>
		</div>
	);
}
