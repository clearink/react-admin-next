import { ReactElement, ReactNode, Ref } from "react";
import { TableProps } from "antd";
import { ColumnType } from "antd/lib/table";
import { RenderedCell } from "rc-table/lib/interface";
import { DrawerFormProps } from "../../Form/DrawerForm/interface";
import { ModalFormProps } from "../../Form/ModalForm/interface";
import { TitleTipProps } from "../../TitleTip";
import { ColumnTitle } from "antd/lib/table/interface";

export declare type EditType = "modal" | "drawer";
export interface EditableTableProps<RT extends object = any>
	extends Omit<TableProps<RT>, "columns" | "onChange"> {
	columns?: EditableColumnsType<RT>;

	rowKey?: string;

	/** 编辑方式 模态框 抽屉 */
	type?: EditType;

	/** table数据改变时触发 */
	onDataChange?: (recordList: RT[], record: RT, type: DatChangeType) => boolean | Promise<boolean>;

	/** 新增标题 */
	addTitle?: TitleTipProps["title"];
	/** 创建标题 */
	editTitle?: TitleTipProps["title"];
	/** 传递给form的属性 */
	formProps?: Omit<DrawerFormProps<RT> | ModalFormProps<RT>, "onFinish">;

	// fix 泛型失效
	ref?: Ref<EditableTableRef<RT>>;
}
export type DatChangeType = "add" | "edit" | "delete";
// 暴露的方法
export interface EditableTableRef<RT = any> {
	add: (record?: RT) => void;
	edit: (record: RT) => void;
	delete: (record: RT) => void;
}

export declare type EditableColumnRender<RT = any> = (
	dom: ReactNode,
	record: RT,
	index: number,
	action: EditableTableRef<RT>
) => React.ReactNode | RenderedCell<RT>;

// 扩展的 title
type EditableColumnTitle<RT> =
	| ReactNode
	| TitleTipProps["title"]
	| ((props: ColumnTitle<RT>) => ReactNode);
export interface EditableColumnType<RT = unknown> extends Omit<ColumnType<RT>, "render"> {
	read?: JSX.Element;
	edit?: JSX.Element;
	/** 隐藏列 */
	hideInTable?: boolean;
	/** 隐藏控件 */
	hideInForm?: boolean;

	/** 扩展 title 方法 */
	title: EditableColumnTitle<RT>;

	/** 扩展render 功能 */
	render?: EditableColumnRender<RT>;
	/** 直接传递的 read 与 edit 的 */
	props?: any;
}
export interface EditableColumnGroupType<RT> extends Omit<EditableColumnType<RT>, "dataIndex"> {
	children: EditableColumnsType<RT>;
}
export type EditableColumnsType<RT = unknown> = Array<
	EditableColumnType<RT> | EditableColumnGroupType<RT>
>;

export type EditableTableType = <RT extends object = any>(
	props: EditableTableProps<RT>
) => ReactElement;
