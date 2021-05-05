import React, { ReactNode, MutableRefObject, Ref } from "react";
import { TitleTipProps } from "@/components/Pro/TitleTip";
import { ColumnType, TablePaginationConfig, TableProps } from "antd/lib/table";
import { RenderedCell } from "rc-table/lib/interface";
import { FilterFormProps } from "../../Form/FilterForm/interface";
import { FormInstance } from "antd";
import { FilterValue, SorterResult } from "antd/lib/table/interface";
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
	renderToolbar?: (dom: JSX.Element[], actions: ProTableRef) => JSX.Element[];

	/** render tableInfo 渲染table信息 */
	renderTableInfo?: (dom: JSX.Element, actions: ProTableRef) => ReactNode;

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
			total: number;
	  }
	| undefined
>;
export interface ProColumnGroupType<RecordType>
	extends Omit<ProColumnType<RecordType>, "dataIndex"> {
	children: ProColumnsType<RecordType>;
}
export interface ProColumnType<RecordType = unknown>
	extends Omit<ColumnType<RecordType>, "render"> {
	/** 文本显示字段  */
	read?: JSX.Element;

	/** 搜索字段  */
	search?: JSX.Element;

	/** 扩展 render方法 */
	render?: (
		dom: ReactNode,
		value: any,
		record: RecordType,
		index: number
	) => React.ReactNode | RenderedCell<RecordType>;

	/** table隐藏 */
	hideInTable?: boolean;

	/** form隐藏 */
	hideInForm?: boolean;

	/** 当title是函数时 使用 label 字段 @deprecated 没啥用 未来 delete */
	label?: TitleTipProps["title"];

	/** @deprecated 提示文本 暂无功能 */
	tooltip?: string;

	/** search and read 都需要的属性 */
	props?: any;
}

export type ProColumnsType<RecordType = unknown> = Array<
	ProColumnType<RecordType> | ProColumnGroupType<RecordType>
>;

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
export interface ProTableRef<RecordType extends object = any> {
	state: ReturnType<typeof getInitState>;
	reload: (reset?: boolean) => void;
	clearSelected: () => void;
	setPagination: (config: Record<"current" | "pageSize", number>) => void;
	setFilters: (filters: Record<string, FilterValue | null>) => void;
	setSorter: (sorter: SorterResult<RecordType> | SorterResult<RecordType>[]) => void;
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
