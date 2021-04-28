import {
	cloneElement,
	forwardRef,
	Ref,
	useEffect,
	useImperativeHandle,
	useMemo,
	useReducer,
	useState,
} from "react";
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
import useRefCallback from "@/hooks/state/use-ref-callback";
import { isFunction } from "@/utils/ValidateType";
import useMountedRef from "@/hooks/state/use-mounted-ref";
import useDeepEffect from "@/hooks/state/use-deep-effect";
import { FilterFormProps } from "../../Form/FilterForm/interface";
import TitleTip from "../../TitleTip";
import TableInfo from "./components/TableInfo";
import useFilterTableColumn from "./hooks/use-filter-table-column";
import reducer, { actions } from "./store";
import { ProTableProps, ProTableRef, ProTableState } from "./interface";
import { getCurrentAndSize, getInitState } from "./utils";
import styles from "./style.module.scss";
import { Reducer } from "@reduxjs/toolkit";

/**
 * TODO: 表单默认值
 */

function ProTable<RecordType extends object = any>(
	props: ProTableProps<RecordType>,
	ref: Ref<ProTableRef>
) {
	const {
		columns,
		renderTableInfo,
		renderToolbar,
		tableTitle,
		search,
		searchRef,
		pagination: _pagination,
		request,
		loading: _loading,
		params: _params,
		...rest
	} = props;
	const [tableCol, formCol, initFilters, initSorter] = useFilterTableColumn(columns);

	const [__loading, setLoading] = useState<ProTableProps["loading"]>(false);

	const [state, dispatch] = useReducer(
		reducer as Reducer<ProTableState<RecordType>>,
		{ pagination: _pagination, filters: initFilters, sorter: initSorter },
		getInitState
	);
	useEffect(() => {
		dispatch(actions.setPagination(_pagination));
	}, [_pagination]);

	const mountedRef = useMountedRef();
	const handleRequest = useRefCallback(async () => {
		if (!isFunction(request)) return;
		try {
			setLoading({ delay: 50 });
			const { dataSource, total } = await request(
				{ ...state.params, ..._params, ...state.pagination },
				state.filters,
				state.sorter
			);
			// TODO:
			// set dataSource and total
		} finally {
			if (mountedRef.current) setLoading(false);
		}
	});

	// state 与 外部的 _params 变化都会导致 request 函数执行
	useDeepEffect(() => {
		handleRequest();
	}, [handleRequest, state, _params]);

	const handleReload = useRefCallback((reset?: boolean) => {
		if (reset) {
			console.log("重置 current and pageSize filter, sorter 等后 在进行 数据请求");
		}
		handleRequest();
	});
	const [form] = Form.useForm(search ? search.form : undefined);
	useImperativeHandle(searchRef, () => form, [form]); // 暴露出属性

	// ****** bugs ***** 当 columns 设置了 filteredValue 的值 然后 触发 tableChange 时 args.filters 与filteredValue 不一致
	const handleTableChange = useRefCallback<Required<ProTableProps<RecordType>>["onChange"]>(
		(...args) => {
			const [_pagination, _filters, _sorter] = args;
			rest.onChange?.(...args);

			// 保存 数据
			dispatch(actions.setPagination(_pagination));
			dispatch(actions.setFilters(_filters));
			dispatch(actions.setSorter(_sorter));
		}
	);
	const handleFinish = useRefCallback(async (values: RecordType) => {
		dispatch(actions.setParams(values));
		if (search && search.onFinish) {
			await search.onFinish(values);
		}
	});

	// 暴露出的ref事件
	const tableAction = useMemo(() => {
		return {
			reload: handleReload,
			clearSelected: () => {},
		};
	}, [handleReload]);

	useImperativeHandle(ref, () => tableAction, [tableAction]);

	/**----------------------- UI相关 --------------------------- */
	const loading = props.hasOwnProperty("loading") ? _loading : __loading;
	// 以下 二者皆应在不同的业务去声明
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

	// TODO: 确定tableAction
	const tableToolbar = renderToolbar?.() ?? [];

	// 处理 submit config
	const searchSubmitConfig = useMemo(() => {
		const defaultConfig: FilterFormProps["submitConfig"] = {
			...search,
			onReset: () => {
				console.log("清空params 以及 do 其他action");
				if (search && search.submitConfig) {
					search.submitConfig.onReset?.();
				}
			},
			render: (_dom, form) => {
				const dom = [_dom[0], cloneElement(_dom[1], { loading })];
				if (search && search.submitConfig && search.submitConfig.render) {
					return search.submitConfig.render(dom, form);
				}
				return <>{dom}</>;
			},
		};
		return defaultConfig;
	}, [loading, search]);

	return (
		<div className={styles.pro_table_wrap}>
			{/* 没有form col 就不要显示了 */}
			<FilterForm<RecordType>
				{...search}
				submitConfig={searchSubmitConfig}
				form={form}
				className={classNames(search && search.className, styles.filter_form, {
					[styles.hidden]: !formCol.length || search === false,
				})}
				onFinish={handleFinish}
			>
				{formCol}
			</FilterForm>
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
				columns={tableCol}
				{...rest}
				loading={loading}
				pagination={{ ..._pagination, ...state.pagination }}
				onChange={handleTableChange}
				className={classNames(styles.table_content, rest.className)}
			/>
		</div>
	);
}

export default forwardRef(ProTable) as typeof ProTable;
/**
 * const toolbar: JSX.Element[] = [
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
 */
