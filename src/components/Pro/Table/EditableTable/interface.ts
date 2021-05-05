import { TableProps } from "antd";
import { TitleProps } from "antd/lib/typography/Title";

export interface EditableTableProps<RT extends object = any>
	extends Omit<TableProps<RT>, "columns" | "onChange"> {
	columns?: Array<ColumnType<RT> & ColumnExtendProps>;
	/** 编辑方式 单元格编辑 模态框编辑 */
	type?: "cell" | "modal" | "drawer";
	onChange?: (recordList: RT[]) => void;
	rowKey?: string;
	onAdd?: (record: RT) => RT;
	addTitle?: TitleProps["title"];
	editTitle?: TitleProps["title"];
	formProps?: Omit<DrawerFormProps<RT> | ModalFormProps<RT>, "onFinish">;

	// fix 泛型失效
	ref?: Ref<EditableTableRef<RT>>;
}
