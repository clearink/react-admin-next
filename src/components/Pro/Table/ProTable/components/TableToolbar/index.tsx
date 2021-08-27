import { useContext, useMemo, useCallback } from "react";
import { Tooltip } from "antd";
import classNames from "classnames";
import TitleTip from "@/components/Pro/TitleTip";
import { ProTableContext } from "../../utils";
import { TableToolbarProps } from "./interface";
import styles from "./style.module.scss";
import { ReloadOutlined } from "@ant-design/icons";

// 表格的操作列
function TableToolbar<RT extends object = any>(props: TableToolbarProps<RT>) {
	const { render, className, title } = props;
	const tableAction = useContext(ProTableContext)!;

	// 重新加载
	const handleReload = useCallback(() => {
		tableAction.reload();
	}, [tableAction]);

	const initAction = useMemo(() => {
		return [
			<Tooltip title='刷新' key='reload-icon'>
				<ReloadOutlined className={styles.reload_icon} onClick={handleReload} />
			</Tooltip>,
		];
	}, [handleReload]);
	const actionList = render ? render(initAction, tableAction) : initAction;
	return (
		<div className={classNames(className, styles.title_toolbar)}>
			<TitleTip className={styles.title} title={title} />
			<div className={styles.toolbar}>{actionList}</div>
		</div>
	);
}
export default TableToolbar;
