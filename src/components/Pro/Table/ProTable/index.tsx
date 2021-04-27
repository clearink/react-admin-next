import { useImperativeHandle } from "react";
import { Space, Table, Button, Form } from "antd";
import classNames from "classnames";
import { FilterForm } from "@/components/Pro/Form";
import useFilterTableColumn from "./hooks/use-filter-table-column";
import { ProTableProps } from "./interface";
import styles from "./style.module.scss";
import TableInfo from "./components/TableInfo";
import TitleTip from "../../TitleTip";
import { DeleteOutlined, DownloadOutlined, PlusOutlined, ReloadOutlined, ToTopOutlined } from "@ant-design/icons";

/**
 * TODO
 * 1. 连接form与table
 * 2. tableToolbar
 * 3. 事件处理
 */
export default function ProTables<RecordType extends object = any>(props: ProTableProps<RecordType>) {
	const { columns, renderTableInfo, renderToolbar, tableTitle, search, searchForm, ...rest } = props;
	const [tableCol, formCol] = useFilterTableColumn(columns);

	const [form] = Form.useForm(search ? search.form : undefined);
	useImperativeHandle(searchForm, () => form, [form]);// 暴露出属性

	// TODO:  crud 以及 搜索等事件处理

	const tableInfo = (() => {
		const tableInfo = (
			<TableInfo
				count={10}
				onClear={() => {
					console.log("clear selected");
				}}
			/>
		);
		if (renderTableInfo) return renderTableInfo(tableInfo, {});
		return tableInfo;
	})();
	const tableToolbar = (() => {
		const toolbar: JSX.Element[] = [
			<Button
				type='primary'
				danger
				// className={classNames({ hidden: !tableService.state.rows.length })}
				// onClick={tableService.handleDelete}
				icon={<DeleteOutlined />}
				key='delete'
			>
				删除数据
			</Button>,
			<Button type='primary' icon={<PlusOutlined />} key='add'>
				新增数据
			</Button>,
			<Button key='import' icon={<DownloadOutlined />}>
				导入数据
			</Button>,
			<Button key='export' icon={<ToTopOutlined />}>
				导出数据
			</Button>,
			<ReloadOutlined key='reload' className={styles.reload_icon} />,
		];
		if (renderToolbar) renderToolbar(toolbar);
		return toolbar;
	})();
	return (
		<div className={styles.pro_table_wrap}>
			{/* 没有form col 就不要显示了 */}
			<FilterForm
				{...search}
				form={form}
				className={classNames(search && search.className, styles.filter_form, {
					[styles.hidden]: !formCol.length || search === false,
				})}
				onFinish={console.log}
			>
				{formCol}
			</FilterForm>
			<div className={styles.title_toolbar_wrap}>
				<TitleTip title={tableTitle} />
				<Space size={8}>{tableToolbar}</Space>
			</div>
			<div className={classNames(styles.alert_wrap, { [styles.hidden]: !tableInfo })}>{tableInfo}</div>

			<Table columns={tableCol} {...rest} className={classNames(styles.table_content, rest.className)} />
		</div>
	);
}
