import { ReactNode, MutableRefObject } from "react";
import { TitleTipProps } from "@/components/Pro/TitleTip";
import { ColumnType, TablePaginationConfig, TableProps } from "antd/lib/table";
import { RenderedCell } from "rc-table/lib/interface";
import { FilterFormProps } from "../../Form/FilterForm/interface";
import { FormInstance } from "antd";
import { FilterValue, SortOrder } from "antd/lib/table/interface";

//
export interface ProTableProps<RecordType extends object = any>
	extends Omit<TableProps<RecordType>, "columns"> {
	columns?: ProColumnsType<RecordType>;

	/** search form props */
	search?: false | FilterFormProps<RecordType>;

	searchRef?: MutableRefObject<FormInstance | null | undefined>;

	/** table 上方的 title */
	tableTitle?: TitleTipProps["title"];

	/** render 右侧操作栏 */
	renderToolbar?: (actions: JSX.Element[]) => JSX.Element[];

	/** render tableInfo 渲染table信息 */
	// TODO: 修正props类型
	renderTableInfo?: (dom: JSX.Element, props: any) => ReactNode;

	// 事件

	// toolbar 默认给予的事件
	// 理论上是应当根据业务的不同而自行 renderToolbar 的
	// 点击新增按钮
	// onCreate?: () => any;

	// // 点击删除按钮
	// onDelete?: (ids: any[]) => any;

	/** table 数据请求函数 */
	request?: (
		params: RecordType & Pick<TablePaginationConfig, "current" | "pageSize">,

		filter: Record<string, FilterValue | null>,
		sort: { [field: string]: SortOrder }
	) => any;
}
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
/**
 * feature:
 * 筛选栏
 * toolbar: 当前第几页 actionBar
 * table
 */
export interface ProTableRef {}

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