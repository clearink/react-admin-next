import { ReactNode, Key, ReactElement, MutableRefObject } from "react";
import { ValidateStatus } from "antd/lib/form/FormItem";
import { EditableTableRef } from "../../interface";

export interface EditableCellProps<T extends object = any> {
	children?: ReactNode;
	edit?: ReactElement<any>; // 编辑的组件
	record: T;
	dataIndex: Key | Key[];
	actions?: MutableRefObject<EditableTableRef<T> | undefined>;
}

export interface ItemRenderType {
	mark: "pro_table_render";
	render: (
		inputProps: {
			errors: Key[];
			touched: boolean;
			validateStatus: ValidateStatus;
		},
		element: {
			input: JSX.Element;
			errorList: JSX.Element;
			extra: JSX.Element;
		}
	) => JSX.Element;
}
