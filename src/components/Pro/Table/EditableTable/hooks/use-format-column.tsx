import { cloneElement, isValidElement, useMemo } from "react";
import { ColumnType } from "antd/lib/table";
import { EditType, EditableColumnsType, EditableColumnType } from "../interface";
import TableText from "../../components/TableText";

// 转换 columns 分离出 formColumn 与
export default function useFormatColumn<RT extends object = any>(
	columns: EditableColumnsType<RT>,
	handleSave: (row: RT) => void
) {
	return useMemo(() => {
		const tableCol: any[] = [];
		const formCol: any[] = [];
		for (let i = 0; i < columns.length; i++) {
			const item = columns[i] as EditableColumnType<RT>;
			// TODO: 处理 group
			const { props: $props, read, render, edit, hideInForm, hideInTable, ...rest } = item;
			const { dataIndex, title } = item;
			if (!hideInForm && isValidElement(edit)) {
				const props = {
					label: title,
					name: dataIndex,
					key: dataIndex ?? i,
					...$props,
					...(edit.props as any),
				};
				formCol.push(cloneElement(edit, props));
			}
			if (hideInTable) continue;

			const readElement = read ?? <TableText />;
			const colItem: ColumnType<RT> = {
				...rest,
				render: (value, record, index) => {
					const dom = cloneElement(readElement, { text: value });
					if (render) return render(dom, value, record, index);
					return dom;
				},
				onCell: (record, index) => {
					return {
						edit,
						record,
						handleSave,
						name: dataIndex,
						...rest.onCell?.(record, index),
					} as any;
				},
			};
			tableCol.push(colItem);
		}
		return [tableCol, formCol] as const;
	}, [columns, handleSave]);
}
