import { ReactElement, Ref } from "react";
import { TableProps } from "antd";
import { ColumnType } from "antd/lib/table";

import { DrawerFormProps } from "../../Form/DrawerForm/interface";
import { ModalFormProps } from "../../Form/ModalForm/interface";
import { TitleTipProps } from "../../TitleTip";
import { ProColumnRender } from "../interface";


export declare type EditType = "cell" | "row" | "modal" | "drawer";
export interface EditableTableProps<RT extends object = any>
	extends Omit<TableProps<RT>, "columns" | "onChange"> {
	
	columns?: EditableColumnsType<RT>;
	
	rowKey?: string;

	/** 编辑方式 单元格 整行 模态框 抽屉 */
	type?: EditType;
	
	/** table数据改变时触发 */
	onDataChange?: (recordList: RT[]) => void;
	/** 创建新项时触发 */
	onCreate?: (record: RT) => RT;

	/** 新增标题 */
	addTitle?: TitleTipProps["title"];
	/** 创建标题 */
	editTitle?: TitleTipProps["title"];
	/** 传递给form的属性 */
	formProps?: Omit<DrawerFormProps<RT> | ModalFormProps<RT>, "onFinish">;

	// fix 泛型失效
	ref?: Ref<EditableTableRef<RT>>;
}

// 暴露的方法
export interface EditableTableRef<RT extends object = any> {
	add: (record?: RT) => void;
	edit: (record: RT) => void;
	delete: (record: RT) => void;
}

// export type ColumnTableRender = <RT>(dom:ReactNode,value)=>ReactNode | RenderedCell<RT>;
export interface EditableColumnType<RT = unknown> extends Omit<ColumnType<RT>, "render"> {
	read?: JSX.Element;
	edit?: JSX.Element;
	/** 隐藏列 */
	hideInTable?: boolean;
	/** 隐藏控件 */
	hideInForm?: boolean;

	/** 扩展render 功能 */
	render?: ProColumnRender<RT>;
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
