import { useContext, useMemo } from "react";
import { Button, Space, Tooltip } from "antd";
import classNames from "classnames";
import TitleTip from "@/components/Pro/TitleTip";
import { ProTableContext } from "../../utils";
import { TableToolbarProps } from "./interface";
import styles from "./style.module.scss";
import { DeleteOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { useCallback } from "react";
import useRefCallback from "@/hooks/state/use-ref-callback";

// 表格的操作列
function TableToolbar<RT extends object = any>(props: TableToolbarProps<RT>) {
	const { render, className, title, onCreate, onDelete } = props;
	const tableAction = useContext(ProTableContext)!;

	// 重新加载
	const handleReload = useCallback(() => {
		tableAction.reload();
	}, [tableAction]);
	// 删除
	const handleDelete = useRefCallback(() => {
		const keys = tableAction.state.keys;
		onDelete?.(keys);
	});
	const selectedLength = tableAction.state.keys.length;
	const toolbar = useMemo(() => {
		return [
			<Tooltip title='刷新' key='reload-icon'>
				<ReloadOutlined key='reload' className={styles.reload_icon} onClick={handleReload} />
			</Tooltip>,
			onCreate && (
				<Button type='primary' icon={<PlusOutlined />} onClick={onCreate} key='add'>
					新增
				</Button>
			),
			onDelete && (
				<Button
					type='primary'
					danger
					disabled={!selectedLength}
					onClick={handleDelete}
					icon={<DeleteOutlined />}
					key='delete'
				>
					删除
				</Button>
			),
		];
	}, [handleDelete, handleReload, onCreate, onDelete, selectedLength]);
	if (render) return <>{render({ title, toolbar }, tableAction)}</>;
	return (
		<div className={classNames(className, styles.title_toolbar)}>
			<TitleTip className={styles.title} title={title} />
			<Space className={styles.toolbar} size={8}>
				{toolbar}
			</Space>
		</div>
	);
}
export default TableToolbar;
