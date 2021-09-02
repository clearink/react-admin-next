import { ReactNode, Key, ReactElement } from "react";

export interface EditableCellProps<T extends object = any> {
	children?: ReactNode;
	edit?: ReactElement<any>; // 编辑的组件
	record: T;
	dataIndex: Key | Key[];
	handleSave: () => {};
}
