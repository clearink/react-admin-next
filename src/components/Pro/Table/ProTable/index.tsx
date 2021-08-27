import React, {
	forwardRef,
	Ref,
	useImperativeHandle,
	useMemo,
	useReducer,
	useRef,
	useState,
} from "react";
import { Table, Form } from "antd";
import classNames from "classnames";
import useRefCallback from "@/hooks/state/use-ref-callback";
import { GetValue } from "@/utils/Value";
import withDefaultProps from "@/hocs/withDefaultProps";

import TableInfo from "./components/TableInfo";
import TableSearch from "./components/TableSearch";
import TableToolbar from "./components/TableToolbar";
import useFormatColumn from "./hooks/use-format-column";
import reducer, { actions } from "./store";
import { ProTableProps, ProTableRef, ProTableType } from "./interface";
import { getInitState, ProTableContext } from "./utils";
import styles from "./style.module.scss";
import useProTableAction from "./hooks/use-proTable-action";
import useProTableRequest from "./hooks/use-proTable-request";

/**
 * 组件内部维护的数据 外部不可控制
 * 必要时只能通过ref去控制
 * 例如 pagination 内部维护了 current pageSize total 三个字段
 * 外部 可以使用 defaultCurrent defaultPageSize
 *
 * *** 需要注意的是 current 不能越界
 */
function ProTable<RecordType extends object = any>(
	props: ProTableProps<RecordType>,
	ref: Ref<ProTableRef<RecordType>>
) {
	const {
		columns,
		renderFilterForm,
		renderToolbar,
		renderTableInfo,
		tableTitle,
		filterFormProps,
		filterForm,
		pagination: $pagination,
		request,
		loading: $loading,
		params: $params,
		onChange: $onChange,
		dataSource: $dataSource,
		rowSelection: $rowSelection,
		...rest
	} = props;

	const [form] = Form.useForm(filterFormProps ? filterFormProps?.form : undefined);
	useImperativeHandle(filterForm, () => form, [form]); // 暴露出属性

	const actionRef = useRef<ProTableRef<RecordType>>(); // 保存 action
	// 格式化 columns
	const [tableCol, formCol, $filters, $sorter] = useFormatColumn(columns, actionRef);

	const [_loading, setLoading] = useState<ProTableProps["loading"]>(false); // 表格的loading

	// store 的 初始值
	const initState = { pagination: $pagination, filters: $filters, sorter: $sorter };
	const [state, dispatch] = useReducer(reducer, initState, getInitState);

	// 是否使用外部的 dataSource
	const usePropData = props.hasOwnProperty("dataSource");
	const [_dataSource, setDataSource] = useState<RecordType[]>([]);
	const dataSource = usePropData ? $dataSource : _dataSource;

	// 处理数据请求
	const handleRequest = useProTableRequest<RecordType>([state, dispatch], {
		request,
		usePropData,
		form,
		$params,
		setLoading,
		setDataSource,
	});

	// 暴露的方法
	const tableAction = useProTableAction<RecordType>([state, dispatch], {
		form,
		handleRequest,
		usePropData,
		setDataSource,
		dataSource,
	});
	actionRef.current = tableAction;
	useImperativeHandle(ref, () => tableAction, [tableAction]);

	// tableChange 事件
	type TableChange = Required<ProTableProps<RecordType>>["onChange"];
	const handleTableChange = useRefCallback<TableChange>(async (...args) => {
		const [__pagination, _filters, _sorter] = args;
		$onChange?.(...args);

		let newPagination = GetValue(__pagination, ["current", "pageSize"]);
		if (newPagination.current === state.pagination.current) {
			// 如果 current 没有变化 则说明需要回到首页
			newPagination.current = 1;
		}

		dispatch(actions.setPagination(newPagination)); // 设置 分页
		dispatch(actions.setFilters(_filters)); // 设置 筛选
		dispatch(actions.setSorter(_sorter)); // 设置排序
	});

	// 多选
	type Selection = ProTableProps<RecordType>["rowSelection"];

	const rowSelection = useMemo(() => {
		if ($rowSelection === false) return undefined;
		return {
			...$rowSelection,
			preserveSelectedRowKeys: true,
			selectedRowKeys: state.keys,
			onChange: (keys, rows) => {
				$rowSelection?.onChange?.(keys, rows);
				dispatch(actions.setKeys(keys));
			},
		} as Exclude<Selection, false>;
	}, [$rowSelection, state.keys]);

	/**----------------------- UI相关 --------------------------- */

	const usePropLoading = props.hasOwnProperty("loading");
	const loading = usePropLoading ? $loading : _loading;

	// 如果 dataSource 是外部受控 则不会 干预 current 与 pageSize
	const pagination = useMemo(() => {
		if (usePropData) return $pagination;
		return { ...$pagination, ...state.pagination, total: state.total };
	}, [$pagination, state.pagination, state.total, usePropData]);
	return (
		<ProTableContext.Provider value={tableAction}>
			<div className={styles.pro_table_wrap}>
				{/* 筛选表单 */}
				<TableSearch<RecordType>
					usePropData={usePropData}
					fetchLoading={loading}
					className={styles.filter_form}
					{...filterFormProps}
					pagination={$pagination}
					onTableChange={$onChange}
					form={form}
					render={renderFilterForm}
				>
					{formCol}
				</TableSearch>
				{/* 表格操作列 */}
				<TableToolbar<RecordType> title={tableTitle} render={renderToolbar} />
				{/* 表格一些详情 */}
				<TableInfo<RecordType> className={styles.alert_wrap} render={renderTableInfo} />
				{/* 表格本身 */}
				<Table
					{...rest}
					columns={tableCol}
					loading={loading}
					rowSelection={rowSelection}
					pagination={pagination}
					dataSource={dataSource}
					onChange={handleTableChange}
					className={classNames(styles.table_content, rest.className)}
				/>
			</div>
		</ProTableContext.Provider>
	);
}

export default withDefaultProps(forwardRef(ProTable), {
	size: "middle",
	bordered: true,
	rowKey: "id",
}) as ProTableType;
