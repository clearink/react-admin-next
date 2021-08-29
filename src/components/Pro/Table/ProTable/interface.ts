import React, { ReactNode, MutableRefObject, Ref, ReactElement } from "react";
import { TitleTipProps } from "@/components/Pro/TitleTip";
import { ColumnType, TablePaginationConfig, TableProps } from "antd/lib/table";
import { RenderedCell } from "rc-table/lib/interface";
import { FilterFormProps } from "../../Form/FilterForm/interface";
import { FormInstance } from "antd";
import { ColumnTitle, FilterValue, SorterResult } from "antd/lib/table/interface";
import { getFilters, getInitState, getSorter } from "./utils";

export interface ProTableProps<RT extends object = any>
	extends Omit<TableProps<RT>, "columns" | "rowSelection"> {
	columns?: ProColumnsType<RT>;

	/** false时 不显示多选 */
	rowSelection?: false | TableProps<RT>["rowSelection"];

	/** table 上方的 title */
	tableTitle?: TitleTipProps["title"];

	/** 筛选表单 props */
	filterFormProps?: FilterFormProps<RT>;

	filterForm?: MutableRefObject<FormInstance | null | undefined>;
	/** 渲染筛选表单 */
	renderFilterForm?: false | ((dom: JSX.Element, actions: ProTableRef<RT>) => ReactNode);

	/** render 右侧操作栏 */
	renderToolbar?:
		| false
		| ((dom: (JSX.Element | undefined)[], actions: ProTableRef<RT>) => ReactNode);

	/** render tableInfo 渲染table信息 */
	renderTableInfo?: false | ((dom: JSX.Element, actions: ProTableRef<RT>) => ReactNode);

	/** table 数据请求函数 返回 需要展示的数据以及数据总数 */
	/** 返回的数据待确定 */
	request?: ProTableRequest<RT>;
	params?: Record<string, any>;

	// fix forwardRef 无法识别泛型组件的问题
	ref?: Ref<ProTableRef<RT>>;
}

// 搜索函数满足的要求
type RequestResponse<T> = { dataSource: T[]; total?: number };
export type ProTableRequest<RT extends object = any> = (
	params: Partial<RT> & Record<"current" | "pageSize", number> & Record<string, any>,
	filter: ReturnType<typeof getFilters>,
	sort: ReturnType<typeof getSorter>
) => Promise<RequestResponse<RT> | undefined | void>;

// 扩展的 title
type ProColumnTitle<RT> =
	| ReactNode
	| TitleTipProps["title"]
	| ((props: ColumnTitle<RT>) => ReactNode);
// 扩展的 render
type ProColumnRender<T extends object = any> = (
	dom: ReactNode,
	record: T,
	index: number,
	actions: ProTableRef<T>
) => React.ReactNode | RenderedCell<T>;
export interface ProColumnType<RT extends object = any> extends Omit<ColumnType<RT>, "render"> {
	/** 文本显示字段  */
	read?: JSX.Element;

	/** 搜索字段  */
	search?: JSX.Element;

	/** 扩展 title 方法 */
	title: ProColumnTitle<RT>;

	/** 扩展 render方法 */
	render?: ProColumnRender<RT>;

	/** table隐藏 */
	hideInTable?: boolean;

	/** 列排序 */
	tableSort?: number;

	/** form隐藏 */
	hideInForm?: boolean;

	/** form排序 */
	formSort?: number;

	/** 可复制 */
	copyable?: boolean;

	/** search and read 都需要的属性 */
	props?: Record<string, any>;
}

export type ProColumnsType<RT extends object = any> = Array<
	ProColumnType<RT> | ProColumnGroupType<RT>
>;

export interface ProColumnGroupType<RT extends object = any>
	extends Omit<ProColumnType<RT>, "dataIndex"> {
	children: ProColumnsType<RT>;
}

// store state 初始化函数
export interface GetInitStateProps {
	pagination?: false | TablePaginationConfig;
	filters: Record<string, FilterValue | null | undefined>;
	sorter: SorterResult<any> | SorterResult<any>[];
}
/**
 * feature:
 * 筛选栏
 * toolbar: 当前第几页 actionBar
 * table
 */
export interface ProTableRef<RT extends object = any> {
	state: ReturnType<typeof getInitState> & { dataSource: RT[] };
	reload: (resetCurrent?: boolean, resetForm?: boolean) => void;
	clearSelected: () => void;
	setPagination: (config: Record<"current" | "pageSize", number>) => void;
	setFilters: (filters: Record<string, FilterValue | null>) => void;
	setSorter: (sorter: SorterResult<RT> | SorterResult<RT>[]) => void;
	setDataSource: (dataSource: RT[]) => void;
	// TODO: 支持 startEditable, cancelEditable
}
/**
 * interface ActionType {
  reload: (resetPageIndex?: boolean) => void;
  reloadAndRest: () => void;
  reset: () => void;
  clearSelected?: () => void;
  startEditable: (rowKey: Key) => boolean;
  cancelEditable: (rowKey: Key) => boolean;
}
 */

export type ProTableType = <RT extends object = any>(props: ProTableProps<RT>) => ReactElement;
