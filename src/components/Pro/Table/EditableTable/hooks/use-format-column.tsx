import { cloneElement, isValidElement, RefObject, useMemo } from "react";
import { ColumnType } from "antd/lib/table";
import { EditableColumnsType, EditableColumnType, EditableTableRef } from "../interface";
import TableText from "../../components/TableText";
import merge from "lodash/merge";

// 转换 columns 分离出 editCol 与 tableCol
export default function useFormatColumn<RT extends object = any>(
	columns: EditableColumnsType<RT>,
	action: RefObject<EditableTableRef<RT> | undefined>
) {
	return useMemo(() => {
		const tableCol: any[] = [];
		const editCol: any[] = [];
		for (let i = 0; i < columns.length; i++) {
			const item = columns[i] as EditableColumnType<RT>;
			// TODO: 处理 group
			const { props: $props, read, render, edit, hideInForm, hideInTable, ...rest } = item;
			const { dataIndex, title } = item;
			if (!hideInForm && isValidElement(edit)) {
				const props = merge(
					{ label: title, name: dataIndex, key: dataIndex ?? i },
					{ field: $props },
					edit.props
				);
				editCol.push(cloneElement(edit, props));
			}
			if (hideInTable) continue;

			const readElement = read ?? <TableText />;
			const colItem: ColumnType<RT> = {
				...rest,
				render: (value, record, index) => {
					const dom = cloneElement(readElement, { ...$props, text: value });
					if (render) return render(dom, record, index, action.current!);
					return dom;
				},
			};
			tableCol.push(colItem);
		}
		return [tableCol, editCol] as const;
	}, [action, columns]);
}
