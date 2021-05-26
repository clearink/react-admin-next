import { useToggle } from "@/hooks/state/use-boolean";
import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
export interface CollapseProps {
	header?: React.ReactNode;
	children?: React.ReactNode;
}
export default function Collapse(props: CollapseProps) {
	const { children, header } = props;
	const [collapse, toggle] = useToggle();
	const [maxHeight, setMaxHeight] = useState(0);
	const content = useRef<HTMLDivElement>(null);
	useEffect(() => {
		setMaxHeight(collapse ? 0 : content.current!.scrollHeight);
	}, [collapse]);
	return (
		<div className={styles.collapse_wrap}>
			<div className={styles.collapse__header} onClick={toggle}>
				{header}
			</div>
			<div className={styles.collapse__content} ref={content} style={{ maxHeight }}>
				<div className={styles.collapse__content_box}>{children}</div>
			</div>
		</div>
	);
}
