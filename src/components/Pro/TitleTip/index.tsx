import React, { ReactNode, useMemo } from "react";
import { Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import styles from "./style.module.scss";
import classNames from "classnames";
/**
 * title 属性后跟一个 tooltip 提示文案
 */
export interface TitleTipProps {
	title?: { title: ReactNode; tip?: ReactNode } | ReactNode;
	className?: string;
	style?: React.CSSProperties;
}
function TitleTip(props: TitleTipProps) {
	const { title, className, ...rest } = props;
	const [text, tip] = useMemo(() => {
		if (!title) return [undefined, undefined];
		if (!title.hasOwnProperty("title")) return [title, undefined];
		const _title = title as { title: ReactNode; tip?: ReactNode };
		return [_title.title, _title.tip];
	}, [title]);

	return (
		<div {...rest} className={classNames(styles.title_tip, className)}>
			<span className={styles.title}>{text}</span>
			{tip && (
				<Tooltip title={tip}>
					<InfoCircleOutlined className={styles.icon} />
				</Tooltip>
			)}
		</div>
	);
}

export default TitleTip;
