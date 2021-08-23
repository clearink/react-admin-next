import React, { useContext, useMemo } from "react";
import classNames from "classnames";
import { ProTableContext } from "../../utils";
import { TableInfoProps } from "./interface";
import styles from "./style.module.scss";

/** pro table info 耦合较大 */
export default function TableInfo<RT extends object = any>(props: TableInfoProps<RT>) {
	const { render, className } = props;
	const tableAction = useContext(ProTableContext)!;
	const [count, handleClear, total, current] = useMemo(() => {
		const state = tableAction.state;
		return [state.keys.length, tableAction.clearSelected, state.total, state.pagination.current];
	}, [tableAction]);
	const DOM = useMemo(
		() => (
			<div className={classNames(styles.table_info_wrap, className)}>
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
		),
		[className, count, current, handleClear, total]
	);
	if (render) return <>{render(DOM, tableAction)}</>;
	return DOM;
}
