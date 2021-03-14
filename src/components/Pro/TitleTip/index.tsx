import React, { isValidElement, ReactNode, useMemo } from "react";
import { Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import styles from "./style.module.scss";
import { isString } from "@/utils/ValidateType";
/**
 * title 属性后跟一个 tooltip 提示文案
 * TODO 只传入一个 title字段
 */
export interface TitleTipProps {
	title?: { title: ReactNode; tip?: ReactNode | (() => ReactNode) } | string;
}
function TitleTip(props: TitleTipProps) {
	const { title } = props;
	const [text, tip] = useMemo(() => {
		if (!title) return [undefined, undefined];
		if (isString(title) || isValidElement(title)) return [title, undefined];
		return [title.title, title.tip];
	}, [title]);

	if (!text) return null;
	if (!tip) return <>{text}</>;
	return (
		<div className={styles.title_tip}>
			<span className={styles.title}>{text}</span>
			<Tooltip title={tip}>
				<InfoCircleOutlined className={styles.icon} />
			</Tooltip>
		</div>
	);
}

export default TitleTip;
