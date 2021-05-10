import React, { ReactNode, MutableRefObject, Ref, ReactElement } from "react";
import { TitleTipProps } from "@/components/Pro/TitleTip";
import { ColumnType, TablePaginationConfig, TableProps } from "antd/lib/table";
import { RenderedCell } from "rc-table/lib/interface";
import { FilterFormProps } from "../../Form/FilterForm/interface";
import { FormInstance } from "antd";
import { ColumnTitle, FilterValue, SorterResult } from "antd/lib/table/interface";
import { getFilters, getInitState, getSorter } from "./utils";

//
export interface ProTableProps<RecordType extends object = any>
	extends Omit<TableProps<RecordType>, "columns" | "rowSelection"> {
	columns?: ProColumnsType<RecordType>;

	/**
	 * 多选 = false时 不显示
	 */
	rowSelection?: false | TableProps<RecordType>["rowSelection"];

	/** search form props */
	search?: false | FilterFormProps<RecordType>;

	searchRef?: MutableRefObject<FormInstance | null | undefined>;

	/** table 上方的 title */
	tableTitle?: TitleTipProps["title"];

	/** render 右侧操作栏 */
	renderToolbar?: (dom: JSX.Element[], actions: ProTableRef<RecordType>) => JSX.Element[];

	/** render tableInfo 渲染table信息 */
	renderTableInfo?: (dom: JSX.Element, actions: ProTableRef<RecordType>) => ReactNode;

	// 添加几个常用的默认事件吧 不设置 则不显示
	onCreate?: () => void;
	onDelete?: (ids: React.Key[]) => void;

	/**
	 * table 数据请求函数
	 * 返回 需要展示的数据以及数据总数
	 */
	request?: ProTableRequest<RecordType>;
	params?: Record<string, any>;

	// fix forwardRef 无法识别泛型组件的问题
	ref?: Ref<ProTableRef>;
}

export type ProTableRequest<RecordType extends object = any> = (
	params: Partial<RecordType> & Record<"current" | "pageSize", number> & Record<string, any>,
	filter: ReturnType<typeof getFilters>,
	sort: ReturnType<typeof getSorter>
) => Promise<
	| {
			dataSource: RecordType[];
			total?: number;
	  }
	| undefined
>;

// 扩展的 title
type ProColumnTitle<RT> =
	| ReactNode
	| TitleTipProps["title"]
	| ((props: ColumnTitle<RT>) => ReactNode);
// 扩展的 render
type ProColumnRender<T = unknown> = (
	dom: ReactNode,
	record: T,
	index: number,
	action: ProTableRef<T>
) => React.ReactNode | RenderedCell<T>;
export interface ProColumnType<RecordType = unknown>
	extends Omit<ColumnType<RecordType>, "render"> {
	/** 文本显示字段  */
	read?: JSX.Element;

	/** 搜索字段  */
	search?: JSX.Element;

	/** 扩展 title 方法 */
	title: ProColumnTitle<RecordType>;

	/** 扩展 render方法 */
	render?: ProColumnRender<RecordType>;

	/** table隐藏 */
	hideInTable?: boolean;

	/** form隐藏 */
	hideInForm?: boolean;

	/** search and read 都需要的属性 */
	props?: any;
}

export type ProColumnsType<RecordType = unknown> = Array<
	ProColumnType<RecordType> | ProColumnGroupType<RecordType>
>;

export interface ProColumnGroupType<RecordType>
	extends Omit<ProColumnType<RecordType>, "dataIndex"> {
	children: ProColumnsType<RecordType>;
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
export interface ProTableRef<RT = unknown> {
	state: ReturnType<typeof getInitState> & { dataSource: RT[] };
	reload: (reset?: boolean) => void;
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

export type ProTableType = <RecordType extends object = any>(
	props: ProTableProps<RecordType>
) => ReactElement;
