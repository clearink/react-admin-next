import React, {
	cloneElement,
	forwardRef,
	Ref,
	useEffect,
	useImperativeHandle,
	useMemo,
	useReducer,
	useRef,
	useState,
} from "react";
import { Space, Table, Form, Tooltip, Button } from "antd";
import { DeleteOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { FilterForm } from "@/components/Pro/Form";
import useRefCallback from "@/hooks/state/use-ref-callback";
import { GetValue } from "@/utils/Value";
import withDefaultProps from "@/hocs/withDefaultProps";
import TitleTip from "../../TitleTip";
import TableInfo from "./components/TableInfo";
import TableSearchForm from "./components/TableSearchForm";
import useFormatColumn from "./hooks/use-format-column";
import reducer, { actions } from "./store";
import { ProTableProps, ProTableRef, ProTableType } from "./interface";
import { getButtonLoading, getInitState, ProTableContext } from "./utils";
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
		renderTableInfo,
		renderToolbar,
		tableTitle,
		searchProps,
		searchRef,
		pagination: $pagination,
		request,
		loading: $loading,
		params: $params,
		onChange: $onChange,
		dataSource: $dataSource,
		rowSelection: $rowSelection,
		onCreate,
		onDelete,
		...rest
	} = props;

	const [form] = Form.useForm(searchProps ? searchProps.form : undefined);
	useImperativeHandle(searchRef, () => form, [form]); // 暴露出属性

	const actionRef = useRef<ProTableRef<RecordType>>();
	const [tableCol, formCol, $filters, $sorter] = useFormatColumn(columns, actionRef);

	const [_loading, setLoading] = useState<ProTableProps["loading"]>(false);

	// 初始值
	const initState = { pagination: $pagination, filters: $filters, sorter: $sorter };
	const [state, dispatch] = useReducer(reducer, initState, getInitState);

	// 是否使用外部的 dataSource
	const usePropData = props.hasOwnProperty("dataSource");
	const [_dataSource, setDataSource] = useState(() => $dataSource);
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

	// 搜索事件
	const handleFinish = useRefCallback(async (values: RecordType) => {
		if (searchProps && searchProps.onFinish) {
			await searchProps.onFinish(values);
		}

		// 如果本身在第一页 直接调用 handleRequest
		// 否则的话需要 dispatch 去改变 pagination.current 然后由 useEffect 副作用自行调用
		if (state.pagination.current === 1) handleRequest();
		else {
			// 受控时不应该重置 那么如何通知外部变化呢？
			const pagination = { ...$pagination, ...state.pagination, current: 1 };
			const extra = { currentDataSource: dataSource as RecordType[], action: "paginate" } as const;
			$onChange?.(pagination, state.filters, state.sorter, extra);
			dispatch(actions.setCurrent(1));
		}
	});

	// 暴露的方法
	const tableAction = useProTableAction<RecordType>([state, dispatch], {
		form,
		handleRequest,
		usePropData,
		setDataSource,
		dataSource,
	});
	useEffect(() => {
		actionRef.current = tableAction;
	}, [tableAction]);

	useImperativeHandle(ref, () => tableAction, [tableAction]);

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

	// 以下 二者皆应在不同的业务去声明
	const tableInfo = useMemo(() => {
		const tableInfo = (
			<TableInfo
				count={state.keys.length}
				total={state.total}
				current={state.pagination.current}
				onClear={tableAction.clearSelected}
			/>
		);
		if (renderTableInfo) return renderTableInfo(tableInfo, tableAction);
		return tableInfo;
	}, [renderTableInfo, state.keys.length, state.pagination, state.total, tableAction]);

	const tableToolbar = useMemo(() => {
		// 默认 只有一个刷新icon
		const toolbar = [
			<Tooltip title='刷新' key='reload-icon'>
				<ReloadOutlined key='reload' className={styles.reload_icon} onClick={handleRequest} />
			</Tooltip>,
		];
		if (onCreate)
			toolbar.unshift(
				<Button type='primary' icon={<PlusOutlined />} onClick={onCreate} key='add'>
					新增
				</Button>
			);
		if (onDelete)
			toolbar.unshift(
				<Button
					type='primary'
					danger
					className={classNames({ [styles.hidden]: !state.keys.length })}
					onClick={() => onDelete(state.keys)}
					icon={<DeleteOutlined />}
					key='delete'
				>
					删除
				</Button>
			);
		if (renderToolbar) return renderToolbar(toolbar, tableAction);
		return toolbar;
	}, [handleRequest, onCreate, onDelete, renderToolbar, state.keys, tableAction]);

	// 处理 submit config
	// const searchSubmitConfig = useMemo(() => {
	// 	if (searchProps && searchProps.submitConfig === false) return false;
	// 	const defaultConfig: SubmitterProps = {
	// 		...(searchProps && searchProps.submitConfig),
	// 		onReset: () => {
	// 			if (searchProps && searchProps.submitConfig && searchProps.submitConfig.onReset) {
	// 				return searchProps.submitConfig.onReset();
	// 			}
	// 			handleRequest();
	// 		},
	// 		render: ($dom, form) => {
	// 			// 处理 loading
	// 			const btnLoading = getButtonLoading(loading);
	// 			const dom = [
	// 				cloneElement($dom[0], { disabled: !!btnLoading }),
	// 				cloneElement($dom[1], { loading: btnLoading }),
	// 			];
	// 			if (searchProps && searchProps.submitConfig && searchProps.submitConfig.render) {
	// 				return searchProps.submitConfig.render(dom, form);
	// 			}
	// 			return <>{dom}</>;
	// 		},
	// 	};
	// 	return defaultConfig as SubmitterProps;
	// }, [handleRequest, loading, searchProps]);

	// 如果 dataSource 是外部受控 则不会 干预 current 与 pageSize
	const pagination = useMemo(() => {
		if (usePropData) return $pagination;
		return { ...$pagination, ...state.pagination, total: state.total };
	}, [$pagination, state.pagination, state.total, usePropData]);

	return (
		<ProTableContext.Provider value={tableAction}>
			<div className={styles.pro_table_wrap}>
				{/* 没有form col 就不要显示了 */}
				<TableSearchForm {...searchProps} />
				{/* <FilterForm<RecordType>
					{...searchProps}
					submitConfig={searchSubmitConfig}
					form={form}
					className={classNames(searchProps && searchProps.className, styles.filter_form, {
						[styles.hidden]: !formCol.length || searchProps === false,
					})}
					onFinish={handleFinish}
				>
					{formCol}
				</FilterForm> */}
				{/* toolbar */}
				<div className={styles.title_toolbar_wrap}>
					<TitleTip className={styles.left} title={tableTitle} />
					<Space className={styles.right} size={8}>
						{tableToolbar}
					</Space>
				</div>
				<div className={classNames(styles.alert_wrap, { [styles.hidden]: !tableInfo })}>
					{tableInfo}
				</div>
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
