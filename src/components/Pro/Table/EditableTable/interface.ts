import { ReactElement, ReactNode, Ref } from "react";
import { TableProps } from "antd";
import { ColumnType } from "antd/lib/table";
import { RenderedCell } from "rc-table/lib/interface";
import { TitleTipProps } from "../../TitleTip";
import { ColumnTitle } from "antd/lib/table/interface";
import { ProFormProps } from "../../Form/ProForm/interface";

// 编辑模式
export declare type EditType = "modal" | "drawer" | "cell";
export interface EditableTableProps<RT extends object = any>
	extends Omit<TableProps<RT>, "columns" | "onChange"> {
	columns?: EditableColumnsType<RT>;

	rowKey?: string;

	/** 编辑方式 模态框 抽屉 */
	editType?: EditType;

	/** table数据改变时触发 */
	onDataChange?: (recordList: RT[], record: RT, type: DatChangeType) => boolean | Promise<boolean>;

	/** 新增标题 */
	addTitle?: TitleTipProps["title"];
	/** 创建标题 */
	editTitle?: TitleTipProps["title"];

	/** 传递给 form的属性 */
	editFormProps?: ProFormProps<RT>;

	// /** table 数据请求函数 返回 需要展示的数据以及数据总数 */
	// /** 返回的数据待确定 */
	// request?: EditTableRequest<RT>;
	// params?: Record<string, any>;

	// fix 泛型失效
	ref?: Ref<EditableTableRef<RT>>;
}
// 搜索函数满足的要求
type RequestResponse<T> = { dataSource: T[]; total?: number };
export type EditTableRequest<RT extends object = any> = (
	params: Partial<RT> & Record<"current" | "pageSize", number> & Record<string, any>
) => Promise<RequestResponse<RT> | undefined | void>;

export type DatChangeType = "add" | "edit" | "delete";
// 暴露的方法
export interface EditableTableRef<RT = any> {
	add: (record?: RT) => void;
	edit: (record: RT, extra?: Partial<RT>) => void;
	delete: (record: RT) => void;
}

export declare type EditableColumnRender<RT = any> = (
	dom: ReactNode,
	record: RT,
	index: number,
	actions: EditableTableRef<RT>
) => React.ReactNode | RenderedCell<RT>;

// 扩展的 title
type EditableColumnTitle<RT> =
	| ReactNode
	| TitleTipProps["title"]
	| ((props: ColumnTitle<RT>) => ReactNode);
export interface EditableColumnType<RT extends object = any>
	extends Omit<ColumnType<RT>, "render"> {
	/** 文本显示字段  */
	read?: JSX.Element;

	/** 编辑字段  */
	edit?: JSX.Element;

	/** 扩展 title 方法 */
	title: EditableColumnTitle<RT>;

	/** 扩展render 功能 */
	render?: EditableColumnRender<RT>;

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

	/** 直接传递的 read 与 edit 的 */
	props?: any;
}
export interface EditableColumnGroupType<RT extends object = any>
	extends Omit<EditableColumnType<RT>, "dataIndex"> {
	children: EditableColumnsType<RT>;
}
export type EditableColumnsType<RT extends object = any> = Array<
	EditableColumnType<RT> | EditableColumnGroupType<RT>
>;

export type EditableTableType = <RT extends object = any>(
	props: EditableTableProps<RT>
) => ReactElement;
