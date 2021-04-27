import { useImperativeHandle, useState } from "react";
import { Space, Table, Button, Form } from "antd";
import {
	DeleteOutlined,
	DownloadOutlined,
	PlusOutlined,
	ReloadOutlined,
	ToTopOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
import { FilterForm } from "@/components/Pro/Form";
import useFilterTableColumn from "./hooks/use-filter-table-column";
import { ProTableProps } from "./interface";
import styles from "./style.module.scss";
import TableInfo from "./components/TableInfo";
import TitleTip from "../../TitleTip";
import useRefCallback from "@/hooks/state/use-ref-callback";
import { FilterValue, SorterResult } from "antd/lib/table/interface";
import { isUndefined } from "@/utils/ValidateType";

/**
 * TODO
 * 1. 连接form与table
 * 3. 事件处理
 * 
 * 
 */
export default function ProTables<RecordType extends object = any>(
	props: ProTableProps<RecordType>
) {
	const { columns, renderTableInfo, renderToolbar, tableTitle, search, searchRef, ...rest } = props;
	const [tableCol, formCol] = useFilterTableColumn(columns);

	/**
	 * 保存 table 的 sorter 与 sorter
	 * Q: 点击搜索时需不需要清除这些筛选?
	 * A: 应该不需要 因为这些也是搜索条件 和 form 是一样的作用
	 * Q: 是否提供一个能够清除所有筛选条件的方法?
	 * A: TODO
	 * 
	 * 
	 */
	const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});
	const [sorter, setSorter] = useState<Record<string, any>>({}); // antd 目前只支持对一列数据进行排序
	// pagination
	// formValue
	// 这四者 变化都会导致 request 函数执行

	const [form] = Form.useForm(search ? search.form : undefined);
	useImperativeHandle(searchRef, () => form, [form]); // 暴露出属性

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
		// TODO: 默认 toolbar = []
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

	const handleTableChange = useRefCallback<Required<ProTableProps<RecordType>>["onChange"]>(
		(...args) => {
			const [pagination, filters, _sorter] = args;
			if (rest.onChange) rest.onChange(...args);
			// fix 兼容 _sorter 为 array
			const newSort = ([] as Record<string, any>[]).concat(_sorter).reduce((pre, cur) => {
				if (isUndefined(cur.field) || isUndefined(cur.order)) return pre;
				return { ...pre, [cur.field as string]: cur.order };
			}, {});

			// 保存 数据
			setFilters(filters);
			setSorter(newSort);
		}
	);
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
			<div className={classNames(styles.alert_wrap, { [styles.hidden]: !tableInfo })}>
				{tableInfo}
			</div>

			<Table
				columns={tableCol}
				{...rest}
				onChange={handleTableChange}
				className={classNames(styles.table_content, rest.className)}
			/>
		</div>
	);
}
