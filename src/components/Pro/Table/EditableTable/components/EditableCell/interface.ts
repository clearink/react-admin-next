import { ReactNode, Key, ReactElement, MutableRefObject } from "react";
import { FormItemProps } from "antd";
import { EditableTableRef } from "../../interface";

export interface EditableCellProps<T extends object = any> {
	children?: ReactNode;
	edit?: ReactElement<any>; // 编辑的组件
	record: T;
	dataIndex: Key | Key[];
	actions?: MutableRefObject<EditableTableRef<T> | undefined>;
}

export interface ItemRenderType {
	mark: string;
	render: (
		inputProps: FormItemProps & Record<string, any>,
		element: {
			input: JSX.Element;
			errorList: JSX.Element;
			extra: JSX.Element;
		}
	) => JSX.Element;
}
