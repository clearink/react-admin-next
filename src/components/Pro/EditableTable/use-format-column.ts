import { isValidElement, useMemo } from "react";
import { FilterValue, GetValue } from "@/utils/Value";
import { ColumnType } from "antd/lib/table";
import { ColumnExtendProps, EditableTableProps } from ".";
import { antdFormItemProps } from "../utils/constant";

// 转换 columns 分离出 formColumn 与
export default function useFormatColumn<RecordType extends object = any>(
	type: EditableTableProps<RecordType>["type"],
	columns: Array<ColumnType<RecordType> & ColumnExtendProps>,
	handleSave: (row: RecordType) => void
) {
	return useMemo(() => {
		const tableColumns: any[] = [];
		const formColumns: any[] = [];
		for (let i = 0; i < columns.length; i++) {
			const col = columns[i];
			const { edit, title, dataIndex } = col;
			const tableColProps = FilterValue(col, antdFormItemProps); // 表格的属性
			const formItemProps = GetValue(col, antdFormItemProps, false); // 表单的属性
			if (isValidElement(col.edit)) formColumns.push({ label: title, edit, name: dataIndex, ...formItemProps });
			if (!col.hide) {
				if (isValidElement(col.edit) && type === "cell") {
					tableColumns.push({
						...tableColProps,
						onCell: (record: RecordType) => ({
							edit,
							record,
							handleSave,
							name: dataIndex,
							formItemProps,
						}),
					});
				} else tableColumns.push(tableColProps);
			}
		}
		return [tableColumns, formColumns] as const;
	}, [columns, handleSave, type]);
}
