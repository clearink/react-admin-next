import {
	cloneElement,
	forwardRef,
	Ref,
	useEffect,
	useImperativeHandle,
	useMemo,
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
import { FilterValue } from "antd/lib/table/interface";
import { FilterForm } from "@/components/Pro/Form";
import useRefCallback from "@/hooks/state/use-ref-callback";
import TitleTip from "../../TitleTip";
import TableInfo from "./components/TableInfo";
import useFilterTableColumn from "./hooks/use-filter-table-column";
import { getCurrentAndSize, getFilters, getSorter } from "./utils";
import { ProTableProps, ProTableRef } from "./interface";
import styles from "./style.module.scss";
import { isFunction } from "@/utils/ValidateType";
import { FilterFormProps } from "../../Form/FilterForm/interface";
import useMountedRef from "@/hooks/state/use-mounted-ref";
import useDeepEffect from "@/hooks/state/use-deep-effect";
import withForwardRef from "@/hocs/withForwardRef";

/**
 * TODO
 * tableLoading 与 formLoading
 *
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
	const [tableCol, formCol] = useFilterTableColumn(columns);

	const [loading, setLoading] = useState<ProTableProps["loading"]>(_loading);
	/**
	 * 保存 table 的 sorter 与 sorter
	 * Q: 点击搜索时需不需要清除这些筛选?
	 * A: 应该不需要 因为这些也是搜索条件 和 form 是一样的作用
	 * Q: 是否提供一个能够清除所有筛选条件的方法?
	 * A: TODO
	 *
	 *
	 */
	// 这四者加上 外部的 _params 变化都会导致 request 函数执行
	const [filters, setFilters] = useState<Record<string, FilterValue>>({});
	const [sorter, setSorter] = useState<Record<string, "descend" | "ascend">>({});
	const [params, setParams] = useState<Partial<RecordType>>({}); // form value

	// 同步外部数据
	const [pagination, setPagination] = useState<Record<"current" | "pageSize", number>>(() =>
		getCurrentAndSize(_pagination)
	);
	useEffect(() => {
		setPagination(getCurrentAndSize(_pagination));
	}, [_pagination]);

	const mountedRef = useMountedRef();
	const handleRequest = useRefCallback(async () => {
		if (!isFunction(request)) return;
		try {
			setLoading({ delay: 50 });
			const { dataSource, total } = await request(
				{ ...params, ..._params, ...pagination },
				filters,
				sorter
			);
			// TODO:
			// set dataSource and total
		} finally {
			if (mountedRef.current) setLoading(false);
		}
	});

	useDeepEffect(() => {
		handleRequest();
	}, [handleRequest, filters, sorter, pagination, params, _params]);

	const handleReload = useRefCallback((reset?: boolean) => {
		if (reset) {
			console.log("重置 current and pageSize filter, sorter 等后 在进行 数据请求");
		}
		handleRequest();
	});
	// formValue
	const tableAction = useMemo(() => {
		return {
			reload: handleReload,
			clearSelected: () => {},
		};
	}, [handleReload]);

	const [form] = Form.useForm(search ? search.form : undefined);
	useImperativeHandle(searchRef, () => form, [form]); // 暴露出属性

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

	const handleTableChange = useRefCallback<Required<ProTableProps<RecordType>>["onChange"]>(
		(...args) => {
			const [_pagination, _filters, _sorter] = args;
			if (rest.onChange) rest.onChange(...args);
			// 保存 数据
			setPagination(getCurrentAndSize(_pagination));
			setFilters(getFilters(_filters));
			setSorter(getSorter(_sorter));
		}
	);
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
	const handleFinish = useRefCallback(async (values: RecordType) => {
		setParams(values);
		if (search && search.onFinish) {
			await search.onFinish(values);
		}
	});
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
				loading={props.hasOwnProperty("loading") ? _loading : loading}
				pagination={{ ..._pagination, ...pagination }}
				onChange={handleTableChange}
				className={classNames(styles.table_content, rest.className)}
			/>
		</div>
	);
}
export default withForwardRef<P,R>(ProTable);
// export default forwardRef(ProTable) as <RecordType extends object = any>(
// 	props: ProTableProps<RecordType> & { ref?: Ref<ProTableRef> }
// ) => ReturnType<typeof ProTable>;
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
