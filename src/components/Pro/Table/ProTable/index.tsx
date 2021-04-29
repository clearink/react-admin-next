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
import { Space, Table, Form, Tooltip } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
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
import { ProTableProps, ProTableRef } from "./interface";
import { getButtonLoading, getInitState, getPuppetValue } from "./utils";
import styles from "./style.module.scss";
import { GetValue } from "@/utils/Value";
import { dequal } from "dequal";

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
		pagination: $pagination,
		request,
		loading: $loading,
		params: $params,
		...rest
	} = props;

	const [form] = Form.useForm(search ? search.form : undefined);
	useImperativeHandle(searchRef, () => form, [form]); // 暴露出属性

	const [tableCol, formCol, initFilters, initSorter] = useFilterTableColumn(columns);

	const [_loading, setLoading] = useState<ProTableProps["loading"]>(false);

	const [state, dispatch] = useReducer(
		reducer,
		{
			pagination: $pagination,
			filters: initFilters,
			sorter: initSorter,
		},
		getInitState
	);

	useEffect(() => {
		dispatch(actions.setPagination($pagination));
	}, [$pagination]);

	const mountedRef = useMountedRef();
	const handleRequest = useRefCallback(async () => {
		if (!isFunction(request)) return;
		const formValue = form.getFieldsValue();
		try {
			setLoading({ delay: 50 });
			const { dataSource, total } = await request(
				{ ...formValue, ...$params, ...state.pagination },
				state.filters,
				state.sorter
			);
			// TODO:
			// set dataSource and total
		} finally {
			if (mountedRef.current) setLoading(false);
		}
	});

	// state 与 外部的 $params 变化都会导致 request 函数执行
	useDeepEffect(() => {
		handleRequest();
	}, [handleRequest, state, $params]);

	const handleReload = useRefCallback((reset?: boolean) => {
		if (reset) {
			console.log("重置 current and pageSize filter, sorter 等后 在进行 数据请求");
		}
		handleRequest();
	});

	// ****** bugs ***** 当 columns 设置了 filteredValue 的值 然后 触发 tableChange 时 args.filters 与filteredValue 不一致
	const handleTableChange = useRefCallback<Required<ProTableProps<RecordType>>["onChange"]>(
		(...args) => {
			const [__pagination, _filters, _sorter] = args;
			rest.onChange?.(...args);
			// ****** TODO: 页码受控与过滤器受控时的处理
			let newPagination = GetValue(__pagination, ["current", "pageSize"]);
			if (dequal(newPagination, state.pagination)) {
				// 如果
				newPagination.current = 1;
			}
			if ($pagination) {
				getPuppetValue(["current", "pageSize"], $pagination, newPagination);
			}
			console.log(newPagination);
			dispatch(actions.setPagination(newPagination));

			// TODO: 判断 是否受控
			dispatch(actions.setFilters(_filters));
			dispatch(actions.setSorter(_sorter));
		}
	);
	const handleFinish = useRefCallback(async (values: RecordType) => {
		// 如果本身在第一页 直接调用 handleRequest
		// 否则的话需要 dispatch 去改变 pagination.current 然后由 useEffect 副作用自行调用

		if (state.pagination.current === 1) handleRequest();
		else {
			const newPagination = { ...state.pagination, current: 1 };
			// 受控时不应该重置 那么如何通知外部变化呢？
			onchange?.({ ...$pagination, ...newPagination }, state.filters, state.sorter);
			if ($pagination) getPuppetValue(["current", "pageSize"], $pagination, newPagination);
			dispatch(actions.setPagination(newPagination));
		}

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
	const loading = props.hasOwnProperty("loading") ? $loading : _loading;
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
		if (renderTableInfo) return renderTableInfo(tableInfo, { actions: tableAction, info: {} });
		return tableInfo;
	})();

	// TODO: 确定tableAction
	const tableToolbar = (() => {
		// 默认 只有一个刷新icon
		const toolbar: JSX.Element[] = [
			<Tooltip title='刷新' key='reload-icon'>
				<ReloadOutlined key='reload' className={styles.reload_icon} onClick={handleRequest} />
			</Tooltip>,
		];
		if (renderToolbar) return renderToolbar(toolbar, tableAction);
		return toolbar;
	})();

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
			render: ($dom, form) => {
				// 处理 loading
				const dom = [$dom[0], cloneElement($dom[1], { loading: getButtonLoading(loading) })];
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
				pagination={{ ...$pagination, ...state.pagination }}
				onChange={handleTableChange}
				className={classNames(styles.table_content, rest.className)}
			/>
		</div>
	);
}

export default forwardRef(ProTable) as typeof ProTable;
