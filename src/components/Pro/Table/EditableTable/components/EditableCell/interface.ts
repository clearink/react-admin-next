import { ReactNode, Key, ReactElement, MutableRefObject } from "react";
import { EditableTableRef } from "../../interface";

export interface EditableCellProps<T extends object = any> {
	children?: ReactNode;
	edit?: ReactElement<any>; // 编辑的组件
	record: T;
	dataIndex: Key | Key[];
	actions?: MutableRefObject<EditableTableRef<T> | undefined>;
}
