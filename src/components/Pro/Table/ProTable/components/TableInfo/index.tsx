import React from "react";
import { Alert } from "antd";
import { TableInfoProps } from "./interface";
import styles from "./style.module.scss";
import classNames from "classnames";

/** pro table info 耦合较大 */
export default function TableInfo(props: TableInfoProps) {
	const { count = 0, current = 0, total = 0, onClear, ...rest } = props;
	const handleClear = () => {
		onClear?.();
	};
	return (
		<Alert
			{...rest}
			message={
				<div className={styles.table_info_wrap}>
					<div
						className={classNames(styles.info_left, {
							[styles.hidden]: !count,
						})}
					>
						已选择<span className={styles.info_strong_value}>{count}</span>条
						<span className={styles.info_clear} onClick={handleClear}>
							清空
						</span>
					</div>
					<div className={styles.info_right}>
						<span className={styles.info_total}>
							共计<span className={styles.info_strong_value}>{total}</span>条
						</span>
						当前第<span className={styles.info_strong_value}>{current}</span>页
					</div>
				</div>
			}
		/>
	);
}
